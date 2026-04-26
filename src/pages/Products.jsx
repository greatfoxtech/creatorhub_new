import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Plus, Package, DollarSign, Eye, Edit } from 'lucide-react';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const SAMPLE_PRODUCTS = [
    {
      id: 1,
      name: 'Premium Preset Pack',
      description: 'Professional photo editing presets for Lightroom',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400',
      category: 'digital',
      stock: 'unlimited',
      sales: 145,
      status: 'active'
    },
    {
      id: 2,
      name: 'Photography Course',
      description: 'Complete guide to professional photography',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=400',
      category: 'course',
      stock: 'unlimited',
      sales: 89,
      status: 'active'
    },
    {
      id: 3,
      name: 'Custom Prints',
      description: 'High-quality prints of my best work',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400',
      category: 'physical',
      stock: 25,
      sales: 34,
      status: 'active'
    },
    {
      id: 4,
      name: 'Design Templates',
      description: 'Professional design templates for social media',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400',
      category: 'digital',
      stock: 'unlimited',
      sales: 267,
      status: 'active'
    },
    {
      id: 5,
      name: 'Video Editing Pack',
      description: 'Premium transitions and effects for video editing',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400',
      category: 'digital',
      stock: 'unlimited',
      sales: 178,
      status: 'active'
    },
    {
      id: 6,
      name: 'Brand Strategy Guide',
      description: 'Complete guide to building your personal brand',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400',
      category: 'course',
      stock: 'unlimited',
      sales: 56,
      status: 'draft'
    }
  ];

  const filteredProducts = SAMPLE_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || product.category === filter;
    return matchesSearch && matchesFilter;
  });

  const totalRevenue = SAMPLE_PRODUCTS.reduce((sum, p) => sum + (p.price * p.sales), 0);
  const totalSales = SAMPLE_PRODUCTS.reduce((sum, p) => sum + p.sales, 0);

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Products</h1>
            <p className="text-gray-400">Manage your digital products and offerings</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#4368D9] hover:bg-[#3a59b4]">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#121726] border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Product name" className="bg-[#1A1F2E] border-gray-700 text-white" />
                <Input placeholder="Price" type="number" className="bg-[#1A1F2E] border-gray-700 text-white" />
                <Button className="w-full bg-[#4368D9] hover:bg-[#3a59b4]">Create Product</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Products</p>
                  <p className="text-2xl font-bold text-white">{SAMPLE_PRODUCTS.length}</p>
                </div>
                <Package className="w-8 h-8 text-[#4368D9]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Sales</p>
                  <p className="text-2xl font-bold text-white">{totalSales}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Revenue</p>
                  <p className="text-2xl font-bold text-white">${totalRevenue.toFixed(0)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Products</p>
                  <p className="text-2xl font-bold text-white">
                    {SAMPLE_PRODUCTS.filter(p => p.status === 'active').length}
                  </p>
                </div>
                <Package className="w-8 h-8 text-[#4368D9]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-[#121726] border-gray-800 text-white"
            />
          </div>

          <Tabs value={filter} onValueChange={setFilter} className="w-auto">
            <TabsList className="bg-[#121726] border-gray-800">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="digital">Digital</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
              <TabsTrigger value="physical">Physical</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="bg-[#121726] border-gray-800 overflow-hidden">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <Badge
                  className={`absolute top-2 right-2 ${
                    product.status === 'active'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  }`}
                >
                  {product.status}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-white mb-2">{product.name}</h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-white">${product.price}</div>
                  <Badge className="bg-[#4368D9]/20 text-[#4368D9]">
                    {product.sales} sales
                  </Badge>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" className="flex-1 bg-[#4368D9] hover:bg-[#3a59b4]">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="border-gray-700 text-white">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}