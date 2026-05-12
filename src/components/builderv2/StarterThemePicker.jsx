import React, { useState } from 'react';
import { THEMES, STARTER_THEME_IDS } from '@/lib/themes';
import { useThemeContext } from '@/lib/ThemeContext';
import { Check, Palette, ChevronDown } from 'lucide-react';

const starterThemes = THEMES.filter(t => STARTER_THEME_IDS.includes(t.id));

export default function StarterThemePicker({ onThemeApplied }) {
  const { activeTheme, applyTheme } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [applying, setApplying] = useState(null);

  const handleSelect = async (themeId) => {
    if (themeId === activeTheme.id) { setOpen(false); return; }
    setApplying(themeId);
    await applyTheme(themeId);
    setApplying(null);
    setOpen(false);
    if (onThemeApplied) onThemeApplied(themeId);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          padding: '6px 12px',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '8px',
          color: '#E5E7EB',
          fontSize: '12px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
          fontFamily: 'Inter, sans-serif',
        }}
        title="Switch starter theme"
      >
        {/* Active theme swatch */}
        <span style={{
          width: '14px', height: '14px', borderRadius: '50%',
          background: activeTheme?.tokens?.gradients?.primary || activeTheme?.accentColor || '#4368D9',
          flexShrink: 0,
          boxShadow: `0 0 6px ${activeTheme?.accentColor || '#4368D9'}88`,
        }} />
        <Palette size={12} />
        Themes
        <ChevronDown size={12} style={{ opacity: 0.6, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {/* Dropdown panel */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 999 }}
          />
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            zIndex: 1000,
            background: '#141824',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '14px',
            padding: '12px',
            boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            minWidth: '320px',
            fontFamily: 'Inter, sans-serif',
          }}>
            <p style={{ fontSize: '10px', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 10px 4px' }}>
              Starter Themes
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {starterThemes.map(theme => {
                const isActive = theme.id === activeTheme.id;
                const isApplying = applying === theme.id;
                return (
                  <button
                    key={theme.id}
                    onClick={() => handleSelect(theme.id)}
                    disabled={isApplying}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '10px 12px',
                      background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                      border: isActive ? `1px solid ${theme.accentColor}44` : '1px solid transparent',
                      borderRadius: '10px',
                      cursor: isApplying ? 'wait' : 'pointer',
                      transition: 'all 0.15s',
                      textAlign: 'left',
                      width: '100%',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                  >
                    {/* Preview swatch */}
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '8px',
                      background: theme.previewGradient,
                      flexShrink: 0,
                      position: 'relative',
                      overflow: 'hidden',
                      border: `1px solid ${theme.accentColor}44`,
                    }}>
                      {/* Mini accent dot */}
                      <div style={{
                        position: 'absolute', bottom: '6px', right: '6px',
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: theme.accentColor,
                        boxShadow: `0 0 6px ${theme.accentColor}`,
                      }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: '600', color: isActive ? '#FFFFFF' : '#D1D5DB', lineHeight: 1 }}>
                          {theme.name}
                        </span>
                        <span style={{
                          fontSize: '9px', fontWeight: '600', color: theme.accentColor,
                          background: `${theme.accentColor}22`, borderRadius: '4px',
                          padding: '1px 5px', textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>
                          {theme.category}
                        </span>
                      </div>
                      <p style={{ fontSize: '11px', color: '#6B7280', margin: '3px 0 0', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {theme.description}
                      </p>
                    </div>

                    {/* Active checkmark */}
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                      background: isActive ? theme.accentColor : 'transparent',
                      border: isActive ? 'none' : '1px solid rgba(255,255,255,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {isActive && <Check size={11} color="#fff" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <p style={{ fontSize: '10px', color: '#4B5563', margin: '10px 4px 0', lineHeight: 1.4 }}>
              Selecting a theme updates CSS variables instantly. Use "Apply Theme" to paint all canvas elements.
            </p>
          </div>
        </>
      )}
    </div>
  );
}