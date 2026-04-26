import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Check, X, ArrowRight, Menu, Search, User, ShoppingCart, Bell, Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Dribbble, Globe, UserPlus, UserCheck, UserMinus, Users, Home, MoreHorizontal, MoreVertical, Filter, Settings, Grid, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ArrowLeft, ArrowUp, ArrowDown, ExternalLink, Link, Plus, Minus, Edit, Copy, Clipboard, Trash2, Download, Upload, Share2, RefreshCw, RotateCcw, Lock, Unlock, Play, Pause, Square, Volume2, VolumeX, Camera, Video, Image, Music, Bookmark, MessageCircle, Mail, Phone, Tag, CreditCard, DollarSign, Info, HelpCircle, AlertTriangle, AlertCircle, CheckCircle, XCircle, Calendar, Clock, MapPin, Eye, EyeOff, Flag, Zap, TrendingUp } from 'lucide-react';
import HeadingWithMotion from './HeadingWithMotion';
import TextWithMotion from './TextWithMotion';

// Custom X (Twitter) Logo
const XLogo = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const iconMap = {
  Star, Heart, Check, X, ArrowRight, Menu, Search, User, ShoppingCart, Bell,
  Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Dribbble, Globe,
  UserPlus, UserCheck, UserMinus, Users, Home, MoreHorizontal, MoreVertical,
  Filter, Settings, Grid, ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  ArrowLeft, ArrowUp, ArrowDown, ExternalLink, Link, Plus, Minus, Edit, Copy,
  Clipboard, Trash2, Download, Upload, Share2, RefreshCw, RotateCcw, Lock, Unlock,
  Play, Pause, Square, Volume2, VolumeX, Camera, Video, Image, Music,
  Bookmark, MessageCircle, Mail, Phone, Tag, CreditCard, DollarSign,
  Info, HelpCircle, AlertTriangle, AlertCircle, CheckCircle, XCircle,
  Calendar, Clock, MapPin, Eye, EyeOff, Flag, Zap, TrendingUp
};

// Internal component for Follow Button state
const FollowButtonRenderer = ({ item, onSelect, headerElement }) => {
  const [isFollowing, setIsFollowing] = React.useState(false);

  const toggleFollow = (e) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    if (onSelect) {
       onSelect({ ...headerElement, _focusId: item.id });
    }
  };

  const isActive = isFollowing;
  const label = isActive ? item.followingLabel || 'Following' : item.label || 'Follow';
  const iconName = isActive ? 'UserCheck' : item.icon || 'UserPlus';
  const IconComponent = iconMap[iconName] || UserPlus;

  const wrapperStyle = {
    display: 'inline-flex',
    marginTop: `${item.marginTop || 0}px`,
    marginRight: `${item.marginRight || 0}px`,
    marginBottom: `${item.marginBottom || 0}px`,
    marginLeft: `${item.marginLeft || 0}px`,
    cursor: 'pointer',
    outline: '1px dashed transparent',
  };

  // Base styles
  let bg = item.backgroundColor || '#4368D9';
  let color = item.labelColor || '#ffffff';
  let border = item.borderColor ? `1px solid ${item.borderColor}` : 'none';

  // Mode overrides
  if (item.buttonType === 'outline') {
    bg = 'transparent';
    color = item.labelColor || item.backgroundColor || '#4368D9';
    border = `1px solid ${item.borderColor || item.backgroundColor || '#4368D9'}`;
  } else if (item.buttonType === 'text') {
    bg = 'transparent';
    color = item.labelColor || item.backgroundColor || '#4368D9';
    border = 'none';
  }

  // Active state overrides (optional visual feedback)
  if (isActive && item.buttonType === 'primary') {
     // Slight opacity or darken could be nice, but keeping simple as requested: "toggle between Follow -> Following"
     // User said: "Optionally, you can also invert colors"
     // Let's invert for primary
     bg = item.labelColor || '#ffffff';
     color = item.backgroundColor || '#4368D9';
     border = `1px solid ${item.backgroundColor || '#4368D9'}`;
  }

  const buttonStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    backgroundColor: bg,
    color: color,
    border: border,
    cursor: 'pointer',
    
    // Design Props
    fontSize: `${item.fontSize || 14}px`,
    fontWeight: item.fontWeight || '600',
    
    // Radius
    borderTopLeftRadius: `${item.borderRadiusTop || 4}px`,
    borderTopRightRadius: `${item.borderRadiusRight || 4}px`,
    borderBottomRightRadius: `${item.borderRadiusBottom || 4}px`,
    borderBottomLeftRadius: `${item.borderRadiusLeft || 4}px`,
    
    // Padding
    paddingTop: `${item.paddingTop || 10}px`,
    paddingRight: `${item.paddingRight || 20}px`,
    paddingBottom: `${item.paddingBottom || 10}px`,
    paddingLeft: `${item.paddingLeft || 20}px`,

    transition: 'all 0.2s ease',
    minWidth: '100px', // Prevent jumpiness
  };

  const showIcon = item.iconStyle !== 'text_only';
  const showText = item.iconStyle !== 'icon_only';

  return (
    <div 
      onClick={(e) => { 
        if (onSelect) { 
           // If clicking the wrapper, just select
           e.stopPropagation(); 
           onSelect({ ...headerElement, _focusId: item.id }); 
        } 
      }}
      className="hover:outline-blue-500 hover:outline transition-all"
      style={wrapperStyle}
    >
      <button style={buttonStyle} onClick={toggleFollow}>
        {showIcon && <IconComponent size={item.fontSize ? item.fontSize + 2 : 16} />}
        {showText && <span>{label}</span>}
      </button>
    </div>
  );
};

export default function RenderedComponentV2({ element, onSelect }) {
  const { type, props } = element;

  const commonStyles = {
    padding: `${props.padding || 16}px`,
    margin: `${props.margin || 0}px`,
    backgroundColor: props.backgroundColor || 'transparent',
    borderRadius: `${props.borderRadius || 0}px`,
    color: props.color || '#000000',
    fontSize: `${props.fontSize || 16}px`,
    textAlign: props.textAlign || 'left',
    fontFamily: props.fontFamily || 'inherit',
    fontWeight: props.fontWeight || 'normal',
  };

  if (type === 'Heading') {
    /* 
      DEV NOTE - Heading Styling Targets:
      - Wrapper: margin, padding (if headingBox), background, border, shadow, opacity, width, position, z-index
      - Text node (<hX> or <a>): color, fontSize, fontWeight, textAlign, lineHeight, letterSpacing
    */
    
    const Tag = props.level || 'h2';
    const defaultFontSize = {
      h1: 48, h2: 36, h3: 28, h4: 24, h5: 20, h6: 18,
    }[props.level] || 32;

    // Typography styles (applied to text element)
    const textStyles = {
      color: props.color || '#000000',
      fontSize: `${props.fontSize || defaultFontSize}px`,
      fontWeight: props.fontWeight || '600',
      textAlign: props.textAlign || 'left',
      lineHeight: props.lineHeight || 1.2,
      letterSpacing: `${props.letterSpacing || 0}px`,
      margin: 0,
      fontFamily: props.fontFamily || 'inherit',
    };

    // Block alignment wrapper (outer container for left/center/right positioning)
    const blockAlignmentMap = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    };

    const blockAlignWrapperStyles = {
      display: 'flex',
      justifyContent: blockAlignmentMap[props.blockAlignment] || 'flex-start',
      width: '100%',
    };

    // Wrapper styles (box-related)
    const wrapperStyles = {
      display: props.width ? 'block' : 'inline-block', // block if custom width set
      width: props.width || 'auto',
      maxWidth: props.maxWidth || 'none',
      marginTop: `${props.marginTop || 0}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 0}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      position: props.position || 'relative',
      ...(props.position && props.position !== 'static' && {
        top: props.positionTop ? `${props.positionTop}px` : 'auto',
        right: props.positionRight ? `${props.positionRight}px` : 'auto',
        bottom: props.positionBottom ? `${props.positionBottom}px` : 'auto',
        left: props.positionLeft ? `${props.positionLeft}px` : 'auto',
      }),
      zIndex: props.zIndex || 'auto',
      order: props.order || 0,
      alignSelf: props.alignSelf || 'auto',
    };

    // Box styles (only if headingBox enabled)
    if (props.headingBox) {
      wrapperStyles.paddingTop = `${props.paddingTop || 0}px`;
      wrapperStyles.paddingRight = `${props.paddingRight || 0}px`;
      wrapperStyles.paddingBottom = `${props.paddingBottom || 0}px`;
      wrapperStyles.paddingLeft = `${props.paddingLeft || 0}px`;
      
      // Background
      if (props.backgroundMode === 'gradient') {
        const type = props.gradientType || 'linear';
        const angle = props.gradientAngle || 180;
        const c1 = props.gradientColor1 || '#ffffff';
        const c2 = props.gradientColor2 || '#000000';
        wrapperStyles.background = type === 'radial' 
          ? `radial-gradient(circle, ${c1}, ${c2})`
          : `linear-gradient(${angle}deg, ${c1}, ${c2})`;
      } else if (props.backgroundMode === 'image' && props.backgroundImage) {
        wrapperStyles.backgroundImage = `url(${props.backgroundImage})`;
        wrapperStyles.backgroundSize = props.imageSize || 'cover';
        wrapperStyles.backgroundRepeat = props.imageRepeat || 'no-repeat';
        wrapperStyles.backgroundPosition = props.imagePosition || 'center';
      } else {
        wrapperStyles.backgroundColor = props.backgroundColor || 'transparent';
      }
      
      // Border
      if (props.borderWidth) {
        wrapperStyles.border = `${props.borderWidth}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000000'}`;
      }
      wrapperStyles.borderRadius = `${props.borderRadius || 0}px`;
      
      // Effects
      wrapperStyles.opacity = props.opacity !== undefined ? props.opacity : 1;
      if (props.boxShadow) {
        wrapperStyles.boxShadow = props.boxShadow;
      }

      // Overlay if image background
      if (props.backgroundMode === 'image' && props.overlayColor) {
        wrapperStyles.position = 'relative';
      }
    }

    // Custom CSS
    const customStyle = props.customCSS ? { style: props.customCSS } : {};

    const textContent = props.text || 'Your Heading';
    const headingElement = <Tag style={textStyles}>{textContent}</Tag>;

    // Wrap in link if URL provided
    const content = props.linkUrl ? (
      <a
        href={props.linkUrl}
        target={props.linkNewTab ? '_blank' : undefined}
        rel={[
          props.linkNewTab ? 'noopener noreferrer' : '',
          props.linkNofollow ? 'nofollow' : '',
          props.linkSponsored ? 'sponsored' : '',
          props.linkUgc ? 'ugc' : '',
        ].filter(Boolean).join(' ') || undefined}
        aria-label={props.linkAriaLabel || undefined}
        onClick={(e) => {
          // In builder mode, prevent navigation
          if (onSelect) {
            e.preventDefault();
          }
        }}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {headingElement}
      </a>
    ) : headingElement;

    // Use motion-enabled component if motion is configured
    if (props.motion?.enabled) {
      return (
        <div style={blockAlignWrapperStyles}>
          <HeadingWithMotion element={element} props={props} textStyles={textStyles} wrapperStyles={wrapperStyles} content={content} />
        </div>
      );
    }

    return (
      <div style={blockAlignWrapperStyles}>
        <div 
          id={props.elementId || undefined}
          className={props.cssClasses || undefined}
          style={wrapperStyles}
        >
          {props.headingBox && props.backgroundMode === 'image' && props.overlayColor && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: props.overlayColor,
              opacity: (props.overlayOpacity || 0) / 100,
              borderRadius: `${props.borderRadius || 0}px`,
              pointerEvents: 'none',
              zIndex: 0,
            }} />
          )}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {content}
          </div>
          {props.customCSS && (
            <style>{`
              #${props.elementId || `heading-${element.id}`} {
                ${props.customCSS}
              }
            `}</style>
          )}
        </div>
      </div>
    );
    }

  if (type === 'Text') {
    // Typography styles (applied to text element)
    const textStyles = {
      color: props.color || '#000000',
      fontSize: `${props.fontSize || 16}px`,
      fontWeight: props.fontWeight || '400',
      textAlign: props.textAlign || 'left',
      lineHeight: props.lineHeight || 1.6,
      letterSpacing: `${props.letterSpacing || 0}px`,
      margin: 0,
      fontFamily: props.fontFamily || 'inherit',
    };

    // Block alignment wrapper (outer container for left/center/right positioning)
    const blockAlignmentMap = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    };

    const blockAlignWrapperStyles = {
      display: 'flex',
      justifyContent: blockAlignmentMap[props.blockAlignment] || 'flex-start',
      width: '100%',
    };

    // Wrapper styles (box-related)
    const wrapperStyles = {
      display: props.width ? 'block' : 'inline-block',
      width: props.width || 'auto',
      maxWidth: props.maxWidth || 'none',
      marginTop: `${props.marginTop || 0}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 0}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      position: props.position || 'relative',
      ...(props.position && props.position !== 'static' && {
        top: props.positionTop ? `${props.positionTop}px` : 'auto',
        right: props.positionRight ? `${props.positionRight}px` : 'auto',
        bottom: props.positionBottom ? `${props.positionBottom}px` : 'auto',
        left: props.positionLeft ? `${props.positionLeft}px` : 'auto',
      }),
      zIndex: props.zIndex || 'auto',
      order: props.order || 0,
      alignSelf: props.alignSelf || 'auto',
    };

    // Box styles (only if textBox enabled)
    if (props.textBox) {
      wrapperStyles.paddingTop = `${props.paddingTop || 0}px`;
      wrapperStyles.paddingRight = `${props.paddingRight || 0}px`;
      wrapperStyles.paddingBottom = `${props.paddingBottom || 0}px`;
      wrapperStyles.paddingLeft = `${props.paddingLeft || 0}px`;
      
      // Background
      if (props.backgroundMode === 'gradient') {
        const type = props.gradientType || 'linear';
        const angle = props.gradientAngle || 180;
        const c1 = props.gradientColor1 || '#ffffff';
        const c2 = props.gradientColor2 || '#000000';
        wrapperStyles.background = type === 'radial' 
          ? `radial-gradient(circle, ${c1}, ${c2})`
          : `linear-gradient(${angle}deg, ${c1}, ${c2})`;
      } else if (props.backgroundMode === 'image' && props.backgroundImage) {
        wrapperStyles.backgroundImage = `url(${props.backgroundImage})`;
        wrapperStyles.backgroundSize = props.imageSize || 'cover';
        wrapperStyles.backgroundRepeat = props.imageRepeat || 'no-repeat';
        wrapperStyles.backgroundPosition = props.imagePosition || 'center';
      } else {
        wrapperStyles.backgroundColor = props.backgroundColor || 'transparent';
      }
      
      // Border
      if (props.borderWidth) {
        wrapperStyles.border = `${props.borderWidth}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000000'}`;
      }
      wrapperStyles.borderRadius = `${props.borderRadius || 0}px`;
      
      // Effects
      wrapperStyles.opacity = props.opacity !== undefined ? props.opacity : 1;
      if (props.boxShadow) {
        wrapperStyles.boxShadow = props.boxShadow;
      }

      // Overlay if image background
      if (props.backgroundMode === 'image' && props.overlayColor) {
        wrapperStyles.position = 'relative';
      }
    }

    const textContent = props.text || 'Your text content goes here';
    const textElement = <p style={textStyles}>{textContent}</p>;

    // Wrap in link if URL provided
    const content = props.linkUrl ? (
      <a
        href={props.linkUrl}
        target={props.linkNewTab ? '_blank' : undefined}
        rel={[
          props.linkNewTab ? 'noopener noreferrer' : '',
          props.linkNofollow ? 'nofollow' : '',
          props.linkSponsored ? 'sponsored' : '',
          props.linkUgc ? 'ugc' : '',
        ].filter(Boolean).join(' ') || undefined}
        aria-label={props.linkAriaLabel || undefined}
        onClick={(e) => {
          // In builder mode, prevent navigation
          if (onSelect) {
            e.preventDefault();
          }
        }}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {textElement}
      </a>
    ) : textElement;

    // Use motion-enabled component if motion is configured
    if (props.motion?.enabled) {
      return (
        <div style={blockAlignWrapperStyles}>
          <TextWithMotion element={element} props={props} textStyles={textStyles} wrapperStyles={wrapperStyles} content={content} />
        </div>
      );
    }

    return (
      <div style={blockAlignWrapperStyles}>
        <div 
          id={props.elementId || undefined}
          className={props.cssClasses || undefined}
          style={wrapperStyles}
        >
          {props.textBox && props.backgroundMode === 'image' && props.overlayColor && (
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: props.overlayColor,
              opacity: (props.overlayOpacity || 0) / 100,
              borderRadius: `${props.borderRadius || 0}px`,
              pointerEvents: 'none',
              zIndex: 0,
            }} />
          )}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {content}
          </div>
          {props.customCSS && (
            <style>{`
              #${props.elementId || `text-${element.id}`} {
                ${props.customCSS}
              }
            `}</style>
          )}
        </div>
      </div>
    );
    }

  if (type === 'Image') {
    // Resolve image source
    const imageSrc = props.srcType === 'url' ? (props.srcUrl || props.src) : props.uploadedAssetId || props.src || 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800';

    // Calculate dimensions
    const getWidth = () => {
      if (props.widthMode === 'full') return '100%';
      if (props.widthMode === '%') return `${props.width || 100}%`;
      if (props.widthMode === 'px') return `${props.width || 100}px`;
      return 'auto';
    };

    const getHeight = () => {
      if (props.heightMode === 'vh') return `${props.height || 100}vh`;
      if (props.heightMode === 'px') return `${props.height || 100}px`;
      return 'auto';
    };

    // Image styles (applied to <img> tag)
    const imageStyles = {
      width: '100%',
      height: '100%',
      objectFit: props.objectFit || 'cover',
      objectPosition: props.objectPosition || 'center',
      display: 'block',
    };

    // Image container styles (applies border/shadow/effects to container)
    const containerStyles = {
      display: 'inline-block',
      width: getWidth(),
      height: getHeight(),
      overflow: 'hidden',
      borderRadius: `${props.borderRadius || 0}px`,
      backgroundColor: props.backgroundColor || 'transparent',
      opacity: props.opacity !== undefined ? props.opacity : 1,
    };

    // Border
    if (props.borderEnabled && props.borderWidth) {
      containerStyles.border = `${props.borderWidth}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000000'}`;
    }

    // Shadow
    if (props.shadowEnabled) {
      containerStyles.boxShadow = `${props.shadowX || 0}px ${props.shadowY || 4}px ${props.shadowBlur || 6}px ${props.shadowSpread || 0}px ${props.shadowColor || 'rgba(0,0,0,0.1)'}`;
    }

    // Wrapper styles (spacing and positioning)
    const wrapperStyles = {
      display: 'block',
      paddingTop: `${props.paddingTop || 0}px`,
      paddingRight: `${props.paddingRight || 0}px`,
      paddingBottom: `${props.paddingBottom || 0}px`,
      paddingLeft: `${props.paddingLeft || 0}px`,
      marginTop: `${props.marginTop || 0}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 0}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      position: props.position || 'relative',
      ...(props.position && props.position !== 'static' && {
        top: props.positionTop ? `${props.positionTop}px` : 'auto',
        right: props.positionRight ? `${props.positionRight}px` : 'auto',
        bottom: props.positionBottom ? `${props.positionBottom}px` : 'auto',
        left: props.positionLeft ? `${props.positionLeft}px` : 'auto',
      }),
      zIndex: props.zIndex || 'auto',
      order: props.order || 0,
      alignSelf: props.alignSelf || 'auto',
    };

    // Alignment wrapper (flex container for horizontal alignment)
    const alignmentMap = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    };

    const alignWrapperStyles = {
      display: 'flex',
      justifyContent: alignmentMap[props.alignment] || 'flex-start',
    };

    const imageElement = (
      <div style={alignWrapperStyles}>
        <div style={containerStyles}>
          <img
            src={imageSrc}
            alt={props.altText || props.alt || 'Image'}
            title={props.title || undefined}
            style={imageStyles}
          />
        </div>
      </div>
    );

    // Wrap in link if enabled
    const content = props.linkEnabled && props.linkUrl ? (
      <a
        href={props.linkUrl}
        target={props.linkNewTab ? '_blank' : undefined}
        rel={[
          props.linkNewTab ? 'noopener noreferrer' : '',
          props.linkNofollow ? 'nofollow' : '',
          props.linkSponsored ? 'sponsored' : '',
        ].filter(Boolean).join(' ') || undefined}
        onClick={(e) => {
          if (onSelect) e.preventDefault();
        }}
        style={{ display: 'inline-block', lineHeight: 0 }}
      >
        {imageElement}
      </a>
    ) : imageElement;

    // Motion wrapper (reuse pattern from Heading/Text)
    if (props.motion?.enabled) {
      // Import motion component dynamically or inline simple motion wrapper
      return (
        <div
          id={props.elementId || undefined}
          className={props.cssClasses || undefined}
          style={wrapperStyles}
        >
          {content}
          {props.customCSS && (
            <style>{`
              #${props.elementId || `image-${element.id}`} {
                ${props.customCSS}
              }
            `}</style>
          )}
        </div>
      );
    }

    return (
      <div
        id={props.elementId || undefined}
        className={props.cssClasses || undefined}
        style={wrapperStyles}
      >
        {content}
        {props.customCSS && (
          <style>{`
            #${props.elementId || `image-${element.id}`} {
              ${props.customCSS}
            }
          `}</style>
        )}
      </div>
    );
  }

  if (type === 'Button') {
    // Alignment wrapper (full-width flex container)
    const alignmentMap = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    };

    const wrapperStyles = {
      display: 'flex',
      justifyContent: alignmentMap[props.alignment] || 'flex-start',
      width: '100%',
      marginTop: `${props.marginTop || 0}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 0}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      position: props.position || 'relative',
      ...(props.position && props.position !== 'static' && {
        top: props.positionTop ? `${props.positionTop}px` : 'auto',
        right: props.positionRight ? `${props.positionRight}px` : 'auto',
        bottom: props.positionBottom ? `${props.positionBottom}px` : 'auto',
        left: props.positionLeft ? `${props.positionLeft}px` : 'auto',
      }),
      zIndex: props.zIndex || 'auto',
      order: props.order || 0,
      alignSelf: props.alignSelf || 'auto',
    };

    const buttonStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: props.backgroundColor || '#4368D9',
      color: props.color || '#ffffff',
      fontSize: `${props.fontSize || 16}px`,
      fontWeight: props.fontWeight || '500',
      paddingTop: `${props.paddingTop || 12}px`,
      paddingRight: `${props.paddingRight || 24}px`,
      paddingBottom: `${props.paddingBottom || 12}px`,
      paddingLeft: `${props.paddingLeft || 24}px`,
      borderRadius: `${props.borderRadius || 6}px`,
      border: 'none',
      cursor: 'pointer',
      width: props.fullWidth ? '100%' : 'fit-content',
      fontFamily: props.fontFamily || 'inherit',
      opacity: props.opacity !== undefined ? props.opacity : 1,
      boxShadow: props.boxShadow || 'none',
    };

    // Use motion.button if motion is enabled
    if (props.motion?.enabled) {
      // Get entrance animation preset
      const getEntranceVariants = () => {
        const preset = props.motion?.entrance?.preset || 'none';
        const duration = (props.motion?.entrance?.durationMs || 400) / 1000;
        const delay = (props.motion?.entrance?.delayMs || 0) / 1000;

        const variants = {
          fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
          fadeUp: { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } },
          fadeDown: { initial: { opacity: 0, y: -30 }, animate: { opacity: 1, y: 0 } },
          fadeLeft: { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 } },
          fadeRight: { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 } },
          zoom: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
          zoomUp: { initial: { opacity: 0, scale: 0.8, y: 30 }, animate: { opacity: 1, scale: 1, y: 0 } },
          slideUp: { initial: { y: 50 }, animate: { y: 0 } },
          slideDown: { initial: { y: -50 }, animate: { y: 0 } },
        };

        return variants[preset] || { initial: {}, animate: {} };
      };

      const entranceVariants = getEntranceVariants();
      const transitionDuration = (props.motion?.transition?.durationMs || 200) / 1000;

      return (
        <div style={wrapperStyles}>
          <motion.button
            style={buttonStyles}
            initial={entranceVariants.initial}
            animate={entranceVariants.animate}
            transition={{
              duration: props.motion?.entrance?.preset !== 'none' 
                ? (props.motion?.entrance?.durationMs || 400) / 1000
                : transitionDuration,
              delay: (props.motion?.entrance?.delayMs || 0) / 1000,
            }}
            whileHover={{
              scale: props.motion?.interaction?.enabled !== false ? (props.motion?.hover?.scale || 1) : 1,
              boxShadow: props.motion?.interaction?.enabled !== false && props.motion?.hover?.shadowIntensity 
                ? `0 ${props.motion.hover.shadowIntensity}px ${props.motion.hover.shadowIntensity * 2}px rgba(0,0,0,0.2)` 
                : buttonStyles.boxShadow,
              transition: { duration: transitionDuration }
            }}
            whileTap={{
              scale: props.motion?.interaction?.enabled !== false ? (props.motion?.tap?.scale || 0.95) : 1,
              transition: { duration: transitionDuration }
            }}
          >
            {props.text || 'Click Me'}
          </motion.button>
        </div>
      );
    }

    // Non-motion button
    return (
      <div style={wrapperStyles}>
        <button style={buttonStyles}>
          {props.text || 'Click Me'}
        </button>
      </div>
    );
  }

  if (type === 'Icon') {
    // Alignment wrapper
    const alignmentMap = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    };

    const alignWrapperStyles = {
      display: 'flex',
      justifyContent: alignmentMap[props.alignment] || 'flex-start',
      width: '100%',
      marginTop: `${props.marginTop || 0}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 0}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      position: props.position || 'relative',
      ...(props.position && props.position !== 'static' && {
        top: props.positionTop ? `${props.positionTop}px` : 'auto',
        right: props.positionRight ? `${props.positionRight}px` : 'auto',
        bottom: props.positionBottom ? `${props.positionBottom}px` : 'auto',
        left: props.positionLeft ? `${props.positionLeft}px` : 'auto',
      }),
      zIndex: props.zIndex || 'auto',
      order: props.order || 0,
      alignSelf: props.alignSelf || 'auto',
    };

    // Icon container styles
    const containerStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: props.width || 'auto',
      height: props.height || 'auto',
      paddingTop: `${props.paddingTop || 0}px`,
      paddingRight: `${props.paddingRight || 0}px`,
      paddingBottom: `${props.paddingBottom || 0}px`,
      paddingLeft: `${props.paddingLeft || 0}px`,
      backgroundColor: props.bgEnabled ? (props.bgColor || 'transparent') : 'transparent',
      borderRadius: `${props.borderRadius || 0}px`,
      opacity: props.opacity !== undefined ? props.opacity : 1,
      boxShadow: props.boxShadow || 'none',
    };

    // Border
    if (props.borderEnabled && props.borderWidth) {
      containerStyles.border = `${props.borderWidth}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000000'}`;
    }

    // Render icon based on source
    let iconContent = null;
    
    if (props.iconSource === 'emoji') {
      iconContent = (
        <span style={{ fontSize: `${props.iconSize || 32}px`, lineHeight: 1 }}>
          {props.emoji || '⭐'}
        </span>
      );
    } else if (props.iconSource === 'svg' && props.svgMarkup) {
      const sanitizedSvg = props.svgMarkup.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      iconContent = (
        <div 
          style={{ 
            display: 'flex', 
            width: `${props.iconSize || 32}px`, 
            height: `${props.iconSize || 32}px`,
            color: props.color || '#000000'
          }}
          dangerouslySetInnerHTML={{ __html: sanitizedSvg }}
        />
      );
    } else {
      // Library mode (Lucide)
      const IconComponent = iconMap[props.iconName || props.icon] || Star;
      iconContent = (
        <IconComponent 
          size={props.iconSize || 32} 
          color={props.color || '#000000'}
          strokeWidth={props.strokeWidth || 2}
        />
      );
    }

    // Motion wrapper if enabled
    if (props.motion?.enabled) {
      const getEntranceVariants = () => {
        const preset = props.motion?.entrance?.preset || 'none';
        const variants = {
          fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
          fadeUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
          fadeDown: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } },
          fadeLeft: { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } },
          fadeRight: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
          zoom: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
          zoomUp: { initial: { opacity: 0, scale: 0.8, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 } },
          slideUp: { initial: { y: 40 }, animate: { y: 0 } },
          slideDown: { initial: { y: -40 }, animate: { y: 0 } },
        };
        return variants[preset] || {};
      };

      const entranceVariants = getEntranceVariants();

      return (
        <div style={alignWrapperStyles}>
          <motion.div
            id={props.elementId || undefined}
            className={props.cssClasses || undefined}
            style={containerStyles}
            initial={entranceVariants.initial}
            animate={entranceVariants.animate}
            transition={{
              duration: (props.motion.entrance?.durationMs || 400) / 1000,
              delay: (props.motion.entrance?.delayMs || 0) / 1000,
            }}
          >
            {iconContent}
            {props.customCSS && (
              <style>{`
                #${props.elementId || `icon-${element.id}`} {
                  ${props.customCSS}
                }
              `}</style>
            )}
          </motion.div>
        </div>
      );
    }

    return (
      <div style={alignWrapperStyles}>
        <div
          id={props.elementId || undefined}
          className={props.cssClasses || undefined}
          style={containerStyles}
        >
          {iconContent}
          {props.customCSS && (
            <style>{`
              #${props.elementId || `icon-${element.id}`} {
                ${props.customCSS}
              }
            `}</style>
          )}
        </div>
      </div>
    );
  }

  if (type === 'Divider') {
    const dividerType = props.dividerType || 'line';
    const linePlacement = props.linePlacement || 'split';
    const alignment = props.alignment || 'center';

    // Wrapper styles (spacing and positioning)
    const wrapperStyles = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: alignment === 'left' ? 'flex-start' : alignment === 'right' ? 'flex-end' : 'center',
      paddingTop: `${props.paddingTop || 0}px`,
      paddingRight: `${props.paddingRight || 0}px`,
      paddingBottom: `${props.paddingBottom || 0}px`,
      paddingLeft: `${props.paddingLeft || 0}px`,
      marginTop: `${props.marginTop || 16}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 16}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      position: props.position || 'relative',
      ...(props.position && props.position !== 'static' && {
        top: props.positionTop ? `${props.positionTop}px` : 'auto',
        right: props.positionRight ? `${props.positionRight}px` : 'auto',
        bottom: props.positionBottom ? `${props.positionBottom}px` : 'auto',
        left: props.positionLeft ? `${props.positionLeft}px` : 'auto',
      }),
      zIndex: props.zIndex || 'auto',
      order: props.order || 0,
      alignSelf: props.alignSelf || 'auto',
      gap: `${props.gap || 12}px`,
      width: '100%',
    };

    // Line styles
    const getLineStyles = () => {
      const base = {
        flex: 1,
        height: 0,
        margin: 0,
        opacity: props.lineOpacity !== undefined ? props.lineOpacity : 1,
      };

      if (props.lineStyle === 'gradient') {
        const angle = props.gradientAngle || 90;
        const c1 = props.gradientColor1 || '#E5E7EB';
        const c2 = props.gradientColor2 || '#9CA3AF';
        return {
          ...base,
          border: 'none',
          borderTop: `${props.lineThickness || 1}px solid transparent`,
          backgroundImage: `linear-gradient(${angle}deg, ${c1}, ${c2})`,
          backgroundClip: 'padding-box',
        };
      }

      if (props.lineStyle === 'glow') {
        return {
          ...base,
          border: 'none',
          borderTop: `${props.lineThickness || 1}px solid ${props.lineColor || '#E5E7EB'}`,
          boxShadow: `0 0 ${(props.lineThickness || 1) * 3}px ${props.lineColor || '#E5E7EB'}`,
        };
      }

      return {
        ...base,
        border: 'none',
        borderTop: `${props.lineThickness || 1}px ${props.lineStyle || 'solid'} ${props.lineColor || '#E5E7EB'}`,
      };
    };

    const lineStyles = getLineStyles();

    // Content (text/icon/emoji)
    const renderContent = () => {
      if (dividerType === 'text' && props.text) {
        return (
          <span style={{
            fontSize: `${props.textSize || 14}px`,
            fontWeight: props.fontWeight || '500',
            color: props.textColor || '#374151',
            whiteSpace: 'nowrap',
            padding: '0 4px',
          }}>
            {props.text}
          </span>
        );
      }

      if (dividerType === 'icon') {
        const IconComponent = iconMap[props.iconName || 'Star'] || Star;
        return (
          <div style={{ display: 'flex', padding: '0 4px' }}>
            <IconComponent size={props.iconSize || 20} color={props.iconColor || '#374151'} />
          </div>
        );
      }

      if (dividerType === 'emoji') {
        return (
          <span style={{
            fontSize: `${props.iconSize || 20}px`,
            lineHeight: 1,
            padding: '0 4px',
          }}>
            {props.emoji || '⭐'}
          </span>
        );
      }

      return null;
    };

    const content = renderContent();
    const showLeftLine = dividerType === 'line' || linePlacement === 'split' || linePlacement === 'left';
    const showRightLine = dividerType === 'line' || linePlacement === 'split' || linePlacement === 'right';

    // Container for width control
    const containerStyles = {
      width: props.lineWidth || '100%',
      maxWidth: props.lineMaxWidth || 'none',
      display: 'flex',
      alignItems: 'center',
      gap: `${props.gap || 12}px`,
    };

    // Motion wrapper if enabled
    if (props.motion?.enabled) {
      const getEntranceVariants = () => {
        const preset = props.motion?.entrance?.preset || 'none';
        const variants = {
          fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
          fadeUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
          fadeDown: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } },
          fadeLeft: { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } },
          fadeRight: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
          zoom: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
          zoomUp: { initial: { opacity: 0, scale: 0.8, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 } },
          slideUp: { initial: { y: 40 }, animate: { y: 0 } },
          slideDown: { initial: { y: -40 }, animate: { y: 0 } },
        };
        return variants[preset] || {};
      };

      const entranceVariants = getEntranceVariants();

      return (
        <motion.div
          id={props.elementId || undefined}
          className={props.cssClasses || undefined}
          style={wrapperStyles}
          initial={entranceVariants.initial}
          animate={entranceVariants.animate}
          transition={{
            duration: (props.motion.entrance?.durationMs || 400) / 1000,
            delay: (props.motion.entrance?.delayMs || 0) / 1000,
          }}
        >
          <div style={containerStyles}>
            {showLeftLine && <hr style={lineStyles} />}
            {content}
            {showRightLine && <hr style={lineStyles} />}
          </div>
          {props.customCSS && (
            <style>{`
              #${props.elementId || `divider-${element.id}`} {
                ${props.customCSS}
              }
            `}</style>
          )}
        </motion.div>
      );
    }

    return (
      <div
        id={props.elementId || undefined}
        className={props.cssClasses || undefined}
        style={wrapperStyles}
      >
        <div style={containerStyles}>
          {showLeftLine && <hr style={lineStyles} />}
          {content}
          {showRightLine && <hr style={lineStyles} />}
        </div>
        {props.customCSS && (
          <style>{`
            #${props.elementId || `divider-${element.id}`} {
              ${props.customCSS}
            }
          `}</style>
        )}
      </div>
    );
  }

  if (type === 'Spacer') {
    // Determine height based on responsive settings
    const getSpacerHeight = () => {
      if (props.responsive?.enabled) {
        // In builder, we don't have actual viewport info, so we use spacePx as fallback
        // In production, this would use media queries or viewport detection
        return props.responsive.desktop || props.spacePx || 32;
      }
      return props.spacePx || 32;
    };

    const spacerHeight = getSpacerHeight();

    const wrapperStyles = {
      // Core dimensions
      height: `${spacerHeight}px`,
      width: props.width || '100%',
      maxWidth: props.maxWidth || 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      
      // Spacing (Internal)
      paddingTop: `${props.paddingTop || 0}px`,
      paddingRight: `${props.paddingRight || 0}px`,
      paddingBottom: `${props.paddingBottom || 0}px`,
      paddingLeft: `${props.paddingLeft || 0}px`,
      
      // Spacing (External)
      marginTop: `${props.marginTop || 0}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 0}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      
      // Background
      backgroundColor: props.backgroundEnabled ? (props.backgroundColor || 'transparent') : 'transparent',
      
      // Border
      border: props.borderEnabled ? `${props.borderWidth || 1}px solid ${props.borderColor || '#E5E7EB'}` : 'none',
      borderRadius: `${props.borderRadius || 0}px`,
      
      // Position
      position: props.position || 'relative',
      ...(props.position && props.position !== 'static' && {
        top: props.positionTop ? `${props.positionTop}px` : 'auto',
        right: props.positionRight ? `${props.positionRight}px` : 'auto',
        bottom: props.positionBottom ? `${props.positionBottom}px` : 'auto',
        left: props.positionLeft ? `${props.positionLeft}px` : 'auto',
      }),
      zIndex: props.zIndex || 'auto',
      order: props.order || 0,
      alignSelf: props.alignSelf || 'auto',
    };

    // Guide line (editor only) - shown when showGuide is enabled or when in builder mode
    const showGuideLine = props.showGuide || onSelect; // Show in builder if onSelect exists

    // Motion wrapper if enabled
    if (props.motion?.enabled) {
      const getEntranceVariants = () => {
        const preset = props.motion?.entrance?.preset || 'none';
        const variants = {
          fade: { initial: { opacity: 0 }, animate: { opacity: 1 } },
          fadeUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
          fadeDown: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 } },
          fadeLeft: { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 } },
          fadeRight: { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 } },
          zoom: { initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 } },
          zoomUp: { initial: { opacity: 0, scale: 0.8, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 } },
          slideUp: { initial: { y: 40 }, animate: { y: 0 } },
          slideDown: { initial: { y: -40 }, animate: { y: 0 } },
        };
        return variants[preset] || {};
      };

      const entranceVariants = getEntranceVariants();

      return (
        <motion.div
          id={props.elementId || undefined}
          className={props.cssClasses || undefined}
          style={wrapperStyles}
          initial={entranceVariants.initial}
          animate={entranceVariants.animate}
          transition={{
            duration: (props.motion.entrance?.durationMs || 400) / 1000,
            delay: (props.motion.entrance?.delayMs || 0) / 1000,
          }}
        >
          {showGuideLine && (
            <div style={{
              width: '100%',
              height: '100%',
              borderTop: '1px dashed rgba(67, 104, 217, 0.3)',
              borderBottom: '1px dashed rgba(67, 104, 217, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '10px',
                color: 'rgba(67, 104, 217, 0.6)',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                backgroundColor: 'rgba(67, 104, 217, 0.1)',
                padding: '4px 8px',
                borderRadius: '4px',
              }}>
                Spacer — {spacerHeight}px
              </span>
            </div>
          )}
          {props.customCSS && (
            <style>{`
              #${props.elementId || `spacer-${element.id}`} {
                ${props.customCSS}
              }
            `}</style>
          )}
        </motion.div>
      );
    }

    return (
      <div
        id={props.elementId || undefined}
        className={props.cssClasses || undefined}
        style={wrapperStyles}
      >
        {showGuideLine && (
          <div style={{
            width: '100%',
            height: '100%',
            borderTop: '1px dashed rgba(67, 104, 217, 0.3)',
            borderBottom: '1px dashed rgba(67, 104, 217, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontSize: '10px',
              color: 'rgba(67, 104, 217, 0.6)',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              backgroundColor: 'rgba(67, 104, 217, 0.1)',
              padding: '4px 8px',
              borderRadius: '4px',
            }}>
              Spacer — {spacerHeight}px
            </span>
          </div>
        )}
        {props.customCSS && (
          <style>{`
            #${props.elementId || `spacer-${element.id}`} {
              ${props.customCSS}
            }
          `}</style>
        )}
      </div>
    );
  }

  if (type === 'Video') {
    // Normalize video source
    const normalizeEmbedUrl = (url, sourceType) => {
      if (!url) return '';
      
      if (sourceType === 'youtube' || url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('watch?v=')) {
          videoId = url.split('watch?v=')[1]?.split('&')[0];
        } else if (url.includes('youtu.be/')) {
          videoId = url.split('youtu.be/')[1]?.split('?')[0];
        } else if (url.includes('embed/')) {
          return url;
        }
        
        const startParam = props.startTime ? `?start=${Math.floor(props.startTime)}` : '';
        return videoId ? `https://www.youtube.com/embed/${videoId}${startParam}` : url;
      }
      
      if (sourceType === 'vimeo' || url.includes('vimeo.com')) {
        const videoId = url.split('vimeo.com/')[1]?.split('/')[0]?.split('?')[0];
        return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
      }
      
      return url;
    };

    const getVideoSource = () => {
      if (props.sourceType === 'upload' && props.uploadedAssetId) return props.uploadedAssetId;
      if (props.sourceType === 'url' && props.videoUrl) return props.videoUrl;
      if (['youtube', 'vimeo'].includes(props.sourceType) && props.embedUrl) {
        return normalizeEmbedUrl(props.embedUrl, props.sourceType);
      }
      // Fallback to legacy src prop
      return normalizeEmbedUrl(props.src || props.embedUrl, props.sourceType);
    };

    const videoSrc = getVideoSource();
    const isEmbed = ['youtube', 'vimeo'].includes(props.sourceType);

    // Calculate dimensions
    const getWidth = () => {
      if (props.widthMode === 'full') return '100%';
      if (props.widthMode === '%') return `${props.width || 100}%`;
      if (props.widthMode === 'px') return `${props.width || 100}px`;
      return '100%';
    };

    const getHeight = () => {
      if (props.heightMode === 'vh') return `${props.height || 100}vh`;
      if (props.heightMode === 'px') return `${props.height || 100}px`;
      return 'auto';
    };

    // Aspect ratio calculation
    const getAspectRatio = () => {
      const presets = {
        '16:9': '56.25%',
        '4:3': '75%',
        '1:1': '100%',
        '9:16': '177.78%',
      };
      
      if (props.aspectMode && props.aspectMode !== 'auto' && props.aspectMode !== 'custom') {
        return presets[props.aspectMode];
      }
      
      if (props.aspectMode === 'custom' && props.aspectW && props.aspectH) {
        return `${(props.aspectH / props.aspectW) * 100}%`;
      }
      
      return null;
    };

    const aspectRatio = getAspectRatio();

    // Wrapper styles
    const wrapperStyles = {
      width: getWidth(),
      paddingTop: `${props.paddingTop || 0}px`,
      paddingRight: `${props.paddingRight || 0}px`,
      paddingBottom: `${props.paddingBottom || 0}px`,
      paddingLeft: `${props.paddingLeft || 0}px`,
      marginTop: `${props.marginTop || 0}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 0}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      position: props.position || 'relative',
      ...(props.position && props.position !== 'static' && {
        top: props.positionTop ? `${props.positionTop}px` : 'auto',
        right: props.positionRight ? `${props.positionRight}px` : 'auto',
        bottom: props.positionBottom ? `${props.positionBottom}px` : 'auto',
        left: props.positionLeft ? `${props.positionLeft}px` : 'auto',
      }),
      zIndex: props.zIndex || 'auto',
      order: props.order || 0,
      alignSelf: props.alignSelf || 'auto',
      backgroundColor: props.backgroundColor || '#000000',
      opacity: props.opacity !== undefined ? props.opacity : 1,
    };

    // Video container styles (aspect ratio wrapper)
    const containerStyles = {
      position: 'relative',
      width: '100%',
      height: props.heightMode !== 'auto' ? getHeight() : (aspectRatio ? 0 : 'auto'),
      paddingBottom: aspectRatio || 0,
      overflow: 'hidden',
      borderRadius: `${props.borderRadius || 0}px`,
      backgroundColor: props.backgroundColor || '#000000',
    };

    // Border
    if (props.borderEnabled && props.borderWidth) {
      containerStyles.border = `${props.borderWidth}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000000'}`;
    }

    // Shadow
    if (props.shadowEnabled) {
      containerStyles.boxShadow = `${props.shadowX || 0}px ${props.shadowY || 4}px ${props.shadowBlur || 6}px ${props.shadowSpread || 0}px ${props.shadowColor || 'rgba(0,0,0,0.1)'}`;
    }

    const videoInnerStyles = {
      position: aspectRatio ? 'absolute' : 'relative',
      top: 0,
      left: 0,
      width: '100%',
      height: aspectRatio ? '100%' : (props.heightMode !== 'auto' ? '100%' : 'auto'),
      border: 'none',
      display: 'block',
    };

    // Apply object-fit only for video files
    if (!isEmbed && props.objectFit) {
      videoInnerStyles.objectFit = props.objectFit;
    }

    const videoElement = isEmbed ? (
      <iframe
        src={videoSrc}
        title={props.title || 'Video'}
        style={videoInnerStyles}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading={props.lazyLoad ? 'lazy' : undefined}
      />
    ) : (
      <video
        src={videoSrc}
        poster={props.posterUrl || undefined}
        controls={props.controls}
        autoPlay={props.autoplay}
        muted={props.muted || props.autoplay}
        loop={props.loop}
        playsInline={props.playsInline}
        preload={props.preload || 'metadata'}
        style={videoInnerStyles}
        onLoadedMetadata={(e) => {
          if (props.startTime && e.target.currentTime !== props.startTime) {
            e.target.currentTime = props.startTime;
          }
        }}
      />
    );

    const content = (
      <div style={containerStyles}>
        {videoElement}
      </div>
    );

    // Caption
    const withCaption = props.caption ? (
      <>
        {content}
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px', textAlign: 'center' }}>
          {props.caption}
        </p>
      </>
    ) : content;

    // Motion wrapper (same pattern as Heading/Text/Image)
    if (props.motion?.enabled) {
      return (
        <div
          id={props.elementId || undefined}
          className={props.cssClasses || undefined}
          style={wrapperStyles}
        >
          {withCaption}
          {props.customCSS && (
            <style>{`
              #${props.elementId || `video-${element.id}`} {
                ${props.customCSS}
              }
            `}</style>
          )}
        </div>
      );
    }

    return (
      <div
        id={props.elementId || undefined}
        className={props.cssClasses || undefined}
        style={wrapperStyles}
      >
        {withCaption}
        {props.customCSS && (
          <style>{`
            #${props.elementId || `video-${element.id}`} {
              ${props.customCSS}
            }
          `}</style>
        )}
      </div>
    );
  }

  if (type === 'Container') {
    // NOTE: Container/Section must NOT be used inside rendered components in builder
    // They are layout elements handled by CanvasV2 with nested droppables
    // This render is only for preview/production
    const children = props.children || [];
    
    const getWidth = () => {
      if (props.widthMode === 'full') return '100%';
      return props.maxWidth ? `${props.maxWidth}px` : '1200px';
    };
    
    const wrapperStyles = {
      width: props.widthMode === 'full' ? '100%' : 'auto',
      maxWidth: props.widthMode === 'boxed' ? getWidth() : 'none',
      margin: '0 auto',
      minHeight: props.minHeight || 'auto',
      overflow: props.overflow || 'visible',
      position: props.position || 'relative',
      ...(props.position && props.position !== 'static' && {
        top: props.positionTop ? `${props.positionTop}px` : 'auto',
        right: props.positionRight ? `${props.positionRight}px` : 'auto',
        bottom: props.positionBottom ? `${props.positionBottom}px` : 'auto',
        left: props.positionLeft ? `${props.positionLeft}px` : 'auto',
      }),
      zIndex: props.zIndex || 'auto',
      order: props.order || 0,
      alignSelf: props.alignSelf || 'auto',
      paddingTop: `${props.paddingTop || 24}px`,
      paddingRight: `${props.paddingRight || 24}px`,
      paddingBottom: `${props.paddingBottom || 24}px`,
      paddingLeft: `${props.paddingLeft || 24}px`,
      marginTop: `${props.marginTop || 0}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 0}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      display: props.displayMode === 'block' ? 'block' : 'flex',
      flexDirection: props.flexDirection || 'column',
      flexWrap: props.flexWrap || 'nowrap',
      justifyContent: props.justifyContent || 'flex-start',
      alignItems: props.alignItems || 'stretch',
      gap: `${props.gap || 16}px`,
      opacity: props.opacity !== undefined ? props.opacity : 1,
    };
    
    if (props.backgroundMode === 'gradient') {
      const type = props.gradientType || 'linear';
      const angle = props.gradientAngle || 180;
      const c1 = props.gradientColor1 || '#ffffff';
      const c2 = props.gradientColor2 || '#000000';
      wrapperStyles.background = type === 'radial' 
        ? `radial-gradient(circle, ${c1}, ${c2})`
        : `linear-gradient(${angle}deg, ${c1}, ${c2})`;
    } else if (props.backgroundMode === 'image' && props.backgroundImage) {
      wrapperStyles.backgroundImage = `url(${props.backgroundImage})`;
      wrapperStyles.backgroundSize = props.imageSize || 'cover';
      wrapperStyles.backgroundRepeat = props.imageRepeat || 'no-repeat';
      wrapperStyles.backgroundPosition = props.imagePosition || 'center';
    } else {
      wrapperStyles.backgroundColor = props.backgroundColor || 'transparent';
    }
    
    if (props.borderWidth) {
      wrapperStyles.border = `${props.borderWidth}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000000'}`;
    }
    wrapperStyles.borderRadius = `${props.borderRadius || 0}px`;
    
    if (props.boxShadow) {
      wrapperStyles.boxShadow = props.boxShadow;
    }
    
    return (
      <div
        id={props.elementId || undefined}
        className={props.cssClasses || undefined}
        style={wrapperStyles}
      >
        {props.backgroundMode === 'image' && props.overlayColor && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: props.overlayColor,
            opacity: (props.overlayOpacity || 0) / 100,
            borderRadius: `${props.borderRadius || 0}px`,
            pointerEvents: 'none',
            zIndex: 0,
          }} />
        )}
        <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          {children.length === 0 ? (
            <div style={{
              border: '2px dashed rgba(67, 104, 217, 0.3)',
              borderRadius: '8px',
              padding: '40px',
              textAlign: 'center',
              color: '#9CA3AF',
              fontSize: '13px',
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              Container placeholder (children rendered by parent)
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {children.map((child, idx) => (
                <RenderedComponentV2 key={child.id || idx} element={child} onSelect={onSelect} />
              ))}
            </div>
          )}
        </div>
        {props.customCSS && (
          <style>{`
            #${props.elementId || `container-${element.id}`} {
              ${props.customCSS}
            }
          `}</style>
        )}
      </div>
    );
  }

  if (type === 'Section') {
    // NOTE: Section must NOT be used inside rendered components in builder
    // They are layout elements handled by CanvasV2 with nested droppables
    // This render is only for preview/production
    const children = props.children || [];
    
    const wrapperStyles = {
      width: '100%',
      minHeight: props.minHeight || 'auto',
      overflow: props.overflow || 'visible',
      position: props.position || 'relative',
      ...(props.position && props.position !== 'static' && {
        top: props.positionTop ? `${props.positionTop}px` : 'auto',
        right: props.positionRight ? `${props.positionRight}px` : 'auto',
        bottom: props.positionBottom ? `${props.positionBottom}px` : 'auto',
        left: props.positionLeft ? `${props.positionLeft}px` : 'auto',
      }),
      zIndex: props.zIndex || 'auto',
      order: props.order || 0,
      paddingTop: `${props.paddingTop || 48}px`,
      paddingRight: `${props.paddingRight || 24}px`,
      paddingBottom: `${props.paddingBottom || 48}px`,
      paddingLeft: `${props.paddingLeft || 24}px`,
      marginTop: `${props.marginTop || 0}px`,
      marginRight: `${props.marginRight || 0}px`,
      marginBottom: `${props.marginBottom || 0}px`,
      marginLeft: `${props.marginLeft || 0}px`,
      display: props.displayMode === 'block' ? 'block' : 'flex',
      flexDirection: props.flexDirection || 'column',
      flexWrap: props.flexWrap || 'nowrap',
      justifyContent: props.justifyContent || 'flex-start',
      alignItems: props.alignItems || 'stretch',
      gap: `${props.gap || 24}px`,
      opacity: props.opacity !== undefined ? props.opacity : 1,
    };
    
    if (props.backgroundMode === 'gradient') {
      const type = props.gradientType || 'linear';
      const angle = props.gradientAngle || 180;
      const c1 = props.gradientColor1 || '#ffffff';
      const c2 = props.gradientColor2 || '#000000';
      wrapperStyles.background = type === 'radial' 
        ? `radial-gradient(circle, ${c1}, ${c2})`
        : `linear-gradient(${angle}deg, ${c1}, ${c2})`;
    } else if (props.backgroundMode === 'image' && props.backgroundImage) {
      wrapperStyles.backgroundImage = `url(${props.backgroundImage})`;
      wrapperStyles.backgroundSize = props.imageSize || 'cover';
      wrapperStyles.backgroundRepeat = props.imageRepeat || 'no-repeat';
      wrapperStyles.backgroundPosition = props.imagePosition || 'center';
    } else {
      wrapperStyles.backgroundColor = props.backgroundColor || 'transparent';
    }
    
    if (props.borderWidth) {
      wrapperStyles.border = `${props.borderWidth}px ${props.borderStyle || 'solid'} ${props.borderColor || '#000000'}`;
    }
    wrapperStyles.borderRadius = `${props.borderRadius || 0}px`;
    
    if (props.boxShadow) {
      wrapperStyles.boxShadow = props.boxShadow;
    }
    
    const innerStyles = {
      width: '100%',
      maxWidth: props.contentWidth === 'full' ? 'none' : `${props.maxWidth || 1200}px`,
      margin: '0 auto',
    };
    
    return (
      <section
        id={props.elementId || undefined}
        className={props.cssClasses || undefined}
        style={wrapperStyles}
      >
        {props.backgroundMode === 'image' && props.overlayColor && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: props.overlayColor,
            opacity: (props.overlayOpacity || 0) / 100,
            borderRadius: `${props.borderRadius || 0}px`,
            pointerEvents: 'none',
            zIndex: 0,
          }} />
        )}
        <div style={{ ...innerStyles, position: 'relative', zIndex: 1 }}>
          {children.length === 0 ? (
            <div style={{
              border: '2px dashed rgba(67, 104, 217, 0.3)',
              borderRadius: '8px',
              padding: '40px',
              textAlign: 'center',
              color: '#9CA3AF',
              fontSize: '13px',
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              Section placeholder (children rendered by parent)
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {children.map((child, idx) => (
                <RenderedComponentV2 key={child.id || idx} element={child} onSelect={onSelect} />
              ))}
            </div>
          )}
        </div>
        {props.customCSS && (
          <style>{`
            #${props.elementId || `section-${element.id}`} {
              ${props.customCSS}
            }
          `}</style>
        )}
      </section>
    );
  }

  if (type === 'Header') {
    const children = props.children || [];

    const renderHeaderItem = (item) => {
      if (item.type === 'Tagline') {
        return (
          <div 
            key={item.id} 
            onClick={(e) => {
              if (onSelect) {
                e.stopPropagation();
                onSelect({ ...element, _focusId: item.id });
              }
            }}
            className="hover:outline-blue-500 hover:outline transition-all"
            style={{
              fontSize: `${item.fontSize || 14}px`,
              color: item.color || '#6B7280',
              maxWidth: item.maxWidth ? `${item.maxWidth}px` : '100%',
              marginTop: item.marginTop ? `${item.marginTop}px` : '0',
              marginBottom: item.marginBottom ? `${item.marginBottom}px` : '0',
              marginLeft: item.marginLeft ? `${item.marginLeft}px` : '0',
              cursor: 'pointer',
              outline: '1px dashed transparent',
              position: 'relative',
            }}
          >
            {item.text || 'Your Tagline'}
          </div>
        );
      }

      if (item.type === 'Logo') {
        const content = item.logoType === 'image' && item.imageSrc ? (
          <img 
            src={item.imageSrc} 
            alt="Logo" 
            style={{ 
              height: 'auto',
              width: item.width ? `${item.width}px` : '120px',
              borderRadius: item.borderRadius ? `${item.borderRadius}px` : '0px',
              display: 'block',
              objectFit: 'cover'
            }} 
          />
        ) : (
          <span style={{
            fontSize: `${item.fontSize || 24}px`,
            fontWeight: item.fontWeight || 'bold',
            color: item.color || '#000000',
            whiteSpace: 'nowrap',
          }}>
            {item.text || 'LOGO'}
          </span>
        );

        const handleClick = (e) => {
          if (onSelect) {
            e.stopPropagation();
            if (item.href) e.preventDefault();
            onSelect({ ...element, _focusId: item.id });
          }
        };

        const className = (onSelect) ? "hover:outline-blue-500 hover:outline transition-all" : "";
        const wrapperStyle = {
          display: 'flex', 
          alignItems: 'center',
          cursor: 'pointer',
          position: 'relative',
          outline: '1px dashed transparent',
          width: 'auto',
        };

        return item.href ? (
          <a key={item.id} href={item.href} onClick={handleClick} className={className} style={{ ...wrapperStyle, textDecoration: 'none' }}>
            {content}
          </a>
        ) : (
          <div key={item.id} onClick={handleClick} className={className} style={wrapperStyle}>
            {content}
          </div>
        );
      }

      if (item.type === 'Navigation') {
        const menuItems = item.menuItems || item.items?.map(i => ({ label: i, link: '#' })) || [];
        return (
          <nav key={item.id} onClick={(e) => { if (onSelect) { e.stopPropagation(); onSelect({ ...element, _focusId: item.id }); } }}
          style={{
             marginTop: item.marginTop ? `${item.marginTop}px` : 0,
             marginBottom: item.marginBottom ? `${item.marginBottom}px` : 0,
             maxWidth: item.maxWidth ? `${item.maxWidth}px` : 'none',
             cursor: 'pointer',
             outline: '1px dashed transparent',
          }}
          className="hover:outline-blue-500 hover:outline transition-all"
          >
            <ul style={{ 
              display: 'flex', 
              gap: item.itemSpacing ? `${item.itemSpacing}px` : '24px', 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              flexWrap: 'wrap',
              justifyContent: item.alignment || 'flex-start',
            }}>
              {menuItems.map((menuItem, idx) => (
                <li key={idx}>
                  <a href={menuItem.link || '#'} style={{ 
                    color: item.textColor || '#000000', 
                    textDecoration: 'none',
                    fontSize: item.fontSize ? `${item.fontSize}px` : '14px',
                    fontWeight: '500',
                  }}>
                    {typeof menuItem === 'object' ? menuItem.label : menuItem}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        );
      }

      if (item.type === 'SearchBar') {
        return (
          <div key={item.id} onClick={(e) => { if (onSelect) { e.stopPropagation(); onSelect({ ...element, _focusId: item.id }); } }}
            className="hover:outline-blue-500 hover:outline transition-all"
            style={{ 
              position: 'relative', 
              width: `${item.width || 200}px`,
              cursor: 'pointer',
              outline: '1px dashed transparent',
            }}>
            <Search size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF' }} />
            <input type="text" placeholder={item.placeholder || 'Search...'} style={{
              width: '100%', padding: '8px 10px 8px 32px', border: '1px solid #d1d5db', borderRadius: `${item.borderRadius || 6}px`,
              fontSize: '13px', backgroundColor: item.backgroundColor || '#f3f4f6', outline: 'none', pointerEvents: 'none'
            }} readOnly />
          </div>
        );
      }

      if (item.type === 'IconButton') {
        const IconComponent = iconMap[item.icon] || Menu;
        const button = (
          <button style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px',
            backgroundColor: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', pointerEvents: 'none'
          }}>
            <IconComponent size={item.size || 24} color={item.color || '#000000'} />
          </button>
        );
        return (
          <div key={item.id} onClick={(e) => { if (onSelect) { e.stopPropagation(); onSelect({ ...element, _focusId: item.id }); } }}
            className="hover:outline-blue-500 hover:outline transition-all"
            style={{ display: 'inline-flex', cursor: 'pointer', outline: '1px dashed transparent' }}>
            {button}
          </div>
        );
      }
      if (item.type === 'Social') {
        const icons = item.socialIcons || [];
        const wrapperStyle = {
          display: 'flex',
          flexDirection: item.orientation === 'vertical' ? 'column' : 'row',
          gap: `${item.iconSpacing || 12}px`,
          marginTop: `${item.marginTop || 0}px`,
          marginRight: `${item.marginRight || 0}px`,
          marginBottom: `${item.marginBottom || 0}px`,
          marginLeft: `${item.marginLeft || 0}px`,
          cursor: 'pointer',
          outline: '1px dashed transparent',
        };

        // Map networks to Lucide icons
        const getSocialIcon = (network) => {
          switch(network) {
            case 'Facebook': return Facebook;
            case 'Instagram': return Instagram;
            case 'Twitter': return XLogo; // Use X Logo for legacy Twitter
            case 'X': return XLogo;
            case 'Linkedin': return Linkedin;
            case 'Youtube': return Youtube;
            case 'GitHub': return Github;
            case 'Dribbble': return Dribbble;
            case 'TikTok': return Globe; 
            case 'Pinterest': return Globe;
            case 'Behance': return Globe;
            default: return Globe;
          }
        };

        return (
          <div 
            key={item.id} 
            onClick={(e) => { if (onSelect) { e.stopPropagation(); onSelect({ ...element, _focusId: item.id }); } }}
            className="hover:outline-blue-500 hover:outline transition-all"
            style={wrapperStyle}
          >
            {icons.map((icon, idx) => {
               const IconComp = getSocialIcon(icon.network);
               // Check if it's our custom component or a Lucide icon
               const isCustom = IconComp === XLogo;

               return (
                 <a 
                   key={idx} 
                   href={icon.url || '#'}
                   target={item.openInNewTab ? '_blank' : '_self'}
                   rel={item.openInNewTab ? 'noopener noreferrer' : undefined}
                   onClick={(e) => { if (onSelect) e.preventDefault(); }}
                   style={{
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     backgroundColor: item.backgroundColor || 'transparent',
                     color: item.iconColor || '#000000',
                     width: item.orientation === 'vertical' ? `${(item.iconSize || 20) + (item.paddingLeft||0) + (item.paddingRight||0)}px` : 'auto',
                     // Padding
                     paddingTop: `${item.paddingTop || 8}px`,
                     paddingRight: `${item.paddingRight || 8}px`,
                     paddingBottom: `${item.paddingBottom || 8}px`,
                     paddingLeft: `${item.paddingLeft || 8}px`,
                     // Radius
                     borderTopLeftRadius: `${item.borderRadiusTop || 50}px`,
                     borderTopRightRadius: `${item.borderRadiusRight || 50}px`,
                     borderBottomRightRadius: `${item.borderRadiusBottom || 50}px`,
                     borderBottomLeftRadius: `${item.borderRadiusLeft || 50}px`,
                     textDecoration: 'none',
                   }}
                   >
                   {isCustom ? (
                     <IconComp size={item.iconSize || 20} color={item.iconColor || '#000000'} />
                   ) : (
                     <IconComp size={item.iconSize || 20} />
                   )}
                   {icon.network === 'Custom' && icon.customLabel && <span className="sr-only">{icon.customLabel}</span>}
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
                     const followerIconName = item.followerIcon || 'Users';
                     const followingIconName = item.followingIcon || 'UserPlus';
                     const FollowerIcon = iconMap[followerIconName] || iconMap.Users;
                     const FollowingIcon = iconMap[followingIconName] || iconMap.UserPlus;

                     const wrapperStyle = {
                       display: 'flex',
                       alignItems: 'center',
                       gap: `${item.spacing || 16}px`,
                       marginTop: `${item.marginTop || 0}px`,
                       marginRight: `${item.marginRight || 0}px`,
                       marginBottom: `${item.marginBottom || 0}px`,
                       marginLeft: `${item.marginLeft || 0}px`,
                       // Padding
                       paddingTop: `${item.paddingTop || 4}px`,
                       paddingRight: `${item.paddingRight || 8}px`,
                       paddingBottom: `${item.paddingBottom || 4}px`,
                       paddingLeft: `${item.paddingLeft || 8}px`,

                       cursor: 'pointer',
                       outline: '1px dashed transparent',
                     };

                     const statStyle = {
                         display: 'flex',
                         alignItems: 'center',
                         gap: '6px',
                         fontSize: `${item.fontSize || 13}px`,
                         fontWeight: item.fontWeight || '500',
                         color: item.textColor || '#374151',
                     };

                     const renderStat = (count, label, Icon) => {
                          const mode = item.displayMode || 'compact_icons';
                          const normalizedMode = mode === 'icons' ? 'compact_icons' : (mode === 'label_value' ? 'label_above' : mode);

                          // Common shared styles for both label and value
                          const sharedStyle = {
                            fontSize: `${item.fontSize || 13}px`,
                            fontWeight: item.fontWeight || '500',
                          };

                          // Compact Icons (Icon only)
                          if (normalizedMode === 'compact_icons') {
                            return (
                                <div style={{...statStyle, ...sharedStyle}}>
                                    <Icon size={item.iconSize || 16} color={item.iconColor || '#6B7280'} />
                                </div>
                            );
                          }

                          // Icon + Value (Inline)
                          if (normalizedMode === 'icon_inline') {
                             return (
                                <div style={{ ...statStyle, flexDirection: 'row', ...sharedStyle }}>
                                    <Icon size={item.iconSize || 16} color={item.iconColor || '#6B7280'} />
                                    <span style={{ color: item.textColor || '#374151' }}>{count.toLocaleString()}</span>
                                </div>
                            );
                          }

                          // Icon Above + Value
                          if (normalizedMode === 'icon_above') {
                             return (
                                <div style={{ ...statStyle, flexDirection: 'column', gap: '2px', ...sharedStyle }}>
                                    <Icon size={item.iconSize || 16} color={item.iconColor || '#6B7280'} />
                                    <span style={{ color: item.textColor || '#374151' }}>{count.toLocaleString()}</span>
                                </div>
                            );
                          }

                          // Icon Below + Value
                          if (normalizedMode === 'icon_below') {
                             return (
                                <div style={{ ...statStyle, flexDirection: 'column-reverse', gap: '2px', ...sharedStyle }}>
                                    <Icon size={item.iconSize || 16} color={item.iconColor || '#6B7280'} />
                                    <span style={{ color: item.textColor || '#374151' }}>{count.toLocaleString()}</span>
                                </div>
                            );
                          }

                          // Label Above + Value
                          if (normalizedMode === 'label_above') {
                              return (
                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.2', ...sharedStyle }}>
                                      <span style={{ color: item.iconColor || '#9CA3AF' }}>{label}</span>
                                      <span style={{ color: item.textColor || '#374151' }}>{count.toLocaleString()}</span>
                                  </div>
                              );
                          }

                          // Label Below + Value
                          if (normalizedMode === 'label_below') {
                              return (
                                  <div style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', lineHeight: '1.2', ...sharedStyle }}>
                                      <span style={{ color: item.iconColor || '#9CA3AF' }}>{label}</span>
                                      <span style={{ color: item.textColor || '#374151' }}>{count.toLocaleString()}</span>
                                  </div>
                              );
                          }

                          // Fallback
                          return (
                              <div style={{ ...statStyle, ...sharedStyle }}>
                                  <Icon size={item.iconSize || 16} color={item.iconColor || '#6B7280'} />
                                  <span style={{ color: item.textColor || '#374151' }}>{count.toLocaleString()}</span>
                              </div>
                          );
                      };

                     return (
                       <div 
                         key={item.id} 
                         onClick={(e) => { if (onSelect) { e.stopPropagation(); onSelect({ ...element, _focusId: item.id }); } }}
                         className="hover:outline-blue-500 hover:outline transition-all"
                         style={wrapperStyle}
                       >
                         {item.showFollowers && renderStat(item.followerCount || 0, 'Followers', FollowerIcon)}
                         {item.showFollowing && renderStat(item.followingCount || 0, 'Following', FollowingIcon)}
                       </div>
                     );
                   }

      if (item.type === 'Button') {
        const sizeStyles = {
          sm: { fontSize: '12px' },
          md: { fontSize: '14px' },
          lg: { fontSize: '16px' },
        };
        const sizeBase = sizeStyles[item.size || 'md'];

        const buttonStyle = {
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          backgroundColor: item.backgroundColor || '#4368D9',
          color: item.color || '#ffffff',
          border: 'none',
          cursor: 'pointer',

          // Custom Design Props
          fontSize: item.fontSize ? `${item.fontSize}px` : sizeBase.fontSize,
          fontWeight: item.fontWeight || '600',

          // Radius
          borderTopLeftRadius: `${item.borderRadiusTop || 0}px`,
          borderTopRightRadius: `${item.borderRadiusRight || 0}px`,
          borderBottomRightRadius: `${item.borderRadiusBottom || 0}px`,
          borderBottomLeftRadius: `${item.borderRadiusLeft || 0}px`,

          // Padding
          paddingTop: `${item.paddingTop || 10}px`,
          paddingRight: `${item.paddingRight || 20}px`,
          paddingBottom: `${item.paddingBottom || 10}px`,
          paddingLeft: `${item.paddingLeft || 20}px`,

          // Margin - applied to wrapper, but good to have here if needed or applied to container
          pointerEvents: onSelect ? 'none' : 'auto', // Disable interaction in builder
        };

        const wrapperStyle = {
          display: 'inline-flex',
          marginTop: `${item.marginTop || 0}px`,
          marginRight: `${item.marginRight || 0}px`,
          marginBottom: `${item.marginBottom || 0}px`,
          marginLeft: `${item.marginLeft || 0}px`,
          cursor: 'pointer',
          outline: '1px dashed transparent',
        };

        const content = (
          <>
            <span>{item.label || 'Button'}</span>
            {item.showSecondaryLabel && item.secondaryLabel && (
              <span style={{ fontSize: '0.85em', opacity: 0.8, marginTop: '2px' }}>{item.secondaryLabel}</span>
            )}
          </>
        );

        const rel = [
          item.nofollow ? 'nofollow' : '',
          item.sponsored ? 'sponsored' : '',
          item.openInNewTab ? 'noopener noreferrer' : ''
        ].filter(Boolean).join(' ');

        const Element = item.href ? 'a' : 'button';
        const props = item.href ? { 
          href: item.href, 
          target: item.openInNewTab ? '_blank' : undefined,
          rel: rel || undefined
        } : {};

        return (
          <div 
            key={item.id} 
            onClick={(e) => { if (onSelect) { e.stopPropagation(); e.preventDefault(); onSelect({ ...element, _focusId: item.id }); } }}
            className="hover:outline-blue-500 hover:outline transition-all"
            style={wrapperStyle}
          >
            <Element style={buttonStyle} {...props}>
              {content}
            </Element>
          </div>
        );
      }

      return null;
      };

      const rows = ['top', 'middle', 'bottom'];
    const cols = ['left', 'center', 'right'];

    const getItemsForZone = (row, col) => {
      return children.filter(item => {
        const itemRow = item.row || 'middle';
        const itemZone = item.zone || 'left';
        return itemRow === row && itemZone === col;
      });
    };

    // Background Styles Resolver
    const getBackgroundStyles = (state, configProps = props) => {
      let styles = {};

      // Determine active style configuration
      let activeConfig = {};
      if (state === 'sticky' && configProps.stickyEnabled) {
        activeConfig = configProps.stickyStyle || {};
      } else if (state === 'transparent' && configProps.transparentEnabled) {
        activeConfig = configProps.transparentStyle || {};
      } else {
        // Default state - support backward compatibility with direct props
        activeConfig = {
          mode: configProps.backgroundMode || (configProps.backgroundImage ? 'image' : 'color'),
          color: configProps.backgroundColor,
          imageSrc: configProps.backgroundImage,
          gradientColor1: configProps.gradientColor1,
          gradientColor2: configProps.gradientColor2,
          gradientType: configProps.gradientType,
          gradientAngle: configProps.gradientAngle,
          imageSize: configProps.imageSize,
          imageRepeat: configProps.imageRepeat,
          imagePosition: configProps.imagePosition,
          overlayColor: configProps.overlayColor,
          overlayOpacity: configProps.overlayOpacity,
        };
      }

      // Apply base styles from config
      if (activeConfig.mode === 'gradient') {
        const type = activeConfig.gradientType || 'linear';
        const angle = activeConfig.gradientAngle || 180;
        const c1 = activeConfig.gradientColor1 || '#ffffff';
        const c2 = activeConfig.gradientColor2 || '#000000';
        styles.background = type === 'radial' 
          ? `radial-gradient(circle, ${c1}, ${c2})`
          : `linear-gradient(${angle}deg, ${c1}, ${c2})`;
      } else if (activeConfig.mode === 'image') {
        if (activeConfig.imageSrc) {
            styles.backgroundImage = `url(${activeConfig.imageSrc})`;
            styles.backgroundSize = activeConfig.imageSize || 'cover';
            styles.backgroundRepeat = activeConfig.imageRepeat || 'no-repeat';
            styles.backgroundPosition = activeConfig.imagePosition || 'center';
        }
      } else {
        // Color mode
        styles.backgroundColor = activeConfig.color || 'transparent';
      }

      return { styles, config: activeConfig };
    };

    // Current State Logic (Simplified for Builder Preview)
    // In a real app, this would use scroll listeners
    // For builder, we default to 'default' state unless we want to simulate others
    const currentState = 'default'; // simulation could be added later
    const { styles: backgroundStyles, config: activeConfig } = getBackgroundStyles(currentState);

    const submenuItem = children.find(c => c.type === 'Submenu');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <header style={{
          padding: `${props.padding || 16}px`,
          // Default border
          borderBottom: '1px solid #e5e7eb',
          // Apply resolved background styles
          ...backgroundStyles,
          // Sticky positioning if enabled
          position: props.stickyEnabled ? 'sticky' : 'relative',
          top: 0,
          zIndex: 50,
          transition: 'all 0.3s ease',
        }}>
          {/* Overlay if image mode and overlay configured */}
          {activeConfig.mode === 'image' && activeConfig.overlayColor && (
              <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: activeConfig.overlayColor,
                  opacity: (activeConfig.overlayOpacity || 0) / 100,
                  zIndex: 0,
                  pointerEvents: 'none'
              }} />
          )}
          <div style={{
            position: 'relative', // Content needs relative pos to sit above overlay
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateRows: 'auto auto auto',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: '0px',
            width: '100%',
          }}>
            {rows.map(row => (
              cols.map(col => {
                const zoneItems = getItemsForZone(row, col).filter(i => i.type !== 'Submenu'); // Exclude submenu from grid
                const logo = zoneItems.find(i => i.type === 'Logo');
                const tagline = zoneItems.find(i => i.type === 'Tagline');
                const hasBranding = logo && tagline;

                // Render logic
                const renderZoneContent = () => {
                    if (hasBranding) {
                        const otherItems = zoneItems.filter(i => i.type !== 'Logo' && i.type !== 'Tagline');
                        // Determine layout for logo+tagline
                        const layout = tagline.layout || 'column';
                        const brandingGroup = (
                            <div key="branding-group" style={{ 
                                display: 'flex', 
                                flexDirection: layout, 
                                alignItems: 'center', 
                                gap: layout === 'row' ? '12px' : '0px' 
                            }}>
                                {renderHeaderItem(logo)}
                                {renderHeaderItem(tagline)}
                            </div>
                        );
                        // We place branding group first, then others (simplification for now)
                        return [brandingGroup, ...otherItems.map(renderHeaderItem)];
                    }
                    return zoneItems.map(renderHeaderItem);
                };

                return (
                  <div key={`${row}-${col}`} className={`zone-${row}-${col}`} style={{
                    display: 'flex',
                    alignItems: 'center', // Vertical alignment in zone
                    justifyContent: col === 'center' ? 'center' : (col === 'right' ? 'flex-end' : 'flex-start'),
                    gap: '16px',
                    gridRow: row === 'top' ? 1 : (row === 'middle' ? 2 : 3),
                    gridColumn: col === 'left' ? 1 : (col === 'center' ? 2 : 3),
                    padding: '4px',
                    minHeight: zoneItems.length > 0 ? 'auto' : '0px',
                  }}>
                    {renderZoneContent()}
                  </div>
                );
              })
            ))}
          </div>
        </header>

        {/* Submenu Rendering */}
        {submenuItem && (() => {
           // Resolve background styles for submenu
           const sbMode = submenuItem.backgroundMode || 'color';
           let sbBackground = {};

           if (sbMode === 'gradient') {
              const type = submenuItem.gradientType || 'linear';
              const angle = submenuItem.gradientAngle || 180;
              const c1 = submenuItem.gradientColor1 || '#ffffff';
              const c2 = submenuItem.gradientColor2 || '#000000';
              sbBackground.background = type === 'radial' 
                ? `radial-gradient(circle, ${c1}, ${c2})`
                : `linear-gradient(${angle}deg, ${c1}, ${c2})`;
           } else if (sbMode === 'image' && submenuItem.backgroundImage) {
              sbBackground.backgroundImage = `url(${submenuItem.backgroundImage})`;
              sbBackground.backgroundSize = submenuItem.imageSize || 'cover';
              sbBackground.backgroundRepeat = submenuItem.imageRepeat || 'no-repeat';
              sbBackground.backgroundPosition = submenuItem.imagePosition || 'center';
           } else {
              sbBackground.backgroundColor = submenuItem.backgroundColor || 'transparent';
           }

           return (
          <div 
            onClick={(e) => { 
              if (onSelect) {
                e.stopPropagation(); 
                onSelect({ ...element, _focusId: submenuItem.id });
              }
            }}
            className="hover:outline-blue-500 hover:outline transition-all"
            style={{
              ...sbBackground,
              borderBottom: '1px solid #e5e7eb',
              position: submenuItem.sticky ? 'sticky' : 'relative',
              top: submenuItem.sticky ? (props.stickyEnabled ? '64px' : '0px') : 'auto', // approximate height of header if sticky
              zIndex: 40,
              width: '100%',
              cursor: 'pointer',
              outline: '1px dashed transparent'
            }}
          >
            {/* Overlay for image mode */}
            {sbMode === 'image' && submenuItem.overlayColor && (
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: submenuItem.overlayColor,
                    opacity: (submenuItem.overlayOpacity || 0) / 100,
                    zIndex: 0,
                    pointerEvents: 'none'
                }} />
            )}
            <div style={{
              position: 'relative', // Ensure content is above overlay
              zIndex: 1,
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 16px',
              overflowX: submenuItem.mobileScroll ? 'auto' : 'visible',
              scrollbarWidth: 'none', // hide scrollbar firefox
              msOverflowStyle: 'none',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: submenuItem.alignment === 'justify' ? 'space-between' : (submenuItem.alignment === 'center' ? 'center' : (submenuItem.alignment === 'right' ? 'flex-end' : 'flex-start')),
                gap: '24px',
                whiteSpace: 'nowrap',
              }}>
                {(submenuItem.tabs || []).map((tab, idx) => {
                  const isActive = idx === 0; // Mock active state for first item
                  const isPills = submenuItem.styleVariant === 'pills';
                  const isMinimal = submenuItem.styleVariant === 'minimal';

                  return (
                    <div 
                      key={idx}
                      style={{
                        padding: isPills ? '8px 16px' : '12px 4px',
                        color: isActive ? (submenuItem.activeColor || '#000000') : (submenuItem.textColor || '#6B7280'),
                        fontWeight: isActive ? '600' : '500',
                        fontSize: '14px',
                        borderBottom: !isPills && isActive ? `2px solid ${submenuItem.activeColor || '#000000'}` : '2px solid transparent',
                        backgroundColor: isPills && isActive ? (submenuItem.activeColor || '#000000') : 'transparent',
                        borderRadius: isPills ? '20px' : '0',
                        // Pill text color override
                        ...(isPills && isActive ? { color: '#ffffff' } : {}),
                        cursor: 'pointer',
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px'
                      }}
                    >
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

  if (type === 'Footer') {
    const children = props.children || [];
    const layoutMode = props.layoutMode || 'simple';
    const rowsConfig = props.rows || {
        top: { enabled: false, backgroundColor: 'transparent', padding: 16 },
        main: { enabled: true, backgroundColor: 'transparent', padding: 32 },
        bottom: { enabled: true, backgroundColor: '#111827', padding: 16 }
    };

    // Background Styles Resolver (Duplicated for Footer Scope or we could lift it up)
    const getBackgroundStyles = (rowConfig, state = 'default') => {
      let styles = {};
      let activeConfig = {};

      if (state === 'sticky' && rowConfig.stickyEnabled) {
        activeConfig = rowConfig.stickyStyle || {};
      } else if (state === 'transparent' && rowConfig.transparentEnabled) {
        activeConfig = rowConfig.transparentStyle || {};
      } else {
         // Default state
         activeConfig = {
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
      }

      if (activeConfig.mode === 'gradient') {
        const type = activeConfig.gradientType || 'linear';
        const angle = activeConfig.gradientAngle || 180;
        const c1 = activeConfig.gradientColor1 || '#ffffff';
        const c2 = activeConfig.gradientColor2 || '#000000';
        styles.background = type === 'radial' 
          ? `radial-gradient(circle, ${c1}, ${c2})`
          : `linear-gradient(${angle}deg, ${c1}, ${c2})`;
      } else if (activeConfig.mode === 'image') {
        if (activeConfig.imageSrc) {
            styles.backgroundImage = `url(${activeConfig.imageSrc})`;
            styles.backgroundSize = activeConfig.imageSize || 'cover';
            styles.backgroundRepeat = activeConfig.imageRepeat || 'no-repeat';
            styles.backgroundPosition = activeConfig.imagePosition || 'center';
        }
      } else {
        styles.backgroundColor = activeConfig.color || 'transparent';
      }

      return { styles, config: activeConfig };
    };

    const renderFooterItem = (item) => {
        const handleClick = (e) => {
            if (onSelect) {
                e.stopPropagation();
                onSelect({ ...element, _focusId: item.id });
            }
        };

        const className = onSelect ? "hover:outline-blue-500 hover:outline transition-all" : "";
        const wrapperStyle = {
            marginBottom: item.marginBottom ? `${item.marginBottom}px` : '0',
            marginTop: item.marginTop ? `${item.marginTop}px` : '0',
            cursor: 'pointer',
            position: 'relative',
            outline: '1px dashed transparent',
        };

        if (item.type === 'BrandBlock') {
            return (
                <div key={item.id} onClick={handleClick} className={className} style={{...wrapperStyle, maxWidth: '300px'}}>
                    {item.logoType === 'image' && item.imageSrc ? (
                        <img src={item.imageSrc} alt="Brand" style={{ height: '32px', marginBottom: '12px' }} />
                    ) : (
                        <h3 style={{ fontSize: `${item.fontSize || 24}px`, fontWeight: item.fontWeight || 'bold', color: item.color || '#ffffff', marginBottom: '8px' }}>
                            {item.text || 'BRAND'}
                        </h3>
                    )}
                    {item.bio && <p style={{ fontSize: '14px', color: item.bioColor || '#9CA3AF', lineHeight: '1.5' }}>{item.bio}</p>}
                </div>
            );
        }

        if (item.type === 'FooterMenu') {
            const items = item.items || [];
            const isHorizontal = item.layout === 'horizontal';
            return (
                <div key={item.id} onClick={handleClick} className={className} style={wrapperStyle}>
                    <ul style={{ 
                        display: 'flex', 
                        flexDirection: isHorizontal ? 'row' : 'column',
                        gap: isHorizontal ? '24px' : '12px',
                        listStyle: 'none', 
                        padding: 0, 
                        margin: 0,
                        flexWrap: 'wrap'
                    }}>
                        {items.map((link, idx) => (
                            <li key={idx}>
                                <a 
                                  href={link.link || '#'} 
                                  onClick={(e) => { 
                                    if (onSelect) { 
                                      e.preventDefault(); 
                                      e.stopPropagation();
                                      onSelect({ ...element, _focusId: item.id }); 
                                    } 
                                  }}
                                  style={{ color: item.textColor || '#D1D5DB', textDecoration: 'none', fontSize: '14px' }}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }

        if (item.type === 'Social') {
             // Reuse social rendering logic logic with some footer specifics or inline it
             const icons = item.socialIcons || [];
             return (
                 <div key={item.id} onClick={handleClick} className={className} style={{...wrapperStyle, display: 'flex', gap: '12px'}}>
                     {icons.map((icon, idx) => {
                         const IconComp = iconMap[icon.network === 'X' ? 'Twitter' : icon.network] || Globe; // Map or Fallback
                         // Simple social icon renderer for footer
                         return (
                             <a 
                               key={idx} 
                               href={icon.url} 
                               onClick={(e) => { 
                                 if (onSelect) { 
                                   e.preventDefault(); 
                                   e.stopPropagation();
                                   onSelect({ ...element, _focusId: item.id }); 
                                 } 
                               }}
                               style={{ color: item.iconColor || '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                             >
                                 {/* We can reuse the XLogo if we had access to it easily or just use standard icons */}
                                 {icon.network === 'X' ? <XLogo size={item.iconSize || 20} color={item.iconColor || '#ffffff'} /> : 
                                  <IconComp size={item.iconSize || 20} />}
                             </a>
                         );
                     })}
                 </div>
             );
        }

        if (item.type === 'Copyright') {
            return (
                <div key={item.id} onClick={handleClick} className={className} style={wrapperStyle}>
                    <p style={{ margin: 0, fontSize: `${item.fontSize || 12}px`, color: item.textColor || '#6B7280' }}>{item.text}</p>
                </div>
            );
        }

        if (item.type === 'LegalLinks') {
            const items = item.items || [];
            return (
                <div key={item.id} onClick={handleClick} className={className} style={wrapperStyle}>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                        {items.map((link, idx) => (
                            <a 
                              key={idx} 
                              href={link.link} 
                              onClick={(e) => { 
                                if (onSelect) { 
                                  e.preventDefault(); 
                                  e.stopPropagation();
                                  onSelect({ ...element, _focusId: item.id }); 
                                } 
                              }}
                              style={{ fontSize: `${item.fontSize || 12}px`, color: item.textColor || '#6B7280', textDecoration: 'none' }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                </div>
            );
        }
        
        if (item.type === 'Button') {
             return (
                 <div key={item.id} onClick={handleClick} className={className} style={{...wrapperStyle, display: 'inline-flex'}}>
                     <a 
                         href={item.href || '#'}
                         onClick={(e) => {
                            if (onSelect) {
                                e.preventDefault(); 
                                e.stopPropagation();
                                onSelect({ ...element, _focusId: item.id }); 
                            }
                         }}
                         style={{
                             display: 'inline-flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             backgroundColor: item.backgroundColor || '#4368D9',
                             color: item.color || '#ffffff',
                             paddingTop: `${item.paddingTop || 10}px`,
                             paddingBottom: `${item.paddingBottom || 10}px`,
                             paddingLeft: `${item.paddingLeft || 20}px`,
                             paddingRight: `${item.paddingRight || 20}px`,
                             borderRadius: `${item.borderRadius || 6}px`,
                             fontSize: `${item.fontSize || 14}px`,
                             fontWeight: item.fontWeight || '500',
                             textDecoration: 'none',
                             border: 'none',
                             cursor: 'pointer',
                             whiteSpace: 'nowrap'
                         }}
                     >
                         {item.label || 'Button'}
                     </a>
                 </div>
             );
        }

        if (item.type === 'Newsletter') {
             return (
                 <div key={item.id} onClick={handleClick} className={className} style={{...wrapperStyle, maxWidth: '300px'}}>
                     <h4 style={{ color: '#fff', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>{item.title || 'Subscribe'}</h4>
                     <div style={{ display: 'flex', gap: '8px' }}>
                         <input type="email" placeholder={item.placeholder || 'Enter email'} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: 'none', fontSize: '13px', backgroundColor: '#374151', color: '#fff' }} />
                         <button style={{ padding: '8px 12px', borderRadius: '4px', border: 'none', backgroundColor: '#4368D9', color: '#fff', fontSize: '13px', cursor: 'pointer' }}>{item.buttonText || 'Join'}</button>
                     </div>
                 </div>
             );
        }

        return null;
    };

    // Background handling (simplified reuse)
    let containerStyle = {
        backgroundColor: props.backgroundColor || '#1f2937',
        color: '#fff',
        display: 'flex', 
        flexDirection: 'column'
    };
    
    if (props.backgroundMode === 'gradient') {
        const type = props.gradientType || 'linear';
        const angle = props.gradientAngle || 180;
        const c1 = props.gradientColor1 || '#1f2937';
        const c2 = props.gradientColor2 || '#111827';
        containerStyle.background = type === 'radial' ? `radial-gradient(circle, ${c1}, ${c2})` : `linear-gradient(${angle}deg, ${c1}, ${c2})`;
    } else if (props.backgroundMode === 'image' && props.backgroundImage) {
        containerStyle.backgroundImage = `url(${props.backgroundImage})`;
        containerStyle.backgroundSize = props.imageSize || 'cover';
        containerStyle.backgroundPosition = props.imagePosition || 'center';
    }

    if (layoutMode === 'widgets') {
        const widgetBands = props.widgetBands || [];

        // In Widgets mode, containerStyle is just the wrapper. 
        // Backgrounds are handled per-Band.
        return (
            <footer style={{ ...containerStyle, padding: 0 }}>
                {widgetBands.map((band, bandIdx) => {
                    const { styles: bandStyles, config: bandConfig } = getBackgroundStyles({ 
                        ...band, 
                        backgroundMode: band.backgroundMode || (band.backgroundImage ? 'image' : 'color')
                    }, 'default');

                    return (
                        <div 
                            key={band.id} 
                            id={`band-${band.id}`}
                            onClick={(e) => {
                                if (onSelect) {
                                    e.stopPropagation();
                                    onSelect({ ...element, _focusId: band.id });
                                }
                            }}
                            className="hover:outline-blue-500 hover:outline transition-all"
                            style={{
                                ...bandStyles,
                                padding: `${band.padding || 24}px 24px`,
                                position: 'relative',
                                cursor: 'pointer',
                                borderTop: bandIdx > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                                outline: '1px dashed transparent'
                            }}
                        >
                            {/* Band Overlay */}
                            {bandConfig.mode === 'image' && bandConfig.overlayColor && (
                                <div style={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    backgroundColor: bandConfig.overlayColor,
                                    opacity: (bandConfig.overlayOpacity || 0) / 100,
                                    zIndex: 0,
                                    pointerEvents: 'none'
                                }} />
                            )}

                            <div 
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}
                            >
                                {(band.areas || []).map((area, idx) => {
                                    // Area styles if needed (usually transparent, but can have background)
                                    const { styles: areaStyles, config: areaConfig } = getBackgroundStyles({ 
                                      ...area, 
                                      backgroundMode: area.backgroundMode || (area.backgroundImage ? 'image' : 'color') 
                                    }, 'default');

                                    return (
                                        <div 
                                            key={area.id}
                                            onClick={(e) => {
                                                if (onSelect) {
                                                    e.stopPropagation();
                                                    onSelect({ ...element, _focusId: area.id });
                                                }
                                            }}
                                            className="hover:outline-blue-500 hover:outline transition-all"
                                            style={{
                                                ...areaStyles,
                                                padding: `${area.padding || 0}px`,
                                                borderRadius: `${area.borderRadius || 0}px`,
                                                minHeight: '60px',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: '16px',
                                                position: 'relative',
                                                cursor: 'pointer',
                                                outline: '1px dashed transparent'
                                            }}
                                        >
                                            {/* Area Overlay */}
                                            {areaConfig.mode === 'image' && areaConfig.overlayColor && (
                                                <div style={{
                                                    position: 'absolute',
                                                    top: 0, left: 0, right: 0, bottom: 0,
                                                    backgroundColor: areaConfig.overlayColor,
                                                    opacity: (areaConfig.overlayOpacity || 0) / 100,
                                                    zIndex: 0,
                                                    borderRadius: `${area.borderRadius || 0}px`,
                                                    pointerEvents: 'none'
                                                }} />
                                            )}

                                            <div style={{ position: 'relative', zIndex: 1, height: '100%' }}>
                                                {(area.children && area.children.length > 0) ? (
                                                    area.children.map(renderFooterItem)
                                                ) : (
                                                    <div style={{ 
                                                        border: '1px dashed rgba(255,255,255,0.1)', 
                                                        borderRadius: '4px', 
                                                        height: '100%', 
                                                        minHeight: '40px',
                                                        display: 'flex', 
                                                        alignItems: 'center', 
                                                        justifyContent: 'center' 
                                                    }}>
                                                        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '10px' }}>{area.name || `Area ${idx+1}`}</span>
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

            // Use getBackgroundStyles to resolve complex backgrounds
            // For now, always 'default' state unless we add scroll simulation for footer rows
            const { styles: backgroundStyles, config: activeConfig } = getBackgroundStyles(rowConfig, 'default');

            return (
                    <div 
                      key={rowKey} 
                      id={`row-${rowKey}`} // For anchor scrolling
                      onClick={(e) => {
                          if (onSelect) {
                              e.stopPropagation();
                              onSelect({ ...element, _focusId: `row-${rowKey}` });
                          }
                      }}
                      className={`hover:outline-blue-500 hover:outline transition-all cursor-pointer ${
                          // Add a subtle dashed border if row is empty so it can be seen/clicked
                          rowChildren.length === 0 ? 'min-h-[60px] border-dashed border-gray-700/50' : ''
                      }`}
                      style={{ 
                        ...backgroundStyles,
                        padding: `${rowConfig.padding}px 24px`,
                        borderTop: rowKey !== 'top' ? '1px solid rgba(255,255,255,0.05)' : 'none',
                        position: 'relative', // needed for overlay
                        outline: '1px dashed transparent',
                        display: rowChildren.length === 0 ? 'flex' : 'block', // Flex to center empty state text
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                        {rowChildren.length === 0 && (
                            <div style={{ pointerEvents: 'none', color: 'rgba(255,255,255,0.2)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                {rowKey} Row (Empty)
                            </div>
                        )}
                    {/* Overlay if image mode */}
                    {activeConfig.mode === 'image' && activeConfig.overlayColor && (
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: activeConfig.overlayColor,
                            opacity: (activeConfig.overlayOpacity || 0) / 100,
                            zIndex: 0,
                            pointerEvents: 'none'
                        }} />
                    )}
                    <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', alignItems: 'start' }}>
                        {['left', 'center', 'right'].map(zone => {
                            const zoneItems = rowChildren.filter(c => c.zone === zone);
                            return (
                                <div key={zone} style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    gap: '16px',
                                    alignItems: zone === 'center' ? 'center' : (zone === 'right' ? 'flex-end' : 'flex-start'),
                                    textAlign: zone === 'center' ? 'center' : (zone === 'right' ? 'right' : 'left'),
                                }}>
                                    {zoneItems.map(renderFooterItem)}
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

  if (type === 'Card') {
    return (
      <div style={{
        padding: `${props.padding || 24}px`,
        margin: `${props.margin || 0}px`,
        backgroundColor: props.backgroundColor || '#ffffff',
        borderRadius: `${props.borderRadius || 8}px`,
        border: '1px solid #e5e7eb',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>{props.title || 'Card Title'}</h3>
        <p style={{ color: '#6B7280', margin: 0 }}>{props.description || 'Card description goes here'}</p>
      </div>
    );
  }

  if (type === 'HeroSection') {
    return (
      <section style={{
        padding: `${props.padding || 80}px 24px`,
        backgroundColor: props.backgroundColor || '#f3f4f6',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px' }}>{props.title || 'Welcome to Your Site'}</h1>
        <p style={{ fontSize: '20px', color: '#6B7280', marginBottom: '32px' }}>{props.subtitle || 'Create amazing things'}</p>
        <button style={{
          padding: '16px 32px',
          backgroundColor: '#4368D9',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: '500',
          cursor: 'pointer',
        }}>
          {props.ctaText || 'Get Started'}
        </button>
      </section>
    );
  }

  if (type === 'Form' || type === 'ContactForm') {
    return (
      <div style={{ padding: `${props.padding || 24}px`, margin: `${props.margin || 0}px` }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>{props.title || 'Contact Us'}</h2>
        {props.description && <p style={{ color: '#6B7280', marginBottom: '24px' }}>{props.description}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="text" placeholder="Name" style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
          <input type="email" placeholder="Email" style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
          <textarea placeholder="Message" rows={4} style={{ padding: '12px', border: '1px solid #d1d5db', borderRadius: '6px' }} />
          <button style={{
            padding: '12px',
            backgroundColor: '#4368D9',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '500',
            cursor: 'pointer',
          }}>
            {props.submitText || 'Submit'}
          </button>
        </div>
      </div>
    );
  }

  if (type === 'Logo') {
    return (
      <div style={{ padding: `${props.padding || 16}px`, margin: `${props.margin || 0}px` }}>
        <div style={{
          fontSize: `${props.fontSize || 24}px`,
          fontWeight: props.fontWeight || 'bold',
          color: props.color || '#000000',
          fontFamily: props.fontFamily || 'inherit',
        }}>
          {props.text || 'LOGO'}
        </div>
      </div>
    );
  }

  if (type === 'Navigation') {
    const items = props.items || ['Home', 'About', 'Services', 'Contact'];
    return (
      <nav style={{ padding: `${props.padding || 16}px`, margin: `${props.margin || 0}px` }}>
        <ul style={{ 
          display: 'flex', 
          gap: '24px', 
          listStyle: 'none', 
          padding: 0, 
          margin: 0,
          flexWrap: 'wrap',
        }}>
          {items.map((item, idx) => (
            <li key={idx}>
              <a href="#" style={{ 
                color: props.textColor || '#000000', 
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
              }}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  if (type === 'SearchBar') {
    return (
      <div style={{ padding: `${props.padding || 16}px`, margin: `${props.margin || 0}px` }}>
        <div style={{ position: 'relative', display: 'inline-block', width: '100%', maxWidth: '400px' }}>
          <Search 
            size={18} 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
            }} 
          />
          <input
            type="text"
            placeholder={props.placeholder || 'Search...'}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: props.backgroundColor || '#f3f4f6',
              outline: 'none',
            }}
          />
        </div>
      </div>
    );
  }

  if (type === 'IconButton') {
    const IconComponent = iconMap[props.icon] || Menu;
    return (
      <div style={{ padding: `${props.padding || 8}px`, margin: `${props.margin || 0}px`, display: 'inline-block' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '8px',
          backgroundColor: props.backgroundColor || 'transparent',
          border: props.showBorder ? '1px solid #d1d5db' : 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}>
          <IconComponent size={props.size || 24} color={props.color || '#000000'} />
        </button>
      </div>
    );
  }

  // Default fallback
  return (
    <div style={{ ...commonStyles, border: '1px dashed #d1d5db', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#6B7280', fontSize: '14px' }}>{type} Component</p>
    </div>
  );
}