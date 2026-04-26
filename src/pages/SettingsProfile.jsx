import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { base44 } from '@/api/base44Client';
import { Camera, Loader2 } from 'lucide-react';

export default function SettingsProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    bio: '',
    location: '',
    website: ''
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setFormData({
        full_name: currentUser.full_name || '',
        email: currentUser.email || '',
        bio: currentUser.bio || '',
        location: currentUser.location || '',
        website: currentUser.website || ''
      });
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await base44.auth.updateMe(formData);
      await loadUser();
    } catch (error) {
      console.error('Failed to save:', error);
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
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your profile information and preferences</p>
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
                  <AvatarImage src={user?.profile_picture_url} />
                  <AvatarFallback className="text-2xl">{user?.full_name?.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-[#4368D9] hover:bg-[#3a59b4]"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{user?.full_name}</h3>
                <p className="text-sm text-gray-400 mb-3">{user?.email}</p>
                <Button variant="outline" className="border-gray-700 text-white">
                  Change Photo
                </Button>
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
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
              <Input
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="bg-[#1A1F2E] border-gray-700 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <Input
                value={formData.email}
                disabled
                className="bg-[#1A1F2E] border-gray-700 text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="bg-[#1A1F2E] border-gray-700 text-white min-h-[100px]"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="bg-[#1A1F2E] border-gray-700 text-white"
                placeholder="City, Country"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
              <Input
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="bg-[#1A1F2E] border-gray-700 text-white"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#4368D9] hover:bg-[#3a59b4]"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                variant="outline"
                className="border-gray-700 text-white"
                onClick={loadUser}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}