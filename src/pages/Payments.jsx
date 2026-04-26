import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react';

export default function PaymentsPage() {
  const SAMPLE_TRANSACTIONS = [
    {
      id: 'TXN-001',
      amount: 199.99,
      description: 'Photography Course sale',
      status: 'completed',
      date: '2025-11-19',
      method: 'Stripe'
    },
    {
      id: 'TXN-002',
      amount: 29.99,
      description: 'Premium Preset Pack sale',
      status: 'completed',
      date: '2025-11-19',
      method: 'PayPal'
    },
    {
      id: 'TXN-003',
      amount: 49.99,
      description: 'Custom Prints sale',
      status: 'pending',
      date: '2025-11-18',
      method: 'Stripe'
    }
  ];

  const totalEarnings = SAMPLE_TRANSACTIONS.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0);

  const getStatusColor = (status) => {
    return status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500';
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Payments</h1>
          <p className="text-gray-400">Track your earnings and transactions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Earnings</p>
                  <p className="text-2xl font-bold text-white">${totalEarnings.toFixed(2)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">This Month</p>
                  <p className="text-2xl font-bold text-white">$2,543</p>
                </div>
                <TrendingUp className="w-8 h-8 text-[#4368D9]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Pending</p>
                  <p className="text-2xl font-bold text-white">$49.99</p>
                </div>
                <Calendar className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121726] border-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Transactions</p>
                  <p className="text-2xl font-bold text-white">{SAMPLE_TRANSACTIONS.length}</p>
                </div>
                <CreditCard className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card className="bg-[#121726] border-gray-800 mb-6">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg text-white mb-4">Payment Methods</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2E]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#4368D9]/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-[#4368D9]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Stripe</p>
                    <p className="text-sm text-gray-400">Connected</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-500">Active</Badge>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-[#1A1F2E]">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-medium text-white">PayPal</p>
                    <p className="text-sm text-gray-400">Connected</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-500">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions */}
        <Card className="bg-[#121726] border-gray-800">
          <CardContent className="p-0">
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-semibold text-lg text-white">Recent Transactions</h3>
              <Button size="sm" variant="outline" className="border-gray-700 text-white">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-800">
                  <tr className="text-left text-sm text-gray-400">
                    <th className="p-4 font-medium">Transaction ID</th>
                    <th className="p-4 font-medium">Description</th>
                    <th className="p-4 font-medium">Method</th>
                    <th className="p-4 font-medium">Amount</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_TRANSACTIONS.map((txn) => (
                    <tr key={txn.id} className="border-b border-gray-800 hover:bg-white/5">
                      <td className="p-4">
                        <span className="font-medium text-white">{txn.id}</span>
                      </td>
                      <td className="p-4 text-white">{txn.description}</td>
                      <td className="p-4 text-gray-400">{txn.method}</td>
                      <td className="p-4">
                        <span className="font-semibold text-green-500">${txn.amount}</span>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(txn.status)}>
                          {txn.status}
                        </Badge>
                      </td>
                      <td className="p-4 text-gray-400">{txn.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}