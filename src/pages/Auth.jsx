
import React, { useEffect } from 'react';
import { User } from '@/entities/User';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { SquarePen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await User.loginWithRedirect(window.location.origin + createPageUrl('Dashboard'));
    } catch (e) {
      console.error('Login failed', e);
    }
  };

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    User.me().then(user => {
      if (user) {
        navigate(createPageUrl('Dashboard'));
      }
    }).catch(() => {
      // Not logged in, stay on this page
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-xl">
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
             <div className="w-12 h-12 bg-gradient-to-br from-[#4368D9] to-[#6E43D9] rounded-lg flex items-center justify-center">
              <SquarePen className="w-7 h-7 text-white" />
            </div>
            <span className="font-bold text-3xl text-gray-900">SocialBuilder</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Sign in to your account</h2>
          <p className="mt-2 text-gray-600">
            Or get started and create your new profile website.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button onClick={handleLogin} className="w-full bg-[#4368D9] hover:bg-[#3a59b4]" size="lg">
            Continue with Google
          </Button>
          <Button onClick={handleLogin} className="w-full bg-gray-800 hover:bg-gray-900" size="lg">
            Continue with Apple
          </Button>
        </div>

        <p className="text-center text-sm text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
}
