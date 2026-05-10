import React from 'react';
import { Heart, MessageCircle, Share2, Bell, Search, Image, Play, UserPlus } from 'lucide-react';

// A realistic social profile mock that uses live theme tokens as inline styles
export default function ProfileMockPreview({ tokens: t, font }) {
  const c = t.colors;
  const r = t.radius;
  const ff = font || t.typography.fontFamily;

  const posts = [
    { id: 1, type: 'image', likes: 842, comments: 37, bg: `linear-gradient(135deg, ${c.primary}33, ${c.secondary}22)`, emoji: '🌅' },
    { id: 2, type: 'image', likes: 1203, comments: 64, bg: `linear-gradient(135deg, ${c.secondary}33, ${c.primary}22)`, emoji: '📸' },
    { id: 3, type: 'reel', likes: 5432, comments: 128, bg: `linear-gradient(135deg, ${c.primary}44, #00000033)`, emoji: '🎬' },
    { id: 4, type: 'image', likes: 389, comments: 22, bg: `linear-gradient(135deg, ${c.surface}, ${c.surface2 || c.surface})`, emoji: '✨' },
    { id: 5, type: 'image', likes: 672, comments: 41, bg: `linear-gradient(135deg, ${c.secondary}22, ${c.primary}22)`, emoji: '🎨' },
    { id: 6, type: 'reel', likes: 2100, comments: 93, bg: `linear-gradient(135deg, #00000033, ${c.primary}33)`, emoji: '🎥' },
  ];

  return (
    <div style={{ height: '100%', background: c.background, fontFamily: ff, overflowY: 'auto', minHeight: '600px' }}>
      {/* Header bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: c.surface,
        borderBottom: `1px solid ${c.border}`,
        padding: '0 20px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '56px',
        backdropFilter: 'blur(12px)',
      }}>
        <span style={{ fontWeight: '800', fontSize: '18px', color: c.text, letterSpacing: '-0.02em' }}>socialbuilder</span>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Search size={18} color={c.textSecondary} />
          <Bell size={18} color={c.textSecondary} />
          <div style={{ width: '30px', height: '30px', borderRadius: r.full, background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})` }} />
        </div>
      </div>

      {/* Stories row */}
      <div style={{ padding: '14px 16px', borderBottom: `1px solid ${c.border}`, display: 'flex', gap: '12px', overflowX: 'auto' }}>
        {['You', 'Alex', 'Sam', 'Jordan', 'Taylor'].map((name, i) => (
          <div key={name} style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: r.full,
              padding: '2px',
              background: i === 0 ? `rgba(${c.border.includes('rgba') ? '255,255,255,0.2' : c.border})` : `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <div style={{ width: '46px', height: '46px', borderRadius: r.full, background: `linear-gradient(135deg, ${c.surface}, ${c.surface2 || c.surfaceHover || c.surface})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                {['🧑', '👱', '🧔', '👩', '🧕'][i]}
              </div>
            </div>
            <span style={{ fontSize: '10px', color: c.textSecondary, fontWeight: '500' }}>{name}</span>
          </div>
        ))}
      </div>

      {/* Profile Hero */}
      <div style={{
        margin: '20px 16px',
        borderRadius: r.card,
        background: c.surface,
        border: `1px solid ${c.border}`,
        overflow: 'hidden',
        boxShadow: t.shadows?.card || 'none',
      }}>
        {/* Cover */}
        <div style={{ height: '100px', background: `linear-gradient(135deg, ${c.primary}55, ${c.secondary}33)`, position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', opacity: 0.4 }}>✦</div>
        </div>
        {/* Profile info */}
        <div style={{ padding: '0 16px 16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: '-28px', marginBottom: '10px' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: r.full,
              background: `linear-gradient(135deg, ${c.primary}, ${c.secondary})`,
              border: `3px solid ${c.surface}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px', flexShrink: 0
            }}>🧑</div>
            <button style={{
              padding: '7px 18px', borderRadius: r.button || r.md,
              background: t.buttons?.primary?.background || c.primary,
              color: '#fff', fontWeight: '700', fontSize: '12px', border: 'none', cursor: 'pointer',
              boxShadow: t.shadows?.button || 'none', fontFamily: ff,
              display: 'flex', alignItems: 'center', gap: '5px'
            }}>
              <UserPlus size={12} /> Follow
            </button>
          </div>
          <div style={{ fontWeight: '800', fontSize: '16px', color: c.text, marginBottom: '2px', letterSpacing: '-0.01em' }}>@yourcreator</div>
          <div style={{ fontSize: '12px', color: c.textSecondary, marginBottom: '10px', lineHeight: '1.5' }}>
            Digital creator · Designer · Building the web ✦
          </div>
          {/* Stats */}
          <div style={{ display: 'flex', gap: '20px' }}>
            {[['284', 'Posts'], ['12.4K', 'Followers'], ['891', 'Following']].map(([num, lbl]) => (
              <div key={lbl} style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: '800', fontSize: '15px', color: c.text }}>{num}</div>
                <div style={{ fontSize: '10px', color: c.textSecondary, fontWeight: '500' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderBottom: `1px solid ${c.border}`, marginBottom: '16px', padding: '0 16px' }}>
        {['Posts', 'Reels', 'Tagged'].map((tab, i) => (
          <div key={tab} style={{
            flex: 1, textAlign: 'center', padding: '10px 0',
            borderBottom: i === 0 ? `2px solid ${c.primary}` : '2px solid transparent',
            color: i === 0 ? c.primary : c.textSecondary,
            fontSize: '12px', fontWeight: i === 0 ? '700' : '500', cursor: 'pointer'
          }}>{tab}</div>
        ))}
      </div>

      {/* Post Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2px', padding: '0 16px 24px' }}>
        {posts.map(post => (
          <div key={post.id} style={{
            aspectRatio: '1', borderRadius: r.sm,
            background: post.bg,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', cursor: 'pointer', overflow: 'hidden',
            fontSize: '24px'
          }}>
            <span>{post.emoji}</span>
            {post.type === 'reel' && (
              <div style={{ position: 'absolute', top: '5px', right: '5px' }}>
                <Play size={12} fill="#fff" color="#fff" />
              </div>
            )}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '4px 6px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.5))',
              display: 'flex', gap: '8px', alignItems: 'center'
            }}>
              <Heart size={9} fill="#fff" color="#fff" />
              <span style={{ fontSize: '9px', color: '#fff', fontWeight: '700' }}>{post.likes >= 1000 ? `${(post.likes / 1000).toFixed(1)}K` : post.likes}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}