import React from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, Check, X, ArrowRight, Menu, Search, User, ShoppingCart, Bell, Facebook, Instagram, Twitter, Linkedin, Youtube, Github, Dribbble, Globe, UserPlus, UserCheck, UserMinus, Users, Home, MoreHorizontal, MoreVertical, Filter, Settings, Grid, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, ArrowLeft, ArrowUp, ArrowDown, ExternalLink, Link, Plus, Minus, Edit, Copy, Clipboard, Trash2, Download, Upload, Share2, RefreshCw, RotateCcw, Lock, Unlock, Play, Pause, Square, Volume2, VolumeX, Camera, Video, Image, Music, Bookmark, MessageCircle, Mail, Phone, Tag, CreditCard, DollarSign, Info, HelpCircle, AlertTriangle, AlertCircle, CheckCircle, XCircle, Calendar, Clock, MapPin, Eye, EyeOff, Flag, Zap, TrendingUp } from 'lucide-react';
import HeadingWithMotion from './HeadingWithMotion';
import TextWithMotion from './TextWithMotion';
import FooterRenderer from './FooterRenderer';
import HeaderRenderer from './HeaderRenderer';

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

export default function RenderedComponentV2({ element, onSelect, themeTokens = null }) {
  const { type, props } = element;
  const tc = themeTokens?.colors || {};
  const tr = themeTokens?.radius || {};
  const tf = themeTokens?.typography?.fontFamily;

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
    return <HeaderRenderer element={element} onSelect={onSelect} />;
  }

  if (type === 'Footer') {
    return <FooterRenderer element={element} onSelect={onSelect} themeTokens={themeTokens} />;
  }

  if (type === 'Card') {
    return (
      <div style={{
        padding: `${props.padding || 24}px`,
        margin: `${props.margin || 0}px`,
        backgroundColor: props.backgroundColor || tc.surface || '#ffffff',
        borderRadius: `${props.borderRadius || (tr.card ? parseInt(tr.card) : 8)}px`,
        border: `1px solid ${tc.border || '#e5e7eb'}`,
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px', color: tc.text || '#111827' }}>{props.title || 'Card Title'}</h3>
        <p style={{ color: tc.textSecondary || '#6B7280', margin: 0 }}>{props.description || 'Card description goes here'}</p>
      </div>
    );
  }

  if (type === 'HeroSection') {
    return (
      <section style={{ padding: `${props.padding || 80}px 24px`, backgroundColor: props.backgroundColor || tc.background || '#f3f4f6', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '16px', color: tc.text || '#111827' }}>{props.title || 'Welcome to Your Site'}</h1>
        <p style={{ fontSize: '20px', color: tc.textSecondary || '#6B7280', marginBottom: '32px' }}>{props.subtitle || 'Create amazing things'}</p>
        <button style={{ padding: '16px 32px', backgroundColor: tc.primary || '#4368D9', color: '#ffffff', border: 'none', borderRadius: `${tr.button ? parseInt(tr.button) : 6}px`, fontSize: '16px', fontWeight: '500', cursor: 'pointer' }}>
          {props.ctaText || 'Get Started'}
        </button>
      </section>
    );
  }

  if (type === 'Form' || type === 'ContactForm') {
    return (
      <div style={{ padding: `${props.padding || 24}px`, margin: `${props.margin || 0}px` }}>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px', color: tc.text || '#111827' }}>{props.title || 'Contact Us'}</h2>
        {props.description && <p style={{ color: tc.textSecondary || '#6B7280', marginBottom: '24px' }}>{props.description}</p>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="text" placeholder="Name" style={{ padding: '12px', border: `1px solid ${tc.border || '#d1d5db'}`, borderRadius: '6px', backgroundColor: tc.surface || '#fff', color: tc.text || '#111827' }} />
          <input type="email" placeholder="Email" style={{ padding: '12px', border: `1px solid ${tc.border || '#d1d5db'}`, borderRadius: '6px', backgroundColor: tc.surface || '#fff', color: tc.text || '#111827' }} />
          <textarea placeholder="Message" rows={4} style={{ padding: '12px', border: `1px solid ${tc.border || '#d1d5db'}`, borderRadius: '6px', backgroundColor: tc.surface || '#fff', color: tc.text || '#111827' }} />
          <button style={{ padding: '12px', backgroundColor: tc.primary || '#4368D9', color: '#ffffff', border: 'none', borderRadius: `${tr.button ? parseInt(tr.button) : 6}px`, fontWeight: '500', cursor: 'pointer' }}>
            {props.submitText || 'Submit'}
          </button>
        </div>
      </div>
    );
  }

  if (type === 'Logo') {
    return (
      <div style={{ padding: `${props.padding || 16}px`, margin: `${props.margin || 0}px` }}>
        <div style={{ fontSize: `${props.fontSize || 24}px`, fontWeight: props.fontWeight || 'bold', color: props.color || tc.text || '#000000', fontFamily: props.fontFamily || tf || 'inherit' }}>
          {props.text || 'LOGO'}
        </div>
      </div>
    );
  }

  if (type === 'Navigation') {
    const items = props.items || ['Home', 'About', 'Services', 'Contact'];
    return (
      <nav style={{ padding: `${props.padding || 16}px`, margin: `${props.margin || 0}px` }}>
        <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap' }}>
          {items.map((item, idx) => (
            <li key={idx}>
              <a href="#" style={{ color: props.textColor || tc.text || '#000000', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
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
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: tc.textSecondary || '#9CA3AF' }} />
          <input type="text" placeholder={props.placeholder || 'Search...'} style={{ width: '100%', padding: '10px 12px 10px 40px', border: `1px solid ${tc.border || '#d1d5db'}`, borderRadius: '8px', fontSize: '14px', backgroundColor: props.backgroundColor || tc.surface || '#f3f4f6', outline: 'none', color: tc.text || '#111827' }} />
        </div>
      </div>
    );
  }

  if (type === 'IconButton') {
    const IconComponent = iconMap[props.icon] || Menu;
    return (
      <div style={{ padding: `${props.padding || 8}px`, margin: `${props.margin || 0}px`, display: 'inline-block' }}>
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px', backgroundColor: props.backgroundColor || 'transparent', border: props.showBorder ? `1px solid ${tc.border || '#d1d5db'}` : 'none', borderRadius: '6px', cursor: 'pointer' }}>
          <IconComponent size={props.size || 24} color={props.color || tc.text || '#000000'} />
        </button>
      </div>
    );
  }

  // Default fallback
  return (
    <div style={{ ...commonStyles, border: `1px dashed ${tc.border || '#d1d5db'}`, minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: tc.textSecondary || '#6B7280', fontSize: '14px' }}>{type} Component</p>
    </div>
  );
}