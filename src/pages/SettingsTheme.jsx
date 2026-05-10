import React, { useState } from 'react';
import { THEMES, getThemeById, applyThemeToCSSVars } from '@/lib/themes';
import { useThemeContext } from '@/lib/ThemeContext';
import ThemePreviewCard from '@/components/theme/ThemePreviewCard';
import ThemeLivePreview from '@/components/theme/ThemeLivePreview';
import LiveCustomizer from '@/components/theme/LiveCustomizer';
import { Check, Eye, Palette, Zap, Type, Layers, Sparkles, ChevronRight } from 'lucide-react';

export default function SettingsThemePage() {
  const { activeTheme, applyTheme } = useThemeContext();
  const [previewThemeId, setPreviewThemeId] = useState(activeTheme.id);
  const [applied, setApplied] = useState(false);
  const [tab, setTab] = useState('themes');

  const previewTheme = getThemeById(previewThemeId);
  const t = previewTheme.tokens;
  const c = t.colors;

  const handleApply = () => {
    applyTheme(previewThemeId);
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  const handleApplyCustom = (customTheme) => {
    // Apply custom tokens immediately to CSS vars (full theme apply)
    applyThemeToCSSVars(customTheme);
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  const handleSetDefault = () => handleApply();

  // Token categories for the token inspector panel
  const tokenSections = [
    {
      label: 'Colors', icon: Palette,
      entries: Object.entries(t.colors).map(([k, v]) => ({ key: k, value: v, type: 'color' })),
    },
    {
      label: 'Typography', icon: Type,
      entries: Object.entries(t.typography).map(([k, v]) => ({ key: k, value: v, type: 'text' })),
    },
    {
      label: 'Border Radius', icon: Layers,
      entries: Object.entries(t.radius).map(([k, v]) => ({ key: k, value: v, type: 'text' })),
    },
    {
      label: 'Shadows', icon: Layers,
      entries: Object.entries(t.shadows).map(([k, v]) => ({ key: k, value: v, type: 'text' })),
    },
    {
      label: 'Spacing', icon: Layers,
      entries: Object.entries(t.spacing).map(([k, v]) => ({ key: k, value: v, type: 'text' })),
    },
    {
      label: 'Animations', icon: Zap,
      entries: Object.entries(t.animations).map(([k, v]) => ({ key: k, value: v, type: 'text' })),
    },
    {
      label: 'Gradients', icon: Sparkles,
      entries: Object.entries(t.gradients).map(([k, v]) => ({ key: k, value: v, type: 'gradient' })),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0D1117', color: '#F0F4FF', fontFamily: 'Inter, sans-serif' }}>
      {/* ── Page Header ── */}
      <div style={{ background: 'linear-gradient(135deg, #1a1035 0%, #0f1929 50%, #0d1117 100%)', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '32px 32px 0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Palette size={18} color="white" />
                </div>
                <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', color: '#F0F4FF', letterSpacing: '-0.02em' }}>Theme & Design</h1>
              </div>
              <p style={{ margin: 0, color: '#8B9CC8', fontSize: '14px' }}>
                Control the global visual design system — colors, typography, spacing, and more — applied across your entire profile and pages.
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0 }}>
              {previewThemeId !== activeTheme.id && (
                <span style={{ fontSize: '12px', color: '#F59E0B', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', padding: '4px 10px', borderRadius: '20px', fontWeight: '600' }}>
                  Unsaved preview
                </span>
              )}
              <button
                onClick={() => setPreviewThemeId(previewThemeId)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: 'rgba(255,255,255,0.05)', color: '#F0F4FF', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                <Eye size={14} /> Preview
              </button>
              <button
                onClick={handleSetDefault}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 16px', background: 'rgba(255,255,255,0.05)', color: '#F0F4FF', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '10px', fontWeight: '600', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}
              >
                Set as Default
              </button>
              <button
                onClick={handleApply}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 20px', background: applied ? '#10B981' : 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 14px rgba(124,58,237,0.4)', transition: 'all 0.25s' }}
              >
                {applied ? <><Check size={14} /> Applied!</> : 'Apply Theme'}
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '2px' }}>
            {[['themes', 'Themes'], ['preview', '✦ Live Customizer'], ['tokens', 'Design Tokens']].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                style={{
                  padding: '10px 20px',
                  background: tab === key ? 'rgba(124,58,237,0.15)' : 'transparent',
                  color: tab === key ? '#F0F4FF' : '#8B9CC8',
                  border: 'none',
                  borderBottom: tab === key ? '2px solid #7C3AED' : '2px solid transparent',
                  borderRadius: '0',
                  fontWeight: tab === key ? '600' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
                  transition: 'all 0.2s',
                }}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Applied Banner ── */}
      {applied && (
        <div style={{ background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: '600', color: '#fff', boxShadow: '0 4px 20px rgba(16,185,129,0.4)' }}>
          <Check size={18} />
          Theme "{previewTheme.name}" applied successfully! The entire app has been updated.
        </div>
      )}

      {/* ── Content Area ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px' }}>

        {/* ── THEMES TAB ── */}
        {tab === 'themes' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            {/* Left: Theme Grid */}
            <div>
              <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '700', color: '#F0F4FF' }}>Available Themes</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {THEMES.map(theme => (
                  <ThemePreviewCard
                    key={theme.id}
                    theme={theme}
                    isActive={previewThemeId === theme.id}
                    isApplied={activeTheme.id === theme.id}
                    onClick={() => setPreviewThemeId(theme.id)}
                  />
                ))}

                {/* Coming Soon cards */}
                {['Neon Glow', 'Warm Earth', 'Ocean Blue'].map(name => (
                  <div key={name} style={{ borderRadius: '16px', overflow: 'hidden', border: '2px dashed rgba(255,255,255,0.08)', opacity: 0.5 }}>
                    <div style={{ height: '140px', background: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '24px' }}>🔒</span>
                    </div>
                    <div style={{ background: '#161B27', padding: '12px 14px' }}>
                      <div style={{ fontWeight: '700', fontSize: '13px', color: '#8B9CC8', marginBottom: '2px' }}>{name}</div>
                      <div style={{ fontSize: '11px', color: '#5A6A8A' }}>Coming soon</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Selected Theme Info */}
            <div>
              <h2 style={{ margin: '0 0 20px', fontSize: '18px', fontWeight: '700', color: '#F0F4FF' }}>Theme Details</h2>
              <ThemeDetailPanel theme={previewTheme} activeThemeId={activeTheme.id} />
            </div>
          </div>
        )}

        {/* ── LIVE PREVIEW TAB ── */}
        {tab === 'preview' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700', color: '#F0F4FF' }}>Live Customizer</h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#8B9CC8' }}>Tweak colors, fonts, and layout — see your profile update in real time before saving.</p>
            </div>
            <LiveCustomizer baseTheme={previewTheme} onApply={handleApplyCustom} />
          </div>
        )}

        {/* ── TOKENS TAB ── */}
        {tab === 'tokens' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '700', color: '#F0F4FF' }}>Design Tokens — {previewTheme.name}</h2>
              <p style={{ margin: 0, fontSize: '13px', color: '#8B9CC8' }}>All design tokens applied as CSS variables when this theme is active. These control colors, spacing, typography, shadows, and more across your entire profile.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {tokenSections.map(section => (
                <TokenSection key={section.label} section={section} c={c} t={t} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────

function ThemeDetailPanel({ theme, activeThemeId }) {
  const t = theme.tokens;
  const c = t.colors;
  const isActive = theme.id === activeThemeId;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div style={{ background: theme.previewGradient, borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800', color: c.text, letterSpacing: '-0.02em' }}>{theme.name}</h3>
          {isActive && <span style={{ background: c.primary, color: '#fff', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' }}>ACTIVE</span>}
          <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', background: 'rgba(255,255,255,0.1)', color: c.textSecondary }}>{theme.category}</span>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: c.textSecondary, lineHeight: '1.6' }}>{theme.description}</p>
      </div>

      {/* Color palette */}
      <div style={{ background: '#161B27', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#5A6A8A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Color Palette</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          {[
            { label: 'Primary', value: c.primary },
            { label: 'Secondary', value: c.secondary },
            { label: 'Background', value: c.background },
            { label: 'Surface', value: c.surface },
            { label: 'Text', value: c.text },
            { label: 'Text 2', value: c.textSecondary },
            { label: 'Border', value: c.border },
            { label: 'Success', value: c.success },
          ].map(col => (
            <div key={col.label} style={{ textAlign: 'center' }}>
              <div style={{ width: '100%', height: '36px', borderRadius: '8px', background: col.value, border: '1px solid rgba(255,255,255,0.1)', marginBottom: '4px' }} />
              <div style={{ fontSize: '10px', color: '#5A6A8A', fontWeight: '500' }}>{col.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography preview */}
      <div style={{ background: '#161B27', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#5A6A8A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Typography</div>
        <div style={{ fontFamily: t.typography.fontFamily }}>
          <div style={{ fontSize: t.typography.fontSize2xl, fontWeight: t.typography.fontWeightBlack, color: c.text, marginBottom: '4px', lineHeight: t.typography.lineHeightTight }}>Heading XL</div>
          <div style={{ fontSize: t.typography.fontSizeLg, fontWeight: t.typography.fontWeightBold, color: c.text, marginBottom: '4px' }}>Heading LG</div>
          <div style={{ fontSize: t.typography.fontSizeBase, color: c.textSecondary, lineHeight: t.typography.lineHeightBase }}>Body text — {t.typography.fontFamily.split(',')[0]}</div>
        </div>
      </div>

      {/* Controls preview row */}
      <div style={{ background: '#161B27', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#5A6A8A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Controls</div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button style={{ background: t.buttons.primary.background, color: '#fff', borderRadius: t.buttons.primary.borderRadius, border: 'none', padding: `${t.buttons.primary.paddingY} ${t.buttons.primary.paddingX}`, fontWeight: t.buttons.primary.fontWeight, fontSize: t.buttons.primary.fontSize, cursor: 'pointer', boxShadow: t.buttons.primary.shadow, fontFamily: 'Inter, sans-serif' }}>Primary</button>
          <button style={{ background: t.buttons.secondary.background, color: c.text, borderRadius: t.buttons.secondary.borderRadius, border: t.buttons.secondary.border, padding: `${t.buttons.secondary.paddingY} ${t.buttons.secondary.paddingX}`, fontWeight: t.buttons.secondary.fontWeight, fontSize: t.buttons.secondary.fontSize, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Secondary</button>
          <button style={{ background: t.buttons.ghost.background, color: c.textSecondary, borderRadius: t.buttons.ghost.borderRadius, border: 'none', padding: `${t.buttons.ghost.paddingY} ${t.buttons.ghost.paddingX}`, fontWeight: t.buttons.ghost.fontWeight, fontSize: t.buttons.ghost.fontSize, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>Ghost</button>
        </div>
        {/* Radius preview */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '12px', alignItems: 'center' }}>
          {[['sm', t.radius.sm], ['md', t.radius.md], ['lg', t.radius.lg], ['full', '20px']].map(([label, r]) => (
            <div key={label} style={{ width: '40px', height: '20px', borderRadius: r, background: c.primary, opacity: 0.7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '8px', color: '#fff', fontWeight: '700' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* What this theme controls */}
      <div style={{ background: '#161B27', borderRadius: '14px', padding: '18px', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', color: '#5A6A8A', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Theme Controls</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {['Colors & Gradients', 'Typography', 'Spacing Scale', 'Border Radius', 'Shadows & Glow', 'Button Styles', 'Card Styles', 'Header Preset', 'Footer Preset', 'Navigation Styles', 'Animation Presets', 'Section Spacing'].map(item => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#8B9CC8' }}>
              <Check size={11} color={c.primary} />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TokenSection({ section, c, t }) {
  const [expanded, setExpanded] = useState(true);
  const Icon = section.icon;

  return (
    <div style={{ background: '#161B27', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
      <button
        onClick={() => setExpanded(x => !x)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', background: 'transparent', border: 'none', cursor: 'pointer', borderBottom: expanded ? '1px solid rgba(255,255,255,0.06)' : 'none' }}
      >
        <Icon size={14} color={c.primary} />
        <span style={{ fontWeight: '700', fontSize: '13px', color: '#F0F4FF', flex: 1, textAlign: 'left' }}>{section.label}</span>
        <span style={{ fontSize: '11px', color: '#5A6A8A' }}>{section.entries.length} tokens</span>
        <ChevronRight size={14} color="#5A6A8A" style={{ transform: expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>

      {expanded && (
        <div style={{ padding: '8px', maxHeight: '280px', overflowY: 'auto' }}>
          {section.entries.map(({ key, value, type }) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 8px', borderRadius: '8px', marginBottom: '2px' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              {type === 'color' && (
                <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: value, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
              )}
              {type === 'gradient' && (
                <div style={{ width: '20px', height: '20px', borderRadius: '6px', background: value, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
              )}
              {type === 'text' && (
                <div style={{ width: '20px', height: '20px', flexShrink: 0 }} />
              )}
              <span style={{ fontSize: '11px', color: '#8B9CC8', fontFamily: 'monospace', flex: 1 }}>{key}</span>
              <span style={{ fontSize: '11px', color: '#5A6A8A', fontFamily: 'monospace', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}