import React, { useState, useCallback } from 'react';
import { Check, RefreshCw, Palette, Type, Sliders, ChevronDown } from 'lucide-react';
import { THEMES } from '@/lib/themes';
import ProfileMockPreview from './ProfileMockPreview';

const FONT_OPTIONS = [
  { label: 'Inter', value: '"Inter", system-ui, sans-serif' },
  { label: 'Poppins', value: '"Poppins", system-ui, sans-serif' },
  { label: 'Playfair Display', value: '"Playfair Display", Georgia, serif' },
  { label: 'DM Sans', value: '"DM Sans", system-ui, sans-serif' },
  { label: 'Syne', value: '"Syne", system-ui, sans-serif' },
  { label: 'Space Grotesk', value: '"Space Grotesk", system-ui, sans-serif' },
  { label: 'Raleway', value: '"Raleway", system-ui, sans-serif' },
  { label: 'Nunito', value: '"Nunito", system-ui, sans-serif' },
];

const ColorSwatch = ({ label, value, onChange }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
    <label style={{ position: 'relative', flexShrink: 0 }}>
      <input
        type="color"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ position: 'absolute', opacity: 0, width: '32px', height: '32px', cursor: 'pointer' }}
      />
      <div style={{
        width: '32px', height: '32px', borderRadius: '8px', background: value,
        border: '2px solid rgba(255,255,255,0.15)', cursor: 'pointer',
        boxShadow: `0 0 0 2px rgba(0,0,0,0.3)`
      }} />
    </label>
    <span style={{ fontSize: '12px', color: '#8B9CC8', flex: 1, textTransform: 'capitalize' }}>{label}</span>
    <span style={{ fontSize: '11px', color: '#5A6A8A', fontFamily: 'monospace' }}>{value}</span>
  </div>
);

export default function LiveCustomizer({ baseTheme, onApply }) {
  const [colors, setColors] = useState({ ...baseTheme.tokens.colors });
  const [font, setFont] = useState(baseTheme.tokens.typography.fontFamily);
  const [radius, setRadius] = useState(parseInt(baseTheme.tokens.radius.card) || 16);
  const [activeTab, setActiveTab] = useState('colors');
  const [applied, setApplied] = useState(false);

  const setColor = useCallback((key, val) => {
    setColors(prev => ({ ...prev, [key]: val }));
  }, []);

  const reset = () => {
    setColors({ ...baseTheme.tokens.colors });
    setFont(baseTheme.tokens.typography.fontFamily);
    setRadius(parseInt(baseTheme.tokens.radius.card) || 16);
  };

  const handleApply = () => {
    const customTheme = {
      ...baseTheme,
      tokens: {
        ...baseTheme.tokens,
        colors: { ...colors },
        typography: { ...baseTheme.tokens.typography, fontFamily: font },
        radius: Object.fromEntries(
          Object.entries(baseTheme.tokens.radius).map(([k]) => {
            const base = parseInt(baseTheme.tokens.radius[k]) || 0;
            const delta = radius - (parseInt(baseTheme.tokens.radius.card) || 16);
            return [k, k === 'full' || k === 'avatar' ? '9999px' : `${Math.max(0, base + delta)}px`];
          })
        ),
      }
    };
    onApply(customTheme);
    setApplied(true);
    setTimeout(() => setApplied(false), 2500);
  };

  const customTokens = {
    ...baseTheme.tokens,
    colors: { ...colors },
    typography: { ...baseTheme.tokens.typography, fontFamily: font },
    radius: Object.fromEntries(
      Object.entries(baseTheme.tokens.radius).map(([k]) => {
        const base = parseInt(baseTheme.tokens.radius[k]) || 0;
        const delta = radius - (parseInt(baseTheme.tokens.radius.card) || 16);
        return [k, k === 'full' || k === 'avatar' ? '9999px' : `${Math.max(0, base + delta)}px`];
      })
    ),
  };

  const COLOR_KEYS = [
    ['primary', 'Primary Accent'],
    ['secondary', 'Secondary Accent'],
    ['background', 'Page Background'],
    ['surface', 'Card Surface'],
    ['text', 'Primary Text'],
    ['textSecondary', 'Secondary Text'],
    ['border', 'Border Color'],
    ['success', 'Success Color'],
  ];

  const tabs = [
    { key: 'colors', label: 'Colors', icon: Palette },
    { key: 'typography', label: 'Typography', icon: Type },
    { key: 'layout', label: 'Layout', icon: Sliders },
  ];

  return (
    <div style={{ display: 'flex', gap: '24px', minHeight: '640px' }}>
      {/* Left Panel: Controls */}
      <div style={{ width: '340px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '0', background: '#161B27', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        {/* Panel Header */}
        <div style={{ padding: '16px 18px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: '700', fontSize: '14px', color: '#F0F4FF' }}>Customize</span>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button onClick={reset} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#8B9CC8', fontSize: '11px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
              <RefreshCw size={11} /> Reset
            </button>
            {/* Base theme selector */}
            <select
              value={baseTheme.id}
              onChange={e => {
                const t = THEMES.find(th => th.id === e.target.value);
                if (t) {
                  setColors({ ...t.tokens.colors });
                  setFont(t.tokens.typography.fontFamily);
                  setRadius(parseInt(t.tokens.radius.card) || 16);
                }
              }}
              style={{ padding: '5px 8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#8B9CC8', fontSize: '11px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
            >
              {THEMES.map(t => <option key={t.id} value={t.id} style={{ background: '#161B27' }}>{t.name}</option>)}
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {tabs.map(({ key, label, icon: Icon }) => (
            <button key={key} onClick={() => setActiveTab(key)} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
              padding: '10px 4px', background: 'transparent', border: 'none',
              borderBottom: activeTab === key ? '2px solid #7C3AED' : '2px solid transparent',
              color: activeTab === key ? '#F0F4FF' : '#5A6A8A',
              fontSize: '12px', fontWeight: activeTab === key ? '600' : '500',
              cursor: 'pointer', fontFamily: 'Inter, sans-serif', transition: 'all 0.15s'
            }}>
              <Icon size={12} /> {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px' }}>
          {activeTab === 'colors' && (
            <div>
              <p style={{ margin: '0 0 14px', fontSize: '12px', color: '#5A6A8A' }}>Click a swatch to pick any color. Changes reflect instantly in the preview.</p>
              {COLOR_KEYS.map(([key, label]) => (
                <ColorSwatch
                  key={key}
                  label={label}
                  value={typeof colors[key] === 'string' && colors[key].startsWith('#') ? colors[key] : (baseTheme.tokens.colors[key].startsWith('#') ? baseTheme.tokens.colors[key] : '#7C3AED')}
                  onChange={val => setColor(key, val)}
                />
              ))}
            </div>
          )}

          {activeTab === 'typography' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#5A6A8A' }}>Choose a font family. Changes apply to all text in the preview.</p>
              {FONT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setFont(opt.value)}
                  style={{
                    padding: '12px 14px', background: font === opt.value ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.03)',
                    border: font === opt.value ? '1px solid rgba(124,58,237,0.4)' : '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '10px', cursor: 'pointer', textAlign: 'left', fontFamily: opt.value,
                    color: font === opt.value ? '#F0F4FF' : '#8B9CC8', fontSize: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'all 0.15s'
                  }}
                >
                  <span>{opt.label}</span>
                  {font === opt.value && <Check size={13} color="#7C3AED" />}
                </button>
              ))}
            </div>
          )}

          {activeTab === 'layout' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p style={{ margin: '0 0 4px', fontSize: '12px', color: '#5A6A8A' }}>Adjust corner radius and spacing scale globally.</p>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '12px', color: '#8B9CC8', fontWeight: '600' }}>Corner Radius</span>
                  <span style={{ fontSize: '12px', color: '#F0F4FF', fontFamily: 'monospace' }}>{radius}px</span>
                </div>
                <input
                  type="range" min="0" max="32" step="2" value={radius}
                  onChange={e => setRadius(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#7C3AED' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', gap: '6px' }}>
                  {[0, 4, 8, 16, 24, 32].map(v => (
                    <button key={v} onClick={() => setRadius(v)} style={{
                      flex: 1, height: '28px', borderRadius: `${v}px`,
                      background: radius === v ? '#7C3AED' : 'rgba(255,255,255,0.06)',
                      border: radius === v ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      color: radius === v ? '#fff' : '#5A6A8A', fontSize: '10px',
                      cursor: 'pointer', fontFamily: 'Inter, sans-serif'
                    }}>{v}</button>
                  ))}
                </div>
              </div>

              {/* Radius previews */}
              <div>
                <div style={{ fontSize: '11px', color: '#5A6A8A', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Preview</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ width: '60px', height: '32px', borderRadius: `${radius}px`, background: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '10px', color: '#fff', fontWeight: '700' }}>Button</span>
                  </div>
                  <div style={{ width: '80px', height: '50px', borderRadius: `${Math.max(0, radius - 2)}px`, background: colors.surface, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '9px', color: colors.textSecondary }}>Card</span>
                  </div>
                  <div style={{ padding: '4px 10px', borderRadius: `${radius + 4}px`, background: `${colors.primary}22`, border: `1px solid ${colors.primary}44` }}>
                    <span style={{ fontSize: '10px', color: colors.primary, fontWeight: '600' }}>Badge</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Apply Button */}
        <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={handleApply}
            style={{
              width: '100%', padding: '11px', borderRadius: '10px', border: 'none',
              background: applied ? '#10B981' : 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
              color: '#fff', fontWeight: '700', fontSize: '14px', cursor: 'pointer',
              fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px', transition: 'all 0.25s',
              boxShadow: '0 4px 14px rgba(124,58,237,0.35)'
            }}
          >
            {applied ? <><Check size={15} /> Applied to app!</> : '✦ Apply to App'}
          </button>
        </div>
      </div>

      {/* Right Panel: Live Profile Mock Preview */}
      <div style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
        <ProfileMockPreview tokens={customTokens} font={font} />
      </div>
    </div>
  );
}