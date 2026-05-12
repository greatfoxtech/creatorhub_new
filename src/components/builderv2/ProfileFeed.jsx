import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Heart, MessageCircle, Share2, Image as ImageIcon } from 'lucide-react';

export default function ProfileFeed({ props = {}, themeTokens = null }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const tc = themeTokens?.colors || {};
  const tr = themeTokens?.radius || {};

  const limit = props.postsLimit || 6;
  const layout = props.layout || 'grid'; // 'grid' | 'list'
  const showLikes = props.showLikes !== false;
  const showComments = props.showComments !== false;
  const title = props.title || 'Latest Posts';
  const showTitle = props.showTitle !== false;

  useEffect(() => {
    base44.entities.Post.list('-created_date', limit)
      .then(data => { setPosts(data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [limit]);

  const bg = props.backgroundColor || tc.background || 'transparent';
  const cardBg = tc.surface || '#ffffff';
  const cardBorder = tc.border || '#e5e7eb';
  const textColor = props.textColor || tc.text || '#111827';
  const subtextColor = tc.textSecondary || '#6B7280';
  const accentColor = tc.primary || '#4368D9';
  const cardRadius = parseInt(tr.card || tr.lg || '12') || 12;

  const wrapperStyle = {
    padding: `${props.paddingTop || props.padding || 32}px ${props.paddingRight || props.padding || 24}px ${props.paddingBottom || props.padding || 32}px ${props.paddingLeft || props.padding || 24}px`,
    backgroundColor: bg,
    fontFamily: themeTokens?.typography?.fontFamily || 'inherit',
  };

  if (loading) {
    return (
      <div style={wrapperStyle}>
        {showTitle && (
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: textColor, marginBottom: '20px', margin: '0 0 20px' }}>{title}</h2>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fill, minmax(240px, 1fr))' : '1fr', gap: '16px' }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} style={{
              backgroundColor: cardBg,
              borderRadius: `${cardRadius}px`,
              border: `1px solid ${cardBorder}`,
              padding: '16px',
              animation: 'pulse 1.5s infinite',
              opacity: 0.7,
              minHeight: '140px',
            }} />
          ))}
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:.7} 50%{opacity:.4} }`}</style>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div style={wrapperStyle}>
        {showTitle && (
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: textColor, marginBottom: '20px', margin: '0 0 20px' }}>{title}</h2>
        )}
        <div style={{
          border: `2px dashed ${cardBorder}`,
          borderRadius: `${cardRadius}px`,
          padding: '48px 24px',
          textAlign: 'center',
          color: subtextColor,
        }}>
          <ImageIcon size={32} style={{ marginBottom: '12px', opacity: 0.4 }} />
          <p style={{ margin: 0, fontSize: '14px' }}>No posts to show yet.</p>
        </div>
      </div>
    );
  }

  const gridStyle = layout === 'grid'
    ? { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }
    : { display: 'flex', flexDirection: 'column', gap: '16px' };

  return (
    <div style={wrapperStyle}>
      {showTitle && (
        <h2 style={{ fontSize: '22px', fontWeight: '700', color: textColor, marginBottom: '20px', margin: '0 0 20px 0' }}>{title}</h2>
      )}
      <div style={gridStyle}>
        {posts.map(post => (
          <div
            key={post.id}
            style={{
              backgroundColor: cardBg,
              borderRadius: `${cardRadius}px`,
              border: `1px solid ${cardBorder}`,
              overflow: 'hidden',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              transition: 'box-shadow 0.2s',
            }}
          >
            {/* Media */}
            {post.media_url && (
              <div style={{ width: '100%', aspectRatio: layout === 'grid' ? '4/3' : '16/6', overflow: 'hidden', flexShrink: 0 }}>
                {post.type === 'video' ? (
                  <video
                    src={post.media_url}
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <img
                    src={post.media_url}
                    alt="Post media"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                )}
              </div>
            )}

            {/* Content */}
            <div style={{ padding: '14px 16px' }}>
              {post.content && (
                <p style={{
                  fontSize: '14px',
                  color: textColor,
                  lineHeight: 1.6,
                  margin: '0 0 10px',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}>
                  {post.content}
                </p>
              )}

              {/* Footer meta */}
              {(showLikes || showComments) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px' }}>
                  {showLikes && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: subtextColor }}>
                      <Heart size={14} />
                      {(post.likes || []).length}
                    </span>
                  )}
                  {showComments && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: subtextColor }}>
                      <MessageCircle size={14} />
                      {post.comments_count || 0}
                    </span>
                  )}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: subtextColor, marginLeft: 'auto' }}>
                    {new Date(post.created_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}