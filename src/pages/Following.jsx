import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, UserMinus, MessageCircle, Users, TrendingUp } from 'lucide-react';

export default function FollowingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const SAMPLE_FOLLOWING = [
    {
      id: 1,
      name: 'Sarah Johnson',
      username: '@sarahjohnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      bio: 'Digital artist & creator',
      followers: '12.5K',
      isVerified: true,
      category: 'creator',
      mutualFollowers: 23
    },
    {
      id: 2,
      name: 'Mike Chen',
      username: '@mikechen',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
      bio: 'Photography & travel enthusiast',
      followers: '8.3K',
      isVerified: false,
      category: 'creator',
      mutualFollowers: 15
    },
    {
      id: 3,
      name: 'Emma Wilson',
      username: '@emmawilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      bio: 'Tech blogger and developer',
      followers: '45.2K',
      isVerified: true,
      category: 'creator',
      mutualFollowers: 89
    },
    {
      id: 4,
      name: 'Alex Rivera',
      username: '@alexrivera',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      bio: 'Fashion designer & stylist',
      followers: '23.8K',
      isVerified: true,
      category: 'brand',
      mutualFollowers: 56
    },
    {
      id: 5,
      name: 'Chris Taylor',
      username: '@christaylor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chris',
      bio: 'Food blogger & chef',
      followers: '19.4K',
      isVerified: false,
      category: 'creator',
      mutualFollowers: 34
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      username: '@lisaanderson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      bio: 'Fitness coach & wellness expert',
      followers: '31.6K',
      isVerified: true,
      category: 'creator',
      mutualFollowers: 67
    }
  ];

  const filteredFollowing = SAMPLE_FOLLOWING.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || user.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Following</h1>
          <p className="text-gray-400">{SAMPLE_FOLLOWING.length} accounts you're following</p>
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
                  <p className="text-sm text-gray-400">Total Following</p>
                  <p className="text-2xl font-bold text-white">{SAMPLE_FOLLOWING.length}</p>
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
                  <p className="text-sm text-gray-400">Creators</p>
                  <p className="text-2xl font-bold text-white">
                    {SAMPLE_FOLLOWING.filter(u => u.category === 'creator').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Brands</p>
                  <p className="text-2xl font-bold text-white">
                    {SAMPLE_FOLLOWING.filter(u => u.category === 'brand').length}
                  </p>
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
              placeholder="Search following..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#121726] border-gray-800 text-white"
            />
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="w-auto">
            <TabsList className="bg-[#121726] border-gray-800">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="creator">Creators</TabsTrigger>
              <TabsTrigger value="brand">Brands</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Following Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFollowing.map((user) => (
            <Card key={user.id} className="bg-[#121726] border-gray-800">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-20 h-20 mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-white">{user.name}</h3>
                    {user.isVerified && (
                      <Badge className="bg-[#4368D9] text-white text-xs px-1.5 py-0">✓</Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-400 mb-2">{user.username}</p>
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">{user.bio}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span>{user.followers} followers</span>
                    <span>•</span>
                    <span>{user.mutualFollowers} mutual</span>
                  </div>

                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-gray-700 text-white hover:bg-gray-800"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                    >
                      <UserMinus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFollowing.length === 0 && (
          <Card className="bg-[#121726] border-gray-800 p-12 text-center">
            <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </Card>
        )}
      </div>
    </div>
  );
}