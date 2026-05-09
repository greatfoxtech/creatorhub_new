// Global Theme System — Design Tokens
// Each theme controls typography, colors, spacing, borders, shadows, gradients,
// button styles, card styles, header/footer presets, nav styles, and animation presets.

export const THEMES = [
  {
    id: 'creator-theme-01',
    name: 'Creator Theme 01',
    description: 'Dark premium creator profile. Modern cards, gradient hero, polished social layout.',
    category: 'Dark',
    previewGradient: 'linear-gradient(135deg, #1a1035 0%, #0f1929 50%, #0d1117 100%)',
    accentColor: '#7C3AED',
    tokens: {
      // ── Colors ──────────────────────────────────────────────
      colors: {
        primary:        '#7C3AED',   // Purple accent
        primaryHover:   '#6D28D9',
        primaryLight:   'rgba(124, 58, 237, 0.15)',
        secondary:      '#06B6D4',   // Cyan accent
        secondaryHover: '#0891B2',
        background:     '#0D1117',   // Deep dark
        surface:        '#161B27',   // Card surface
        surfaceHover:   '#1E2535',
        surface2:       '#1A2033',   // Nested surface
        border:         'rgba(255,255,255,0.08)',
        borderStrong:   'rgba(255,255,255,0.15)',
        text:           '#F0F4FF',   // Primary text
        textSecondary:  '#8B9CC8',   // Muted text
        textTertiary:   '#5A6A8A',
        success:        '#10B981',
        warning:        '#F59E0B',
        danger:         '#EF4444',
        white:          '#FFFFFF',
        overlay:        'rgba(13,17,23,0.8)',
      },
      // ── Hero / Gradient ──────────────────────────────────────
      gradients: {
        hero:        'linear-gradient(135deg, #1a1035 0%, #0f1929 50%, #0d1117 100%)',
        heroOverlay: 'linear-gradient(180deg, rgba(13,17,23,0) 0%, rgba(13,17,23,0.9) 100%)',
        primary:     'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
        secondary:   'linear-gradient(135deg, #06B6D4 0%, #0EA5E9 100%)',
        card:        'linear-gradient(145deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.05) 100%)',
        badge:       'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
        cta:         'linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #06B6D4 100%)',
        sidebar:     'linear-gradient(180deg, #161B27 0%, #0D1117 100%)',
      },
      // ── Typography ───────────────────────────────────────────
      typography: {
        fontFamily:       '"Inter", system-ui, -apple-system, sans-serif',
        fontFamilyMono:   '"JetBrains Mono", "Fira Code", monospace',
        fontSizeXs:       '11px',
        fontSizeSm:       '13px',
        fontSizeBase:     '15px',
        fontSizeMd:       '17px',
        fontSizeLg:       '20px',
        fontSizeXl:       '24px',
        fontSize2xl:      '30px',
        fontSize3xl:      '38px',
        fontSize4xl:      '48px',
        fontWeightNormal: '400',
        fontWeightMedium: '500',
        fontWeightSemi:   '600',
        fontWeightBold:   '700',
        fontWeightBlack:  '800',
        lineHeightTight:  '1.2',
        lineHeightBase:   '1.6',
        lineHeightRelaxed:'1.8',
        letterSpacingTight: '-0.02em',
        letterSpacingNormal: '0',
        letterSpacingWide:  '0.05em',
      },
      // ── Spacing ──────────────────────────────────────────────
      spacing: {
        xs:   '4px',
        sm:   '8px',
        md:   '16px',
        lg:   '24px',
        xl:   '32px',
        '2xl':'48px',
        '3xl':'64px',
        '4xl':'96px',
      },
      // ── Border Radius ────────────────────────────────────────
      radius: {
        none:   '0px',
        sm:     '6px',
        md:     '10px',
        lg:     '14px',
        xl:     '20px',
        '2xl':  '28px',
        full:   '9999px',
        card:   '16px',
        button: '10px',
        avatar: '9999px',
        badge:  '6px',
        input:  '10px',
      },
      // ── Shadows ──────────────────────────────────────────────
      shadows: {
        sm:     '0 1px 3px rgba(0,0,0,0.3)',
        md:     '0 4px 16px rgba(0,0,0,0.4)',
        lg:     '0 8px 32px rgba(0,0,0,0.5)',
        xl:     '0 16px 48px rgba(0,0,0,0.6)',
        glow:   '0 0 24px rgba(124,58,237,0.4)',
        glowCyan:'0 0 20px rgba(6,182,212,0.3)',
        card:   '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset',
        button: '0 4px 14px rgba(124,58,237,0.4)',
        buttonHover: '0 6px 20px rgba(124,58,237,0.5)',
        none:   'none',
      },
      // ── Buttons ──────────────────────────────────────────────
      buttons: {
        primary: {
          background:   'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)',
          color:        '#FFFFFF',
          borderRadius: '10px',
          fontWeight:   '600',
          fontSize:     '14px',
          paddingX:     '20px',
          paddingY:     '10px',
          shadow:       '0 4px 14px rgba(124,58,237,0.4)',
          hoverShadow:  '0 6px 20px rgba(124,58,237,0.5)',
          border:       'none',
        },
        secondary: {
          background:   'transparent',
          color:        '#F0F4FF',
          borderRadius: '10px',
          fontWeight:   '600',
          fontSize:     '14px',
          paddingX:     '20px',
          paddingY:     '10px',
          border:       '1px solid rgba(255,255,255,0.15)',
          shadow:       'none',
        },
        ghost: {
          background:   'rgba(255,255,255,0.05)',
          color:        '#8B9CC8',
          borderRadius: '10px',
          fontWeight:   '500',
          fontSize:     '14px',
          paddingX:     '16px',
          paddingY:     '8px',
          border:       'none',
          shadow:       'none',
        },
        follow: {
          background:   'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
          color:        '#FFFFFF',
          borderRadius: '10px',
          fontWeight:   '700',
          fontSize:     '14px',
        },
      },
      // ── Cards ────────────────────────────────────────────────
      cards: {
        background:   '#161B27',
        border:       '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding:      '20px',
        shadow:       '0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset',
        hoverShadow:  '0 8px 32px rgba(0,0,0,0.5)',
        hoverBorder:  '1px solid rgba(124,58,237,0.3)',
        hoverTranslate: 'translateY(-2px)',
        accentBar:    '3px solid linear-gradient(135deg, #7C3AED, #06B6D4)',
      },
      // ── Header Preset ────────────────────────────────────────
      header: {
        background:     'rgba(13,17,23,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom:   '1px solid rgba(255,255,255,0.08)',
        height:         '64px',
        logoColor:      '#FFFFFF',
        logoFontWeight: '700',
        navTextColor:   '#8B9CC8',
        navActiveColor: '#F0F4FF',
        navHoverColor:  '#F0F4FF',
        navFontWeight:  '500',
        sticky:         true,
        shadow:         '0 4px 24px rgba(0,0,0,0.4)',
      },
      // ── Footer Preset ────────────────────────────────────────
      footer: {
        background:    '#0A0D14',
        borderTop:     '1px solid rgba(255,255,255,0.08)',
        textColor:     '#5A6A8A',
        linkColor:     '#8B9CC8',
        linkHoverColor:'#F0F4FF',
        headingColor:  '#F0F4FF',
        padding:       '48px',
      },
      // ── Navigation / Submenu ─────────────────────────────────
      nav: {
        tabBackground:       'transparent',
        tabBorderRadius:     '8px',
        tabPaddingX:         '16px',
        tabPaddingY:         '8px',
        tabTextColor:        '#8B9CC8',
        tabActiveTextColor:  '#F0F4FF',
        tabActiveBg:         'rgba(124,58,237,0.15)',
        tabActiveBorder:     '2px solid #7C3AED',
        tabHoverBg:          'rgba(255,255,255,0.05)',
        tabFontWeight:       '500',
        tabFontSize:         '14px',
        submenuBg:           '#1E2535',
        submenuBorder:       '1px solid rgba(255,255,255,0.08)',
        submenuBorderRadius: '12px',
        submenuShadow:       '0 8px 32px rgba(0,0,0,0.4)',
      },
      // ── Section Spacing ──────────────────────────────────────
      sections: {
        paddingY:    '64px',
        paddingX:    '24px',
        maxWidth:    '1200px',
        gap:         '32px',
        headingGap:  '48px',
      },
      // ── Animation Presets ────────────────────────────────────
      animations: {
        durationFast:   '150ms',
        durationBase:   '250ms',
        durationSlow:   '400ms',
        easingDefault:  'cubic-bezier(0.4, 0, 0.2, 1)',
        easingBounce:   'cubic-bezier(0.34, 1.56, 0.64, 1)',
        easingSmooth:   'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        hoverScale:     '1.02',
        tapScale:       '0.97',
        fadeInDuration: '400ms',
        slideUpOffset:  '16px',
      },
    },
  },
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    description: 'Clean, airy layout with subtle accents. Great for portfolios and consultants.',
    category: 'Light',
    previewGradient: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    accentColor: '#3B82F6',
    tokens: {
      colors: {
        primary:        '#3B82F6',
        primaryHover:   '#2563EB',
        primaryLight:   'rgba(59,130,246,0.1)',
        secondary:      '#10B981',
        secondaryHover: '#059669',
        background:     '#FFFFFF',
        surface:        '#F8FAFC',
        surfaceHover:   '#F1F5F9',
        surface2:       '#E2E8F0',
        border:         '#E2E8F0',
        borderStrong:   '#CBD5E1',
        text:           '#0F172A',
        textSecondary:  '#475569',
        textTertiary:   '#94A3B8',
        success:        '#10B981',
        warning:        '#F59E0B',
        danger:         '#EF4444',
        white:          '#FFFFFF',
        overlay:        'rgba(255,255,255,0.8)',
      },
      gradients: {
        hero:        'linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)',
        heroOverlay: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 100%)',
        primary:     'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
        secondary:   'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        card:        'linear-gradient(145deg, rgba(59,130,246,0.05) 0%, rgba(16,185,129,0.03) 100%)',
        badge:       'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
        cta:         'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)',
        sidebar:     'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
      },
      typography: {
        fontFamily:       '"Inter", system-ui, -apple-system, sans-serif',
        fontFamilyMono:   '"JetBrains Mono", monospace',
        fontSizeXs:       '11px', fontSizeSm: '13px', fontSizeBase: '15px',
        fontSizeMd:       '17px', fontSizeLg: '20px', fontSizeXl: '24px',
        fontSize2xl:      '30px', fontSize3xl: '38px', fontSize4xl: '48px',
        fontWeightNormal: '400', fontWeightMedium: '500', fontWeightSemi: '600',
        fontWeightBold:   '700', fontWeightBlack: '800',
        lineHeightTight: '1.2', lineHeightBase: '1.6', lineHeightRelaxed: '1.8',
        letterSpacingTight: '-0.02em', letterSpacingNormal: '0', letterSpacingWide: '0.05em',
      },
      spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px', '4xl': '96px' },
      radius: { none: '0px', sm: '4px', md: '8px', lg: '12px', xl: '16px', '2xl': '24px', full: '9999px', card: '12px', button: '8px', avatar: '9999px', badge: '4px', input: '8px' },
      shadows: {
        sm: '0 1px 2px rgba(0,0,0,0.06)', md: '0 4px 12px rgba(0,0,0,0.08)',
        lg: '0 8px 24px rgba(0,0,0,0.1)', xl: '0 16px 40px rgba(0,0,0,0.12)',
        glow: '0 0 20px rgba(59,130,246,0.2)', glowCyan: '0 0 16px rgba(16,185,129,0.2)',
        card: '0 2px 12px rgba(0,0,0,0.08)', button: '0 2px 8px rgba(59,130,246,0.2)',
        buttonHover: '0 4px 14px rgba(59,130,246,0.3)', none: 'none',
      },
      buttons: {
        primary: { background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)', color: '#FFFFFF', borderRadius: '8px', fontWeight: '600', fontSize: '14px', paddingX: '20px', paddingY: '10px', shadow: '0 2px 8px rgba(59,130,246,0.3)', border: 'none' },
        secondary: { background: 'transparent', color: '#0F172A', borderRadius: '8px', fontWeight: '600', fontSize: '14px', paddingX: '20px', paddingY: '10px', border: '1px solid #E2E8F0', shadow: 'none' },
        ghost: { background: '#F8FAFC', color: '#475569', borderRadius: '8px', fontWeight: '500', fontSize: '14px', paddingX: '16px', paddingY: '8px', border: 'none', shadow: 'none' },
        follow: { background: 'linear-gradient(135deg, #3B82F6 0%, #10B981 100%)', color: '#FFFFFF', borderRadius: '8px', fontWeight: '700', fontSize: '14px' },
      },
      cards: { background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', shadow: '0 2px 12px rgba(0,0,0,0.08)', hoverShadow: '0 8px 24px rgba(0,0,0,0.12)', hoverBorder: '1px solid #3B82F6', hoverTranslate: 'translateY(-2px)', accentBar: '3px solid #3B82F6' },
      header: { background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid #E2E8F0', height: '64px', logoColor: '#0F172A', logoFontWeight: '700', navTextColor: '#475569', navActiveColor: '#0F172A', navHoverColor: '#0F172A', navFontWeight: '500', sticky: true, shadow: '0 2px 8px rgba(0,0,0,0.06)' },
      footer: { background: '#F8FAFC', borderTop: '1px solid #E2E8F0', textColor: '#94A3B8', linkColor: '#475569', linkHoverColor: '#0F172A', headingColor: '#0F172A', padding: '48px' },
      nav: { tabBackground: 'transparent', tabBorderRadius: '8px', tabPaddingX: '16px', tabPaddingY: '8px', tabTextColor: '#475569', tabActiveTextColor: '#0F172A', tabActiveBg: 'rgba(59,130,246,0.1)', tabActiveBorder: '2px solid #3B82F6', tabHoverBg: '#F8FAFC', tabFontWeight: '500', tabFontSize: '14px', submenuBg: '#FFFFFF', submenuBorder: '1px solid #E2E8F0', submenuBorderRadius: '12px', submenuShadow: '0 8px 24px rgba(0,0,0,0.1)' },
      sections: { paddingY: '64px', paddingX: '24px', maxWidth: '1200px', gap: '32px', headingGap: '48px' },
      animations: { durationFast: '150ms', durationBase: '250ms', durationSlow: '400ms', easingDefault: 'cubic-bezier(0.4, 0, 0.2, 1)', easingBounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)', easingSmooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', hoverScale: '1.02', tapScale: '0.97', fadeInDuration: '400ms', slideUpOffset: '16px' },
    },
  },
];

export const DEFAULT_THEME_ID = 'creator-theme-01';

export function getThemeById(id) {
  return THEMES.find(t => t.id === id) || THEMES[0];
}

export const THEME_STORAGE_KEY = 'socialbuilder-active-theme';

export function loadActiveTheme() {
  try {
    const id = localStorage.getItem(THEME_STORAGE_KEY);
    return getThemeById(id || DEFAULT_THEME_ID);
  } catch {
    return THEMES[0];
  }
}

export function saveActiveTheme(themeId) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, themeId);
    // Dispatch event so other components can react
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { themeId } }));
  } catch {}
}

// Apply a theme's tokens as CSS variables on :root
export function applyThemeToCSSVars(theme) {
  const root = document.documentElement;
  const t = theme.tokens;

  // Colors
  Object.entries(t.colors).forEach(([key, value]) => {
    root.style.setProperty(`--theme-color-${key}`, value);
  });
  // Gradients
  Object.entries(t.gradients).forEach(([key, value]) => {
    root.style.setProperty(`--theme-gradient-${key}`, value);
  });
  // Radius
  Object.entries(t.radius).forEach(([key, value]) => {
    root.style.setProperty(`--theme-radius-${key}`, value);
  });
  // Shadows
  Object.entries(t.shadows).forEach(([key, value]) => {
    root.style.setProperty(`--theme-shadow-${key}`, value);
  });
  // Spacing
  Object.entries(t.spacing).forEach(([key, value]) => {
    root.style.setProperty(`--theme-spacing-${key}`, value);
  });
  // Typography
  root.style.setProperty('--theme-font-family', t.typography.fontFamily);
  root.style.setProperty('--theme-font-size-base', t.typography.fontSizeBase);
  // Animations
  root.style.setProperty('--theme-duration-base', t.animations.durationBase);
  root.style.setProperty('--theme-easing', t.animations.easingDefault);

  // Store active theme id on root for CSS targeting
  root.setAttribute('data-theme', theme.id);
}