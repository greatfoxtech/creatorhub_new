import { useState, useEffect, useCallback } from 'react';
import { loadActiveTheme, saveActiveTheme, applyThemeToCSSVars, getThemeById } from './themes';

export default function useTheme() {
  const [activeTheme, setActiveTheme] = useState(() => loadActiveTheme());

  // Apply on mount
  useEffect(() => {
    applyThemeToCSSVars(activeTheme);
  }, [activeTheme]);

  // Listen for external changes (other tabs, other components)
  useEffect(() => {
    const handler = (e) => {
      const theme = getThemeById(e.detail?.themeId);
      if (theme) {
        setActiveTheme(theme);
        applyThemeToCSSVars(theme);
      }
    };
    window.addEventListener('theme-changed', handler);
    return () => window.removeEventListener('theme-changed', handler);
  }, []);

  const applyTheme = useCallback((themeId) => {
    const theme = getThemeById(themeId);
    saveActiveTheme(themeId);
    setActiveTheme(theme);
    applyThemeToCSSVars(theme);
  }, []);

  return { activeTheme, applyTheme };
}