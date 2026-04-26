import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, ShoppingBag, CreditCard } from 'lucide-react';

export default function AnalyticsSalesPage() {
  const salesStats = [
    { label: 'Total Revenue', value: '$12,543', change: '+18.2%', icon: DollarSign },
    { label: 'Total Orders', value: '234', change: '+12.5%', icon: ShoppingBag },
    { label: 'Avg Order Value', value: '$53.60', change: '+5.3%', icon: CreditCard },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.8%', icon: TrendingUp }
  ];

  const topProducts = [
    { name: 'Premium Preset Pack', sales: 145, revenue: '$4,345.55' },
    { name: 'Design Templates', sales: 267, revenue: '$5,337.33' },
    { name: 'Video Editing Pack', sales: 178, revenue: '$7,116.22' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Sales Analytics</h1>
          <p className="text-gray-400">Monitor your revenue and sales performance</p>
        </div>

        {/* Sales Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {salesStats.map((stat) => (
            <Card key={stat.label} className="bg-[#121726] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-green-500" />
                  </div>
                  <span className="text-sm text-green-500">{stat.change}</span>
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
          {/* Revenue Chart */}
          <Card className="bg-[#121726] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <DollarSign className="w-12 h-12 mx-auto mb-2" />
                  <p>Revenue chart coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card className="bg-[#121726] border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Top Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2E]">
                    <div>
                      <p className="font-medium text-white">{product.name}</p>
                      <p className="text-sm text-gray-400">{product.sales} sales</p>
                    </div>
                    <span className="text-lg font-bold text-green-500">{product.revenue}</span>
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