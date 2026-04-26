import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, Search, Plus, TrendingUp, Users, Calendar, Loader2 } from 'lucide-react';

export default function FeedPage() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const [displayedCount, setDisplayedCount] = useState(6);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Auth error:", error);
        setUser(null);
      }
    };
    loadUser();
  }, []);

  const SAMPLE_POSTS = [
    {
      id: 'sample-1',
      user_id: 'demo',
      content: 'Beautiful sunset from my studio window 🌅📷 #photography #sunset #goldenhour',
      type: 'image',
      media_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      likes: ['user1', 'user2', 'user3'],
      comments_count: 12,
      created_date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => base44.entities.Post.list('-created_date', 50),
    initialData: [],
    enabled: !!user,
  });

  const displayPosts = posts.length > 0 ? posts : SAMPLE_POSTS;

  const createPostMutation = useMutation({
    mutationFn: (postData) => base44.entities.Post.create(postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setIsCreateDialogOpen(false);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Post.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const sortedPosts = [...displayPosts].sort((a, b) => {
    if (sort === 'newest') return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
    if (sort === 'top') return (b.likes?.length || 0) - (a.likes?.length || 0);
    return (b.comments_count || 0) - (a.comments_count || 0);
  });

  const visiblePosts = sortedPosts.slice(0, displayedCount);

  const formatTime = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return `${Math.floor(diff / 60000)}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const handleLike = async (post) => {
    if (!user) return;
    const likes = post.likes || [];
    const hasLiked = likes.includes(user.id);
    const newLikes = hasLiked ? likes.filter(id => id !== user.id) : [...likes, user.id];
    await updatePostMutation.mutateAsync({ id: post.id, data: { likes: newLikes } });
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Posts</h1>
            <p className="text-gray-400">Share your moments with the world</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#4368D9] hover:bg-[#3a59b4]">
                <Plus className="w-4 h-4 mr-2" />
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#121726] border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <CreatePostForm
                onSubmit={(data) => createPostMutation.mutate({ ...data, user_id: user?.id })}
                isLoading={createPostMutation.isPending}
              />
            </DialogContent>
          </Dialog>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search posts..." className="pl-9 bg-[#121726] border-gray-800 text-white" />
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="w-auto">
            <TabsList className="bg-[#121726] border-gray-800">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>
          </Tabs>

          <Tabs value={sort} onValueChange={setSort} className="w-auto">
            <TabsList className="bg-[#121726] border-gray-800">
              <TabsTrigger value="newest">Newest</TabsTrigger>
              <TabsTrigger value="top">Top</TabsTrigger>
              <TabsTrigger value="commented">Most Commented</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex gap-6">
          {/* Main Feed */}
          <div className="flex-1 space-y-6">
            {isLoading ? (
              <div className="flex justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-[#4368D9]" />
              </div>
            ) : visiblePosts.length === 0 ? (
              <Card className="bg-[#121726] border-gray-800 p-12 text-center">
                <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No posts yet</h3>
                <p className="text-gray-400 mb-4">Be the first to share something!</p>
                <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-[#4368D9] hover:bg-[#3a59b4]">
                  Create Your First Post
                </Button>
              </Card>
            ) : (
              <>
                {visiblePosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    user={user}
                    formatTime={formatTime}
                    formatNumber={formatNumber}
                    onLike={() => handleLike(post)}
                  />
                ))}

                {displayedCount < sortedPosts.length && (
                  <Button
                    variant="outline"
                    className="w-full border-gray-800 text-white hover:bg-gray-800"
                    onClick={() => setDisplayedCount(prev => prev + 6)}
                  >
                    Load More Posts
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Right Rail */}
          <aside className="hidden xl:block w-80 space-y-6">
            <Card className="bg-[#121726] border-gray-800 p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
                <Users className="w-4 h-4" />
                Suggested Creators
              </h3>
              <div className="space-y-3">
                {['Alex Johnson', 'Maria Santos', 'Chris Lee'].map((name, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`} />
                      <AvatarFallback>{name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate text-white">{name}</p>
                      <p className="text-xs text-gray-400">@{name.toLowerCase().replace(' ', '')}</p>
                    </div>
                    <Button size="sm" variant="outline" className="border-gray-700 text-white">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-[#121726] border-gray-800 p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
                <TrendingUp className="w-4 h-4" />
                Trending Hashtags
              </h3>
              <div className="space-y-2">
                {['#design', '#photography', '#tech', '#travel', '#art'].map((tag) => (
                  <Badge
                    key={tag}
                    className="mr-2 cursor-pointer bg-[#4368D9]/20 text-[#4368D9] hover:bg-[#4368D9] hover:text-white transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="bg-[#121726] border-gray-800 p-4">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-white">
                <Calendar className="w-4 h-4" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <p className="font-medium text-white">Design Conference 2025</p>
                  <p className="text-xs text-gray-400">March 15, 2025</p>
                </div>
                <div className="text-sm">
                  <p className="font-medium text-white">Creator Meetup</p>
                  <p className="text-xs text-gray-400">March 22, 2025</p>
                </div>
              </div>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}

const CreatePostForm = ({ onSubmit, isLoading }) => {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ content, type: 'text' });
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[120px] bg-[#1A1F2E] border-gray-700 text-white"
      />
      <Button type="submit" disabled={isLoading || !content.trim()} className="w-full bg-[#4368D9] hover:bg-[#3a59b4]">
        {isLoading ? 'Posting...' : 'Post'}
      </Button>
    </form>
  );
};

const PostCard = ({ post, user, formatTime, formatNumber, onLike }) => {
  const hasLiked = post.likes?.includes(user?.id);
  const likesCount = post.likes?.length || 0;
  const commentsCount = post.comments_count || 0;

  return (
    <Card className="bg-[#121726] border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.profile_picture_url} />
            <AvatarFallback>{user?.full_name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-semibold text-white">{user?.full_name || 'User'}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>{formatTime(post.created_date)}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-white whitespace-pre-wrap">{post.content}</p>

        {post.media_url && (
          <img
            src={post.media_url}
            alt="Post media"
            className="w-full rounded-lg"
          />
        )}

        <div className="flex items-center gap-6 pt-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={`gap-2 ${hasLiked ? 'text-red-500' : 'text-gray-400'} hover:text-red-500`}
          >
            <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
            <span>{formatNumber(likesCount)}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-gray-400 hover:text-white">
            <MessageCircle className="w-5 h-5" />
            <span>{formatNumber(commentsCount)}</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-2 text-gray-400 hover:text-white">
            <Share2 className="w-5 h-5" />
            <span>Share</span>
          </Button>
          <Button variant="ghost" size="sm" className="ml-auto text-gray-400 hover:text-white">
            <Bookmark className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};