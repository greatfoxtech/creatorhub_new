import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Shield, ExternalLink } from 'lucide-react';

export default function SettingsLegalPage() {
  const documents = [
    {
      title: 'Terms of Service',
      description: 'Our terms and conditions for using the platform',
      icon: FileText,
      updated: 'Last updated: Nov 2025'
    },
    {
      title: 'Privacy Policy',
      description: 'How we collect, use, and protect your data',
      icon: Shield,
      updated: 'Last updated: Nov 2025'
    },
    {
      title: 'Cookie Policy',
      description: 'Information about cookies and tracking',
      icon: FileText,
      updated: 'Last updated: Nov 2025'
    },
    {
      title: 'GDPR Compliance',
      description: 'Our commitment to data protection',
      icon: Shield,
      updated: 'Last updated: Nov 2025'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0D14] text-white">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Legal</h1>
          <p className="text-gray-400">Terms, policies, and compliance information</p>
        </div>

        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.title} className="bg-[#121726] border-gray-800 hover:border-gray-700 transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#4368D9]/20 flex items-center justify-center">
                      <doc.icon className="w-6 h-6 text-[#4368D9]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-white mb-1">{doc.title}</h3>
                      <p className="text-sm text-gray-400 mb-2">{doc.description}</p>
                      <p className="text-xs text-gray-500">{doc.updated}</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Data Rights */}
        <Card className="bg-[#121726] border-gray-800 mt-6">
          <CardHeader>
            <CardTitle className="text-white">Your Data Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Right to Access</h4>
              <p className="text-sm text-gray-400">
                You can request a copy of all your personal data stored in our systems.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Right to Deletion</h4>
              <p className="text-sm text-gray-400">
                You can request deletion of your account and all associated data.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Right to Portability</h4>
              <p className="text-sm text-gray-400">
                You can export your data in a machine-readable format.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}