import React, { useState } from 'react';
import {
  LayoutDashboard, FileText, Film, ShoppingBag, Users, MessageSquare,
  Bell, Search, Heart, MessageCircle, Share2, Play, BarChart2,
  TrendingUp, Settings, Palette, X, Monitor, Smartphone, Tablet,
  UserPlus, Home, Star, Bookmark
} from 'lucide-react';

export default function ThemeFullPreviewModal({ open, onClose, theme }) {
  const [device, setDevice] = useState('desktop');
  if (!open || !theme) return null;

  const t = theme.tokens;
  const c = t.colors;
  const r = t.radius;
  const ff = t.typography.fontFamily;

  const frameWidths = { desktop: '100%', tablet: '768px', mobile: '390px' };
  const frameWidth = frameWidths[device];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Modal Toolbar */}
      <div style={{
        flexShrink: 0, height: '56px',
        background: '#0D1117', borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px', fontFamily: 'Inter, sans-serif',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <span style={{ fontWeight: '700', fontSize: '15px', color: '#F0F4FF' }}>
            Theme Preview — <span style={{ color: c.primary }}>{theme.name}</span>
          </span>
          <span style={{ fontSize: '11px', padding: '3px 10px', borderRadius: '20px', background: `${c.primary}22`, color: c.primary, fontWeight: '600' }}>
            {theme.category}
          </span>
        </div>

        {/* Device switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '4px', borderRadius: '10px' }}>
          {[
            { key: 'desktop', Icon: Monitor },
            { key: 'tablet', Icon: Tablet },
            { key: 'mobile', Icon: Smartphone },
          ].map(({ key, Icon }) => (
            <button key={key} onClick={() => setDevice(key)} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '28px', borderRadius: '7px', border: 'none', cursor: 'pointer',
              background: device === key ? c.primary : 'transparent',
              color: device === key ? '#fff' : '#8B9CC8', transition: 'all 0.15s',
            }}>
              <Icon size={14} />
            </button>
          ))}
        </div>

        <button onClick={onClose} style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          padding: '7px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.12)',
          background: 'transparent', color: '#F0F4FF', cursor: 'pointer',
          fontFamily: 'Inter, sans-serif', fontSize: '13px', fontWeight: '600',
        }}>
          <X size={14} /> Close Preview
        </button>
      </div>

      {/* Scrollable preview area */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', justifyContent: 'center', padding: '24px', background: '#111' }}>
        <div style={{
          width: frameWidth, maxWidth: '100%',
          borderRadius: device === 'desktop' ? '12px' : '24px',
          overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.1)',
          flexShrink: 0,
          display: 'flex', flexDirection: 'column',
          background: c.background,
          fontFamily: ff,
          transition: 'width 0.3s ease',
        }}>
          <MockApp c={c} r={r} t={t} ff={ff} compact={device !== 'desktop'} />
        </div>
      </div>
    </div>
  );
}

function MockApp({ c, r, t, ff, compact }) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: FileText, label: 'Pages' },
    { icon: Film, label: 'Content' },
    { icon: ShoppingBag, label: 'Products' },
    { icon: Users, label: 'Followers' },
    { icon: BarChart2, label: 'Analytics' },
    { icon: Palette, label: 'Theme', active: true },
    { icon: Settings, label: 'Settings' },
  ];

  const posts = [
    { emoji: '🌅', likes: 842, comments: 37 },
    { emoji: '📸', likes: 1203, comments: 64 },
    { emoji: '🎬', likes: 5432, comments: 128, reel: true },
    { emoji: '✨', likes: 389, comments: 22 },
    { emoji: '🎨', likes: 672, comments: 41 },
    { emoji: '🎥', likes: 2100, comments: 93, reel: true },
  ];

  const stats = [
    { label: 'Followers', value: '12.4K', delta: '+8.2%' },
    { label: 'Posts', value: '284', delta: '+12' },
    { label: 'Revenue', value: '$3,280', delta: '+24.1%' },
    { label: 'Engagement', value: '6.8%', delta: '+1.2%' },
  ];

  return (
    <div style={{ display: 'flex', height: compact ? 'auto' : '800px', minHeight: '700px', background: c.background, fontFamily: ff }}>
      {/* Sidebar (hidden on mobile) */}
      {!compact && (
        <div style={{ width: '220px', flexShrink: 0, background: c.surface, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', padding: '16px 10px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', padding: '4px 8px' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: r.sm, background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star size={14} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontWeight: '800', fontSize: '14px', color: c.text, letterSpacing: '-0.02em' }}>SocialBuilder</span>
          </div>

          {/* Nav items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {navItems.map(({ icon: Icon, label, active }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 10px', borderRadius: r.sm,
                background: active ? `${c.primary}22` : 'transparent',
                color: active ? c.primary : c.textSecondary,
                fontSize: '12px', fontWeight: active ? '700' : '500', cursor: 'pointer',
              }}>
                <Icon size={14} />
                {label}
              </div>
            ))}
          </div>

          {/* Upgrade banner */}
          <div style={{ marginTop: 'auto', borderRadius: r.md, background: `linear-gradient(135deg, ${c.primary}33, ${c.secondary}22)`, padding: '14px', border: `1px solid ${c.primary}33` }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: c.text, marginBottom: '4px' }}>Upgrade to Pro</div>
            <div style={{ fontSize: '10px', color: c.textSecondary, marginBottom: '10px' }}>Unlock all features</div>
            <button style={{ width: '100%', padding: '6px', borderRadius: r.sm, background: c.primary, color: '#fff', border: 'none', fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: ff }}>
              Upgrade Now
            </button>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top header bar */}
        <div style={{ flexShrink: 0, height: '52px', background: c.surface, borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: `${c.border}55`, borderRadius: r.sm, padding: '6px 12px', flex: compact ? 1 : undefined, maxWidth: compact ? undefined : '260px' }}>
            <Search size={13} color={c.textSecondary} />
            <span style={{ fontSize: '12px', color: c.textSecondary }}>Search...</span>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Bell size={16} color={c.textSecondary} />
            <MessageSquare size={16} color={c.textSecondary} />
            <div style={{ width: '30px', height: '30px', borderRadius: r.full, background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>🧑</div>
          </div>
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: compact ? '12px' : '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Greeting */}
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: compact ? '16px' : '20px', fontWeight: '800', color: c.text, letterSpacing: '-0.02em' }}>Welcome back 👋</h2>
            <p style={{ margin: 0, fontSize: '12px', color: c.textSecondary }}>Here's what's happening with your profile today.</p>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: compact ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '12px' }}>
            {stats.map(({ label, value, delta }) => (
              <div key={label} style={{ background: c.surface, borderRadius: r.card, border: `1px solid ${c.border}`, padding: '14px 16px', boxShadow: t.shadows?.card || 'none' }}>
                <div style={{ fontSize: '11px', color: c.textSecondary, fontWeight: '600', marginBottom: '6px' }}>{label}</div>
                <div style={{ fontSize: compact ? '18px' : '22px', fontWeight: '800', color: c.text, marginBottom: '4px', letterSpacing: '-0.02em' }}>{value}</div>
                <div style={{ fontSize: '11px', color: c.success, fontWeight: '600' }}>{delta} this week</div>
              </div>
            ))}
          </div>

          {/* Profile header card */}
          <div style={{ background: c.surface, borderRadius: r.card, border: `1px solid ${c.border}`, overflow: 'hidden', boxShadow: t.shadows?.card || 'none' }}>
            <div style={{ height: '80px', background: `linear-gradient(135deg, ${c.primary}55, ${c.secondary}33)`, position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', opacity: 0.3 }}>✦ ✦ ✦</div>
            </div>
            <div style={{ padding: '0 16px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '-24px', marginBottom: '8px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: r.full, background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`, border: `3px solid ${c.surface}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🧑</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button style={{ padding: '6px 14px', borderRadius: r.button || r.md, background: 'transparent', border: `1px solid ${c.border}`, color: c.textSecondary, fontSize: '11px', fontWeight: '600', cursor: 'pointer', fontFamily: ff }}>
                    Edit Profile
                  </button>
                  <button style={{ padding: '6px 14px', borderRadius: r.button || r.md, background: t.buttons?.primary?.background || c.primary, color: '#fff', border: 'none', fontSize: '11px', fontWeight: '700', cursor: 'pointer', fontFamily: ff, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <UserPlus size={11} /> Follow
                  </button>
                </div>
              </div>
              <div style={{ fontWeight: '800', fontSize: '15px', color: c.text, marginBottom: '2px' }}>@yourcreator</div>
              <div style={{ fontSize: '12px', color: c.textSecondary, marginBottom: '10px' }}>Digital creator · Designer · Building the future ✦</div>
              <div style={{ display: 'flex', gap: '20px' }}>
                {[['12.4K', 'Followers'], ['891', 'Following'], ['284', 'Posts']].map(([num, lbl]) => (
                  <div key={lbl}>
                    <span style={{ fontWeight: '800', fontSize: '14px', color: c.text }}>{num}</span>
                    <span style={{ fontSize: '11px', color: c.textSecondary, marginLeft: '4px' }}>{lbl}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation tabs (like a sub-menu) */}
          <div style={{ background: c.surface, borderRadius: r.card, border: `1px solid ${c.border}`, display: 'flex', overflow: 'hidden' }}>
            {['Posts', 'Reels', 'Products', 'About'].map((tab, i) => (
              <div key={tab} style={{
                flex: 1, textAlign: 'center', padding: '10px 0',
                borderBottom: i === 0 ? `2px solid ${c.primary}` : '2px solid transparent',
                borderRight: i < 3 ? `1px solid ${c.border}` : 'none',
                color: i === 0 ? c.primary : c.textSecondary,
                fontSize: '12px', fontWeight: i === 0 ? '700' : '500', cursor: 'pointer',
              }}>{tab}</div>
            ))}
          </div>

          {/* Button showcase */}
          <div style={{ background: c.surface, borderRadius: r.card, border: `1px solid ${c.border}`, padding: '16px', boxShadow: t.shadows?.card || 'none' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: c.textSecondary, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Buttons & Controls</div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button style={{ padding: '8px 18px', borderRadius: r.button || r.md, background: t.buttons?.primary?.background || c.primary, color: '#fff', border: 'none', fontSize: '12px', fontWeight: '700', cursor: 'pointer', fontFamily: ff, boxShadow: t.shadows?.button || 'none' }}>Primary</button>
              <button style={{ padding: '8px 18px', borderRadius: r.button || r.md, background: 'transparent', border: `1.5px solid ${c.border}`, color: c.text, fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: ff }}>Secondary</button>
              <button style={{ padding: '8px 18px', borderRadius: r.button || r.md, background: 'transparent', color: c.textSecondary, border: 'none', fontSize: '12px', fontWeight: '600', cursor: 'pointer', fontFamily: ff }}>Ghost</button>
              <span style={{ padding: '4px 12px', borderRadius: r.full, background: `${c.primary}22`, color: c.primary, fontSize: '11px', fontWeight: '700' }}>Badge</span>
              <span style={{ padding: '4px 12px', borderRadius: r.full, background: `${c.success}22`, color: c.success, fontSize: '11px', fontWeight: '700' }}>Success</span>
              <span style={{ padding: '4px 12px', borderRadius: r.full, background: `${c.secondary}22`, color: c.secondary, fontSize: '11px', fontWeight: '700' }}>Secondary</span>
            </div>
          </div>

          {/* Post/Card grid */}
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: c.text, marginBottom: '12px' }}>Recent Posts</div>
            <div style={{ display: 'grid', gridTemplateColumns: compact ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '8px' }}>
              {posts.map((post, i) => (
                <div key={i} style={{
                  background: c.surface, borderRadius: r.card, border: `1px solid ${c.border}`,
                  overflow: 'hidden', boxShadow: t.shadows?.card || 'none',
                }}>
                  <div style={{
                    aspectRatio: '4/3',
                    background: i % 2 === 0 ? `linear-gradient(135deg, ${c.primary}44, ${c.secondary}22)` : `linear-gradient(135deg, ${c.secondary}33, ${c.primary}22)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', fontSize: '28px',
                  }}>
                    {post.emoji}
                    {post.reel && (
                      <div style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', padding: '2px 4px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <Play size={9} fill="#fff" color="#fff" />
                        <span style={{ fontSize: '8px', color: '#fff', fontWeight: '700' }}>REEL</span>
                      </div>
                    )}
                  </div>
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontSize: '11px', color: c.textSecondary, marginBottom: '6px', fontWeight: '500' }}>
                      {['A beautiful morning shot', 'Creative portrait session', 'Behind the scenes', 'Golden hour magic', 'Studio work', 'City lights at night'][i]}
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: c.textSecondary }}>
                        <Heart size={11} color={c.primary} fill={c.primary} />
                        {post.likes >= 1000 ? `${(post.likes / 1000).toFixed(1)}K` : post.likes}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: c.textSecondary }}>
                        <MessageCircle size={11} />
                        {post.comments}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: c.textSecondary }}>
                        <Bookmark size={11} />
                        Save
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ background: c.surface, borderRadius: r.card, border: `1px solid ${c.border}`, padding: '20px', marginTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: r.sm, background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={12} color="#fff" fill="#fff" />
                </div>
                <span style={{ fontWeight: '800', fontSize: '13px', color: c.text }}>SocialBuilder</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                {['Privacy', 'Terms', 'Help', 'Contact'].map(link => (
                  <span key={link} style={{ fontSize: '11px', color: c.textSecondary, cursor: 'pointer' }}>{link}</span>
                ))}
              </div>
              <span style={{ fontSize: '11px', color: c.textSecondary }}>© 2026 SocialBuilder</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}