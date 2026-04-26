import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Eye, Users, Heart, MessageCircle } from 'lucide-react';

export default function AnalyticsOverviewPage() {
  const stats = [
    { label: 'Total Views', value: '45.2K', change: '+12.5%', icon: Eye, trend: 'up' },
    { label: 'Followers', value: '8.5K', change: '+8.2%', icon: Users, trend: 'up' },
    { label: 'Engagement', value: '3.2K', change: '+23.1%', icon: Heart, trend: 'up' },
    { label: 'Comments', value: '1.8K', change: '-5.3%', icon: MessageCircle, trend: 'down' }
  ];

  const recentActivity = [
    { type: 'post', title: 'New post published', time: '2 hours ago', value: '+234 views' },
    { type: 'follower', title: 'New followers', time: '5 hours ago', value: '+12 followers' },
    { type: 'engagement', title: 'High engagement post', time: '1 day ago', value: '+156 likes' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Analytics Overview</h1>
          <p className="text-gray-400">Track your performance and growth</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.label} className="bg-[#121726] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    stat.trend === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'
                  }`}>
                    <stat.icon className={`w-6 h-6 ${
                      stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Chart Placeholder */}
          <Card className="bg-[#121726] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Performance Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                  <p>Chart visualization coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-[#121726] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-[#1A1F2E]">
                    <div className="w-2 h-2 rounded-full bg-[#4368D9] mt-2" />
                    <div className="flex-1">
                      <p className="font-medium text-white">{activity.title}</p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                    <span className="text-sm text-green-500">{activity.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}