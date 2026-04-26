import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, UserPlus, MessageCircle, Users, TrendingUp } from 'lucide-react';

export default function FollowersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const SAMPLE_FOLLOWERS = [
    {
      id: 1,
      name: 'Jessica Parker',
      username: '@jessicaparker',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
      bio: 'Content creator & influencer',
      followers: '5.2K',
      isVerified: false,
      followedBack: true,
      joinedDate: '2025-11-10'
    },
    {
      id: 2,
      name: 'David Kim',
      username: '@davidkim',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      bio: 'Tech enthusiast & developer',
      followers: '3.8K',
      isVerified: true,
      followedBack: false,
      joinedDate: '2025-11-12'
    },
    {
      id: 3,
      name: 'Maria Garcia',
      username: '@mariagarcia',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      bio: 'Designer & artist',
      followers: '8.1K',
      isVerified: true,
      followedBack: true,
      joinedDate: '2025-11-15'
    },
    {
      id: 4,
      name: 'James Wilson',
      username: '@jameswilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      bio: 'Photographer & traveler',
      followers: '12.3K',
      isVerified: true,
      followedBack: true,
      joinedDate: '2025-11-08'
    },
    {
      id: 5,
      name: 'Sophie Chen',
      username: '@sophiechen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
      bio: 'Fashion blogger',
      followers: '15.7K',
      isVerified: false,
      followedBack: false,
      joinedDate: '2025-11-18'
    },
    {
      id: 6,
      name: 'Ryan Martinez',
      username: '@ryanmartinez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan',
      bio: 'Fitness coach',
      followers: '9.4K',
      isVerified: true,
      followedBack: true,
      joinedDate: '2025-11-14'
    }
  ];

  const filteredFollowers = SAMPLE_FOLLOWERS.filter(follower => {
    const matchesSearch = follower.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         follower.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'following' && follower.followedBack) ||
                         (filter === 'not-following' && !follower.followedBack);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Followers</h1>
          <p className="text-gray-400">{SAMPLE_FOLLOWERS.length} people follow you</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4368D9]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#4368D9]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Followers</p>
                  <p className="text-2xl font-bold text-white">{SAMPLE_FOLLOWERS.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Following Back</p>
                  <p className="text-2xl font-bold text-white">
                    {SAMPLE_FOLLOWERS.filter(f => f.followedBack).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">New This Week</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search followers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#121726] border-gray-800 text-white"
            />
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="w-auto">
            <TabsList className="bg-[#121726] border-gray-800">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="following">Following Back</TabsTrigger>
              <TabsTrigger value="not-following">Not Following</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Followers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFollowers.map((follower) => (
            <Card key={follower.id} className="bg-[#121726] border-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src={follower.avatar} />
                    <AvatarFallback>{follower.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{follower.name}</h3>
                    {follower.isVerified && (
                      <Badge className="bg-[#4368D9] text-white text-xs px-1.5 py-0">✓</Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-400 mb-2">{follower.username}</p>
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">{follower.bio}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span>{follower.followers} followers</span>
                    <span>•</span>
                    <span>Joined {follower.joinedDate}</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    {follower.followedBack ? (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                      >
                        Following
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 bg-[#4368D9] hover:bg-[#3a59b4]"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Follow Back
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-white hover:bg-gray-800"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFollowers.length === 0 && (
          <Card className="bg-[#121726] border-gray-800 p-12 text-center">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No followers found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </Card>
        )}
      </div>
    </div>
  );
}