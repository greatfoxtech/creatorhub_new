/**
 * usePages — single source of truth for all page data.
 *
 * Strategy:
 * - localStorage is used as an immediate cache (fast reads/writes during editing).
 * - The backend Page entity is the persistent store (survives browser clears, multi-device).
 * - On mount: load from backend, merge into localStorage, then keep localStorage in sync.
 * - On save: write to both localStorage AND backend.
 */

import { useState, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

export const STORAGE_KEY = 'builderv2-pages';
const SYNC_EVENT = 'builderv2-pages-updated';

// ─── Raw localStorage helpers ────────────────────────────────────────────────

export const loadStorageData = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeStorageData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent(SYNC_EVENT));
};

export const setActivePageId = (pageId) => {
  const data = loadStorageData() || {};
  data.activePageId = pageId;
  writeStorageData(data);
};

// ─── Backend sync helpers ────────────────────────────────────────────────────

/** Convert a backend Page record → local page object */
const backendToLocal = (rec) => ({
  id: rec.id,
  name: rec.title,
  slug: rec.slug,
  is_published: rec.is_published,
  canvasJson: rec.elements_json || [],
  created_date: rec.created_date,
  updated_date: rec.updated_date,
  _backendId: rec.id,
  user_id: rec.user_id,
});

/** Persist one page canvas to the backend */
const savePageToBackend = async (userId, page) => {
  if (!userId) return;
  const payload = {
    user_id: userId,
    title: page.name || 'Untitled',
    slug: page.slug || `page-${page.id}`,
    is_published: page.is_published || false,
    elements_json: page.canvasJson || [],
  };
  try {
    // If the page id is a real backend id (not a local temp id), update it
    if (page._backendId) {
      await base44.entities.Page.update(page._backendId, payload);
    } else {
      const created = await base44.entities.Page.create(payload);
      return created.id; // return the new backend id
    }
  } catch (err) {
    console.warn('[usePages] backend save failed:', err);
  }
  return null;
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export default function usePages() {
  const [pages, setPages] = useState(() => loadStorageData()?.pages || []);
  const [activePageId, setActivePageIdState] = useState(
    () => loadStorageData()?.activePageId || null
  );
  const [userId, setUserId] = useState(null);

  // Resolve current user once
  useEffect(() => {
    base44.auth.me().then(u => setUserId(u?.id)).catch(() => {});
  }, []);

  // On mount (and when userId is known): load pages from backend and merge
  useEffect(() => {
    if (!userId) return;
    base44.entities.Page.filter({ user_id: userId })
      .then(records => {
        if (!records || records.length === 0) return;
        const backendPages = records.map(backendToLocal);
        const data = loadStorageData() || {};
        const localPages = data.pages || [];

        // Merge: backend is authoritative for existing records; keep local-only pages too
        const backendIds = new Set(backendPages.map(p => p.id));
        const localOnly = localPages.filter(p => !backendIds.has(p.id) && !p._backendId);
        const merged = [...backendPages, ...localOnly];
        const activeId = data.activePageId || merged[0]?.id || null;

        writeStorageData({ ...data, pages: merged, activePageId: activeId });
        setPages(merged);
        setActivePageIdState(activeId);
      })
      .catch(err => console.warn('[usePages] backend load failed:', err));
  }, [userId]);

  // Re-read from storage whenever another consumer writes
  const sync = useCallback(() => {
    const data = loadStorageData();
    setPages(data?.pages || []);
    setActivePageIdState(data?.activePageId || null);
  }, []);

  useEffect(() => {
    window.addEventListener(SYNC_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(SYNC_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [sync]);

  // ── Mutations ──────────────────────────────────────────────────────────────

  const persistPages = useCallback((newPages, newActivePageId) => {
    const data = loadStorageData() || {};
    data.pages = newPages;
    data.timestamp = Date.now();
    if (newActivePageId !== undefined) data.activePageId = newActivePageId;
    writeStorageData(data);
    setPages(newPages);
    if (newActivePageId !== undefined) setActivePageIdState(newActivePageId);
  }, []);

  const switchPage = useCallback((pageId, currentPageId, currentElements) => {
    const data = loadStorageData() || {};
    if (currentPageId && currentElements !== undefined) {
      data.pages = (data.pages || []).map(p =>
        p.id === currentPageId
          ? { ...p, canvasJson: currentElements, updated_date: Date.now() }
          : p
      );
      // Save current page to backend
      const currentPage = data.pages.find(p => p.id === currentPageId);
      if (currentPage && userId) savePageToBackend(userId, currentPage);
    }
    data.activePageId = pageId;
    data.timestamp = Date.now();
    writeStorageData(data);
    setPages(data.pages || []);
    setActivePageIdState(pageId);
    const target = (data.pages || []).find(p => p.id === pageId);
    return (target?.canvasJson || []).filter(el => el && el.id && el.type);
  }, [userId]);

  const addPage = useCallback(async (newPage) => {
    const data = loadStorageData() || {};
    const pageWithDates = { ...newPage, created_date: Date.now(), updated_date: Date.now() };
    const updated = [...(data.pages || []), pageWithDates];
    data.pages = updated;
    data.activePageId = newPage.id;
    data.timestamp = Date.now();
    writeStorageData(data);
    setPages(updated);
    setActivePageIdState(newPage.id);
    // Save to backend
    if (userId) {
      const backendId = await savePageToBackend(userId, pageWithDates);
      if (backendId) {
        // Update local record with the backend id
        const refreshed = updated.map(p => p.id === newPage.id ? { ...p, _backendId: backendId, id: backendId } : p);
        const activeId = backendId;
        writeStorageData({ ...data, pages: refreshed, activePageId: activeId });
        setPages(refreshed);
        setActivePageIdState(activeId);
      }
    }
  }, [userId]);

  const updatePageCanvas = useCallback((pageId, canvasJson) => {
    const data = loadStorageData() || {};
    data.pages = (data.pages || []).map(p =>
      p.id === pageId ? { ...p, canvasJson, updated_date: Date.now() } : p
    );
    data.timestamp = Date.now();
    writeStorageData(data);
    setPages(data.pages);
    // Backend save
    const page = data.pages.find(p => p.id === pageId);
    if (page && userId) savePageToBackend(userId, page);
  }, [userId]);

  const deletePage = useCallback(async (pageId) => {
    const data = loadStorageData() || {};
    const page = (data.pages || []).find(p => p.id === pageId);
    const updated = (data.pages || []).filter(p => p.id !== pageId);
    let newActiveId = data.activePageId;
    if (newActiveId === pageId) newActiveId = updated[0]?.id || null;
    data.pages = updated;
    data.activePageId = newActiveId;
    data.timestamp = Date.now();
    writeStorageData(data);
    setPages(updated);
    setActivePageIdState(newActiveId);
    // Delete from backend if it has a backend id
    if (page?._backendId || page?.id) {
      try { await base44.entities.Page.delete(page._backendId || page.id); } catch {}
    }
    return newActiveId;
  }, []);

  const duplicatePage = useCallback(async (page) => {
    const data = loadStorageData() || {};
    const newPage = {
      ...page,
      id: `page-${Date.now()}`,
      _backendId: null,
      name: `${page.name} (Copy)`,
      slug: `${page.slug}-copy-${Date.now()}`,
      created_date: Date.now(),
      updated_date: Date.now(),
    };
    const updated = [...(data.pages || []), newPage];
    data.pages = updated;
    data.timestamp = Date.now();
    writeStorageData(data);
    setPages(updated);
    if (userId) savePageToBackend(userId, newPage);
    return newPage;
  }, [userId]);

  const changeActivePageId = useCallback((pageId) => {
    const data = loadStorageData() || {};
    data.activePageId = pageId;
    writeStorageData(data);
    setActivePageIdState(pageId);
  }, []);

  return {
    pages,
    activePageId,
    persistPages,
    switchPage,
    addPage,
    updatePageCanvas,
    deletePage,
    duplicatePage,
    changeActivePageId,
  };
}