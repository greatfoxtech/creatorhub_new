import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ProfileBuilder from './pages/ProfileBuilder';
import Pages from './pages/Pages';
import Feed from './pages/Feed';
import Stories from './pages/Stories';
import Reels from './pages/Reels';
import MediaLibrary from './pages/MediaLibrary';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Discounts from './pages/Discounts';
import Payments from './pages/Payments';
import Followers from './pages/Followers';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import SettingsProfile from './pages/SettingsProfile';
import SettingsTheme from './pages/SettingsTheme';
import SettingsBilling from './pages/SettingsBilling';
import ChoosePlan from './pages/ChoosePlan';
import ProfileView from './pages/ProfileView';
import Discovery from './pages/Discovery';
import Marketplace from './pages/Marketplace';
import Cart from './pages/Cart';
import Search from './pages/Search';
import Trending from './pages/Trending';
import Admin from './pages/Admin';
import Following from './pages/Following';
import AnalyticsOverview from './pages/AnalyticsOverview';
import AnalyticsSales from './pages/AnalyticsSales';
import AnalyticsGrowth from './pages/AnalyticsGrowth';
import SettingsIntegrations from './pages/SettingsIntegrations';
import SettingsLegal from './pages/SettingsLegal';
import SettingsSecurity from './pages/SettingsSecurity';
import ProfileBuilderV2 from './pages/ProfileBuilderV2';
import BuilderV2 from './pages/BuilderV2';
// Add page imports here

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  // Show loading spinner while checking app public settings or auth
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Handle authentication errors
  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      // Redirect to login automatically
      navigateToLogin();
      return null;
    }
  }

  // Render the main app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Auth" element={<Auth />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/ProfileBuilder" element={<ProfileBuilder />} />
      <Route path="/Pages" element={<Pages />} />
      <Route path="/Feed" element={<Feed />} />
      <Route path="/Stories" element={<Stories />} />
      <Route path="/Reels" element={<Reels />} />
      <Route path="/MediaLibrary" element={<MediaLibrary />} />
      <Route path="/Products" element={<Products />} />
      <Route path="/Orders" element={<Orders />} />
      <Route path="/Discounts" element={<Discounts />} />
      <Route path="/Payments" element={<Payments />} />
      <Route path="/Followers" element={<Followers />} />
      <Route path="/Messages" element={<Messages />} />
      <Route path="/Notifications" element={<Notifications />} />
      <Route path="/SettingsProfile" element={<SettingsProfile />} />
      <Route path="/SettingsTheme" element={<SettingsTheme />} />
      <Route path="/SettingsBilling" element={<SettingsBilling />} />
      <Route path="/ChoosePlan" element={<ChoosePlan />} />
      <Route path="/ProfileView" element={<ProfileView />} />
      <Route path="/Discovery" element={<Discovery />} />
      <Route path="/Marketplace" element={<Marketplace />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Search" element={<Search />} />
      <Route path="/Trending" element={<Trending />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/Following" element={<Following />} />
      <Route path="/AnalyticsOverview" element={<AnalyticsOverview />} />
      <Route path="/AnalyticsSales" element={<AnalyticsSales />} />
      <Route path="/AnalyticsGrowth" element={<AnalyticsGrowth />} />
      <Route path="/SettingsIntegrations" element={<SettingsIntegrations />} />
      <Route path="/SettingsLegal" element={<SettingsLegal />} />
      <Route path="/SettingsSecurity" element={<SettingsSecurity />} />
      <Route path="/ProfileBuilderV2" element={<ProfileBuilderV2 />} />
      <Route path="/BuilderV2" element={<BuilderV2 />} />
      {/* Add your page Route elements here */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};


function App() {

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
