import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LayoutTemplate, User, Briefcase, FileText, Share2, Sparkles } from 'lucide-react';
import { CREATOR_THEME_01 } from './themes/CreatorTheme01';

// Generates a unique id
const uid = () => `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ─── Full multi-page themes ───────────────────────────────────────────────────
export const PAGE_THEMES = [
  { ...CREATOR_THEME_01, icon: Sparkles },
];

// ─── Single-page templates ────────────────────────────────────────────────────
export const PAGE_TEMPLATES = [
  {
    id: 'personal-profile',
    name: 'Personal Profile',
    description: 'Header, hero bio section, posts feed, and footer.',
    icon: User,
    preview: [
      { label: 'Header', color: '#4368D9' },
      { label: 'Bio Section', color: '#6E43D9' },
      { label: 'Posts Feed', color: '#4368D9' },
      { label: 'Footer', color: '#374151' },
    ],
    build: () => [
      {
        id: uid(), type: 'Header',
        props: {
          backgroundColor: '#ffffff', padding: 16,
          children: [
            { id: uid(), type: 'Logo', logoType: 'text', text: 'LOGO', fontSize: 24, fontWeight: 'bold', color: '#000000', zone: 'left' },
            { id: uid(), type: 'Navigation', items: ['Home', 'About', 'Posts', 'Contact'], textColor: '#000000', zone: 'center' },
            { id: uid(), type: 'IconButton', icon: 'User', size: 24, color: '#000000', zone: 'right' },
          ]
        }
      },
      {
        id: uid(), type: 'Section',
        props: {
          children: [],
          backgroundColor: '#F9FAFB',
          paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24,
          backgroundMode: 'color',
          displayMode: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        }
      },
      {
        id: uid(), type: 'Feed',
        props: { padding: 24 }
      },
      {
        id: uid(), type: 'Footer',
        props: {
          backgroundColor: '#1f2937', padding: 0, layoutMode: 'simple',
          rows: {
            top: { enabled: false, backgroundColor: '#1F2937', padding: 12 },
            main: { enabled: true, backgroundColor: 'transparent', padding: 32 },
            bottom: { enabled: true, backgroundColor: '#111827', padding: 16 }
          },
          children: [
            { id: uid(), type: 'BrandBlock', row: 'main', zone: 'left', logoType: 'text', text: 'BRAND', fontSize: 24, fontWeight: 'bold', color: '#ffffff', bio: 'Your personal space on the web.', bioColor: '#9CA3AF' },
            { id: uid(), type: 'FooterMenu', row: 'main', zone: 'center', items: [{ label: 'Home', link: '/' }, { label: 'About', link: '#' }, { label: 'Contact', link: '#' }], textColor: '#D1D5DB', layout: 'horizontal' },
            { id: uid(), type: 'Copyright', row: 'bottom', zone: 'left', text: '© 2025 Your Name. All rights reserved.', textColor: '#6B7280', fontSize: 12 },
          ],
          widgetBands: []
        }
      },
    ],
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    description: 'Header, hero with CTA, portfolio grid, contact form, and footer.',
    icon: Briefcase,
    preview: [
      { label: 'Header', color: '#4368D9' },
      { label: 'Hero + CTA', color: '#6E43D9' },
      { label: 'Portfolio Grid', color: '#4368D9' },
      { label: 'Contact Form', color: '#6E43D9' },
      { label: 'Footer', color: '#374151' },
    ],
    build: () => [
      {
        id: uid(), type: 'Header',
        props: {
          backgroundColor: '#0A0D14', padding: 16,
          children: [
            { id: uid(), type: 'Logo', logoType: 'text', text: 'PORTFOLIO', fontSize: 20, fontWeight: 'bold', color: '#ffffff', zone: 'left' },
            { id: uid(), type: 'Navigation', items: ['Work', 'About', 'Contact'], textColor: '#D1D5DB', zone: 'right' },
          ]
        }
      },
      {
        id: uid(), type: 'Section',
        props: {
          children: [],
          backgroundMode: 'gradient',
          gradientType: 'linear', gradientAngle: 135,
          gradientColor1: '#4368D9', gradientColor2: '#6E43D9',
          paddingTop: 80, paddingBottom: 80, paddingLeft: 24, paddingRight: 24,
          displayMode: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        }
      },
      {
        id: uid(), type: 'PortfolioGrid',
        props: { padding: 24 }
      },
      {
        id: uid(), type: 'ContactForm',
        props: { title: 'Get in Touch', description: "Let's work together", submitText: 'Send Message', padding: 48 }
      },
      {
        id: uid(), type: 'Footer',
        props: {
          backgroundColor: '#0A0D14', padding: 0, layoutMode: 'simple',
          rows: {
            top: { enabled: false, backgroundColor: '#0A0D14', padding: 12 },
            main: { enabled: true, backgroundColor: 'transparent', padding: 32 },
            bottom: { enabled: true, backgroundColor: '#000000', padding: 16 }
          },
          children: [
            { id: uid(), type: 'BrandBlock', row: 'main', zone: 'left', logoType: 'text', text: 'PORTFOLIO', fontSize: 20, fontWeight: 'bold', color: '#ffffff', bio: 'Creative work & design.', bioColor: '#9CA3AF' },
            { id: uid(), type: 'Social', row: 'main', zone: 'right', socialIcons: [{ network: 'Instagram', url: '#' }, { network: 'Twitter', url: '#' }, { network: 'LinkedIn', url: '#' }], iconColor: '#ffffff', iconSize: 20 },
            { id: uid(), type: 'Copyright', row: 'bottom', zone: 'left', text: '© 2025 Your Name.', textColor: '#6B7280', fontSize: 12 },
          ],
          widgetBands: []
        }
      },
    ],
  },
  {
    id: 'social-profile',
    name: 'Social Profile',
    description: 'Header with submenu, stories row, reels grid, and a social footer.',
    icon: Share2,
    preview: [
      { label: 'Header', color: '#4368D9' },
      { label: 'Stories', color: '#EC4899' },
      { label: 'Reels Grid', color: '#8B5CF6' },
      { label: 'Footer', color: '#374151' },
    ],
    build: () => [
      {
        id: uid(), type: 'Header',
        props: {
          backgroundColor: '#ffffff', padding: 16,
          children: [
            { id: uid(), type: 'Logo', logoType: 'text', text: 'YOUR NAME', fontSize: 20, fontWeight: 'bold', color: '#111827', zone: 'left' },
            { id: uid(), type: 'Submenu', tabs: [
              { id: uid(), label: 'Posts', type: 'social_view', value: 'posts', visibility: 'both' },
              { id: uid(), label: 'Reels', type: 'social_view', value: 'reels', visibility: 'both' },
              { id: uid(), label: 'Tagged', type: 'social_view', value: 'tagged', visibility: 'both' },
            ], styleVariant: 'underline', alignment: 'center', backgroundColor: 'transparent', textColor: '#6B7280', activeColor: '#111827', sticky: false, mobileScroll: true, zone: 'center' },
            { id: uid(), type: 'IconButton', icon: 'Bell', size: 22, color: '#374151', zone: 'right' },
          ]
        }
      },
      { id: uid(), type: 'Stories', props: { padding: 16 } },
      { id: uid(), type: 'Reels', props: { padding: 24 } },
      {
        id: uid(), type: 'Footer',
        props: {
          backgroundColor: '#111827', padding: 0, layoutMode: 'simple',
          rows: {
            top: { enabled: false, backgroundColor: '#111827', padding: 12 },
            main: { enabled: true, backgroundColor: 'transparent', padding: 24 },
            bottom: { enabled: true, backgroundColor: '#000000', padding: 16 }
          },
          children: [
            { id: uid(), type: 'Social', row: 'main', zone: 'center', socialIcons: [{ network: 'Instagram', url: '#' }, { network: 'Twitter', url: '#' }, { network: 'TikTok', url: '#' }, { network: 'YouTube', url: '#' }], iconColor: '#ffffff', iconSize: 22 },
            { id: uid(), type: 'Copyright', row: 'bottom', zone: 'left', text: '© 2025 Your Name.', textColor: '#6B7280', fontSize: 12 },
          ],
          widgetBands: []
        }
      },
    ],
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Header, hero, two-column features, CTA section, and footer.',
    icon: FileText,
    preview: [
      { label: 'Header', color: '#4368D9' },
      { label: 'Hero Section', color: '#6E43D9' },
      { label: 'Features (2 cols)', color: '#4368D9' },
      { label: 'CTA Section', color: '#6E43D9' },
      { label: 'Footer', color: '#374151' },
    ],
    build: () => [
      {
        id: uid(), type: 'Header',
        props: {
          backgroundColor: '#ffffff', padding: 16,
          children: [
            { id: uid(), type: 'Logo', logoType: 'text', text: 'BRAND', fontSize: 22, fontWeight: 'bold', color: '#111827', zone: 'left' },
            { id: uid(), type: 'Navigation', items: ['Features', 'Pricing', 'About', 'Blog'], textColor: '#374151', zone: 'center' },
            { id: uid(), type: 'SearchBar', placeholder: 'Search...', backgroundColor: '#f3f4f6', zone: 'right' },
          ]
        }
      },
      {
        id: uid(), type: 'HeroSection',
        props: { title: 'Build Something Amazing', subtitle: 'The easiest way to launch your idea online.', ctaText: 'Get Started Free', backgroundColor: '#f3f4f6', padding: 80 }
      },
      {
        id: uid(), type: 'Columns',
        props: {
          children: [
            { id: uid(), width: '50%', children: [] },
            { id: uid(), width: '50%', children: [] },
          ],
          columnCount: 2, gap: 24,
          paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
          backgroundMode: 'color', backgroundColor: '#ffffff',
        }
      },
      {
        id: uid(), type: 'Section',
        props: {
          children: [],
          backgroundMode: 'gradient',
          gradientType: 'linear', gradientAngle: 135,
          gradientColor1: '#4368D9', gradientColor2: '#6E43D9',
          paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24,
          displayMode: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        }
      },
      {
        id: uid(), type: 'Footer',
        props: {
          backgroundColor: '#1f2937', padding: 0, layoutMode: 'simple',
          rows: {
            top: { enabled: false, backgroundColor: '#1F2937', padding: 12 },
            main: { enabled: true, backgroundColor: 'transparent', padding: 32 },
            bottom: { enabled: true, backgroundColor: '#111827', padding: 16 }
          },
          children: [
            { id: uid(), type: 'BrandBlock', row: 'main', zone: 'left', logoType: 'text', text: 'BRAND', fontSize: 22, fontWeight: 'bold', color: '#ffffff', bio: 'Making the web better.', bioColor: '#9CA3AF' },
            { id: uid(), type: 'FooterMenu', row: 'main', zone: 'center', items: [{ label: 'Features', link: '#' }, { label: 'Pricing', link: '#' }, { label: 'Blog', link: '#' }], textColor: '#D1D5DB', layout: 'horizontal' },
            { id: uid(), type: 'Social', row: 'main', zone: 'right', socialIcons: [{ network: 'Twitter', url: '#' }, { network: 'LinkedIn', url: '#' }], iconColor: '#ffffff', iconSize: 20 },
            { id: uid(), type: 'Copyright', row: 'bottom', zone: 'left', text: '© 2025 Brand Inc. All rights reserved.', textColor: '#6B7280', fontSize: 12 },
            { id: uid(), type: 'LegalLinks', row: 'bottom', zone: 'right', items: [{ label: 'Privacy Policy', link: '#' }, { label: 'Terms', link: '#' }], textColor: '#6B7280', fontSize: 12 },
          ],
          widgetBands: []
        }
      },
    ],
  },
];

const TemplateRow = ({ tpl, onApplyTemplate, onOpenChange, accentColor = '#4368D9', badge }) => {
  const Icon = tpl.icon;
  return (
    <div
      className="flex items-start gap-4 p-4 rounded-lg bg-[#1A1F2E] border border-gray-700 hover:border-[#4368D9] transition-colors cursor-pointer group"
      onClick={() => { onApplyTemplate(tpl); onOpenChange(false); }}
    >
      {/* Mini preview strip */}
      <div className="flex flex-col gap-1 flex-shrink-0 w-20">
        {tpl.preview.map((block, i) => (
          <div
            key={i}
            style={{ backgroundColor: block.color, opacity: 0.85 }}
            className="rounded text-[8px] text-white font-semibold px-1.5 py-0.5 truncate"
          >
            {block.label}
          </div>
        ))}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <Icon size={16} className="flex-shrink-0" style={{ color: accentColor }} />
          <span className="font-semibold text-sm text-white">{tpl.name}</span>
          {badge && (
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">{tpl.description}</p>
      </div>
      <Button
        size="sm"
        className="flex-shrink-0 text-white group-hover:scale-105 transition-transform"
        style={{ backgroundColor: accentColor }}
        onClick={(e) => { e.stopPropagation(); onApplyTemplate(tpl); onOpenChange(false); }}
      >
        Use
      </Button>
    </div>
  );
};

export default function PageTemplatesModal({ open, onOpenChange, onApplyTemplate }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#121726] border-gray-700 text-white max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <LayoutTemplate size={18} className="text-[#4368D9]" />
            <DialogTitle className="text-white">Choose a Template</DialogTitle>
          </div>
          <DialogDescription className="text-gray-400">
            Pick a full theme or a single-page template. Everything can be customised after applying.
          </DialogDescription>
        </DialogHeader>

        {/* ── Full Themes ── */}
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-400">Full Profile Themes</span>
            <span className="text-[10px] text-gray-500 ml-1">— creates multiple pages at once</span>
          </div>
          <div className="flex flex-col gap-3">
            {PAGE_THEMES.map(tpl => (
              <TemplateRow
                key={tpl.id}
                tpl={tpl}
                onApplyTemplate={onApplyTemplate}
                onOpenChange={onOpenChange}
                accentColor="#6E43D9"
                badge={`${tpl.buildAll().length} pages`}
              />
            ))}
          </div>
        </div>

        {/* ── Single-page Templates ── */}
        <div className="mt-6">
          <div className="flex items-center gap-2 mb-3">
            <LayoutTemplate size={14} className="text-[#4368D9]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#4368D9]">Single Page Templates</span>
          </div>
          <div className="flex flex-col gap-3">
            {PAGE_TEMPLATES.map(tpl => (
              <TemplateRow
                key={tpl.id}
                tpl={tpl}
                onApplyTemplate={onApplyTemplate}
                onOpenChange={onOpenChange}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-700 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => onOpenChange(false)}
          >
            Start blank instead
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}