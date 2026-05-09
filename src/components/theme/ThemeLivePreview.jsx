import React, { useState } from 'react';

// A rich live preview panel showing how the active theme looks applied to real UI elements
export default function ThemeLivePreview({ theme }) {
  const t = theme.tokens;
  const c = t.colors;
  const g = t.gradients;
  const [activeTab, setActiveTab] = useState('Posts');
  const tabs = ['Posts', 'About', 'Reels', 'Store'];

  const cardStyle = {
    background: t.cards.background,
    border: t.cards.border,
    borderRadius: t.cards.borderRadius,
    padding: t.cards.padding,
    boxShadow: t.cards.shadow,
  };

  const btnPrimary = {
    background: t.buttons.primary.background,
    color: t.buttons.primary.color,
    borderRadius: t.buttons.primary.borderRadius,
    fontWeight: t.buttons.primary.fontWeight,
    fontSize: t.buttons.primary.fontSize,
    padding: `${t.buttons.primary.paddingY} ${t.buttons.primary.paddingX}`,
    border: t.buttons.primary.border || 'none',
    boxShadow: t.buttons.primary.shadow,
    cursor: 'pointer',
    fontFamily: t.typography.fontFamily,
  };

  const btnSecondary = {
    background: t.buttons.secondary.background,
    color: t.buttons.secondary.color,
    borderRadius: t.buttons.secondary.borderRadius,
    fontWeight: t.buttons.secondary.fontWeight,
    fontSize: t.buttons.secondary.fontSize,
    padding: `${t.buttons.secondary.paddingY} ${t.buttons.secondary.paddingX}`,
    border: t.buttons.secondary.border,
    cursor: 'pointer',
    fontFamily: t.typography.fontFamily,
  };

  return (
    <div style={{ background: c.background, borderRadius: '20px', overflow: 'hidden', fontFamily: t.typography.fontFamily, border: `1px solid ${c.border}` }}>
      {/* ── Fake Navigation Header ── */}
      <div style={{ background: t.header.background, backdropFilter: t.header.backdropFilter, borderBottom: t.header.borderBottom, height: t.header.height, display: 'flex', alignItems: 'center', padding: '0 24px', gap: '16px', boxShadow: t.header.shadow }}>
        <span style={{ fontWeight: t.header.logoFontWeight, color: t.header.logoColor, fontSize: '16px', letterSpacing: '-0.02em' }}>CreatorHub</span>
        <nav style={{ display: 'flex', gap: '4px', marginLeft: '24px' }}>
          {['Dashboard', 'Explore', 'Reels', 'Profile'].map((item, i) => (
            <button key={item} style={{ background: i === 3 ? t.nav.tabActiveBg : 'transparent', color: i === 3 ? t.nav.tabActiveTextColor : t.nav.tabTextColor, padding: `${t.nav.tabPaddingY} ${t.nav.tabPaddingX}`, borderRadius: t.nav.tabBorderRadius, border: 'none', fontWeight: t.nav.tabFontWeight, fontSize: t.nav.tabFontSize, cursor: 'pointer', fontFamily: t.typography.fontFamily }}>
              {item}
            </button>
          ))}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
          <button style={btnSecondary}>Sign In</button>
          <button style={btnPrimary}>Get Started</button>
        </div>
      </div>

      {/* ── Hero / Profile Header ── */}
      <div style={{ background: g.hero, padding: '32px 24px 24px', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
          {/* Avatar */}
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: g.primary, border: `3px solid ${c.primary}`, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.shadows.glow, fontSize: '28px' }}>
            🎨
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <h2 style={{ margin: 0, fontSize: t.typography.fontSizeXl, fontWeight: t.typography.fontWeightBold, color: c.text, letterSpacing: t.typography.letterSpacingTight }}>Alex Rivera</h2>
              <span style={{ background: g.badge, color: '#fff', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: t.radius.full, letterSpacing: t.typography.letterSpacingWide }}>PRO</span>
            </div>
            <p style={{ margin: 0, fontSize: t.typography.fontSizeSm, color: c.textSecondary }}>Digital Creator & UI/UX Designer · San Francisco, CA</p>
            {/* Stats */}
            <div style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
              {[['2.4K', 'Following'], ['12.5K', 'Followers'], ['188', 'Posts']].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontWeight: t.typography.fontWeightBold, color: c.text, fontSize: t.typography.fontSizeMd }}>{num}</div>
                  <div style={{ fontSize: t.typography.fontSizeXs, color: c.textSecondary }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={btnPrimary}>✚ Follow</button>
            <button style={btnSecondary}>Message</button>
          </div>
        </div>

        {/* Submenu tabs */}
        <div style={{ display: 'flex', gap: '4px', marginTop: '20px', borderTop: `1px solid ${c.border}`, paddingTop: '16px' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? t.nav.tabActiveBg : 'transparent',
                color: activeTab === tab ? t.nav.tabActiveTextColor : t.nav.tabTextColor,
                padding: `${t.nav.tabPaddingY} ${t.nav.tabPaddingX}`,
                borderRadius: t.nav.tabBorderRadius,
                border: 'none',
                borderBottom: activeTab === tab ? t.nav.tabActiveBorder : '2px solid transparent',
                fontWeight: t.nav.tabFontWeight,
                fontSize: t.nav.tabFontSize,
                cursor: 'pointer',
                fontFamily: t.typography.fontFamily,
                transition: `all ${t.animations.durationBase} ${t.animations.easingDefault}`,
              }}
            >{tab}</button>
          ))}
        </div>
      </div>

      {/* ── Content Section: Cards ── */}
      <div style={{ padding: '24px', background: c.background }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, fontSize: t.typography.fontSizeLg, fontWeight: t.typography.fontWeightBold, color: c.text }}>Featured Work</h3>
          <span style={{ fontSize: t.typography.fontSizeSm, color: c.primary, cursor: 'pointer', fontWeight: t.typography.fontWeightMedium }}>View All →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          {[
            { emoji: '🎨', title: 'Brand Identity', views: '2.1K' },
            { emoji: '📱', title: 'Mobile App UI', views: '1.8K' },
            { emoji: '🎬', title: 'Motion Reel', views: '3.4K' },
          ].map((item) => (
            <div key={item.title} style={{ ...cardStyle, cursor: 'pointer', transition: `all ${t.animations.durationBase} ${t.animations.easingDefault}` }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = t.cards.hoverShadow; e.currentTarget.style.transform = t.cards.hoverTranslate; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = t.cards.shadow; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{item.emoji}</div>
              <div style={{ fontWeight: t.typography.fontWeightSemi, color: c.text, fontSize: t.typography.fontSizeBase, marginBottom: '4px' }}>{item.title}</div>
              <div style={{ fontSize: t.typography.fontSizeXs, color: c.textTertiary }}>👁 {item.views} views</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Buttons Showcase ── */}
      <div style={{ padding: '0 24px 24px', background: c.background }}>
        <div style={{ ...cardStyle, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ margin: 0, fontSize: t.typography.fontSizeBase, fontWeight: t.typography.fontWeightSemi, color: c.textSecondary, textTransform: 'uppercase', letterSpacing: t.typography.letterSpacingWide, fontSize: t.typography.fontSizeXs }}>Button Styles</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button style={btnPrimary}>Primary Action</button>
            <button style={btnSecondary}>Secondary</button>
            <button style={{ ...btnPrimary, background: g.secondary, boxShadow: t.shadows.glowCyan }}>Cyan Accent</button>
            <button style={{ background: t.buttons.ghost.background, color: t.buttons.ghost.color, borderRadius: t.buttons.ghost.borderRadius, fontWeight: t.buttons.ghost.fontWeight, fontSize: t.buttons.ghost.fontSize, padding: `${t.buttons.ghost.paddingY} ${t.buttons.ghost.paddingX}`, border: t.buttons.ghost.border || 'none', cursor: 'pointer', fontFamily: t.typography.fontFamily }}>Ghost</button>
          </div>
        </div>
      </div>

      {/* ── Typography Showcase ── */}
      <div style={{ padding: '0 24px 24px', background: c.background }}>
        <div style={{ ...cardStyle }}>
          <h4 style={{ margin: '0 0 12px', fontSize: t.typography.fontSizeXs, fontWeight: t.typography.fontWeightSemi, color: c.textSecondary, textTransform: 'uppercase', letterSpacing: t.typography.letterSpacingWide }}>Typography Scale</h4>
          <div style={{ fontFamily: t.typography.fontFamily }}>
            <div style={{ fontSize: t.typography.fontSize3xl, fontWeight: t.typography.fontWeightBlack, color: c.text, lineHeight: t.typography.lineHeightTight, marginBottom: '4px' }}>Display Heading</div>
            <div style={{ fontSize: t.typography.fontSizeXl, fontWeight: t.typography.fontWeightBold, color: c.text, marginBottom: '4px' }}>Section Title</div>
            <div style={{ fontSize: t.typography.fontSizeBase, color: c.textSecondary, lineHeight: t.typography.lineHeightBase, marginBottom: '4px' }}>Body text looks great with the Inter typeface and relaxed line height for comfortable reading across all devices.</div>
            <div style={{ fontSize: t.typography.fontSizeXs, color: c.textTertiary, letterSpacing: t.typography.letterSpacingWide, textTransform: 'uppercase', fontWeight: t.typography.fontWeightSemi }}>Caption / Label Text</div>
          </div>
        </div>
      </div>

      {/* ── Footer preview ── */}
      <div style={{ background: t.footer.background, borderTop: t.footer.borderTop, padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: '700', color: t.footer.headingColor, fontSize: t.typography.fontSizeMd }}>CreatorHub</span>
        <div style={{ display: 'flex', gap: '16px' }}>
          {['About', 'Privacy', 'Terms', 'Contact'].map(link => (
            <span key={link} style={{ fontSize: t.typography.fontSizeXs, color: t.footer.linkColor, cursor: 'pointer' }}>{link}</span>
          ))}
        </div>
        <span style={{ fontSize: t.typography.fontSizeXs, color: t.footer.textColor }}>© 2025 CreatorHub</span>
      </div>
    </div>
  );
}