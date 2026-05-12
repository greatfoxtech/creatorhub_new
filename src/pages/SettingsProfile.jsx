import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { base44 } from '@/api/base44Client';
import { Camera, Loader2, CheckCircle } from 'lucide-react';

export default function SettingsProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    location: '',
    website: '',
    display_name: '',
    username: '',
    role_title: '',
  });

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);

      // Try to load UserProfile record for this user
      const profiles = await base44.entities.UserProfile.filter({ user_id: currentUser.id });
      const prof = profiles[0] || null;
      setProfile(prof);

      setFormData({
        full_name: currentUser.full_name || '',
        bio: prof?.bio || currentUser.bio || '',
        location: prof?.location || currentUser.location || '',
        website: prof?.website || currentUser.website || '',
        display_name: prof?.display_name || currentUser.full_name || '',
        username: prof?.username || '',
        role_title: prof?.role_title || '',
      });
    } catch (err) {
      console.error('Failed to load profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Update the built-in User record (only supported fields)
      await base44.auth.updateMe({
        full_name: formData.full_name,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
      });

      // Upsert the UserProfile record
      const profileData = {
        user_id: user.id,
        display_name: formData.display_name || formData.full_name,
        username: formData.username,
        bio: formData.bio,
        location: formData.location,
        website: formData.website,
        role_title: formData.role_title,
        avatar_url: profile?.avatar_url || user?.profile_picture_url || '',
      };

      if (profile?.id) {
        await base44.entities.UserProfile.update(profile.id, profileData);
      } else {
        const newProfile = await base44.entities.UserProfile.create(profileData);
        setProfile(newProfile);
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      await loadData();
    } catch (err) {
      console.error('Failed to save:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0D14] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#4368D9]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
            <p className="text-gray-400">Manage your public profile information</p>
          </div>
          {saved && (
            <div className="flex items-center gap-2 text-green-400 text-sm">
              <CheckCircle className="w-4 h-4" /> Saved!
            </div>
          )}
        </div>

        {/* Profile Picture */}
        <Card className="bg-[#121726] border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Profile Picture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile?.avatar_url || user?.profile_picture_url} />
                  <AvatarFallback className="text-2xl bg-[#4368D9]">{(formData.display_name || formData.full_name)?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-[#4368D9] hover:bg-[#3a59b4]">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{formData.display_name || formData.full_name}</h3>
                <p className="text-sm text-gray-400 mb-1">{user?.email}</p>
                {profile?.follower_count !== undefined && (
                  <p className="text-xs text-gray-500">{profile.follower_count} followers · {profile.following_count} following</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card className="bg-[#121726] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                <Input value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} className="bg-[#1A1F2E] border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                <Input value={formData.display_name} onChange={(e) => setFormData({ ...formData, display_name: e.target.value })} className="bg-[#1A1F2E] border-gray-700 text-white" placeholder="Public display name" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
                <Input value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} className="bg-[#1A1F2E] border-gray-700 text-white" placeholder="@yourhandle" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Role / Title</label>
                <Input value={formData.role_title} onChange={(e) => setFormData({ ...formData, role_title: e.target.value })} className="bg-[#1A1F2E] border-gray-700 text-white" placeholder="e.g. Content Creator" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="bg-[#1A1F2E] border-gray-700 text-white min-h-[100px]" placeholder="Tell us about yourself..." />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="bg-[#1A1F2E] border-gray-700 text-white" placeholder="City, Country" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                <Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} className="bg-[#1A1F2E] border-gray-700 text-white" placeholder="https://yourwebsite.com" />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={handleSave} disabled={saving} className="bg-[#4368D9] hover:bg-[#3a59b4]">
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button variant="outline" className="border-gray-700 text-white" onClick={loadData}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}