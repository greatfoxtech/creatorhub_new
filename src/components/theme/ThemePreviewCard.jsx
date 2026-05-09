import React from 'react';

// Mini visual thumbnail for a theme
export default function ThemePreviewCard({ theme, isActive, onClick }) {
  const t = theme.tokens;
  const c = t.colors;
  const g = t.gradients;

  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 group"
      style={{
        border: isActive
          ? `2px solid ${c.primary}`
          : `2px solid ${c.border}`,
        boxShadow: isActive ? `0 0 0 4px ${c.primaryLight}, ${t.shadows.lg}` : t.shadows.md,
        transform: 'scale(1)',
      }}
    >
      {/* Thumbnail */}
      <div style={{ background: theme.previewGradient, height: '140px', position: 'relative', overflow: 'hidden' }}>
        {/* Fake header */}
        <div style={{ height: '28px', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '6px' }}>
          <div style={{ width: '40px', height: '8px', borderRadius: '4px', background: c.text, opacity: 0.9 }} />
          <div style={{ flex: 1 }} />
          <div style={{ width: '24px', height: '6px', borderRadius: '3px', background: c.primary, opacity: 0.8 }} />
          <div style={{ width: '24px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.3)' }} />
        </div>

        {/* Fake hero */}
        <div style={{ padding: '8px 10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: c.primary, flexShrink: 0 }} />
          <div>
            <div style={{ width: '60px', height: '7px', borderRadius: '3px', background: c.text, opacity: 0.9, marginBottom: '4px' }} />
            <div style={{ width: '40px', height: '5px', borderRadius: '3px', background: c.textSecondary, opacity: 0.6 }} />
          </div>
        </div>

        {/* Fake cards row */}
        <div style={{ padding: '0 10px', display: 'flex', gap: '6px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ flex: 1, height: '36px', borderRadius: t.radius.md, background: t.cards.background, border: t.cards.border, opacity: 0.9 }} />
          ))}
        </div>

        {/* Active badge */}
        {isActive && (
          <div style={{ position: 'absolute', top: '8px', right: '8px', background: c.primary, color: '#fff', borderRadius: '20px', fontSize: '9px', fontWeight: '700', padding: '2px 8px', letterSpacing: '0.05em' }}>
            ACTIVE
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ background: c.surface, padding: '12px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: c.primary }} />
          <span style={{ fontWeight: '700', fontSize: '13px', color: c.text }}>{theme.name}</span>
          <span style={{ marginLeft: 'auto', fontSize: '10px', fontWeight: '600', padding: '2px 7px', borderRadius: '20px', background: c.primaryLight, color: c.primary }}>{theme.category}</span>
        </div>
        <p style={{ fontSize: '11px', color: c.textSecondary, lineHeight: '1.5', margin: 0 }}>{theme.description}</p>
        {/* Color swatches */}
        <div style={{ display: 'flex', gap: '4px', marginTop: '10px' }}>
          {[c.primary, c.secondary, c.surface2, c.border].map((col, i) => (
            <div key={i} style={{ width: '16px', height: '16px', borderRadius: '50%', background: col, border: '1px solid rgba(255,255,255,0.1)' }} />
          ))}
        </div>
      </div>
    </div>
  );
}