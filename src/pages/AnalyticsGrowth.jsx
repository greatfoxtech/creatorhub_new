import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Target, Zap } from 'lucide-react';

export default function AnalyticsGrowthPage() {
  const growthMetrics = [
    { label: 'Follower Growth', value: '+856', change: '+12.5%', icon: Users },
    { label: 'Engagement Rate', value: '5.2%', change: '+1.8%', icon: Zap },
    { label: 'Reach', value: '45.2K', change: '+23.1%', icon: Target },
    { label: 'Growth Rate', value: '8.5%', change: '+2.3%', icon: TrendingUp }
  ];

  const milestones = [
    { label: '10K Followers', achieved: true, date: 'Achieved on Nov 15, 2025' },
    { label: '100K Views', achieved: true, date: 'Achieved on Nov 10, 2025' },
    { label: '1K Products Sold', achieved: false, date: 'Target: Dec 2025' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Growth Analytics</h1>
          <p className="text-gray-400">Track your audience growth and reach</p>
        </div>

        {/* Growth Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {growthMetrics.map((metric) => (
            <Card key={metric.label} className="bg-[#121726] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#4368D9]/20 flex items-center justify-center">
                    <metric.icon className="w-6 h-6 text-[#4368D9]" />
                  </div>
                  <span className="text-sm text-green-500">{metric.change}</span>
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-white">{metric.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Growth Chart */}
          <Card className="bg-[#121726] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Growth Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                  <p>Growth chart coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card className="bg-[#121726] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Milestones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {milestones.map((milestone, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-[#1A1F2E]">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      milestone.achieved ? 'bg-green-500' : 'bg-gray-600'
                    }`}>
                      {milestone.achieved && <span className="text-white text-xs">✓</span>}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{milestone.label}</p>
                      <p className="text-sm text-gray-400">{milestone.date}</p>
                    </div>
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