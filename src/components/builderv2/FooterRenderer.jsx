import React from 'react';
import { Globe, Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Dribbble } from 'lucide-react';

// Custom X Logo
const XLogo = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const iconMap = { Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Dribbble, Globe, X: XLogo };

const getBackgroundStyles = (rowConfig) => {
  let styles = {};
  const cfg = {
    mode: rowConfig.backgroundMode || (rowConfig.backgroundImage ? 'image' : 'color'),
    color: rowConfig.backgroundColor,
    imageSrc: rowConfig.backgroundImage,
    gradientColor1: rowConfig.gradientColor1,
    gradientColor2: rowConfig.gradientColor2,
    gradientType: rowConfig.gradientType,
    gradientAngle: rowConfig.gradientAngle,
    imageSize: rowConfig.imageSize,
    imageRepeat: rowConfig.imageRepeat,
    imagePosition: rowConfig.imagePosition,
    overlayColor: rowConfig.overlayColor,
    overlayOpacity: rowConfig.overlayOpacity,
  };
  if (cfg.mode === 'gradient') {
    const t = cfg.gradientType || 'linear';
    const a = cfg.gradientAngle || 180;
    styles.background = t === 'radial'
      ? `radial-gradient(circle, ${cfg.gradientColor1 || '#fff'}, ${cfg.gradientColor2 || '#000'})`
      : `linear-gradient(${a}deg, ${cfg.gradientColor1 || '#fff'}, ${cfg.gradientColor2 || '#000'})`;
  } else if (cfg.mode === 'image' && cfg.imageSrc) {
    styles.backgroundImage = `url(${cfg.imageSrc})`;
    styles.backgroundSize = cfg.imageSize || 'cover';
    styles.backgroundRepeat = cfg.imageRepeat || 'no-repeat';
    styles.backgroundPosition = cfg.imagePosition || 'center';
  } else {
    styles.backgroundColor = cfg.color || 'transparent';
  }
  return { styles, config: cfg };
};

export default function FooterRenderer({ element, onSelect, themeTokens = null }) {
  const props = element.props || {};
  const tc = themeTokens?.colors || {};
  const children = props.children || [];
  const layoutMode = props.layoutMode || 'simple';
  const rowsConfig = props.rows || {
    top: { enabled: false, backgroundColor: 'transparent', padding: 16 },
    main: { enabled: true, backgroundColor: 'transparent', padding: 32 },
    bottom: { enabled: true, backgroundColor: '#111827', padding: 16 },
  };

  const handleClick = (e, focusId) => {
    if (onSelect) { e.stopPropagation(); onSelect({ ...element, _focusId: focusId }); }
  };
  const cls = onSelect ? "hover:outline-blue-500 hover:outline transition-all" : "";
  const ws = { cursor: 'pointer', position: 'relative', outline: '1px dashed transparent' };

  const renderItem = (item) => {
    const onClick = (e) => handleClick(e, item.id);
    if (item.type === 'BrandBlock') return (
      <div key={item.id} onClick={onClick} className={cls} style={{ ...ws, maxWidth: '300px' }}>
        {item.logoType === 'image' && item.imageSrc
          ? <img src={item.imageSrc} alt="Brand" style={{ height: '32px', marginBottom: '12px' }} />
          : <h3 style={{ fontSize: `${item.fontSize || 24}px`, fontWeight: item.fontWeight || 'bold', color: item.color || tc.text || '#fff', marginBottom: '8px' }}>{item.text || 'BRAND'}</h3>}
        {item.bio && <p style={{ fontSize: '14px', color: item.bioColor || tc.textSecondary || '#9CA3AF', lineHeight: '1.5' }}>{item.bio}</p>}
      </div>
    );
    if (item.type === 'FooterMenu') {
      const isH = item.layout === 'horizontal';
      return (
        <div key={item.id} onClick={onClick} className={cls} style={ws}>
          <ul style={{ display: 'flex', flexDirection: isH ? 'row' : 'column', gap: isH ? '24px' : '12px', listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap' }}>
            {(item.items || []).map((link, idx) => (
              <li key={idx}>
                <a href={link.link || '#'} onClick={(e) => { if (onSelect) { e.preventDefault(); e.stopPropagation(); onSelect({ ...element, _focusId: item.id }); } }}
                  style={{ color: item.textColor || tc.textSecondary || '#D1D5DB', textDecoration: 'none', fontSize: '14px' }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    if (item.type === 'Social') {
      return (
        <div key={item.id} onClick={onClick} className={cls} style={{ ...ws, display: 'flex', gap: '12px' }}>
          {(item.socialIcons || []).map((icon, idx) => {
            const IconComp = icon.network === 'X' ? XLogo : (iconMap[icon.network] || Globe);
            const isCustom = IconComp === XLogo;
            return (
              <a key={idx} href={icon.url} onClick={(e) => { if (onSelect) { e.preventDefault(); e.stopPropagation(); onSelect({ ...element, _focusId: item.id }); } }}
                style={{ color: item.iconColor || tc.text || '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isCustom ? <IconComp size={item.iconSize || 20} color={item.iconColor || '#fff'} /> : <IconComp size={item.iconSize || 20} />}
              </a>
            );
          })}
        </div>
      );
    }
    if (item.type === 'Copyright') return (
      <div key={item.id} onClick={onClick} className={cls} style={ws}>
        <p style={{ margin: 0, fontSize: `${item.fontSize || 12}px`, color: item.textColor || tc.textSecondary || '#6B7280' }}>{item.text}</p>
      </div>
    );
    if (item.type === 'LegalLinks') return (
      <div key={item.id} onClick={onClick} className={cls} style={ws}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {(item.items || []).map((link, idx) => (
            <a key={idx} href={link.link} onClick={(e) => { if (onSelect) { e.preventDefault(); e.stopPropagation(); onSelect({ ...element, _focusId: item.id }); } }}
              style={{ fontSize: `${item.fontSize || 12}px`, color: item.textColor || tc.textSecondary || '#6B7280', textDecoration: 'none' }}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    );
    if (item.type === 'Button') return (
      <div key={item.id} onClick={onClick} className={cls} style={{ ...ws, display: 'inline-flex' }}>
        <a href={item.href || '#'} onClick={(e) => { if (onSelect) { e.preventDefault(); e.stopPropagation(); onSelect({ ...element, _focusId: item.id }); } }}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: item.backgroundColor || tc.primary || '#4368D9', color: item.color || '#fff', padding: `${item.paddingTop || 10}px ${item.paddingRight || 20}px`, borderRadius: `${item.borderRadius || 6}px`, fontSize: `${item.fontSize || 14}px`, fontWeight: item.fontWeight || '500', textDecoration: 'none', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          {item.label || 'Button'}
        </a>
      </div>
    );
    if (item.type === 'Newsletter') return (
      <div key={item.id} onClick={onClick} className={cls} style={{ ...ws, maxWidth: '300px' }}>
        <h4 style={{ color: tc.text || '#fff', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>{item.title || 'Subscribe'}</h4>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input type="email" placeholder={item.placeholder || 'Enter email'} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: 'none', fontSize: '13px', backgroundColor: '#374151', color: '#fff' }} />
          <button style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', backgroundColor: tc.primary || '#4368D9', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>{item.buttonText || 'Join'}</button>
        </div>
      </div>
    );
    return null;
  };

  let containerStyle = { backgroundColor: props.backgroundColor || tc.surface || '#1f2937', color: tc.text || '#fff', display: 'flex', flexDirection: 'column' };
  if (props.backgroundMode === 'gradient') {
    const t = props.gradientType || 'linear';
    const a = props.gradientAngle || 180;
    containerStyle.background = t === 'radial' ? `radial-gradient(circle, ${props.gradientColor1 || '#1f2937'}, ${props.gradientColor2 || '#111827'})` : `linear-gradient(${a}deg, ${props.gradientColor1 || '#1f2937'}, ${props.gradientColor2 || '#111827'})`;
  } else if (props.backgroundMode === 'image' && props.backgroundImage) {
    containerStyle.backgroundImage = `url(${props.backgroundImage})`;
    containerStyle.backgroundSize = props.imageSize || 'cover';
    containerStyle.backgroundPosition = props.imagePosition || 'center';
  }

  if (layoutMode === 'widgets') {
    return (
      <footer style={{ ...containerStyle, padding: 0 }}>
        {(props.widgetBands || []).map((band, bandIdx) => {
          const { styles: bandStyles, config: bandCfg } = getBackgroundStyles({ ...band, backgroundMode: band.backgroundMode || (band.backgroundImage ? 'image' : 'color') });
          return (
            <div key={band.id} onClick={(e) => handleClick(e, band.id)} className="hover:outline-blue-500 hover:outline transition-all"
              style={{ ...bandStyles, padding: `${band.padding || 24}px 24px`, position: 'relative', cursor: 'pointer', borderTop: bandIdx > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none', outline: '1px dashed transparent' }}>
              {bandCfg.mode === 'image' && bandCfg.overlayColor && (
                <div style={{ position: 'absolute', inset: 0, backgroundColor: bandCfg.overlayColor, opacity: (bandCfg.overlayOpacity || 0) / 100, zIndex: 0, pointerEvents: 'none' }} />
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
                {(band.areas || []).map((area, idx) => {
                  const { styles: areaStyles, config: areaCfg } = getBackgroundStyles({ ...area, backgroundMode: area.backgroundMode || (area.backgroundImage ? 'image' : 'color') });
                  return (
                    <div key={area.id} onClick={(e) => handleClick(e, area.id)} className="hover:outline-blue-500 hover:outline transition-all"
                      style={{ ...areaStyles, padding: `${area.padding || 0}px`, borderRadius: `${area.borderRadius || 0}px`, minHeight: '60px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', cursor: 'pointer', outline: '1px dashed transparent' }}>
                      {areaCfg.mode === 'image' && areaCfg.overlayColor && (
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: areaCfg.overlayColor, opacity: (areaCfg.overlayOpacity || 0) / 100, zIndex: 0, borderRadius: `${area.borderRadius || 0}px`, pointerEvents: 'none' }} />
                      )}
                      <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
                        {(area.children && area.children.length > 0) ? area.children.map(renderItem) : (
                          <div style={{ border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '4px', height: '100%', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>{area.name || `Area ${idx + 1}`}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </footer>
    );
  }

  return (
    <footer style={containerStyle}>
      {['top', 'main', 'bottom'].map(rowKey => {
        const rowConfig = rowsConfig[rowKey];
        if (!rowConfig || !rowConfig.enabled) return null;
        const rowChildren = children.filter(c => c.row === rowKey);
        const { styles: bgStyles, config: activeCfg } = getBackgroundStyles(rowConfig);
        return (
          <div key={rowKey} onClick={(e) => handleClick(e, `row-${rowKey}`)}
            className={`hover:outline-blue-500 hover:outline transition-all cursor-pointer ${rowChildren.length === 0 ? 'min-h-[60px]' : ''}`}
            style={{ ...bgStyles, padding: `${rowConfig.padding}px 24px`, borderTop: rowKey !== 'top' ? '1px solid rgba(255,255,255,0.05)' : 'none', position: 'relative', outline: '1px dashed transparent', display: rowChildren.length === 0 ? 'flex' : 'block', alignItems: 'center', justifyContent: 'center' }}>
            {rowChildren.length === 0 && <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{rowKey} Row (Empty)</div>}
            {activeCfg.mode === 'image' && activeCfg.overlayColor && (
              <div style={{ position: 'absolute', inset: 0, backgroundColor: activeCfg.overlayColor, opacity: (activeCfg.overlayOpacity || 0) / 100, zIndex: 0, pointerEvents: 'none' }} />
            )}
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', alignItems: 'start' }}>
              {['left', 'center', 'right'].map(zone => {
                const zoneItems = rowChildren.filter(c => c.zone === zone);
                return (
                  <div key={zone} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: zone === 'center' ? 'center' : (zone === 'right' ? 'flex-end' : 'flex-start'), textAlign: zone === 'center' ? 'center' : (zone === 'right' ? 'right' : 'left') }}>
                    {zoneItems.map(renderItem)}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </footer>
  );
}