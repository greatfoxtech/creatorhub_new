import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  LayoutDashboard,
  FileText,
  SquarePen,
  Film,
  Clapperboard,
  Library,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Wallet,
  Users,
  MessageSquare,
  Bell,
  MessageCircle,
  BarChart2,
  PieChart,
  TrendingUp,
  Settings,
  Palette,
  Lock,
  Plug,
  Shield,
  ChevronsLeft,
  ChevronsRight,
  Search,
  PlusCircle,
  LogOut,
  Menu,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

// Main Logo Component
const Logo = () => (
  <Link to={createPageUrl("Dashboard")} className="flex items-center gap-2">
    <div className="w-8 h-8 bg-gradient-to-br from-[#4368D9] to-[#6E43D9] rounded-lg flex items-center justify-center">
      <SquarePen className="w-5 h-5 text-white" />
    </div>
    <span className="font-bold text-lg text-white">SocialBuilder</span>
  </Link>
);

// Sidebar Navigation Item Component
const NavItem = ({ item, isCollapsed }) => {
  const location = useLocation();
  const isActive = location.pathname === createPageUrl(item.page);

  return (
    <Link
      to={createPageUrl(item.page)}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-white/10 text-white"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <item.icon className="h-5 w-5" />
      {!isCollapsed && <span className="truncate">{item.title}</span>}
    </Link>
  );
};

// Sidebar Section Component
const NavSection = ({ title, items, isCollapsed }) => (
  <div className="space-y-1">
    {!isCollapsed && (
      <h3 className="px-3 text-xs font-semibold uppercase text-gray-500 tracking-wider">
        {title}
      </h3>
    )}
    {items.map((item) => (
      <NavItem key={item.title} item={item} isCollapsed={isCollapsed} />
    ))}
  </div>
);

// Sidebar Component
const AppSidebar = ({ isCollapsed, toggleSidebar }) => {
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
      title: 'Analytics',
      items: [
        { title: 'Overview', page: 'AnalyticsOverview', icon: BarChart2 },
        { title: 'Sales', page: 'AnalyticsSales', icon: PieChart },
        { title: 'Growth', page: 'AnalyticsGrowth', icon: TrendingUp },
      ],
    },
    {
      title: 'Settings',
      items: [
        { title: 'Profile Settings', page: 'SettingsProfile', icon: Settings },
        { title: 'Theme & Design', page: 'SettingsTheme', icon: Palette },
        { title: 'Security', page: 'SettingsSecurity', icon: Lock },
        { title: 'Integrations', page: 'SettingsIntegrations', icon: Plug },
        { title: 'Legal', page: 'SettingsLegal', icon: Shield },
      ],
    },
  ];

  return (
    <div
      className={`hidden md:flex flex-col bg-[#121726] border-r border-white/10 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      <div className={`flex items-center justify-between h-16 px-4 border-b border-white/10 ${isCollapsed ? 'justify-center' : ''}`}>
        {!isCollapsed && <Logo />}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="text-gray-400 hover:text-white hover:bg-white/10"
        >
          {isCollapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </Button>
      </div>
      <nav className="flex-1 space-y-4 p-2 overflow-y-auto">
        {navSections.map((section) => (
          <NavSection
            key={section.title}
            title={section.title}
            items={section.items}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>
      <div className={`p-2 border-t border-white/10 ${isCollapsed ? 'space-y-2' : ''}`}>
        <div className={`bg-gradient-to-br from-[#4368D9]/20 to-[#6E43D9]/20 p-4 rounded-lg ${isCollapsed ? 'p-2' : ''}`}>
            {!isCollapsed && <h4 className="font-semibold text-white">Upgrade to Pro</h4>}
            {!isCollapsed && <p className="text-xs text-gray-300 mt-1 mb-3">Unlock all features and build better.</p>}
            <Button size={isCollapsed ? 'icon' : 'sm'} className="w-full bg-white text-slate-900 hover:bg-gray-200">
                {isCollapsed ? <PlusCircle className="h-5 w-5"/> : 'Upgrade Now'}
            </Button>
        </div>
      </div>
    </div>
  );
};

// Header Component
const AppHeader = ({ toggleMobileSidebar }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    User.me().then(setUser).catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await User.logout();
    window.location.href = createPageUrl("Home");
  };

  return (
    <header className="flex h-16 items-center justify-between gap-4 border-b border-white/10 bg-[#121726] px-4 md:px-6">
       <div className="flex items-center gap-4">
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileSidebar}
            className="md:hidden text-gray-400 hover:text-white"
        >
            <Menu className="h-6 w-6" />
        </Button>
        {/* Search Bar */}
        <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="w-64 bg-white/5 border-none pl-10 text-white" />
        </div>
       </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/10">
          <Bell className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.profile_picture_url} />
                <AvatarFallback>{user?.full_name?.charAt(0) || 'U'}</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                  <span className="text-sm font-medium text-white">{user?.full_name}</span>
                  <span className="text-xs text-gray-400 capitalize">{user?.plan} Plan</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#121726] border-white/10 text-white">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10"/>
            <DropdownMenuItem asChild><Link to={createPageUrl("SettingsProfile")} className="cursor-pointer">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to={createPageUrl("SettingsBilling")} className="cursor-pointer">Billing</Link></DropdownMenuItem>
            <DropdownMenuItem asChild><Link to={createPageUrl("SettingsTheme")} className="cursor-pointer">Appearance</Link></DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10"/>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400">
                <LogOut className="mr-2 h-4 w-4"/>
                Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};


export default function Layout({ children, currentPageName }) {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navSections = [ // Re-define navSections here for mobile sidebar to avoid passing it down repeatedly
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
      title: 'Analytics',
      items: [
        { title: 'Overview', page: 'AnalyticsOverview', icon: BarChart2 },
        { title: 'Sales', page: 'AnalyticsSales', icon: PieChart },
        { title: 'Growth', page: 'AnalyticsGrowth', icon: TrendingUp },
      ],
    },
    {
      title: 'Settings',
      items: [
        { title: 'Profile Settings', page: 'SettingsProfile', icon: Settings },
        { title: 'Theme & Design', page: 'SettingsTheme', icon: Palette },
        { title: 'Security', page: 'SettingsSecurity', icon: Lock },
        { title: 'Integrations', page: 'SettingsIntegrations', icon: Plug },
        { title: 'Legal', page: 'SettingsLegal', icon: Shield },
      ],
    },
  ];
  
  const publicPages = ["Home", "Auth"];
  const fullScreenPages = ["ProfileBuilder", "BuilderV2"];
  const isPublicPage = publicPages.includes(currentPageName);
  const isFullScreenPage = fullScreenPages.includes(currentPageName); 

  if (isPublicPage || isFullScreenPage) { 
    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
                body { 
                  font-family: 'Inter', sans-serif;
                  background-color: ${isFullScreenPage ? '#0A0D14' : 'white'};
                }
            `}</style>
            <div className={isFullScreenPage ? "bg-[#0A0D14]" : "bg-white"}>{children}</div>
        </>
    );
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        :root {
            --background: 222.2 84% 4.9%;
            --foreground: 210 40% 98%;
            --card: 222.2 84% 4.9%;
            --card-foreground: 210 40% 98%;
            --popover: 222.2 84% 4.9%;
            --popover-foreground: 210 40% 98%;
            --primary: 210 40% 98%;
            --primary-foreground: 222.2 47.4% 11.2%;
            --secondary: 217.2 32.6% 17.5%;
            --secondary-foreground: 210 40% 98%;
            --muted: 217.2 32.6% 17.5%;
            --muted-foreground: 215 20.2% 65.1%;
            --accent: 217.2 32.6% 17.5%;
            --accent-foreground: 210 40% 98%;
            --destructive: 0 62.8% 30.6%;
            --destructive-foreground: 210 40% 98%;
            --border: 217.2 32.6% 17.5%;
            --input: 217.2 32.6% 17.5%;
            --ring: 212.7 26.8% 83.9%;
        }
      `}</style>
      <div className="min-h-screen w-full flex bg-[#0A0D14]">
          <AppSidebar 
              isCollapsed={isSidebarCollapsed} 
              toggleSidebar={() => setSidebarCollapsed(!isSidebarCollapsed)}
          />

          <Sheet open={isMobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
            <SheetContent side="left" className="bg-[#121726] border-r-0 p-0">
               <div className="flex flex-col h-full">
                <div className="flex items-center h-16 px-4 border-b border-white/10">
                    <Logo />
                </div>
                 <nav className="flex-1 space-y-4 p-2 overflow-y-auto">
                    {navSections.map((section) => (
                      <NavSection
                        key={section.title}
                        title={section.title}
                        items={section.items}
                        isCollapsed={false} // Mobile sidebar is never collapsed
                      />
                    ))}
                 </nav>
                 <div className="p-2 border-t border-white/10">
                    <div className="bg-gradient-to-br from-[#4368D9]/20 to-[#6E43D9]/20 p-4 rounded-lg">
                        <h4 className="font-semibold text-white">Upgrade to Pro</h4>
                        <p className="text-xs text-gray-300 mt-1 mb-3">Unlock all features and build better.</p>
                        <Button size="sm" className="w-full bg-white text-slate-900 hover:bg-gray-200">
                            Upgrade Now
                        </Button>
                    </div>
                </div>
               </div>
            </SheetContent>
          </Sheet>

          <div className="flex flex-1 flex-col">
              <AppHeader toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
              <main className="flex-1 overflow-y-auto p-4 md:p-8">
                  {children}
              </main>
          </div>
      </div>
    </>
  );
}