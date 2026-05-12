import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, UserMinus, MessageCircle, Users, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function FollowingPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const me = await base44.auth.me();
      setCurrentUserId(me.id);

      // Load who I follow
      const rels = await base44.entities.FollowRelationship.filter({ follower_user_id: me.id });

      // Load UserProfile for each
      const profilePromises = rels.map(rel =>
        base44.entities.UserProfile.filter({ user_id: rel.following_user_id })
          .then(p => p[0] ? { ...p[0], relId: rel.id } : null)
      );
      const profiles = (await Promise.all(profilePromises)).filter(Boolean);
      setFollowing(profiles);
    } catch (err) {
      console.error('Failed to load following:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnfollow = async (relId, userId) => {
    if (!relId) return;
    await base44.entities.FollowRelationship.delete(relId);
    setFollowing(prev => prev.filter(f => f.relId !== relId));
  };

  const filtered = following.filter(u => {
    const name = u.display_name || u.username || '';
    return name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           (u.username || '').toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Following</h1>
          <p className="text-gray-400">{loading ? '...' : `${following.length} accounts you're following`}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#4368D9]/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#4368D9]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Following</p>
                  <p className="text-2xl font-bold">{following.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Mutual Follows</p>
                  <p className="text-2xl font-bold">{following.filter(u => u.follower_count > 0).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input placeholder="Search following..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9 bg-[#121726] border-gray-800 text-white" />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#4368D9]" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((user) => (
                <Card key={user.id} className="bg-[#121726] border-gray-800">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="w-20 h-20 mb-4">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback className="bg-[#4368D9]">{(user.display_name || user.username || '?').charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold text-white mb-1">{user.display_name || user.username}</h3>
                      {user.username && <p className="text-sm text-gray-400 mb-2">@{user.username}</p>}
                      {user.role_title && <p className="text-xs text-[#4368D9] mb-2">{user.role_title}</p>}
                      {user.bio && <p className="text-sm text-gray-300 mb-3 line-clamp-2">{user.bio}</p>}
                      <div className="text-sm text-gray-400 mb-4">
                        {user.follower_count ?? 0} followers
                      </div>
                      <div className="flex gap-2 w-full">
                        <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-white hover:bg-gray-800">
                          <MessageCircle className="w-4 h-4 mr-2" /> Message
                        </Button>
                        <Button
                          onClick={() => handleUnfollow(user.relId, user.user_id)}
                          variant="outline"
                          size="sm"
                          className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                          title="Unfollow"
                        >
                          <UserMinus className="w-4 h-4" />
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
                <h3 className="text-lg font-medium text-white mb-2">Not following anyone yet</h3>
                <p className="text-gray-400">Discover and follow creators to see them here</p>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
}