import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ChevronLeft, Save, Eye, Monitor, Tablet, Smartphone, SquarePen, Plus, MoreVertical, Trash2, Undo2, Redo2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ComponentLibraryV2 from '@/components/builderv2/ComponentLibraryV2';
import PropertiesPanelV2 from '@/components/builderv2/PropertiesPanelV2';
import CanvasV2 from '@/components/builderv2/CanvasV2';
import { parseDroppableId, removeElementById, insertElementIntoZone, findElementById } from '@/components/builderv2/treeUtils';

// Shared droppable type constant - MUST match across all files
export const DND_TYPE = "BUILDER";

const getDefaultProps = (type) => {
  const defaults = {
    Heading: { 
      text: 'Your Heading', 
      level: 'h2', 
      color: '#000000', 
      padding: 16, 
      fontSize: 32, 
      fontWeight: '600', 
      textAlign: 'left',
      blockAlignment: 'left',
      motion: {
        enabled: false,
        entrance: { preset: 'none', durationMs: 400, delayMs: 0, once: true },
        scroll: { enabled: false, type: 'none', intensity: 0.2 },
        mouse: { enabled: false, type: 'none', intensity: 0.2 },
        sticky: { enabled: false, mode: 'none', offsetPx: 0, zIndex: 10 }
      }
    },
    Text: { 
      text: 'Your text content goes here', 
      color: '#000000', 
      fontSize: 16, 
      fontWeight: '400', 
      textAlign: 'left',
      lineHeight: 1.6,
      letterSpacing: 0,
      textBox: false,
      blockAlignment: 'left',
      // Link
      linkUrl: '',
      linkNewTab: false,
      linkNofollow: false,
      linkSponsored: false,
      linkUgc: false,
      linkAriaLabel: '',
      // Spacing
      paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0,
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      // Background
      backgroundMode: 'color',
      backgroundColor: 'transparent',
      backgroundImage: '',
      gradientColor1: '#ffffff',
      gradientColor2: '#000000',
      gradientType: 'linear',
      gradientAngle: 180,
      imageSize: 'cover',
      imageRepeat: 'no-repeat',
      imagePosition: 'center',
      overlayColor: '#000000',
      overlayOpacity: 0,
      // Border
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: 0,
      // Effects
      opacity: 1,
      boxShadow: '',
      // Layout
      width: '',
      maxWidth: '',
      alignSelf: 'auto',
      order: 0,
      // Position
      position: 'relative',
      positionTop: '',
      positionRight: '',
      positionBottom: '',
      positionLeft: '',
      zIndex: '',
      // Motion
      motion: {
        enabled: false,
        entrance: { preset: 'none', durationMs: 400, delayMs: 0, once: true },
        scroll: { enabled: false, type: 'none', intensity: 0.2 },
        mouse: { enabled: false, type: 'none', intensity: 0.2 },
        sticky: { enabled: false, mode: 'none', offsetPx: 0, zIndex: 10 }
      },
      // Attributes
      elementId: '',
      cssClasses: '',
      customCSS: ''
    },
    Image: { 
      // Content
      srcType: 'url',
      srcUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800',
      uploadedAssetId: '',
      altText: 'Image',
      title: '',
      linkEnabled: false,
      linkUrl: '',
      linkNewTab: false,
      linkNofollow: false,
      linkSponsored: false,
      // Style - Dimensions
      widthMode: 'auto',
      width: 100,
      heightMode: 'auto',
      height: 100,
      objectFit: 'cover',
      objectPosition: 'center',
      alignment: 'left',
      // Style - Spacing
      paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0,
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      // Style - Border
      borderEnabled: false,
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: 0,
      // Style - Effects
      shadowEnabled: false,
      shadowX: 0,
      shadowY: 4,
      shadowBlur: 6,
      shadowSpread: 0,
      shadowColor: 'rgba(0,0,0,0.1)',
      opacity: 1,
      backgroundColor: 'transparent',
      // Advanced - Layout
      alignSelf: 'auto',
      order: 0,
      // Advanced - Position
      position: 'relative',
      positionTop: '',
      positionRight: '',
      positionBottom: '',
      positionLeft: '',
      zIndex: '',
      // Advanced - Motion
      motion: {
        enabled: false,
        entrance: { preset: 'none', durationMs: 400, delayMs: 0, once: true },
        scroll: { enabled: false, type: 'none', intensity: 0.2 },
        mouse: { enabled: false, type: 'none', intensity: 0.2 },
        sticky: { enabled: false, mode: 'none', offsetPx: 0, zIndex: 10 }
      },
      // Advanced - Attributes
      elementId: '',
      cssClasses: '',
      customCSS: ''
    },
    Button: { 
      text: 'Click Me', 
      href: '#', 
      backgroundColor: '#4368D9', 
      color: '#ffffff', 
      size: 'md',
      alignment: 'left',
      fullWidth: false,
      // Padding (internal button)
      paddingTop: 12, paddingRight: 24, paddingBottom: 12, paddingLeft: 24,
      // Margin (external wrapper)
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      borderRadius: 6,
      fontSize: 16,
      fontWeight: '500',
      opacity: 1,
      boxShadow: '',
      // Motion
      motion: {
        enabled: false,
        entrance: { preset: 'none', durationMs: 400, delayMs: 0, once: true },
        interaction: { enabled: true },
        hover: { scale: 1, shadowIntensity: 0 },
        tap: { scale: 0.95 },
        transition: { durationMs: 200 }
      }
    },
    Icon: { 
      // Content
      iconSource: 'library',
      iconPack: 'lucide',
      iconName: 'Star',
      emoji: '⭐',
      svgMarkup: '',
      // Style - Dimensions
      iconSize: 32,
      width: '',
      height: '',
      strokeWidth: 2,
      // Style - Color
      color: '#000000',
      bgEnabled: false,
      bgColor: 'transparent',
      // Style - Border
      borderEnabled: false,
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: 0,
      // Style - Spacing
      paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0,
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      // Style - Alignment
      alignment: 'left',
      // Advanced - Effects
      opacity: 1,
      boxShadow: '',
      // Advanced - Layout
      alignSelf: 'auto',
      order: 0,
      // Advanced - Position
      position: 'relative',
      positionTop: '',
      positionRight: '',
      positionBottom: '',
      positionLeft: '',
      zIndex: '',
      // Advanced - Motion
      motion: {
        enabled: false,
        entrance: { preset: 'none', durationMs: 400, delayMs: 0, once: true },
        scroll: { enabled: false, type: 'none', intensity: 0.2 },
        mouse: { enabled: false, type: 'none', intensity: 0.2 },
        sticky: { enabled: false, mode: 'none', offsetPx: 0, zIndex: 10 }
      },
      // Advanced - Attributes
      elementId: '',
      cssClasses: '',
      customCSS: ''
    },
    Divider: { 
      // Content
      dividerType: 'line', // line, text, icon, emoji
      text: '',
      iconSource: 'library',
      iconName: 'Star',
      emoji: '⭐',
      linePlacement: 'split', // split, left, right
      // Style - Line
      lineStyle: 'solid', // solid, dashed, dotted, double, gradient, glow
      lineColor: '#E5E7EB',
      lineThickness: 1,
      lineOpacity: 1,
      lineWidth: '100%',
      lineMaxWidth: '',
      // Style - Spacing
      gap: 12, // space between line and text/icon
      paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0,
      marginTop: 16, marginRight: 0, marginBottom: 16, marginLeft: 0,
      // Style - Alignment
      alignment: 'center', // left, center, right
      // Style - Text/Icon
      textColor: '#374151',
      textSize: 14,
      fontWeight: '500',
      iconSize: 20,
      iconColor: '#374151',
      // Advanced - Layout
      width: '',
      maxWidth: '',
      alignSelf: 'auto',
      order: 0,
      // Advanced - Position
      position: 'relative',
      positionTop: '',
      positionRight: '',
      positionBottom: '',
      positionLeft: '',
      zIndex: '',
      // Advanced - Motion
      motion: {
        enabled: false,
        entrance: { preset: 'none', durationMs: 400, delayMs: 0, once: true }
      },
      // Advanced - Attributes
      elementId: '',
      cssClasses: '',
      customCSS: ''
    },
    Spacer: { 
      // Content
      spacePx: 32,
      responsive: {
        enabled: false,
        desktop: 32,
        tablet: 24,
        mobile: 16
      },
      // Style - Appearance
      showGuide: false,
      backgroundEnabled: false,
      backgroundColor: 'transparent',
      borderEnabled: false,
      borderColor: '#E5E7EB',
      borderWidth: 1,
      borderRadius: 0,
      // Style - Spacing
      paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0,
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      // Advanced - Layout
      width: '',
      maxWidth: '',
      alignSelf: 'auto',
      order: 0,
      // Advanced - Position
      position: 'relative',
      positionTop: '',
      positionRight: '',
      positionBottom: '',
      positionLeft: '',
      zIndex: '',
      // Advanced - Motion
      motion: {
        enabled: false,
        entrance: { preset: 'none', durationMs: 400, delayMs: 0, once: true }
      },
      // Advanced - Attributes
      elementId: '',
      cssClasses: '',
      customCSS: ''
    },
    Video: { 
      // Content
      sourceType: 'youtube',
      embedUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      videoUrl: '',
      uploadedAssetId: '',
      posterUrl: '',
      title: '',
      caption: '',
      startTime: 0,
      endTime: 0,
      lazyLoad: true,
      // Playback
      controls: true,
      autoplay: false,
      muted: true,
      loop: false,
      playsInline: true,
      preload: 'metadata',
      // Style - Aspect Ratio
      aspectMode: '16:9',
      aspectW: 16,
      aspectH: 9,
      widthMode: 'full',
      width: 100,
      heightMode: 'auto',
      height: 100,
      objectFit: 'cover',
      // Style - Spacing
      paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0,
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      // Style - Border
      borderEnabled: false,
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: 0,
      // Style - Effects
      shadowEnabled: false,
      shadowX: 0,
      shadowY: 4,
      shadowBlur: 6,
      shadowSpread: 0,
      shadowColor: 'rgba(0,0,0,0.1)',
      opacity: 1,
      backgroundColor: '#000000',
      // Advanced - Layout
      alignSelf: 'auto',
      order: 0,
      // Advanced - Position
      position: 'relative',
      positionTop: '',
      positionRight: '',
      positionBottom: '',
      positionLeft: '',
      zIndex: '',
      // Advanced - Motion
      motion: {
        enabled: false,
        entrance: { preset: 'none', durationMs: 400, delayMs: 0, once: true },
        scroll: { enabled: false, type: 'none', intensity: 0.2 },
        mouse: { enabled: false, type: 'none', intensity: 0.2 },
        sticky: { enabled: false, mode: 'none', offsetPx: 0, zIndex: 10 }
      },
      // Advanced - Attributes
      elementId: '',
      cssClasses: '',
      customCSS: ''
    },
    Container: { 
      // Children
      children: [],
      // Layout
      displayMode: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      gap: 16,
      // Content Width
      widthMode: 'boxed',
      maxWidth: 1200,
      minHeight: '',
      overflow: 'visible',
      // Spacing
      paddingTop: 24, paddingRight: 24, paddingBottom: 24, paddingLeft: 24,
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      // Background
      backgroundMode: 'color',
      backgroundColor: 'transparent',
      backgroundImage: '',
      gradientColor1: '#ffffff',
      gradientColor2: '#000000',
      gradientType: 'linear',
      gradientAngle: 180,
      imageSize: 'cover',
      imageRepeat: 'no-repeat',
      imagePosition: 'center',
      overlayColor: '#000000',
      overlayOpacity: 0,
      // Border
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: 0,
      // Effects
      opacity: 1,
      boxShadow: '',
      // Advanced - Layout
      width: '',
      alignSelf: 'auto',
      order: 0,
      // Advanced - Position
      position: 'relative',
      positionTop: '',
      positionRight: '',
      positionBottom: '',
      positionLeft: '',
      zIndex: '',
      // Advanced - Attributes
      elementId: '',
      cssClasses: '',
      customCSS: ''
    },
    Section: { 
      // Children
      children: [],
      // Layout
      displayMode: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      gap: 24,
      // Content Width
      contentWidth: 'full',
      maxWidth: 1200,
      minHeight: '',
      overflow: 'visible',
      // Spacing
      paddingTop: 48, paddingRight: 24, paddingBottom: 48, paddingLeft: 24,
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      // Background
      backgroundMode: 'color',
      backgroundColor: 'transparent',
      backgroundImage: '',
      gradientColor1: '#ffffff',
      gradientColor2: '#000000',
      gradientType: 'linear',
      gradientAngle: 180,
      imageSize: 'cover',
      imageRepeat: 'no-repeat',
      imagePosition: 'center',
      overlayColor: '#000000',
      overlayOpacity: 0,
      // Border
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: 0,
      // Effects
      opacity: 1,
      boxShadow: '',
      // Advanced - Position
      position: 'relative',
      positionTop: '',
      positionRight: '',
      positionBottom: '',
      positionLeft: '',
      zIndex: '',
      // Advanced - Attributes
      elementId: '',
      cssClasses: '',
      customCSS: ''
    },
    Header: { 
      backgroundColor: '#ffffff', 
      padding: 16, 
      children: [
        { 
          id: 'logo-1', 
          type: 'Logo', 
          logoType: 'text', // 'text' or 'image'
          text: 'LOGO', 
          imageSrc: '', 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: '#000000', 
          width: 120,
          height: 'auto',
          borderRadius: 0,
          zone: 'left' 
        },
        { 
          id: 'tagline-1', 
          type: 'Tagline', 
          text: 'Your Awesome Tagline', 
          fontSize: 14, 
          color: '#6B7280', 
          alignment: 'left', 
          maxWidth: 300, 
          marginTop: 4, 
          marginBottom: 0, 
          zone: 'left' 
        },
        { id: 'nav-1', type: 'Navigation', items: ['Home', 'About', 'Services', 'Contact'], textColor: '#000000', zone: 'center' },
        { id: 'search-1', type: 'SearchBar', placeholder: 'Search...', backgroundColor: '#f3f4f6', zone: 'right' },
        { id: 'icon-1', type: 'IconButton', icon: 'User', size: 24, color: '#000000', zone: 'right' },
        { 
          id: 'submenu-1', 
          type: 'Submenu',
          tabs: [
            { id: 'tab-1', label: 'Posts', type: 'social_view', value: 'posts', visibility: 'both' },
            { id: 'tab-2', label: 'Reels', type: 'social_view', value: 'reels', visibility: 'both' },
            { id: 'tab-3', label: 'Tagged', type: 'social_view', value: 'tagged', visibility: 'both' },
            { id: 'tab-4', label: 'About', type: 'social_view', value: 'about', visibility: 'both' },
          ],
          styleVariant: 'underline',
          alignment: 'center',
          backgroundColor: 'transparent',
          textColor: '#6B7280',
          activeColor: '#000000',
          sticky: false,
          mobileScroll: true
        }
      ]
    },
    Footer: { 
      backgroundColor: '#1f2937',
      padding: 0,
      layoutMode: 'simple', // 'simple' | 'widgets'
      
      // Data for "Simple Rows" Mode
      rows: {
        top: { enabled: false, backgroundColor: '#1F2937', padding: 12 },
        main: { enabled: true, backgroundColor: 'transparent', padding: 32 },
        bottom: { enabled: true, backgroundColor: '#111827', padding: 16 }
      },
      children: [ // Children for Simple Mode
        // Main Row - Left: Brand Block
        { 
          id: 'footer-brand-1', 
          type: 'BrandBlock', 
          row: 'main', 
          zone: 'left',
          logoType: 'text',
          text: 'BRAND',
          fontSize: 24,
          fontWeight: 'bold',
          color: '#ffffff',
          bio: 'Building the future of digital experiences.',
          bioColor: '#9CA3AF'
        },
        // Main Row - Center: Footer Menu
        {
          id: 'footer-menu-1',
          type: 'FooterMenu',
          row: 'main',
          zone: 'center',
          items: [
            { label: 'Home', link: '/' },
            { label: 'About', link: '#' },
            { label: 'Services', link: '#' },
            { label: 'Contact', link: '#' }
          ],
          textColor: '#D1D5DB',
          layout: 'horizontal'
        },
        // Main Row - Right: Social Icons
        {
          id: 'footer-social-1',
          type: 'Social',
          row: 'main',
          zone: 'right',
          socialIcons: [
            { network: 'Facebook', url: '#' },
            { network: 'Instagram', url: '#' },
            { network: 'Twitter', url: '#' }
          ],
          iconColor: '#ffffff',
          iconSize: 20
        },
        // Bottom Row - Left: Copyright
        {
          id: 'footer-copyright-1',
          type: 'Copyright',
          row: 'bottom',
          zone: 'left',
          text: '© 2025 Your Company. All rights reserved.',
          textColor: '#6B7280',
          fontSize: 12
        },
        // Bottom Row - Right: Legal Links
        {
          id: 'footer-legal-1',
          type: 'LegalLinks',
          row: 'bottom',
          zone: 'right',
          items: [
            { label: 'Privacy Policy', link: '#' },
            { label: 'Terms of Service', link: '#' }
          ],
          textColor: '#6B7280',
          fontSize: 12
        }
      ],

      // Data for "Advanced Widgets" Mode (4 Horizontal Bands)
      widgetBands: [
        { 
          id: 'band-1', 
          name: 'Footer Top Band', 
          backgroundColor: 'transparent', 
          padding: 24,
          areas: [
            { id: 'band-1-area-1', name: 'Area 1', children: [] },
            { id: 'band-1-area-2', name: 'Area 2', children: [] },
            { id: 'band-1-area-3', name: 'Area 3', children: [] }
          ]
        },
        { 
          id: 'band-2', 
          name: 'Footer Main Band', 
          backgroundColor: 'transparent', 
          padding: 24,
          areas: [
            { id: 'band-2-area-1', name: 'Area 1', children: [] },
            { id: 'band-2-area-2', name: 'Area 2', children: [] },
            { id: 'band-2-area-3', name: 'Area 3', children: [] }
          ]
        },
        { 
          id: 'band-3', 
          name: 'Footer Info Band', 
          backgroundColor: 'transparent', 
          padding: 24,
          areas: [
            { id: 'band-3-area-1', name: 'Area 1', children: [] },
            { id: 'band-3-area-2', name: 'Area 2', children: [] },
            { id: 'band-3-area-3', name: 'Area 3', children: [] }
          ]
        },
        { 
          id: 'band-4', 
          name: 'Footer Bottom Band', 
          backgroundColor: 'transparent', 
          padding: 24,
          areas: [
            { id: 'band-4-area-1', name: 'Area 1', children: [] },
            { id: 'band-4-area-2', name: 'Area 2', children: [] },
            { id: 'band-4-area-3', name: 'Area 3', children: [] }
          ]
        }
      ]
    },
    Card: { title: 'Card Title', description: 'Card description', padding: 24, borderRadius: 8 },
    ButtonGroup: { padding: 16 },
    Form: { title: 'Contact Us', description: '', submitText: 'Submit', padding: 24 },
    ContactForm: { title: 'Get in Touch', description: 'Fill out the form below', submitText: 'Send Message', padding: 24 },
    HeroSection: { title: 'Welcome to Your Site', subtitle: 'Create amazing things', ctaText: 'Get Started', backgroundColor: '#f3f4f6', padding: 80 },
    PortfolioGrid: { padding: 24 },
    Feed: { padding: 16 },
    Stories: { padding: 16 },
    Reels: { padding: 16 },
    ProductGrid: { padding: 24 },
    HTML: { html: '<p>HTML content goes here</p>', padding: 16 },
    Biography: { name: 'Your Name', title: 'Your Title', bio: 'Your biography goes here...', padding: 24 },
    Columns: { 
      // Children (array of column objects)
      children: [
        { id: 'col-1', width: '50%', children: [] },
        { id: 'col-2', width: '50%', children: [] }
      ],
      // Layout
      columnCount: 2,
      gap: 16,
      // Responsive
      stackOnTablet: true,
      stackOnMobile: true,
      // Spacing
      paddingTop: 16, paddingRight: 0, paddingBottom: 16, paddingLeft: 0,
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      // Background
      backgroundMode: 'color',
      backgroundColor: 'transparent',
      backgroundImage: '',
      gradientColor1: '#ffffff',
      gradientColor2: '#000000',
      gradientType: 'linear',
      gradientAngle: 180,
      imageSize: 'cover',
      imageRepeat: 'no-repeat',
      imagePosition: 'center',
      overlayColor: '#000000',
      overlayOpacity: 0,
      // Border
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: 0,
      // Effects
      opacity: 1,
      boxShadow: '',
      // Advanced
      position: 'relative',
      positionTop: '',
      positionRight: '',
      positionBottom: '',
      positionLeft: '',
      zIndex: '',
      elementId: '',
      cssClasses: '',
      customCSS: ''
    },
    Grid: { 
      // Children
      children: [],
      // Grid Layout
      columns: 3,
      rows: 'auto',
      gap: 16,
      columnGap: 16,
      rowGap: 16,
      autoFlow: 'row',
      // Responsive
      tabletColumns: 2,
      mobileColumns: 1,
      // Spacing
      paddingTop: 16, paddingRight: 0, paddingBottom: 16, paddingLeft: 0,
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      // Background
      backgroundMode: 'color',
      backgroundColor: 'transparent',
      backgroundImage: '',
      gradientColor1: '#ffffff',
      gradientColor2: '#000000',
      gradientType: 'linear',
      gradientAngle: 180,
      imageSize: 'cover',
      imageRepeat: 'no-repeat',
      imagePosition: 'center',
      overlayColor: '#000000',
      overlayOpacity: 0,
      // Border
      borderColor: '#000000',
      borderWidth: 0,
      borderStyle: 'solid',
      borderRadius: 0,
      // Effects
      opacity: 1,
      boxShadow: '',
      // Advanced
      position: 'relative',
      positionTop: '',
      positionRight: '',
      positionBottom: '',
      positionLeft: '',
      zIndex: '',
      elementId: '',
      cssClasses: '',
      customCSS: ''
    },
    Comments: { padding: 16 },
    Logo: { text: 'LOGO', fontSize: 24, fontWeight: 'bold', color: '#000000', padding: 16 },
    Tagline: { text: 'Your Tagline', fontSize: 14, color: '#6B7280', alignment: 'left', maxWidth: 300, marginTop: 4, marginBottom: 8 },
    Navigation: { items: ['Home', 'About', 'Services', 'Contact'], padding: 16, textColor: '#000000' },
    SearchBar: { placeholder: 'Search...', padding: 16, backgroundColor: '#f3f4f6' },
    IconButton: { icon: 'Menu', size: 24, color: '#000000', padding: 8 },
    FollowButton: { 
      label: 'Follow', 
      followingLabel: 'Following', 
      buttonType: 'primary', // primary, outline, text
      iconStyle: 'icon_text', // text_only, icon_text, icon_only
      icon: 'UserPlus',
      size: 'md',
      // Styles
      labelColor: '#ffffff',
      backgroundColor: '#4368D9',
      paddingTop: 10, paddingRight: 20, paddingBottom: 10, paddingLeft: 20,
      borderRadiusTop: 4, borderRadiusRight: 4, borderRadiusBottom: 4, borderRadiusLeft: 4,
      marginTop: 0, marginRight: 0, marginBottom: 0, marginLeft: 0,
      fontSize: 14, fontWeight: '600',
    },
  };
  return defaults[type] || { padding: 16 };
};

const MAX_HISTORY = 50;

export default function BuilderV2() {
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([[]]);   // stack of elements snapshots
  const [historyIndex, setHistoryIndex] = useState(0);
  const skipHistoryRef = React.useRef(false);       // flag to skip recording during undo/redo
  const [selectedElement, setSelectedElement] = useState(null);
  const [deviceView, setDeviceView] = useState('desktop');
  const [canvasSettings, setCanvasSettings] = useState({
    padding: 24,
    maxWidth: 1200,
    snapToGrid: true,
  });
  const [lastSaved, setLastSaved] = useState(null);
  
  // Pages management - Canvas pages for editing
  const [pages, setPages] = useState([
    { id: 'home', name: 'Home', slug: 'home', canvasJson: [] },
  ]);
  const [activePageId, setActivePageId] = useState('home');
  const [deleteConfirmPageId, setDeleteConfirmPageId] = useState(null);
  
  // Derived page list from Header element (single source of truth)
  const derivedPages = React.useMemo(() => {
    const header = elements.find(el => el.type === 'Header');
    if (!header) return pages;
    
    const result = [];
    
    // Extract navigation items
    const navElement = header.props?.children?.find(c => c.type === 'Navigation');
    if (navElement && navElement.items) {
      navElement.items.forEach((item, idx) => {
        const slug = item.toLowerCase().replace(/\s+/g, '-');
        const existingPage = pages.find(p => p.slug === slug);
        result.push({
          id: existingPage?.id || `nav-${slug}`,
          name: item,
          slug: slug,
          type: 'main',
          canvasJson: existingPage?.canvasJson || []
        });
      });
    }
    
    // Extract submenu tabs
    const submenuElement = header.props?.children?.find(c => c.type === 'Submenu');
    if (submenuElement && submenuElement.tabs) {
      submenuElement.tabs.forEach((tab) => {
        const existingPage = pages.find(p => p.slug === tab.value);
        result.push({
          id: existingPage?.id || `tab-${tab.value}`,
          name: tab.label,
          slug: tab.value,
          type: 'subtab',
          canvasJson: existingPage?.canvasJson || []
        });
      });
    }
    
    return result.length > 0 ? result : pages;
  }, [elements, pages]);

  // Record undo history whenever elements change (skip during undo/redo)
  React.useEffect(() => {
    if (skipHistoryRef.current) {
      skipHistoryRef.current = false;
      return;
    }
    setHistory(prev => {
      const truncated = prev.slice(0, historyIndex + 1);
      const next = [...truncated, elements].slice(-MAX_HISTORY);
      return next;
    });
    setHistoryIndex(prev => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [elements]);

  const undo = () => {
    setHistory(prev => {
      const newIndex = Math.max(historyIndex - 1, 0);
      if (newIndex === historyIndex) return prev;
      skipHistoryRef.current = true;
      setElements(prev[newIndex]);
      setHistoryIndex(newIndex);
      return prev;
    });
  };

  const redo = () => {
    setHistory(prev => {
      const newIndex = Math.min(historyIndex + 1, prev.length - 1);
      if (newIndex === historyIndex) return prev;
      skipHistoryRef.current = true;
      setElements(prev[newIndex]);
      setHistoryIndex(newIndex);
      return prev;
    });
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  // Load from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('builderv2-pages');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.pages && data.pages.length > 0) {
          setPages(data.pages);
          setActivePageId(data.activePageId || data.pages[0].id);
          // Load active page canvas
          const activePage = data.pages.find(p => p.id === (data.activePageId || data.pages[0].id));
          if (activePage) {
            const validElements = (activePage.canvasJson || []).filter(el => el && el.id && el.type);
            setElements(validElements);
          }
        }
        if (data.canvasSettings) {
          setCanvasSettings(data.canvasSettings);
        }
        setLastSaved(data.timestamp);
      } catch (e) {
        console.error('Failed to load saved data:', e);
      }
    }
  }, []);

  // Save to localStorage
  const saveToLocalStorage = () => {
    // Update current page's canvas
    const updatedPages = pages.map(page => 
      page.id === activePageId ? { ...page, canvasJson: elements } : page
    );
    
    const data = {
      pages: updatedPages,
      activePageId,
      canvasSettings,
      timestamp: Date.now(),
    };
    localStorage.setItem('builderv2-pages', JSON.stringify(data));
    setLastSaved(Date.now());
  };

  // Auto-save every 30 seconds
  React.useEffect(() => {
    const interval = setInterval(() => {
      saveToLocalStorage();
    }, 30000);
    return () => clearInterval(interval);
  }, [elements, canvasSettings, pages, activePageId]);

  // Escape key handler - cancel drag and clear selection
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedElement(null);
      }
      // Delete key - delete selected element
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedElement && !e.target.matches('input, textarea')) {
        e.preventDefault();
        forceDeleteSelected();
      }
      // Undo: Ctrl+Z
      if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey && !e.target.matches('input, textarea')) {
        e.preventDefault();
        undo();
      }
      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if (((e.key === 'y' && (e.ctrlKey || e.metaKey)) || (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey)) && !e.target.matches('input, textarea')) {
        e.preventDefault();
        redo();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElement, historyIndex, history]);

  // Handle drag end with nested container support
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    if (
      result.source.droppableId === result.destination.droppableId &&
      result.source.index === result.destination.index
    ) return;

    const { source, destination, draggableId } = result;
    const sourceZone = parseDroppableId(source.droppableId);
    const destZone = parseDroppableId(destination.droppableId);

    // --- Adding from Library ---
    if (source.droppableId.startsWith('library-')) {
      const newElement = {
        id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        type: draggableId,
        props: getDefaultProps(draggableId),
      };

      setElements(prev => {
        const valid = prev.filter(el => el && el.id);

        // Special case: Header/Footer lock to top/bottom
        if (draggableId === 'Header' || draggableId === 'Footer') {
          const filtered = valid.filter(e => e.type !== draggableId);
          if (draggableId === 'Header') return [newElement, ...filtered];
          return [...filtered, newElement];
        }

        const header = valid.find(e => e.type === 'Header');
        const footer = valid.find(e => e.type === 'Footer');
        const body = valid.filter(e => e.type !== 'Header' && e.type !== 'Footer');
        const newBody = insertElementIntoZone(body, destZone, destination.index, newElement);

        return [
          ...(header ? [header] : []),
          ...newBody,
          ...(footer ? [footer] : []),
        ];
      });

      setSelectedElement(newElement);
      return;
    }

    // --- Moving Existing Elements ---
    setElements(prev => {
      const valid = prev.filter(el => el && el.id);
      const header = valid.find(e => e.type === 'Header');
      const footer = valid.find(e => e.type === 'Footer');
      const body = valid.filter(e => e.type !== 'Header' && e.type !== 'Footer');

      const { tree: bodyAfterRemove, removed } = removeElementById(body, draggableId);
      if (!removed) return prev;

      const newBody = insertElementIntoZone(bodyAfterRemove, destZone, destination.index, removed);

      return [
        ...(header ? [header] : []),
        ...newBody,
        ...(footer ? [footer] : []),
      ];
    });
  };

  const updateElementProps = (elementId, newProps) => {
    // Recursive update helper
    const updateInTree = (els) => {
      return els.map((el) => {
        if (el.id === elementId) {
          return { ...el, props: { ...el.props, ...newProps } };
        }

        // Handle nested children (Container/Section/Grid)
        if (el.props?.children && Array.isArray(el.props.children)) {
          // Check direct children (Header/Footer child elements)
          const childIndex = el.props.children.findIndex(c => c && c.id === elementId);
          if (childIndex !== -1) {
            const newChildren = [...el.props.children];
            newChildren[childIndex] = { ...newChildren[childIndex], ...newProps };
            return { ...el, props: { ...el.props, children: newChildren } };
          }

          // Recurse into nested layout elements
          const updated = updateInTree(el.props.children);
          if (updated !== el.props.children) {
            return { ...el, props: { ...el.props, children: updated } };
          }
        }

        // Handle Columns special case
        if (el.type === 'Columns' && el.props?.children) {
          const newCols = el.props.children.map(col => {
            if (col.children) {
              const updated = updateInTree(col.children);
              if (updated !== col.children) {
                return { ...col, children: updated };
              }
            }
            return col;
          });
          if (JSON.stringify(newCols) !== JSON.stringify(el.props.children)) {
            return { ...el, props: { ...el.props, children: newCols } };
          }
        }

        return el;
      });
    };

    setElements((prev) => updateInTree(prev.filter(el => el && el.id)));

    // Update selectedElement if it's the one being modified
    setSelectedElement((prev) => {
      if (!prev) return null;
      if (prev.id === elementId) {
         return { ...prev, props: { ...prev.props, ...newProps } };
      }
      return prev;
    });
  };

  const deleteElement = (elementId) => {
    console.log('🗑️ Deleting element:', elementId);
    setElements((prev) => prev.filter((el) => el && el.id && el.id !== elementId));
    if (selectedElement?.id === elementId) {
      setSelectedElement(null);
    }
  };

  // Force delete selected element (always works as fallback)
  const forceDeleteSelected = () => {
    if (selectedElement) {
      deleteElement(selectedElement.id);
    }
  };

  const duplicateElement = (elementId) => {
    const element = elements.find((el) => el && el.id === elementId);
    if (!element) {
      console.error('❌ Cannot duplicate - element not found:', elementId);
      return;
    }
    
    const newElement = {
      ...element,
      id: `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    const index = elements.findIndex((el) => el && el.id === elementId);
    const newElements = [...elements];
    newElements.splice(index + 1, 0, newElement);
    setElements(newElements);
    setSelectedElement(newElement);
  };

  // Page management functions
  const switchToPage = (pageId) => {
    if (pageId === activePageId) return;
    
    // Save current page before switching
    const updatedPages = pages.map(page => 
      page.id === activePageId ? { ...page, canvasJson: elements } : page
    );
    setPages(updatedPages);
    
    // Load new page - check both pages and derivedPages
    const allPages = [...updatedPages, ...derivedPages.filter(dp => !updatedPages.find(p => p.id === dp.id))];
    const targetPage = allPages.find(p => p.id === pageId);
    if (targetPage) {
      const validElements = (targetPage.canvasJson || []).filter(el => el && el.id && el.type);
      setElements(validElements);
      setActivePageId(pageId);
      setSelectedElement(null);
      
      // If this is a derived page not in pages, add it
      if (!updatedPages.find(p => p.id === pageId)) {
        updatedPages.push(targetPage);
        setPages(updatedPages);
      }
      
      // Save to localStorage
      const data = {
        pages: updatedPages,
        activePageId: pageId,
        canvasSettings,
        timestamp: Date.now(),
      };
      localStorage.setItem('builderv2-pages', JSON.stringify(data));
      setLastSaved(Date.now());
    }
  };

  const addNewPage = () => {
    // Find next available page number
    const pageNumbers = derivedPages
      .map(p => p.name.match(/^Page (\d+)$/))
      .filter(Boolean)
      .map(match => parseInt(match[1]));
    const nextNumber = pageNumbers.length > 0 ? Math.max(...pageNumbers) + 1 : 1;
    
    const newPage = {
      id: `page-${Date.now()}`,
      name: `Page ${nextNumber}`,
      slug: `page-${nextNumber}`,
      canvasJson: [],
    };
    
    // Save current page before switching
    const updatedPages = pages.map(page => 
      page.id === activePageId ? { ...page, canvasJson: elements } : page
    );
    const newPages = [...updatedPages, newPage];
    
    setPages(newPages);
    setElements([]);
    setActivePageId(newPage.id);
    setSelectedElement(null);
    
    // Save to localStorage
    const data = {
      pages: newPages,
      activePageId: newPage.id,
      canvasSettings,
      timestamp: Date.now(),
    };
    localStorage.setItem('builderv2-pages', JSON.stringify(data));
    setLastSaved(Date.now());
  };

  const deletePage = (pageId) => {
    // Prevent deleting last page
    if (derivedPages.length <= 1) {
      return;
    }

    const updatedPages = pages.filter(p => p.id !== pageId);
    
    // If deleting active page, switch to first available
    let newActivePageId = activePageId;
    if (pageId === activePageId) {
      const remainingDerived = derivedPages.filter(p => p.id !== pageId);
      newActivePageId = remainingDerived[0]?.id || derivedPages[0]?.id;
      
      // Load new page canvas
      const targetPage = [...updatedPages, ...remainingDerived].find(p => p.id === newActivePageId);
      if (targetPage) {
        const validElements = (targetPage.canvasJson || []).filter(el => el && el.id && el.type);
        setElements(validElements);
      }
    }
    
    setPages(updatedPages);
    setActivePageId(newActivePageId);
    setDeleteConfirmPageId(null);
    setSelectedElement(null);
    
    // Save to localStorage
    const data = {
      pages: updatedPages,
      activePageId: newActivePageId,
      canvasSettings,
      timestamp: Date.now(),
    };
    localStorage.setItem('builderv2-pages', JSON.stringify(data));
    setLastSaved(Date.now());
  };

  const DeviceButton = ({ icon: Icon, type, label }) => (
    <button
      onClick={() => setDeviceView(type)}
      style={{
        padding: '8px 12px',
        backgroundColor: deviceView === type ? 'rgba(255,255,255,0.15)' : 'transparent',
        color: deviceView === type ? '#ffffff' : '#9CA3AF',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.2s',
      }}
      title={label}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%', backgroundColor: '#0A0D14', color: 'white', fontFamily: 'Inter, sans-serif' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', padding: '0 20px', backgroundColor: '#121726', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to={createPageUrl('Dashboard')}>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <ChevronLeft size={20} />
              </Button>
            </Link>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #4368D9 0%, #6E43D9 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SquarePen size={18} color="white" />
            </div>
            <h1 style={{ fontSize: '16px', fontWeight: '600', color: 'white' }}>Profile Builder V2</h1>

            {/* Pages Carousel - Derived from Header */}
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '24px', flex: '0 1 auto', minWidth: 0 }}>
              <style>{`
                .pages-scrollbar::-webkit-scrollbar {
                  height: 4px;
                }
                .pages-scrollbar::-webkit-scrollbar-track {
                  background: transparent;
                }
                .pages-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(255,255,255,0.2);
                  border-radius: 2px;
                }
                .pages-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(255,255,255,0.3);
                }
              `}</style>
              <div 
                className="pages-scrollbar"
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px', 
                  overflowX: 'auto',
                  overflowY: 'hidden',
                  maxWidth: '400px',
                  padding: '4px 0',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,255,255,0.2) transparent',
                }}
              >
                {derivedPages.map(page => (
                  <div
                    key={page.id}
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      flexShrink: 0,
                    }}
                    className="group"
                  >
                    <button
                      onClick={() => switchToPage(page.id)}
                      style={{
                        padding: '6px 14px',
                        paddingRight: '28px',
                        backgroundColor: page.id === activePageId ? '#4368D9' : 'rgba(255,255,255,0.05)',
                        color: page.id === activePageId ? '#ffffff' : '#9CA3AF',
                        border: page.id === activePageId ? 'none' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '20px',
                        fontSize: '13px',
                        fontWeight: page.id === activePageId ? '600' : '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                      className="hover:bg-[rgba(255,255,255,0.1)]"
                    >
                      {page.name}
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            position: 'absolute',
                            right: '4px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '20px',
                            height: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'transparent',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            opacity: 0,
                            transition: 'opacity 0.2s, background-color 0.2s',
                          }}
                          className="group-hover:opacity-100 hover:bg-[rgba(0,0,0,0.2)]"
                        >
                          <MoreVertical size={12} color="#ffffff" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#1A1F2E] border-gray-700 text-white">
                        <DropdownMenuItem 
                          onClick={() => setDeleteConfirmPageId(page.id)}
                          disabled={derivedPages.length <= 1}
                          className="cursor-pointer hover:bg-red-500/10 text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 size={14} className="mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
                <button
                  onClick={addNewPage}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    color: '#9CA3AF',
                    border: '1px dashed rgba(255,255,255,0.2)',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                  className="hover:bg-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.3)]"
                  title="Add new page"
                >
                  <Plus size={14} />
                  Page
                </button>
              </div>
            </div>
          </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingRight: '12px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <label style={{ fontSize: '12px', color: '#9CA3AF' }}>Padding:</label>
            <input
              type="range"
              min="0"
              max="80"
              step="8"
              value={canvasSettings.padding}
              onChange={(e) => setCanvasSettings({ ...canvasSettings, padding: parseInt(e.target.value) })}
              style={{ width: '80px' }}
            />
            <span style={{ fontSize: '11px', color: '#E5E7EB', minWidth: '30px' }}>{canvasSettings.padding}px</span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingRight: '12px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <label style={{ fontSize: '12px', color: '#9CA3AF' }}>Max Width:</label>
            <input
              type="range"
              min="600"
              max="1400"
              step="100"
              value={canvasSettings.maxWidth}
              onChange={(e) => setCanvasSettings({ ...canvasSettings, maxWidth: parseInt(e.target.value) })}
              style={{ width: '80px' }}
            />
            <span style={{ fontSize: '11px', color: '#E5E7EB', minWidth: '40px' }}>{canvasSettings.maxWidth}px</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '8px', padding: '4px' }}>
            <DeviceButton icon={Monitor} type="desktop" label="Desktop" />
            <DeviceButton icon={Tablet} type="tablet" label="Tablet" />
            <DeviceButton icon={Smartphone} type="mobile" label="Mobile" />
          </div>
          
          {/* Undo / Redo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '12px', borderRight: '1px solid rgba(255,255,255,0.1)' }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={undo}
              disabled={!canUndo}
              title="Undo (Ctrl+Z)"
              className="text-gray-400 hover:text-white disabled:opacity-30"
            >
              <Undo2 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={redo}
              disabled={!canRedo}
              title="Redo (Ctrl+Y)"
              className="text-gray-400 hover:text-white disabled:opacity-30"
            >
              <Redo2 size={16} />
            </Button>
          </div>

          <Button 
            variant="outline" 
            size="sm" 
            className="bg-[#0D0F12] border-[#1E293B] text-[#94A3B8] hover:bg-[#1A1F2E] hover:text-white shadow-sm transition-colors"
            onClick={saveToLocalStorage}
            title="Auto-save is ON"
          >
            <Save size={16} className="mr-2" />
            {lastSaved ? `Saved ${new Date(lastSaved).toLocaleTimeString()}` : 'Save'}
          </Button>
          <Button variant="default" size="sm" className="bg-white text-black hover:bg-gray-200">
            <Eye size={16} className="mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmPageId !== null} onOpenChange={(open) => !open && setDeleteConfirmPageId(null)}>
        <DialogContent className="bg-[#1A1F2E] border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete Page</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete "{derivedPages.find(p => p.id === deleteConfirmPageId)?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteConfirmPageId(null)}
              className="bg-transparent border-gray-600 text-white hover:bg-[rgba(255,255,255,0.1)]"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => deletePage(deleteConfirmPageId)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete Page
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Main Content */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div style={{ display: 'flex', flex: 1, minHeight: 0, overflow: 'hidden', position: 'relative' }}>
          {selectedElement ? (
            <PropertiesPanelV2
              key="properties-panel"
              selectedElement={selectedElement}
              updateElementProps={updateElementProps}
              onDeleteElement={deleteElement}
              onDuplicateElement={duplicateElement}
              onBack={() => setSelectedElement(null)}
              setSelectedElement={setSelectedElement}
            />
          ) : (
            <ComponentLibraryV2 key="component-library" />
          )}
          <CanvasV2
            elements={elements}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            onDeleteElement={deleteElement}
            onDuplicateElement={duplicateElement}
            canvasSettings={canvasSettings}
            deviceView={deviceView}
            dndType={DND_TYPE}
          />
        </div>
      </DragDropContext>
    </div>
  );
}