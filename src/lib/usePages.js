/**
 * usePages — single source of truth for all page data.
 *
 * Persists to localStorage under STORAGE_KEY.
 * Fires a custom window event ("builderv2-pages-updated") on every write
 * so all consumers re-sync even within the same browser tab.
 */

import { useState, useEffect, useCallback } from 'react';

export const STORAGE_KEY = 'builderv2-pages';
const SYNC_EVENT = 'builderv2-pages-updated';

// ─── Raw storage helpers ────────────────────────────────────────────────────

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
  // Notify same-tab listeners (cross-tab is handled by native "storage" event)
  window.dispatchEvent(new CustomEvent(SYNC_EVENT));
};

// ─── Public helpers (usable without the hook) ────────────────────────────────

/** Set the active page id without touching the pages array */
export const setActivePageId = (pageId) => {
  const data = loadStorageData() || {};
  data.activePageId = pageId;
  writeStorageData(data);
};

// ─── Hook ────────────────────────────────────────────────────────────────────

export default function usePages() {
  const [pages, setPages] = useState(() => loadStorageData()?.pages || []);
  const [activePageId, setActivePageIdState] = useState(
    () => loadStorageData()?.activePageId || null
  );

  // Re-read from storage whenever another consumer writes
  const sync = useCallback(() => {
    const data = loadStorageData();
    setPages(data?.pages || []);
    setActivePageIdState(data?.activePageId || null);
  }, []);

  useEffect(() => {
    window.addEventListener(SYNC_EVENT, sync);
    window.addEventListener('storage', sync); // cross-tab
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
    // Save current page canvas before switching
    if (currentPageId && currentElements !== undefined) {
      data.pages = (data.pages || []).map(p =>
        p.id === currentPageId
          ? { ...p, canvasJson: currentElements, updated_date: Date.now() }
          : p
      );
    }
    data.activePageId = pageId;
    data.timestamp = Date.now();
    writeStorageData(data);
    setPages(data.pages || []);
    setActivePageIdState(pageId);
    // Return the new active page's canvas
    const target = (data.pages || []).find(p => p.id === pageId);
    return (target?.canvasJson || []).filter(el => el && el.id && el.type);
  }, []);

  const addPage = useCallback((newPage) => {
    const data = loadStorageData() || {};
    const existing = data.pages || [];
    const updated = [...existing, { ...newPage, created_date: Date.now(), updated_date: Date.now() }];
    data.pages = updated;
    data.activePageId = newPage.id;
    data.timestamp = Date.now();
    writeStorageData(data);
    setPages(updated);
    setActivePageIdState(newPage.id);
  }, []);

  const updatePageCanvas = useCallback((pageId, canvasJson) => {
    const data = loadStorageData() || {};
    data.pages = (data.pages || []).map(p =>
      p.id === pageId ? { ...p, canvasJson, updated_date: Date.now() } : p
    );
    data.timestamp = Date.now();
    writeStorageData(data);
    setPages(data.pages);
  }, []);

  const deletePage = useCallback((pageId) => {
    const data = loadStorageData() || {};
    const updated = (data.pages || []).filter(p => p.id !== pageId);
    let newActiveId = data.activePageId;
    if (newActiveId === pageId) {
      newActiveId = updated[0]?.id || null;
    }
    data.pages = updated;
    data.activePageId = newActiveId;
    data.timestamp = Date.now();
    writeStorageData(data);
    setPages(updated);
    setActivePageIdState(newActiveId);
    return newActiveId;
  }, []);

  const duplicatePage = useCallback((page) => {
    const data = loadStorageData() || {};
    const newPage = {
      ...page,
      id: `page-${Date.now()}`,
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
    return newPage;
  }, []);

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