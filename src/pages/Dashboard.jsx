import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  SquarePen, 
  Users, 
  Heart, 
  DollarSign, 
  TrendingUp, 
  Eye,
  MessageCircle,
  Share2,
  Plus,
  CheckCircle,
  Clock,
  ArrowUpRight,
  FileText, // Added FileText import
  Palette,  // Added Palette import
  Settings, // Added Settings import
  Bell      // Added Bell import
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState({
    profileViews: 1247,
    followers: 856,
    likes: 3420,
    revenue: 0
  });

  const [quickStartProgress, setQuickStartProgress] = useState([
    { id: 1, title: "Set up your profile", completed: true, description: "Add profile photo and bio" },
    { id: 2, title: "Create your first page", completed: false, description: "Use the Profile Builder to create your website" },
    { id: 3, title: "Publish your first post", completed: false, description: "Share content with your audience" },
    { id: 4, title: "Customize your theme", completed: false, description: "Make your profile unique" },
    { id: 5, title: "Connect your domain", completed: false, description: "Upgrade to Pro for custom domains" }
  ]);

  useEffect(() => {
    const initDashboard = async () => {
      try {
        setIsLoading(true);
        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          base44.auth.redirectToLogin();
          return;
        }
        
        const userData = await base44.auth.me();
        setUser(userData);
        
        // Only load posts if authenticated
        try {
          const recentPosts = await base44.entities.Post.list('-created_date', 5);
          setPosts(recentPosts);
        } catch (postError) {
          console.error("Error loading posts:", postError);
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        if (error.code === 'ERR_NETWORK') {
           setError("Network error. Please check your connection.");
        } else {
           base44.auth.redirectToLogin();
        }
      } finally {
        setIsLoading(false);
      }
    };

    initDashboard();
  }, []);

  const completedTasks = quickStartProgress.filter(task => task.completed).length;
  const progressPercentage = (completedTasks / quickStartProgress.length) * 100;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0D14]">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0A0D14] text-white">
        <div className="text-center p-6 max-w-md">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-bold mb-2">Connection Error</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-[#4368D9] hover:bg-[#3a59b4]">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, {user.full_name}! 👋
            </h1>
            <p className="text-gray-400">Here's what's happening with your creative work today.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild className="bg-[#4368D9] hover:bg-[#3a59b4]">
              <Link to={createPageUrl("BuilderV2")}>
                <SquarePen className="w-4 h-4 mr-2" />
                Create Page
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
              <Link to={createPageUrl("Feed")}>
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Start Guide */}
        <Card className="bg-[#121726] border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-green-500" />
              Quick Start Guide
            </CardTitle>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{completedTasks} of {quickStartProgress.length} completed</span>
                <span className="text-gray-400">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickStartProgress.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1F2E] hover:bg-[#242938] transition-colors">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                  task.completed ? 'bg-green-500' : 'bg-gray-600'
                }`}>
                  {task.completed && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <div className="flex-1">
                  <h4 className={`font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-white'}`}>
                    {task.title}
                  </h4>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
                {!task.completed && (
                  <Button size="sm" variant="ghost" className="text-[#4368D9] hover:bg-[#4368D9]/10">
                    Do it
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-[#121726] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Profile Views</CardTitle>
              <Eye className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.profileViews.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +12.5% from last week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Followers</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.followers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +8.2% from last week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.likes.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-500">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +23.1% from last week
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">${stats.revenue}</div>
              <div className="text-xs text-gray-400">
                {user.plan === 'free' ? 'Upgrade to Pro to start earning' : 'Keep creating great content!'}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Management & Recent Activity */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Content Management */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#121726] border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Content Management</CardTitle>
                  <Button asChild variant="ghost" className="text-[#4368D9] hover:bg-[#4368D9]/10">
                    <Link to={createPageUrl("Feed")}>View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-[#1A1F2E] border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Pages</h4>
                          <p className="text-2xl font-bold text-white mt-1">3</p>
                        </div>
                        <FileText className="h-8 w-8 text-[#4368D9]" />
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-[#4368D9] hover:bg-[#3a59b4]" asChild>
                        <Link to={createPageUrl("BuilderV2")}>Create Page</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#1A1F2E] border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Posts</h4>
                          <p className="text-2xl font-bold text-white mt-1">{posts.length}</p>
                        </div>
                        <MessageCircle className="h-8 w-8 text-[#4368D9]" />
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-[#4368D9] hover:bg-[#3a59b4]" asChild>
                        <Link to={createPageUrl("Feed")}>New Post</Link>
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#1A1F2E] border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-white">Stories</h4>
                          <p className="text-2xl font-bold text-white mt-1">0</p>
                        </div>
                        <Clock className="h-8 w-8 text-[#4368D9]" />
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-[#4368D9] hover:bg-[#3a59b4]" asChild>
                        <Link to={createPageUrl("Stories")}>Add Story</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Recent Posts */}
            <Card className="bg-[#121726] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Posts</CardTitle>
              </CardHeader>
              <CardContent>
                {posts.length > 0 ? (
                  <div className="space-y-4">
                    {posts.slice(0, 3).map((post) => (
                      <div key={post.id} className="flex items-start gap-3 p-4 rounded-lg bg-[#1A1F2E]">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.profile_picture_url} />
                          <AvatarFallback>{user.full_name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="text-white text-sm">{post.content}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              {post.likes?.length || 0}
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {post.comments_count || 0}
                            </div>
                            <div className="flex items-center gap-1">
                              <Share2 className="w-3 h-3" />
                              Share
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No posts yet</h3>
                    <p className="text-gray-400 mb-4">Share your first post to get started</p>
                    <Button asChild className="bg-[#4368D9] hover:bg-[#3a59b4]">
                      <Link to={createPageUrl("Feed")}>Create Post</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card className="bg-[#121726] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarImage src={user.profile_picture_url} />
                    <AvatarFallback className="text-lg">{user.full_name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-medium text-white">{user.full_name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{user.bio || "No bio yet"}</p>
                  <Badge className="mt-2 bg-[#4368D9]/20 text-[#4368D9] hover:bg-[#4368D9]/30">
                    {user.plan} plan
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-[#121726] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start bg-[#1A1F2E] hover:bg-[#242938] text-white">
                  <Link to={createPageUrl("BuilderV2")}>
                    <SquarePen className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-[#1A1F2E] hover:bg-[#242938] text-white">
                  <Link to={createPageUrl("SettingsTheme")}>
                    <Palette className="w-4 h-4 mr-2" />
                    Customize Theme
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start bg-[#1A1F2E] hover:bg-[#242938] text-white">
                  <Link to={createPageUrl("SettingsProfile")}>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                {user.plan === 'free' && (
                  <Button className="w-full justify-start bg-gradient-to-r from-[#4368D9] to-[#6E43D9] hover:from-[#3a59b4] hover:to-[#5d3bb4] text-white">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card className="bg-[#121726] border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-white">
                  Notifications
                  <Badge variant="secondary" className="bg-[#4368D9] text-white">3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center py-4">
                  <Bell className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-400">No new notifications</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}