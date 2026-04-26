import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plug, Check } from 'lucide-react';

export default function SettingsIntegrationsPage() {
  const INTEGRATIONS = [
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Accept payments and manage subscriptions',
      icon: '💳',
      connected: true,
      category: 'payments'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      description: 'Alternative payment processing',
      icon: '🅿️',
      connected: true,
      category: 'payments'
    },
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      description: 'Email marketing and newsletters',
      icon: '📧',
      connected: false,
      category: 'marketing'
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      description: 'Track website traffic and user behavior',
      icon: '📊',
      connected: false,
      category: 'analytics'
    },
    {
      id: 'zapier',
      name: 'Zapier',
      description: 'Connect with 5000+ apps',
      icon: '⚡',
      connected: false,
      category: 'automation'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Integrations</h1>
          <p className="text-gray-400">Connect your favorite tools and services</p>
        </div>

        {/* Connected Integrations */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-white">Connected</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTEGRATIONS.filter(i => i.connected).map((integration) => (
              <Card key={integration.id} className="bg-[#121726] border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#1A1F2E] flex items-center justify-center text-2xl">
                        {integration.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-white">{integration.name}</h3>
                          <Badge className="bg-green-500/20 text-green-500">
                            <Check className="w-3 h-3 mr-1" />
                            Connected
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="border-gray-700 text-white">
                      Configure
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-500/50 text-red-500">
                      Disconnect
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available Integrations */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Available</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INTEGRATIONS.filter(i => !i.connected).map((integration) => (
              <Card key={integration.id} className="bg-[#121726] border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-[#1A1F2E] flex items-center justify-center text-2xl">
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white mb-1">{integration.name}</h3>
                        <p className="text-sm text-gray-400">{integration.description}</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="w-full mt-4 bg-[#4368D9] hover:bg-[#3a59b4]">
                    <Plug className="w-4 h-4 mr-2" />
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}