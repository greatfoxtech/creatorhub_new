/**
 * ThemeContext — Global theme provider.
 *
 * STORAGE: localStorage key `socialbuilder-active-theme` stores the theme ID.
 * BACKEND-READY: Replace loadActiveTheme/saveActiveTheme with API calls to a
 * `site_settings` entity (fields: user_id, theme_id, custom_tokens, updated_date)
 * when you want server-side persistence. The context interface stays the same.
 *
 * Schema plan (for future backend):
 * entity SiteSettings {
 *   user_id: string
 *   theme_id: string
 *   custom_colors: object
 *   custom_typography: object
 *   custom_button_style: object
 *   custom_card_style: object
 *   dark_mode: boolean
 *   updated_date: datetime
 * }
 */
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadActiveTheme, saveActiveTheme, applyThemeToCSSVars, getThemeById } from './themes';
import { base44 } from '@/api/base44Client';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [activeTheme, setActiveTheme] = useState(() => loadActiveTheme());

  // Apply CSS vars on mount and whenever theme changes
  useEffect(() => {
    applyThemeToCSSVars(activeTheme);
  }, [activeTheme]);

  // On mount: load theme from backend if available, and keep in sync
  useEffect(() => {
    base44.auth.me()
      .then(user => {
        if (!user) return;
        return base44.entities.ThemeSettings.filter({ user_id: user.id })
          .then(records => {
            const rec = records[0];
            if (rec?.active_theme_id) {
              const theme = getThemeById(rec.active_theme_id);
              saveActiveTheme(theme.id); // keep localStorage in sync
              setActiveTheme(theme);
              applyThemeToCSSVars(theme);
            }
          });
      })
      .catch(() => {}); // silently ignore if not logged in
  }, []);

  // Listen for theme-changed events from other tabs or direct saveActiveTheme calls
  useEffect(() => {
    const handler = (e) => {
      const theme = getThemeById(e.detail?.themeId);
      if (theme && theme.id !== activeTheme.id) {
        setActiveTheme(theme);
      }
    };
    window.addEventListener('theme-changed', handler);
    return () => window.removeEventListener('theme-changed', handler);
  }, [activeTheme.id]);

  const applyTheme = useCallback(async (themeId) => {
    const theme = getThemeById(themeId);
    saveActiveTheme(themeId);   // persists + fires event
    setActiveTheme(theme);
    applyThemeToCSSVars(theme); // immediately update CSS vars
    // Persist to backend
    try {
      const user = await base44.auth.me();
      if (!user) return;
      const records = await base44.entities.ThemeSettings.filter({ user_id: user.id });
      if (records[0]) {
        await base44.entities.ThemeSettings.update(records[0].id, { active_theme_id: themeId });
      } else {
        await base44.entities.ThemeSettings.create({ user_id: user.id, active_theme_id: themeId });
      }
    } catch (err) {
      console.warn('[ThemeContext] backend persist failed:', err);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ activeTheme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useThemeContext must be used inside ThemeProvider');
  return ctx;
}