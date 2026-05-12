import React from 'react';
import { Search, Menu, Facebook, Instagram, Linkedin, Youtube, Github, Dribbble, Globe, UserPlus, UserCheck, Users } from 'lucide-react';

const XLogo = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const iconMap = {
  Menu, Search, Facebook, Instagram, Linkedin, Youtube, Github, Dribbble, Globe,
  UserPlus, UserCheck, Users, Twitter: XLogo, X: XLogo,
};

const FollowButtonRenderer = ({ item, onSelect, headerElement }) => {
  const [isFollowing, setIsFollowing] = React.useState(false);
  const isActive = isFollowing;
  const label = isActive ? item.followingLabel || 'Following' : item.label || 'Follow';
  const iconName = isActive ? 'UserCheck' : item.icon || 'UserPlus';
  const IconComponent = iconMap[iconName] || UserPlus;
  let bg = item.backgroundColor || '#4368D9';
  let color = item.labelColor || '#ffffff';
  let border = item.borderColor ? `1px solid ${item.borderColor}` : 'none';
  if (item.buttonType === 'outline') { bg = 'transparent'; color = item.labelColor || item.backgroundColor || '#4368D9'; border = `1px solid ${item.borderColor || item.backgroundColor || '#4368D9'}`; }
  else if (item.buttonType === 'text') { bg = 'transparent'; color = item.labelColor || item.backgroundColor || '#4368D9'; border = 'none'; }
  if (isActive && item.buttonType === 'primary') { bg = item.labelColor || '#ffffff'; color = item.backgroundColor || '#4368D9'; border = `1px solid ${item.backgroundColor || '#4368D9'}`; }
  const buttonStyle = { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', backgroundColor: bg, color, border, cursor: 'pointer', fontSize: `${item.fontSize || 14}px`, fontWeight: item.fontWeight || '600', borderTopLeftRadius: `${item.borderRadiusTop || 4}px`, borderTopRightRadius: `${item.borderRadiusRight || 4}px`, borderBottomRightRadius: `${item.borderRadiusBottom || 4}px`, borderBottomLeftRadius: `${item.borderRadiusLeft || 4}px`, paddingTop: `${item.paddingTop || 10}px`, paddingRight: `${item.paddingRight || 20}px`, paddingBottom: `${item.paddingBottom || 10}px`, paddingLeft: `${item.paddingLeft || 20}px`, transition: 'all 0.2s ease', minWidth: '100px' };
  const showIcon = item.iconStyle !== 'text_only';
  const showText = item.iconStyle !== 'icon_only';
  return (
    <div onClick={(e) => { if (onSelect) { e.stopPropagation(); onSelect({ ...headerElement, _focusId: item.id }); } }} className="hover:outline-blue-500 hover:outline transition-all" style={{ display: 'inline-flex', marginTop: `${item.marginTop || 0}px`, marginRight: `${item.marginRight || 0}px`, marginBottom: `${item.marginBottom || 0}px`, marginLeft: `${item.marginLeft || 0}px`, cursor: 'pointer', outline: '1px dashed transparent' }}>
      <button style={buttonStyle} onClick={(e) => { e.stopPropagation(); setIsFollowing(!isFollowing); if (onSelect) onSelect({ ...headerElement, _focusId: item.id }); }}>
        {showIcon && <IconComponent size={item.fontSize ? item.fontSize + 2 : 16} />}
        {showText && <span>{label}</span>}
      </button>
    </div>
  );
};

export default function HeaderRenderer({ element, onSelect }) {
  const props = element.props || {};
  const children = props.children || [];

  const renderHeaderItem = (item) => {
    const sel = (e) => { if (onSelect) { e.stopPropagation(); onSelect({ ...element, _focusId: item.id }); } };
    const cls = onSelect ? "hover:outline-blue-500 hover:outline transition-all" : "";

    if (item.type === 'Tagline') return (
      <div key={item.id} onClick={sel} className={cls} style={{ fontSize: `${item.fontSize || 14}px`, color: item.color || '#6B7280', maxWidth: item.maxWidth ? `${item.maxWidth}px` : '100%', marginTop: item.marginTop ? `${item.marginTop}px` : '0', marginBottom: item.marginBottom ? `${item.marginBottom}px` : '0', marginLeft: item.marginLeft ? `${item.marginLeft}px` : '0', cursor: 'pointer', outline: '1px dashed transparent', position: 'relative' }}>
        {item.text || 'Your Tagline'}
      </div>
    );

    if (item.type === 'Logo') {
      const content = item.logoType === 'image' && item.imageSrc
        ? <img src={item.imageSrc} alt="Logo" style={{ height: 'auto', width: item.width ? `${item.width}px` : '120px', borderRadius: item.borderRadius ? `${item.borderRadius}px` : '0px', display: 'block', objectFit: 'cover' }} />
        : <span style={{ fontSize: `${item.fontSize || 24}px`, fontWeight: item.fontWeight || 'bold', color: item.color || '#000000', whiteSpace: 'nowrap' }}>{item.text || 'LOGO'}</span>;
      const handleClick = (e) => { if (onSelect) { e.stopPropagation(); if (item.href) e.preventDefault(); onSelect({ ...element, _focusId: item.id }); } };
      const ws = { display: 'flex', alignItems: 'center', cursor: 'pointer', position: 'relative', outline: '1px dashed transparent', width: 'auto' };
      return item.href
        ? <a key={item.id} href={item.href} onClick={handleClick} className={cls} style={{ ...ws, textDecoration: 'none' }}>{content}</a>
        : <div key={item.id} onClick={handleClick} className={cls} style={ws}>{content}</div>;
    }

    if (item.type === 'Navigation') {
      const menuItems = item.menuItems || item.items?.map(i => ({ label: i, link: '#' })) || [];
      return (
        <nav key={item.id} onClick={sel} style={{ marginTop: item.marginTop ? `${item.marginTop}px` : 0, marginBottom: item.marginBottom ? `${item.marginBottom}px` : 0, maxWidth: item.maxWidth ? `${item.maxWidth}px` : 'none', cursor: 'pointer', outline: '1px dashed transparent' }} className={cls}>
          <ul style={{ display: 'flex', gap: item.itemSpacing ? `${item.itemSpacing}px` : '24px', listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap', justifyContent: item.alignment || 'flex-start' }}>
            {menuItems.map((menuItem, idx) => (
              <li key={idx}><a href={menuItem.link || '#'} style={{ color: item.textColor || '#000000', textDecoration: 'none', fontSize: item.fontSize ? `${item.fontSize}px` : '14px', fontWeight: '500' }}>{typeof menuItem === 'object' ? menuItem.label : menuItem}</a></li>
            ))}
          </ul>
        </nav>
      );
    }

    if (item.type === 'SearchBar') return (
      <div key={item.id} onClick={sel} className={cls} style={{ position: 'relative', width: `${item.width || 200}px`, cursor: 'pointer', outline: '1px dashed transparent' }}>
        <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
        <input type="text" placeholder={item.placeholder || 'Search...'} style={{ width: '100%', padding: '8px 10px 8px 32px', border: '1px solid #d1d5db', borderRadius: `${item.borderRadius || 6}px`, fontSize: '13px', backgroundColor: item.backgroundColor || '#f3f4f6', outline: 'none', pointerEvents: 'none' }} readOnly />
      </div>
    );

    if (item.type === 'IconButton') {
      const IconComponent = iconMap[item.icon] || Menu;
      return (
        <div key={item.id} onClick={sel} className={cls} style={{ display: 'inline-flex', cursor: 'pointer', outline: '1px dashed transparent' }}>
          <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', backgroundColor: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', pointerEvents: 'none' }}>
            <IconComponent size={item.size || 24} color={item.color || '#000000'} />
          </button>
        </div>
      );
    }

    if (item.type === 'Social') {
      const icons = item.socialIcons || [];
      const getSocialIcon = (network) => {
        const map = { Facebook, Instagram, Twitter: XLogo, X: XLogo, Linkedin, Youtube, Github, Dribbble };
        return map[network] || Globe;
      };
      return (
        <div key={item.id} onClick={sel} className={cls} style={{ display: 'flex', flexDirection: item.orientation === 'vertical' ? 'column' : 'row', gap: `${item.iconSpacing || 12}px`, marginTop: `${item.marginTop || 0}px`, marginRight: `${item.marginRight || 0}px`, marginBottom: `${item.marginBottom || 0}px`, marginLeft: `${item.marginLeft || 0}px`, cursor: 'pointer', outline: '1px dashed transparent' }}>
          {icons.map((icon, idx) => {
            const IconComp = getSocialIcon(icon.network);
            const isCustom = IconComp === XLogo;
            return (
              <a key={idx} href={icon.url || '#'} target={item.openInNewTab ? '_blank' : '_self'} rel={item.openInNewTab ? 'noopener noreferrer' : undefined} onClick={(e) => { if (onSelect) e.preventDefault(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: item.backgroundColor || 'transparent', color: item.iconColor || '#000000', paddingTop: `${item.paddingTop || 8}px`, paddingRight: `${item.paddingRight || 8}px`, paddingBottom: `${item.paddingBottom || 8}px`, paddingLeft: `${item.paddingLeft || 8}px`, borderTopLeftRadius: `${item.borderRadiusTop || 50}px`, borderTopRightRadius: `${item.borderRadiusRight || 50}px`, borderBottomRightRadius: `${item.borderRadiusBottom || 50}px`, borderBottomLeftRadius: `${item.borderRadiusLeft || 50}px`, textDecoration: 'none' }}>
                {isCustom ? <IconComp size={item.iconSize || 20} color={item.iconColor || '#000000'} /> : <IconComp size={item.iconSize || 20} />}
              </a>
            );
          })}
        </div>
      );
    }

    if (item.type === 'FollowButton') {
      if (item.showPreview === false) return null;
      return <FollowButtonRenderer key={item.id} item={item} onSelect={onSelect} headerElement={element} />;
    }

    if (item.type === 'Stats') {
      const FollowerIcon = iconMap[item.followerIcon || 'Users'] || Users;
      const FollowingIcon = iconMap[item.followingIcon || 'UserPlus'] || UserPlus;
      const renderStat = (count, label, Icon) => {
        const mode = item.displayMode || 'compact_icons';
        const nm = mode === 'icons' ? 'compact_icons' : (mode === 'label_value' ? 'label_above' : mode);
        const ss = { fontSize: `${item.fontSize || 13}px`, fontWeight: item.fontWeight || '500' };
        const base = { display: 'flex', alignItems: 'center', gap: '6px', fontSize: `${item.fontSize || 13}px`, fontWeight: item.fontWeight || '500', color: item.textColor || '#374151' };
        if (nm === 'compact_icons') return <div style={{ ...base, ...ss }}><Icon size={item.iconSize || 16} color={item.iconColor || '#6B7280'} /></div>;
        if (nm === 'icon_inline') return <div style={{ ...base, flexDirection: 'row', ...ss }}><Icon size={item.iconSize || 16} color={item.iconColor || '#6B7280'} /><span style={{ color: item.textColor || '#374151' }}>{count.toLocaleString()}</span></div>;
        if (nm === 'label_above') return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2', ...ss }}><span style={{ color: item.iconColor || '#9CA3AF' }}>{label}</span><span style={{ color: item.textColor || '#374151' }}>{count.toLocaleString()}</span></div>;
        return <div style={{ ...base, ...ss }}><Icon size={item.iconSize || 16} color={item.iconColor || '#6B7280'} /><span style={{ color: item.textColor || '#374151' }}>{count.toLocaleString()}</span></div>;
      };
      return (
        <div key={item.id} onClick={sel} className={cls} style={{ display: 'flex', alignItems: 'center', gap: `${item.spacing || 16}px`, marginTop: `${item.marginTop || 0}px`, marginRight: `${item.marginRight || 0}px`, marginBottom: `${item.marginBottom || 0}px`, marginLeft: `${item.marginLeft || 0}px`, paddingTop: `${item.paddingTop || 4}px`, paddingRight: `${item.paddingRight || 8}px`, paddingBottom: `${item.paddingBottom || 4}px`, paddingLeft: `${item.paddingLeft || 8}px`, cursor: 'pointer', outline: '1px dashed transparent' }}>
          {item.showFollowers && renderStat(item.followerCount || 0, 'Followers', FollowerIcon)}
          {item.showFollowing && renderStat(item.followingCount || 0, 'Following', FollowingIcon)}
        </div>
      );
    }

    if (item.type === 'Button') {
      const sizeStyles = { sm: '12px', md: '14px', lg: '16px' };
      const buttonStyle = { display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', backgroundColor: item.backgroundColor || '#4368D9', color: item.color || '#ffffff', border: 'none', cursor: 'pointer', fontSize: item.fontSize ? `${item.fontSize}px` : sizeStyles[item.size || 'md'], fontWeight: item.fontWeight || '600', borderTopLeftRadius: `${item.borderRadiusTop || 0}px`, borderTopRightRadius: `${item.borderRadiusRight || 0}px`, borderBottomRightRadius: `${item.borderRadiusBottom || 0}px`, borderBottomLeftRadius: `${item.borderRadiusLeft || 0}px`, paddingTop: `${item.paddingTop || 10}px`, paddingRight: `${item.paddingRight || 20}px`, paddingBottom: `${item.paddingBottom || 10}px`, paddingLeft: `${item.paddingLeft || 20}px`, pointerEvents: onSelect ? 'none' : 'auto' };
      const wrapperStyle = { display: 'inline-flex', marginTop: `${item.marginTop || 0}px`, marginRight: `${item.marginRight || 0}px`, marginBottom: `${item.marginBottom || 0}px`, marginLeft: `${item.marginLeft || 0}px`, cursor: 'pointer', outline: '1px dashed transparent' };
      const rel = [item.nofollow ? 'nofollow' : '', item.sponsored ? 'sponsored' : '', item.openInNewTab ? 'noopener noreferrer' : ''].filter(Boolean).join(' ');
      const El = item.href ? 'a' : 'button';
      const elProps = item.href ? { href: item.href, target: item.openInNewTab ? '_blank' : undefined, rel: rel || undefined } : {};
      return (
        <div key={item.id} onClick={(e) => { if (onSelect) { e.stopPropagation(); e.preventDefault(); onSelect({ ...element, _focusId: item.id }); } }} className={cls} style={wrapperStyle}>
          <El style={buttonStyle} {...elProps}>
            <span>{item.label || 'Button'}</span>
            {item.showSecondaryLabel && item.secondaryLabel && <span style={{ fontSize: '0.85em', opacity: 0.8, marginTop: '2px' }}>{item.secondaryLabel}</span>}
          </El>
        </div>
      );
    }

    return null;
  };

  const rows = ['top', 'middle', 'bottom'];
  const cols = ['left', 'center', 'right'];
  const getItemsForZone = (row, col) => children.filter(item => (item.row || 'middle') === row && (item.zone || 'left') === col);

  // Background resolver
  const getCfg = () => {
    if (props.stickyEnabled && props.stickyStyle) return props.stickyStyle;
    if (props.transparentEnabled && props.transparentStyle) return props.transparentStyle;
    return { mode: props.backgroundMode || (props.backgroundImage ? 'image' : 'color'), color: props.backgroundColor, imageSrc: props.backgroundImage, gradientColor1: props.gradientColor1, gradientColor2: props.gradientColor2, gradientType: props.gradientType, gradientAngle: props.gradientAngle, imageSize: props.imageSize, imageRepeat: props.imageRepeat, imagePosition: props.imagePosition, overlayColor: props.overlayColor, overlayOpacity: props.overlayOpacity };
  };
  const cfg = getCfg();
  let bgStyles = {};
  if (cfg.mode === 'gradient') {
    const t = cfg.gradientType || 'linear'; const a = cfg.gradientAngle || 180;
    bgStyles.background = t === 'radial' ? `radial-gradient(circle, ${cfg.gradientColor1 || '#fff'}, ${cfg.gradientColor2 || '#000'})` : `linear-gradient(${a}deg, ${cfg.gradientColor1 || '#fff'}, ${cfg.gradientColor2 || '#000'})`;
  } else if (cfg.mode === 'image' && cfg.imageSrc) {
    bgStyles.backgroundImage = `url(${cfg.imageSrc})`; bgStyles.backgroundSize = cfg.imageSize || 'cover'; bgStyles.backgroundRepeat = cfg.imageRepeat || 'no-repeat'; bgStyles.backgroundPosition = cfg.imagePosition || 'center';
  } else {
    bgStyles.backgroundColor = cfg.color || 'transparent';
  }

  const submenuItem = children.find(c => c.type === 'Submenu');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <header style={{ padding: `${props.padding || 16}px`, borderBottom: '1px solid #e5e7eb', ...bgStyles, position: props.stickyEnabled ? 'sticky' : 'relative', top: 0, zIndex: 50, transition: 'all 0.3s ease' }}>
        {cfg.mode === 'image' && cfg.overlayColor && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: cfg.overlayColor, opacity: (cfg.overlayOpacity || 0) / 100, zIndex: 0, pointerEvents: 'none' }} />
        )}
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateRows: 'auto auto auto', gridTemplateColumns: '1fr 1fr 1fr', gap: '0px', width: '100%' }}>
          {rows.map(row => cols.map(col => {
            const zoneItems = getItemsForZone(row, col).filter(i => i.type !== 'Submenu');
            const logo = zoneItems.find(i => i.type === 'Logo');
            const tagline = zoneItems.find(i => i.type === 'Tagline');
            const hasBranding = logo && tagline;
            const renderZoneContent = () => {
              if (hasBranding) {
                const otherItems = zoneItems.filter(i => i.type !== 'Logo' && i.type !== 'Tagline');
                const layout = tagline.layout || 'column';
                const brandingGroup = (
                  <div key="branding-group" style={{ display: 'flex', flexDirection: layout, alignItems: 'center', gap: layout === 'row' ? '12px' : '0px' }}>
                    {renderHeaderItem(logo)}{renderHeaderItem(tagline)}
                  </div>
                );
                return [brandingGroup, ...otherItems.map(renderHeaderItem)];
              }
              return zoneItems.map(renderHeaderItem);
            };
            return (
              <div key={`${row}-${col}`} style={{ display: 'flex', alignItems: 'center', justifyContent: col === 'center' ? 'center' : (col === 'right' ? 'flex-end' : 'flex-start'), gap: '16px', gridRow: row === 'top' ? 1 : (row === 'middle' ? 2 : 3), gridColumn: col === 'left' ? 1 : (col === 'center' ? 2 : 3), padding: '4px', minHeight: zoneItems.length > 0 ? 'auto' : '0px' }}>
                {renderZoneContent()}
              </div>
            );
          }))}
        </div>
      </header>

      {submenuItem && (() => {
        const sbMode = submenuItem.backgroundMode || 'color';
        let sbBg = {};
        if (sbMode === 'gradient') { const t = submenuItem.gradientType || 'linear'; const a = submenuItem.gradientAngle || 180; sbBg.background = t === 'radial' ? `radial-gradient(circle, ${submenuItem.gradientColor1 || '#fff'}, ${submenuItem.gradientColor2 || '#000'})` : `linear-gradient(${a}deg, ${submenuItem.gradientColor1 || '#fff'}, ${submenuItem.gradientColor2 || '#000'})`; }
        else if (sbMode === 'image' && submenuItem.backgroundImage) { sbBg.backgroundImage = `url(${submenuItem.backgroundImage})`; sbBg.backgroundSize = submenuItem.imageSize || 'cover'; sbBg.backgroundRepeat = submenuItem.imageRepeat || 'no-repeat'; sbBg.backgroundPosition = submenuItem.imagePosition || 'center'; }
        else { sbBg.backgroundColor = submenuItem.backgroundColor || 'transparent'; }
        return (
          <div onClick={(e) => { if (onSelect) { e.stopPropagation(); onSelect({ ...element, _focusId: submenuItem.id }); } }} className="hover:outline-blue-500 hover:outline transition-all" style={{ ...sbBg, borderBottom: '1px solid #e5e7eb', position: submenuItem.sticky ? 'sticky' : 'relative', top: submenuItem.sticky ? (props.stickyEnabled ? '64px' : '0px') : 'auto', zIndex: 40, width: '100%', cursor: 'pointer', outline: '1px dashed transparent' }}>
            {sbMode === 'image' && submenuItem.overlayColor && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: submenuItem.overlayColor, opacity: (submenuItem.overlayOpacity || 0) / 100, zIndex: 0, pointerEvents: 'none' }} />}
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '0 16px', overflowX: submenuItem.mobileScroll ? 'auto' : 'visible', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <div style={{ display: 'flex', justifyContent: submenuItem.alignment === 'justify' ? 'space-between' : (submenuItem.alignment === 'center' ? 'center' : (submenuItem.alignment === 'right' ? 'flex-end' : 'flex-start')), gap: '24px', whiteSpace: 'nowrap' }}>
                {(submenuItem.tabs || []).map((tab, idx) => {
                  const isActive = idx === 0;
                  const isPills = submenuItem.styleVariant === 'pills';
                  return (
                    <div key={idx} style={{ padding: isPills ? '8px 16px' : '12px 4px', color: isActive ? (submenuItem.activeColor || '#000000') : (submenuItem.textColor || '#6B7280'), fontWeight: isActive ? '600' : '500', fontSize: '14px', borderBottom: !isPills && isActive ? `2px solid ${submenuItem.activeColor || '#000000'}` : '2px solid transparent', backgroundColor: isPills && isActive ? (submenuItem.activeColor || '#000000') : 'transparent', borderRadius: isPills ? '20px' : '0', ...(isPills && isActive ? { color: '#ffffff' } : {}), cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {tab.label}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}