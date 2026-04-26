import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Shield, Lock, Smartphone, Key, AlertTriangle, CheckCircle } from 'lucide-react';

export default function SettingsSecurityPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const ACTIVE_SESSIONS = [
    {
      id: 1,
      device: 'Chrome on MacBook Pro',
      location: 'San Francisco, CA',
      lastActive: '2 minutes ago',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone 14',
      location: 'San Francisco, CA',
      lastActive: '1 hour ago',
      current: false
    }
  ];

  const RECENT_ACTIVITY = [
    { action: 'Password changed', time: '2 days ago', status: 'success' },
    { action: 'Login from new device', time: '5 days ago', status: 'warning' },
    { action: 'Profile updated', time: '1 week ago', status: 'success' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Security Settings</h1>
          <p className="text-gray-400">Manage your account security and privacy</p>
        </div>

        {/* Password */}
        <Card className="bg-[#121726] border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Lock className="w-5 h-5" />
              Change Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Current Password</label>
              <Input type="password" className="bg-[#1A1F2E] border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
              <Input type="password" className="bg-[#1A1F2E] border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Confirm New Password</label>
              <Input type="password" className="bg-[#1A1F2E] border-gray-700 text-white" />
            </div>
            <Button className="bg-[#4368D9] hover:bg-[#3a59b4]">
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="bg-[#121726] border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Smartphone className="w-5 h-5" />
              Two-Factor Authentication
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white mb-1">Authenticator App</h3>
                <p className="text-sm text-gray-400">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Badge className={twoFactorEnabled ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500'}>
                {twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <Button 
              variant={twoFactorEnabled ? 'outline' : 'default'}
              className={twoFactorEnabled ? 'border-red-500/50 text-red-500' : 'bg-[#4368D9] hover:bg-[#3a59b4]'}
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
            >
              {twoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA'}
            </Button>
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card className="bg-[#121726] border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Key className="w-5 h-5" />
              Active Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {ACTIVE_SESSIONS.map((session) => (
              <div key={session.id} className="flex items-start justify-between p-4 rounded-lg bg-[#1A1F2E]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white">{session.device}</h4>
                    {session.current && (
                      <Badge className="bg-green-500/20 text-green-500 text-xs">Current</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{session.location}</p>
                  <p className="text-xs text-gray-500 mt-1">Last active: {session.lastActive}</p>
                </div>
                {!session.current && (
                  <Button size="sm" variant="outline" className="border-red-500/50 text-red-500">
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Security Activity */}
        <Card className="bg-[#121726] border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5" />
              Recent Security Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {RECENT_ACTIVITY.map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2E]">
                <div className="flex items-center gap-3">
                  {activity.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                  <div>
                    <p className="font-medium text-white">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}