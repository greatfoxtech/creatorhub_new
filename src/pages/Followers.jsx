import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, UserPlus, MessageCircle, Users, TrendingUp, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function FollowersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [followers, setFollowers] = useState([]);
  const [followingSet, setFollowingSet] = useState(new Set()); // user ids I follow back
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const me = await base44.auth.me();
      setCurrentUserId(me.id);

      // Load who follows me
      const followerRels = await base44.entities.FollowRelationship.filter({ following_user_id: me.id });
      // Load who I follow (to know "following back" status)
      const followingRels = await base44.entities.FollowRelationship.filter({ follower_user_id: me.id });
      const myFollowingIds = new Set(followingRels.map(r => r.follower_user_id === me.id ? r.following_user_id : null).filter(Boolean));
      setFollowingSet(myFollowingIds);

      // Load UserProfile for each follower
      const profilePromises = followerRels.map(rel =>
        base44.entities.UserProfile.filter({ user_id: rel.follower_user_id })
          .then(p => p[0] ? { ...p[0], relId: rel.id, followedBack: myFollowingIds.has(rel.follower_user_id) } : null)
      );
      const profiles = (await Promise.all(profilePromises)).filter(Boolean);
      setFollowers(profiles);
    } catch (err) {
      console.error('Failed to load followers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowBack = async (followerUserId) => {
    if (!currentUserId) return;
    const isFollowing = followingSet.has(followerUserId);
    if (isFollowing) {
      // Unfollow
      const rels = await base44.entities.FollowRelationship.filter({ follower_user_id: currentUserId, following_user_id: followerUserId });
      if (rels[0]) await base44.entities.FollowRelationship.delete(rels[0].id);
      setFollowingSet(prev => { const next = new Set(prev); next.delete(followerUserId); return next; });
    } else {
      // Follow back
      await base44.entities.FollowRelationship.create({ follower_user_id: currentUserId, following_user_id: followerUserId });
      setFollowingSet(prev => new Set([...prev, followerUserId]));
    }
    setFollowers(prev => prev.map(f => f.user_id === followerUserId ? { ...f, followedBack: !isFollowing } : f));
  };

  const filtered = followers.filter(f => {
    const name = f.display_name || f.username || '';
    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (f.username || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' ||
                          (filter === 'following' && f.followedBack) ||
                          (filter === 'not-following' && !f.followedBack);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Followers</h1>
          <p className="text-gray-400">{loading ? '...' : `${followers.length} people follow you`}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4368D9]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#4368D9]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Followers</p>
                  <p className="text-2xl font-bold">{followers.length}</p>
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
                  <p className="text-2xl font-bold">{followers.filter(f => f.followedBack).length}</p>
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
                  <p className="text-sm text-gray-400">Not Following Back</p>
                  <p className="text-2xl font-bold">{followers.filter(f => !f.followedBack).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search followers..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-[#121726] border-gray-800 text-white" />
          </div>
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="bg-[#121726]">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="following">Following Back</TabsTrigger>
              <TabsTrigger value="not-following">Not Following</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#4368D9]" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((follower) => (
                <Card key={follower.id} className="bg-[#121726] border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src={follower.avatar_url} />
                        <AvatarFallback className="bg-[#4368D9]">{(follower.display_name || follower.username || '?').charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-white mb-1">{follower.display_name || follower.username}</h3>
                      {follower.username && <p className="text-sm text-gray-400 mb-2">@{follower.username}</p>}
                      {follower.bio && <p className="text-sm text-gray-300 mb-3 line-clamp-2">{follower.bio}</p>}
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span>{follower.follower_count ?? 0} followers</span>
                      </div>
                      <div className="flex gap-2 w-full">
                        <Button
                          onClick={() => handleFollowBack(follower.user_id)}
                          variant={follower.followedBack ? 'outline' : 'default'}
                          size="sm"
                          className={follower.followedBack ? 'flex-1 border-gray-700 text-white' : 'flex-1 bg-[#4368D9] hover:bg-[#3a59b4]'}
                        >
                          {follower.followedBack ? 'Following' : <><UserPlus className="w-4 h-4 mr-2" />Follow Back</>}
                        </Button>
                        <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {filtered.length === 0 && (
              <Card className="bg-[#121726] border-gray-800 p-12 text-center">
                <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No followers yet</h3>
                <p className="text-gray-400">When people follow you, they'll appear here</p>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}