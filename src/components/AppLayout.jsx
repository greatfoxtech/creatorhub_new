import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useThemeContext } from "@/lib/ThemeContext";
import {
  LayoutDashboard, FileText, SquarePen, Film, Clapperboard, Library,
  ShoppingBag, ShoppingCart, Tag, Wallet, Users, MessageSquare, Bell,
  MessageCircle, BarChart2, PieChart, TrendingUp, Settings, Palette,
  Lock, Plug, Shield, ChevronsLeft, ChevronsRight, Search, PlusCircle,
  LogOut, Menu, ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navSections = [
  {
    title: "Core Builder",
    items: [
      { title: "Dashboard", page: "Dashboard", icon: LayoutDashboard },
      { title: "Profile Builder", page: "BuilderV2", icon: SquarePen },
      { title: "Pages", page: "Pages", icon: FileText },
    ],
  },
  {
    title: "Content",
    items: [
      { title: "Posts", page: "Feed", icon: MessageCircle },
      { title: "Stories", page: "Stories", icon: Clapperboard },
      { title: "Reels", page: "Reels", icon: Film },
      { title: "Media Library", page: "MediaLibrary", icon: Library },
    ],
  },
  {
    title: "Commerce",
    items: [
      { title: "Products", page: "Products", icon: ShoppingBag },
      { title: "Orders", page: "Orders", icon: ShoppingCart },
      { title: "Discounts", page: "Discounts", icon: Tag },
      { title: "Payments", page: "Payments", icon: Wallet },
    ],
  },
  {
    title: "Engagement",
    items: [
      { title: "Following", page: "Following", icon: Users },
      { title: "Followers", page: "Followers", icon: Users },
      { title: "Messages", page: "Messages", icon: MessageSquare },
      { title: "Notifications", page: "Notifications", icon: Bell },
    ],
  },
  {
    title: "Analytics",
    items: [
      { title: "Overview", page: "AnalyticsOverview", icon: BarChart2 },
      { title: "Sales", page: "AnalyticsSales", icon: PieChart },
      { title: "Growth", page: "AnalyticsGrowth", icon: TrendingUp },
    ],
  },
  {
    title: "Settings",
    items: [
      { title: "Profile Settings", page: "SettingsProfile", icon: Settings },
      { title: "Theme & Design", page: "SettingsTheme", icon: Palette },
      { title: "Security", page: "SettingsSecurity", icon: Lock },
      { title: "Integrations", page: "SettingsIntegrations", icon: Plug },
      { title: "Legal", page: "SettingsLegal", icon: Shield },
    ],
  },
];

function NavItem({ item, isCollapsed, theme }) {
  const location = useLocation();
  const isActive = location.pathname === createPageUrl(item.page);
  const c = theme.tokens.colors;
  const nav = theme.tokens.nav;

  return (
    <Link
      to={createPageUrl(item.page)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: isCollapsed ? "10px" : "8px 12px",
        borderRadius: nav.tabBorderRadius,
        background: isActive ? nav.tabActiveBg : "transparent",
        color: isActive ? c.text : c.textSecondary,
        fontWeight: isActive ? "600" : "500",
        fontSize: "13px",
        textDecoration: "none",
        transition: `all ${theme.tokens.animations.durationBase}`,
        justifyContent: isCollapsed ? "center" : "flex-start",
        borderLeft: isActive ? `3px solid ${c.primary}` : "3px solid transparent",
        marginBottom: "2px",
      }}
      onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = c.text; } }}
      onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = c.textSecondary; } }}
    >
      <item.icon size={16} style={{ flexShrink: 0 }} />
      {!isCollapsed && <span style={{ truncate: true }}>{item.title}</span>}
    </Link>
  );
}

function NavSection({ title, items, isCollapsed, theme }) {
  const c = theme.tokens.colors;
  return (
    <div style={{ marginBottom: "8px" }}>
      {!isCollapsed && (
        <div style={{ fontSize: "10px", fontWeight: "700", color: c.textTertiary, textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 12px", marginBottom: "4px" }}>
          {title}
        </div>
      )}
      {items.map(item => <NavItem key={item.title} item={item} isCollapsed={isCollapsed} theme={theme} />)}
    </div>
  );
}

function AppSidebar({ isCollapsed, toggleSidebar, theme }) {
  const c = theme.tokens.colors;
  const g = theme.tokens.gradients;

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      width: isCollapsed ? "72px" : "240px",
      background: c.surface,
      borderRight: `1px solid ${c.border}`,
      transition: "width 0.3s ease",
      flexShrink: 0,
    }} className="hidden md:flex">
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: isCollapsed ? "center" : "space-between", height: "64px", padding: "0 16px", borderBottom: `1px solid ${c.border}` }}>
        {!isCollapsed && (
          <Link to={createPageUrl("Dashboard")} style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: g.primary, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: theme.tokens.shadows.glow }}>
              <SquarePen size={16} color="white" />
            </div>
            <span style={{ fontWeight: "700", fontSize: "15px", color: c.text }}>SocialBuilder</span>
          </Link>
        )}
        <button onClick={toggleSidebar} style={{ background: "transparent", border: "none", cursor: "pointer", color: c.textSecondary, padding: "6px", borderRadius: "6px", display: "flex" }}
          onMouseEnter={e => e.currentTarget.style.color = c.text}
          onMouseLeave={e => e.currentTarget.style.color = c.textSecondary}
        >
          {isCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
        </button>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
        {navSections.map(section => (
          <NavSection key={section.title} title={section.title} items={section.items} isCollapsed={isCollapsed} theme={theme} />
        ))}
      </nav>

      {/* Upgrade banner */}
      <div style={{ padding: "12px 8px", borderTop: `1px solid ${c.border}` }}>
        <div style={{ background: `${c.primaryLight}`, borderRadius: "12px", padding: isCollapsed ? "10px 6px" : "14px", border: `1px solid ${c.primary}30` }}>
          {!isCollapsed && (
            <>
              <div style={{ fontWeight: "700", fontSize: "12px", color: c.text, marginBottom: "4px" }}>Upgrade to Pro</div>
              <div style={{ fontSize: "11px", color: c.textSecondary, marginBottom: "10px", lineHeight: "1.4" }}>Unlock all features and build better.</div>
            </>
          )}
          <button style={{ width: "100%", background: g.primary, color: "#fff", border: "none", borderRadius: theme.tokens.radius.button, padding: isCollapsed ? "8px 4px" : "8px 12px", fontWeight: "700", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", boxShadow: theme.tokens.shadows.button }}>
            {isCollapsed ? <PlusCircle size={16} /> : "Upgrade Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AppHeader({ toggleMobileSidebar, theme }) {
  const [user, setUser] = useState(null);
  const c = theme.tokens.colors;
  const h = theme.tokens.header;

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const handleLogout = () => base44.auth.logout(createPageUrl("Home"));

  return (
    <header style={{
      display: "flex",
      height: h.height,
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      borderBottom: h.borderBottom,
      background: h.background,
      backdropFilter: h.backdropFilter,
      padding: "0 24px",
      boxShadow: h.shadow,
      position: "sticky",
      top: 0,
      zIndex: 40,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button onClick={toggleMobileSidebar} style={{ background: "transparent", border: "none", cursor: "pointer", color: c.textSecondary, display: "flex" }} className="md:hidden">
          <Menu size={22} />
        </button>
        <div style={{ position: "relative", display: "none" }} className="md:block">
          <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: c.textTertiary }} />
          <input
            placeholder="Search..."
            style={{ background: c.surface2, border: `1px solid ${c.border}`, borderRadius: "8px", padding: "8px 12px 8px 34px", fontSize: "13px", color: c.text, outline: "none", width: "220px", fontFamily: theme.tokens.typography.fontFamily }}
          />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button style={{ background: "transparent", border: "none", cursor: "pointer", color: c.textSecondary, padding: "8px", borderRadius: "8px" }}
          onMouseEnter={e => { e.currentTarget.style.background = c.surface2; e.currentTarget.style.color = c.text; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = c.textSecondary; }}
        >
          <Bell size={18} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button style={{ display: "flex", alignItems: "center", gap: "8px", background: "transparent", border: `1px solid ${c.border}`, borderRadius: "10px", padding: "6px 10px", cursor: "pointer" }}>
              <Avatar style={{ width: "28px", height: "28px" }}>
                <AvatarImage src={user?.profile_picture_url} />
                <AvatarFallback style={{ background: theme.tokens.gradients.primary, color: "#fff", fontSize: "12px", fontWeight: "700" }}>
                  {user?.full_name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span style={{ fontSize: "13px", fontWeight: "600", color: c.text }}>{user?.full_name || "User"}</span>
                <span style={{ fontSize: "11px", color: c.textSecondary, textTransform: "capitalize" }}>{user?.plan || "Free"} Plan</span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" style={{ background: c.surface, border: `1px solid ${c.border}`, color: c.text, borderRadius: "12px", padding: "6px", minWidth: "180px", boxShadow: theme.tokens.shadows.lg }}>
            <DropdownMenuLabel style={{ color: c.textSecondary, fontSize: "11px" }}>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator style={{ background: c.border }} />
            <DropdownMenuItem asChild>
              <Link to={createPageUrl("SettingsProfile")} style={{ color: c.text, borderRadius: "8px", fontSize: "13px" }}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={createPageUrl("SettingsBilling")} style={{ color: c.text, borderRadius: "8px", fontSize: "13px" }}>Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to={createPageUrl("SettingsTheme")} style={{ color: c.text, borderRadius: "8px", fontSize: "13px" }}>Theme & Design</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator style={{ background: c.border }} />
            <DropdownMenuItem onClick={handleLogout} style={{ color: c.danger, borderRadius: "8px", fontSize: "13px", cursor: "pointer" }}>
              <LogOut size={14} style={{ marginRight: "8px" }} /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default function AppLayout({ children }) {
  const { activeTheme } = useThemeContext();
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const c = activeTheme.tokens.colors;
  const g = activeTheme.tokens.gradients;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body {
          font-family: ${activeTheme.tokens.typography.fontFamily};
          background-color: ${c.background};
          color: ${c.text};
        }
        /* Scrollbar theming */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${c.surface}; }
        ::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${c.borderStrong}; }
      `}</style>

      <div style={{ minHeight: "100vh", width: "100%", display: "flex", background: c.background }}>
        <AppSidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={() => setSidebarCollapsed(x => !x)}
          theme={activeTheme}
        />

        {/* Mobile sidebar */}
        <Sheet open={isMobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <SheetContent side="left" style={{ background: c.surface, borderRight: `1px solid ${c.border}`, padding: 0, width: "260px" }}>
            <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", height: "64px", padding: "0 16px", borderBottom: `1px solid ${c.border}` }}>
                <Link to={createPageUrl("Dashboard")} style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: g.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <SquarePen size={16} color="white" />
                  </div>
                  <span style={{ fontWeight: "700", fontSize: "15px", color: c.text }}>SocialBuilder</span>
                </Link>
              </div>
              <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
                {navSections.map(section => (
                  <NavSection key={section.title} title={section.title} items={section.items} isCollapsed={false} theme={activeTheme} />
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <div style={{ display: "flex", flex: 1, flexDirection: "column", minHeight: 0, overflow: "hidden" }}>
          <AppHeader toggleMobileSidebar={() => setMobileSidebarOpen(true)} theme={activeTheme} />
          <main style={{ flex: 1, overflowY: "auto", padding: "32px", background: c.background }}>
            {children}
          </main>
        </div>
      </div>
    </>
  );
}