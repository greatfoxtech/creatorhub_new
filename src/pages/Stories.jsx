import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Video, Palette, Eye, TrendingUp, Radio, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { StoryViewer } from '@/components/content/StoryViewer';

// Sample stories with videos
const SAMPLE_STORIES = [
  {
    id: 's1',
    author: { id: '1', name: 'Sarah Chen', handle: '@sarahchen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', verified: true },
    media: { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400' },
    isLive: true,
    views: 1234,
    createdAt: '30m ago',
    category: 'Trending'
  },
  {
    id: 's2',
    author: { id: '2', name: 'Marcus Rivera', handle: '@marcus', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', verified: true },
    media: { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', thumbnail: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400' },
    isLive: true,
    views: 2345,
    createdAt: '1h ago',
    category: 'Art'
  },
  {
    id: 's3',
    author: { id: '3', name: 'Aisha Patel', handle: '@aisha', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha', verified: false },
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400' },
    views: 5678,
    createdAt: '2h ago',
    category: 'Tech'
  },
  {
    id: 's4',
    author: { id: '4', name: 'Jake Thompson', handle: '@jake', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jake', verified: true },
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400' },
    views: 8901,
    createdAt: '3h ago',
    category: 'Photography'
  },
  {
    id: 's5',
    author: { id: '5', name: 'Elena Volkov', handle: '@elena', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', verified: false },
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400' },
    views: 3456,
    createdAt: '4h ago',
    category: 'Music'
  },
  {
    id: 's6',
    author: { id: '6', name: 'David Kim', handle: '@davidkim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', verified: true },
    media: { type: 'video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400' },
    views: 6789,
    createdAt: '5h ago',
    category: 'Tutorial'
  },
  {
    id: 's7',
    author: { id: '7', name: 'Olivia Martinez', handle: '@olivia', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia', verified: false },
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400' },
    views: 4321,
    createdAt: '6h ago',
    category: 'Gaming'
  },
  {
    id: 's8',
    author: { id: '8', name: 'Ryan Foster', handle: '@ryan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan', verified: true },
    media: { type: 'image', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400' },
    views: 7890,
    createdAt: '7h ago',
    category: 'Tech'
  },
];

export default function StoriesPage() {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState('all');
  const [selectedStory, setSelectedStory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (isAuth) {
          const currentUser = await base44.auth.me();
          setUser(currentUser);
        }
      } catch (error) {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  const categories = ['all', 'Trending', 'Following', 'Art', 'Photography', 'Music', 'Tutorial', 'Gaming', 'Tech'];

  const filteredStories = category === 'all'
    ? SAMPLE_STORIES
    : SAMPLE_STORIES.filter(s => s.category?.toLowerCase() === category.toLowerCase());

  const liveStories = filteredStories.filter(s => s.isLive);
  const recentStories = filteredStories.filter(s => !s.isLive);
  const featuredStories = filteredStories.slice(0, 3);

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const openViewer = (story, index) => {
    setSelectedStory(story);
    setCurrentIndex(index);
  };

  const navigateStory = (direction) => {
    const newIndex = direction === 'prev'
      ? Math.max(0, currentIndex - 1)
      : Math.min(filteredStories.length - 1, currentIndex + 1);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setSelectedStory(filteredStories[newIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-1">Stories</h1>
          <p className="text-gray-400">Share your day, one moment at a time</p>
        </div>

        {/* Create Story Composer */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-[#4368D9]/10 to-[#6E43D9]/10 border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1 text-white">Create Your Story</h3>
              <p className="text-sm text-gray-400">Share what's happening right now</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 border-gray-700 text-white">
                    <Camera className="w-4 h-4" />
                    Photo
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#121726] border-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Create Photo Story</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-gray-400 mb-4">Upload a photo to share with your followers</p>
                    <input type="file" accept="image/*" className="mb-4" />
                    <Button className="w-full bg-[#4368D9] hover:bg-[#3a59b4]">Share Story</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 border-gray-700 text-white">
                    <Video className="w-4 h-4" />
                    Video
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#121726] border-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Create Video Story</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-gray-400 mb-4">Record or upload a video (max 60 seconds)</p>
                    <input type="file" accept="video/*" className="mb-4" />
                    <Button className="w-full bg-[#4368D9] hover:bg-[#3a59b4]">Share Story</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-[#4368D9] hover:bg-[#3a59b4]">
                    <Palette className="w-4 h-4" />
                    Design
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[#121726] border-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle>Design Story</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <p className="text-sm text-gray-400 mb-4">Create a custom design with text and stickers</p>
                    <Button className="w-full bg-[#4368D9] hover:bg-[#3a59b4]">Start Designing</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Card>

        {/* Category Filter */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <Badge
                key={cat}
                className={`cursor-pointer px-4 py-2 capitalize ${
                  category === cat
                    ? 'bg-[#4368D9] text-white hover:bg-[#3a59b4]'
                    : 'bg-[#121726] text-gray-400 hover:bg-gray-800'
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Stories */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
              <TrendingUp className="w-5 h-5 text-[#4368D9]" />
              Featured Stories
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredStories.map((story, index) => (
              <Card
                key={story.id}
                className="relative overflow-hidden group cursor-pointer bg-[#121726] border-gray-800"
                onClick={() => openViewer(story, index)}
              >
                <img
                  src={story.media.thumbnail || story.media.url}
                  alt={story.author.name}
                  className="w-full aspect-video object-cover"
                />
                {story.isLive && (
                  <Badge className="absolute top-3 left-3 bg-red-500 text-white flex items-center gap-1">
                    <Radio className="w-3 h-3" />
                    LIVE
                  </Badge>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-8 h-8 border-2 border-white">
                      <AvatarImage src={story.author.avatar} />
                      <AvatarFallback>{story.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{story.author.name}</p>
                      <p className="text-gray-300 text-xs">{story.createdAt}</p>
                    </div>
                    <Button size="sm" className="bg-[#4368D9] hover:bg-[#3a59b4]">
                      View
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm">
                    <Eye className="w-4 h-4" />
                    <span>{formatNumber(story.views)}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Live Stories */}
        {liveStories.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                Live Now
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {liveStories.map((story, index) => (
                <StoryCard
                  key={story.id}
                  story={story}
                  formatNumber={formatNumber}
                  isLive
                  onClick={() => openViewer(story, index)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Recent Stories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Recent Stories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {recentStories.map((story, index) => (
              <StoryCard
                key={story.id}
                story={story}
                formatNumber={formatNumber}
                onClick={() => openViewer(story, index + liveStories.length)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Story Viewer */}
      {selectedStory && (
        <StoryViewer
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onNavigate={navigateStory}
          canGoPrev={currentIndex > 0}
          canGoNext={currentIndex < filteredStories.length - 1}
          formatNumber={formatNumber}
        />
      )}
    </div>
  );
}

const StoryCard = ({ story, formatNumber, isLive, onClick }) => (
  <Card
    className="relative overflow-hidden group cursor-pointer bg-[#121726] border-gray-800"
    onClick={onClick}
  >
    <img
      src={story.media.thumbnail || story.media.url}
      alt={story.author.name}
      className="w-full aspect-[9/16] object-cover"
    />
    {isLive && (
      <Badge className="absolute top-2 left-2 bg-red-500 text-white flex items-center gap-1 text-xs">
        <Radio className="w-3 h-3" />
        LIVE
      </Badge>
    )}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
      <div className="flex items-center gap-2 mb-1">
        <Avatar className="w-6 h-6 border border-white">
          <AvatarImage src={story.author.avatar} />
          <AvatarFallback>{story.author.name[0]}</AvatarFallback>
        </Avatar>
        <p className="text-white text-xs font-medium truncate flex-1">{story.author.name}</p>
        {story.author.verified && <CheckCircle2 className="w-3 h-3 text-[#4368D9]" />}
      </div>
      <div className="flex items-center gap-1 text-white text-xs">
        <Eye className="w-3 h-3" />
        <span>{formatNumber(story.views)}</span>
      </div>
    </div>
  </Card>
);