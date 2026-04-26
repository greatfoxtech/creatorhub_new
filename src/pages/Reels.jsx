import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus, Play, Heart, Eye, CheckCircle2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ReelViewer } from '@/components/content/ReelViewer';

// Sample reels with actual video URLs
const SAMPLE_REELS = [
  {
    id: 'r1',
    author: { id: '1', name: 'Sarah Chen', handle: '@sarahchen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', verified: true },
    media: { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=400', durationSec: 15 },
    caption: 'Amazing sunset views 🌅',
    likes: 45678,
    comments: 1234,
    shares: 567,
    views: 234567,
    hashtags: ['design', 'creative', 'trending']
  },
  {
    id: 'r2',
    author: { id: '2', name: 'Marcus Rivera', handle: '@marcus', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus', verified: true },
    media: { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', thumbnail: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400', durationSec: 22 },
    caption: 'Travel goals ✈️',
    likes: 67890,
    comments: 2345,
    shares: 890,
    views: 456789,
    hashtags: ['tutorial', 'tech', 'coding']
  },
  {
    id: 'r3',
    author: { id: '3', name: 'Aisha Patel', handle: '@aisha', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha', verified: false },
    media: { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400', durationSec: 18 },
    caption: 'Coding tutorial 💻',
    likes: 34567,
    comments: 890,
    shares: 345,
    views: 178901,
    hashtags: ['creative', 'art', 'design']
  },
  {
    id: 'r4',
    author: { id: '4', name: 'Jake Thompson', handle: '@jake', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jake', verified: true },
    media: { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', thumbnail: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400', durationSec: 25 },
    caption: 'Epic adventures 🏔️',
    likes: 56789,
    comments: 1567,
    shares: 678,
    views: 345678,
    hashtags: ['design', 'photography', 'travel']
  },
  {
    id: 'r5',
    author: { id: '5', name: 'Elena Volkov', handle: '@elena', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena', verified: false },
    media: { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400', durationSec: 20 },
    caption: 'Tech insights 🚀',
    likes: 23456,
    comments: 678,
    shares: 234,
    views: 123456,
    hashtags: ['creative', 'tech', 'innovation']
  },
  {
    id: 'r6',
    author: { id: '6', name: 'David Kim', handle: '@davidkim', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David', verified: true },
    media: { url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400', durationSec: 30 },
    caption: 'Design masterclass 🎨',
    likes: 78901,
    comments: 2345,
    shares: 890,
    views: 567890,
    hashtags: ['design', 'tutorial', 'creative']
  },
];

export default function ReelsPage() {
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState('foryou');
  const [selectedReel, setSelectedReel] = useState(null);
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

  const tabs = ['foryou', 'following', 'design', 'tutorial', 'creative', 'tech', 'trending'];

  const filteredReels = selectedTab === 'foryou' || selectedTab === 'following'
    ? SAMPLE_REELS
    : SAMPLE_REELS.filter(r => r.hashtags?.some(h => h.toLowerCase() === selectedTab.toLowerCase()));

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  };

  const openViewer = (reel, index) => {
    setSelectedReel(reel);
    setCurrentIndex(index);
  };

  const navigateReel = (direction) => {
    const newIndex = direction === 'up'
      ? Math.max(0, currentIndex - 1)
      : Math.min(filteredReels.length - 1, currentIndex + 1);

    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      setSelectedReel(filteredReels[newIndex]);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-1">Reels</h1>
            <p className="text-gray-400">Watch and create short-form videos</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#4368D9] hover:bg-[#3a59b4]">
                <Plus className="w-4 h-4 mr-2" />
                Create Reel
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#121726] border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Reel</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-gray-400 mb-4">
                  Upload a vertical video (9:16 aspect ratio, max 90 seconds)
                </p>
                <input type="file" accept="video/*" className="mb-4" />
                <Button className="w-full bg-[#4368D9] hover:bg-[#3a59b4]">Upload Reel</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <div className="mb-6 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <Badge
                key={tab}
                className={`cursor-pointer px-4 py-2 capitalize ${
                  selectedTab === tab
                    ? 'bg-[#4368D9] text-white hover:bg-[#3a59b4]'
                    : 'bg-[#121726] text-gray-400 hover:bg-gray-800'
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab === 'foryou' ? 'For You' : tab}
              </Badge>
            ))}
          </div>
        </div>

        {/* Analytics Banner */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-[#4368D9]/10 to-[#6E43D9]/10 border-gray-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold mb-1 text-white">Your Reels Performance</h3>
              <p className="text-sm text-gray-400">Total reach across all your reels</p>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1.2M</div>
                <div className="text-xs text-gray-400">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">89K</div>
                <div className="text-xs text-gray-400">Likes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12K</div>
                <div className="text-xs text-gray-400">Comments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">5.6K</div>
                <div className="text-xs text-gray-400">Shares</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredReels.map((reel, index) => (
            <Card
              key={reel.id}
              className="relative overflow-hidden group cursor-pointer bg-[#121726] border-gray-800 hover:border-[#4368D9] transition-colors"
              onClick={() => openViewer(reel, index)}
            >
              <div className="relative aspect-[9/16]">
                <img
                  src={reel.media.thumbnail}
                  alt="Reel thumbnail"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/70" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-[#4368D9] ml-1" />
                  </div>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white font-medium">
                  {formatDuration(reel.media.durationSec)}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="w-6 h-6 border border-white">
                      <AvatarImage src={reel.author.avatar} />
                      <AvatarFallback>{reel.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-semibold text-white truncate flex-1">{reel.author.name}</span>
                    {reel.author.verified && <CheckCircle2 className="w-3 h-3 text-[#4368D9]" />}
                  </div>
                  <div className="flex items-center gap-3 text-white text-xs">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{formatNumber(reel.views)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{formatNumber(reel.likes)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Full-Screen Viewer */}
      {selectedReel && (
        <ReelViewer
          reel={selectedReel}
          onClose={() => setSelectedReel(null)}
          onNavigate={navigateReel}
          canGoUp={currentIndex > 0}
          canGoDown={currentIndex < filteredReels.length - 1}
          formatNumber={formatNumber}
          formatDuration={formatDuration}
        />
      )}
    </div>
  );
}