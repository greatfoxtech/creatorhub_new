import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Package, DollarSign, ShoppingCart, Eye } from 'lucide-react';

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const SAMPLE_ORDERS = [
    {
      id: '#ORD-001',
      customer: 'John Smith',
      email: 'john@example.com',
      product: 'Premium Preset Pack',
      amount: 29.99,
      status: 'completed',
      date: '2025-11-19'
    },
    {
      id: '#ORD-002',
      customer: 'Emma Wilson',
      email: 'emma@example.com',
      product: 'Photography Course',
      amount: 199.99,
      status: 'completed',
      date: '2025-11-19'
    },
    {
      id: '#ORD-003',
      customer: 'Michael Brown',
      email: 'michael@example.com',
      product: 'Design Templates',
      amount: 19.99,
      status: 'pending',
      date: '2025-11-18'
    },
    {
      id: '#ORD-004',
      customer: 'Sarah Davis',
      email: 'sarah@example.com',
      product: 'Video Editing Pack',
      amount: 39.99,
      status: 'completed',
      date: '2025-11-18'
    },
    {
      id: '#ORD-005',
      customer: 'Chris Taylor',
      email: 'chris@example.com',
      product: 'Custom Prints',
      amount: 49.99,
      status: 'processing',
      date: '2025-11-17'
    }
  ];

  const filteredOrders = SAMPLE_ORDERS.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = SAMPLE_ORDERS.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.amount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-500/20 text-green-500';
      case 'processing': return 'bg-blue-500/20 text-blue-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-500';
      default: return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-gray-400">Track and manage your customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{SAMPLE_ORDERS.length}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-[#4368D9]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-white">
                    {SAMPLE_ORDERS.filter(o => o.status === 'completed').length}
                  </p>
                </div>
                <Package className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Revenue</p>
                  <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-white">
                    {SAMPLE_ORDERS.filter(o => o.status === 'pending').length}
                  </p>
                </div>
                <Package className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#121726] border-gray-800 text-white"
            />
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="w-auto">
            <TabsList className="bg-[#121726] border-gray-800">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Orders Table */}
        <Card className="bg-[#121726] border-gray-800">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-800">
                  <tr className="text-left text-sm text-gray-400">
                    <th className="p-4 font-medium">Order ID</th>
                    <th className="p-4 font-medium">Customer</th>
                    <th className="p-4 font-medium">Product</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                    <th className="p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-800 hover:bg-white/5">
                      <td className="p-4">
                        <span className="font-medium text-white">{order.id}</span>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-medium text-white">{order.customer}</p>
                          <p className="text-sm text-gray-400">{order.email}</p>
                        </div>
                      </td>
                      <td className="p-4 text-white">{order.product}</td>
                      <td className="p-4">
                        <span className="font-semibold text-white">${order.amount}</span>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-400">{order.date}</td>
                      <td className="p-4">
                        <Button size="sm" variant="ghost" className="text-[#4368D9]">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filteredOrders.length === 0 && (
          <Card className="bg-[#121726] border-gray-800 p-12 text-center mt-6">
            <ShoppingCart className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No orders found</h3>
            <p className="text-gray-400">Try adjusting your search or filters</p>
          </Card>
        )}
      </div>
    </div>
  );
}