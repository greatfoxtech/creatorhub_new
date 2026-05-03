/**
 * Creator Profile Theme 01
 * Dark professional creator/profile theme with 7 connected pages.
 */

const uid = () => `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// ─── Shared footer used on every page ────────────────────────────────────────
const sharedFooter = () => ({
  id: uid(), type: 'Footer',
  props: {
    backgroundColor: '#0D1117', padding: 0, layoutMode: 'simple',
    rows: {
      top:    { enabled: false, backgroundColor: '#0D1117', padding: 12 },
      main:   { enabled: true,  backgroundColor: 'transparent', padding: 40 },
      bottom: { enabled: true,  backgroundColor: '#080B10', padding: 16 },
    },
    children: [
      {
        id: uid(), type: 'BrandBlock', row: 'main', zone: 'left',
        logoType: 'text', text: 'YOUR NAME', fontSize: 20, fontWeight: 'bold',
        color: '#ffffff', bio: 'Creator · Designer · Storyteller', bioColor: '#6B7280',
      },
      {
        id: uid(), type: 'FooterMenu', row: 'main', zone: 'center',
        items: [
          { label: 'About',    link: '#' },
          { label: 'Posts',    link: '#' },
          { label: 'Blogs',    link: '#' },
          { label: 'Contact',  link: '#' },
        ],
        textColor: '#9CA3AF', layout: 'horizontal',
      },
      {
        id: uid(), type: 'Social', row: 'main', zone: 'right',
        socialIcons: [
          { network: 'Instagram', url: '#' },
          { network: 'Twitter',   url: '#' },
          { network: 'YouTube',   url: '#' },
          { network: 'TikTok',    url: '#' },
        ],
        iconColor: '#9CA3AF', iconSize: 20,
      },
      {
        id: uid(), type: 'Copyright', row: 'bottom', zone: 'left',
        text: '© 2025 Your Name. All rights reserved.', textColor: '#4B5563', fontSize: 12,
      },
      {
        id: uid(), type: 'LegalLinks', row: 'bottom', zone: 'right',
        items: [{ label: 'Privacy Policy', link: '#' }, { label: 'Terms', link: '#' }],
        textColor: '#4B5563', fontSize: 12,
      },
    ],
    widgetBands: [],
  },
});

// ─── Shared header with main nav + submenu ────────────────────────────────────
const sharedHeader = () => ({
  id: uid(), type: 'Header',
  props: {
    backgroundColor: '#0D1117', padding: 16,
    children: [
      {
        id: uid(), type: 'Logo', logoType: 'text', text: 'YOUR NAME',
        fontSize: 18, fontWeight: 'bold', color: '#ffffff', zone: 'left',
      },
      {
        id: uid(), type: 'Navigation',
        items: ['About', 'Posts', 'Blogs', 'Contact'],
        textColor: '#9CA3AF', zone: 'center',
      },
      {
        id: uid(), type: 'Submenu',
        tabs: [
          { id: uid(), label: 'Stories', type: 'social_view', value: 'stories', visibility: 'both' },
          { id: uid(), label: 'Reels',   type: 'social_view', value: 'reels',   visibility: 'both' },
        ],
        styleVariant: 'pill', alignment: 'right',
        backgroundColor: 'transparent', textColor: '#6B7280', activeColor: '#ffffff',
        sticky: false, mobileScroll: true, zone: 'right',
      },
    ],
  },
});

// ─── Hero Profile Section (used on Profile Home) ─────────────────────────────
const heroProfileSection = () => ({
  id: uid(), type: 'Section',
  props: {
    children: [],
    backgroundMode: 'color', backgroundColor: '#161B27',
    paddingTop: 0, paddingBottom: 40, paddingLeft: 0, paddingRight: 0,
    displayMode: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
  },
});

// ─── 1. Profile Home ──────────────────────────────────────────────────────────
const buildProfileHome = () => [
  sharedHeader(),
  // Cover + Profile Hero
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'gradient',
      gradientType: 'linear', gradientAngle: 135,
      gradientColor1: '#1a1f3c', gradientColor2: '#0d1117',
      paddingTop: 80, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
    },
  },
  // Biography block
  { id: uid(), type: 'Biography', props: { name: 'Your Name', title: 'Creator · Designer', bio: 'Building beautiful digital experiences. Sharing creativity, knowledge, and stories with the world.', padding: 32 } },
  // Stats row
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'color', backgroundColor: '#161B27',
      paddingTop: 24, paddingBottom: 24, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'row', justifyContent: 'center', gap: 40,
    },
  },
  // About preview
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'color', backgroundColor: '#0D1117',
      paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24,
    },
  },
  // Featured work / Cards
  {
    id: uid(), type: 'Columns',
    props: {
      children: [
        { id: uid(), width: '33.33%', children: [] },
        { id: uid(), width: '33.33%', children: [] },
        { id: uid(), width: '33.33%', children: [] },
      ],
      columnCount: 3, gap: 20,
      paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
      backgroundMode: 'color', backgroundColor: '#161B27',
    },
  },
  // Recent Posts
  { id: uid(), type: 'Feed', props: { padding: 24 } },
  // Stories row
  { id: uid(), type: 'Stories', props: { padding: 24 } },
  // Reels row
  { id: uid(), type: 'Reels', props: { padding: 24 } },
  // Products preview
  { id: uid(), type: 'ProductGrid', props: { padding: 24 } },
  // CTA Section
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'gradient',
      gradientType: 'linear', gradientAngle: 135,
      gradientColor1: '#4368D9', gradientColor2: '#6E43D9',
      paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
    },
  },
  sharedFooter(),
];

// ─── 2. About ─────────────────────────────────────────────────────────────────
const buildAbout = () => [
  sharedHeader(),
  // Hero banner
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'gradient',
      gradientType: 'linear', gradientAngle: 135,
      gradientColor1: '#1a1f3c', gradientColor2: '#0d1117',
      paddingTop: 64, paddingBottom: 64, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    },
  },
  // Biography (long form)
  { id: uid(), type: 'Biography', props: { name: 'Your Name', title: 'Creator · Designer · Storyteller', bio: 'I\'m a passionate creator with over 5 years of experience building digital experiences. I specialize in design, content creation, and storytelling. When I\'m not creating, I enjoy exploring new technologies and sharing knowledge with the community.', padding: 48 } },
  // Skills columns
  {
    id: uid(), type: 'Columns',
    props: {
      children: [
        { id: uid(), width: '50%', children: [] },
        { id: uid(), width: '50%', children: [] },
      ],
      columnCount: 2, gap: 24,
      paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
      backgroundMode: 'color', backgroundColor: '#161B27',
    },
  },
  // Contact info card
  { id: uid(), type: 'ContactForm', props: { title: 'Get in Touch', description: 'Available for collaborations and projects', submitText: 'Send Message', padding: 48 } },
  sharedFooter(),
];

// ─── 3. Posts ─────────────────────────────────────────────────────────────────
const buildPosts = () => [
  sharedHeader(),
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'color', backgroundColor: '#161B27',
      paddingTop: 40, paddingBottom: 24, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
    },
  },
  { id: uid(), type: 'Feed', props: { padding: 24 } },
  sharedFooter(),
];

// ─── 4. Blogs ─────────────────────────────────────────────────────────────────
const buildBlogs = () => [
  sharedHeader(),
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'color', backgroundColor: '#161B27',
      paddingTop: 40, paddingBottom: 24, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
    },
  },
  // Featured blog card
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'gradient',
      gradientType: 'linear', gradientAngle: 120,
      gradientColor1: '#1a1f3c', gradientColor2: '#0d1117',
      paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16,
    },
  },
  // Blog grid
  {
    id: uid(), type: 'Columns',
    props: {
      children: [
        { id: uid(), width: '33.33%', children: [] },
        { id: uid(), width: '33.33%', children: [] },
        { id: uid(), width: '33.33%', children: [] },
      ],
      columnCount: 3, gap: 24,
      paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
      backgroundMode: 'color', backgroundColor: '#0D1117',
    },
  },
  sharedFooter(),
];

// ─── 5. Stories ───────────────────────────────────────────────────────────────
const buildStories = () => [
  sharedHeader(),
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'color', backgroundColor: '#161B27',
      paddingTop: 40, paddingBottom: 24, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
    },
  },
  { id: uid(), type: 'Stories', props: { padding: 24 } },
  sharedFooter(),
];

// ─── 6. Reels ─────────────────────────────────────────────────────────────────
const buildReels = () => [
  sharedHeader(),
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'color', backgroundColor: '#161B27',
      paddingTop: 40, paddingBottom: 24, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8,
    },
  },
  { id: uid(), type: 'Reels', props: { padding: 24 } },
  sharedFooter(),
];

// ─── 7. Contact ───────────────────────────────────────────────────────────────
const buildContact = () => [
  sharedHeader(),
  {
    id: uid(), type: 'Section',
    props: {
      children: [],
      backgroundMode: 'gradient',
      gradientType: 'linear', gradientAngle: 135,
      gradientColor1: '#1a1f3c', gradientColor2: '#0d1117',
      paddingTop: 64, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
      displayMode: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
    },
  },
  {
    id: uid(), type: 'Columns',
    props: {
      children: [
        { id: uid(), width: '60%', children: [] },
        { id: uid(), width: '40%', children: [] },
      ],
      columnCount: 2, gap: 32,
      paddingTop: 48, paddingBottom: 48, paddingLeft: 24, paddingRight: 24,
      backgroundMode: 'color', backgroundColor: '#0D1117',
    },
  },
  { id: uid(), type: 'ContactForm', props: { title: 'Send a Message', description: 'Fill in the form and I\'ll get back to you as soon as possible.', submitText: 'Send Message', padding: 48 } },
  sharedFooter(),
];

// ─── Theme export ─────────────────────────────────────────────────────────────
export const CREATOR_THEME_01 = {
  id: 'creator-theme-01',
  name: 'Creator Profile Theme 01',
  description: 'Dark professional creator profile with 7 connected pages: Home, About, Posts, Blogs, Stories, Reels, and Contact.',
  isTheme: true,
  preview: [
    { label: 'Profile Hero',  color: '#4368D9' },
    { label: 'About',         color: '#6E43D9' },
    { label: 'Posts / Feed',  color: '#4368D9' },
    { label: 'Blogs',         color: '#6E43D9' },
    { label: 'Stories / Reels', color: '#EC4899' },
    { label: 'Contact',       color: '#374151' },
    { label: 'Footer',        color: '#0D1117' },
  ],
  // buildAll returns the array of page objects
  buildAll: () => [
    { id: `page-${Date.now()}-0`, name: 'Profile Home', slug: 'home',    canvasJson: buildProfileHome() },
    { id: `page-${Date.now()}-1`, name: 'About',        slug: 'about',   canvasJson: buildAbout() },
    { id: `page-${Date.now()}-2`, name: 'Posts',        slug: 'posts',   canvasJson: buildPosts() },
    { id: `page-${Date.now()}-3`, name: 'Blogs',        slug: 'blogs',   canvasJson: buildBlogs() },
    { id: `page-${Date.now()}-4`, name: 'Stories',      slug: 'stories', canvasJson: buildStories() },
    { id: `page-${Date.now()}-5`, name: 'Reels',        slug: 'reels',   canvasJson: buildReels() },
    { id: `page-${Date.now()}-6`, name: 'Contact',      slug: 'contact', canvasJson: buildContact() },
  ],
};