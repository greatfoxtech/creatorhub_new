import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Tag, Percent, Calendar, Edit, Trash2 } from 'lucide-react';

export default function DiscountsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const SAMPLE_DISCOUNTS = [
    {
      id: 1,
      code: 'WELCOME20',
      type: 'percentage',
      value: 20,
      description: 'Welcome discount for new customers',
      uses: 45,
      maxUses: 100,
      expiresAt: '2025-12-31',
      status: 'active'
    },
    {
      id: 2,
      code: 'SUMMER50',
      type: 'fixed',
      value: 50,
      description: 'Summer sale discount',
      uses: 123,
      maxUses: 200,
      expiresAt: '2025-08-31',
      status: 'active'
    },
    {
      id: 3,
      code: 'EARLYBIRD',
      type: 'percentage',
      value: 15,
      description: 'Early bird special',
      uses: 89,
      maxUses: 150,
      expiresAt: '2025-06-30',
      status: 'expired'
    }
  ];

  const filteredDiscounts = SAMPLE_DISCOUNTS.filter(discount =>
    discount.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-gray-500/20 text-gray-500';
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Discounts</h1>
            <p className="text-gray-400">Manage discount codes and promotions</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#4368D9] hover:bg-[#3a59b4]">
                <Plus className="w-4 h-4 mr-2" />
                Create Discount
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#121726] border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Discount</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Discount code" className="bg-[#1A1F2E] border-gray-700 text-white" />
                <Input placeholder="Value" type="number" className="bg-[#1A1F2E] border-gray-700 text-white" />
                <Button className="w-full bg-[#4368D9] hover:bg-[#3a59b4]">Create</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Discounts</p>
                  <p className="text-2xl font-bold text-white">{SAMPLE_DISCOUNTS.length}</p>
                </div>
                <Tag className="w-8 h-8 text-[#4368D9]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Codes</p>
                  <p className="text-2xl font-bold text-white">
                    {SAMPLE_DISCOUNTS.filter(d => d.status === 'active').length}
                  </p>
                </div>
                <Percent className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Uses</p>
                  <p className="text-2xl font-bold text-white">
                    {SAMPLE_DISCOUNTS.reduce((sum, d) => sum + d.uses, 0)}
                  </p>
                </div>
                <Tag className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search discount codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-[#121726] border-gray-800 text-white"
          />
        </div>

        {/* Discounts List */}
        <div className="space-y-4">
          {filteredDiscounts.map((discount) => (
            <Card key={discount.id} className="bg-[#121726] border-gray-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">{discount.code}</h3>
                      <Badge className={getStatusColor(discount.status)}>
                        {discount.status}
                      </Badge>
                      <Badge className="bg-[#4368D9]/20 text-[#4368D9]">
                        {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                      </Badge>
                    </div>
                    <p className="text-gray-400 mb-4">{discount.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span>{discount.uses} / {discount.maxUses} uses</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>Expires: {discount.expiresAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-gray-700 text-white">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500/50 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}