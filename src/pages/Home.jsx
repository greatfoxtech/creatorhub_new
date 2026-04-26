import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowRight, CheckCircle, ShoppingCart, Users, SquarePen, TrendingUp } from "lucide-react";
import { base44 } from '@/api/base44Client';

export default function HomePage() {
  const handleLogin = async () => {
    base44.auth.redirectToLogin();
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto h-20 flex items-center justify-between px-4">
          <Link to={createPageUrl("Home")} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4368D9] to-[#6E43D9] rounded-lg flex items-center justify-center">
              <SquarePen className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gray-900">SocialBuilder</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="#" className="text-gray-600 hover:text-gray-900">Features</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">Pricing</Link>
            <Link to="#" className="text-gray-600 hover:text-gray-900">Community</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to={createPageUrl("Auth")} className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Login
            </Link>
            <Button asChild className="bg-[#4368D9] hover:bg-[#3a59b4]">
              <Link to={createPageUrl("Auth")}>
                Start Building <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 bg-gray-50 overflow-hidden">
             <div className="absolute top-0 right-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#6E43D9] to-[#4368D9] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
            </div>
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
              Your Profile is Your Website.
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
              Drag-and-drop simplicity meets social engagement. Create your own website, grow your network, and engage with your audience — all in one platform.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild className="bg-[#4368D9] hover:bg-[#3a59b4]">
                <Link to={createPageUrl("Auth")}>
                  Start Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                See Features
              </Button>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
                    <p className="text-gray-500 mt-2">A simple process to get you started.</p>
                </div>
                <div className="grid md:grid-cols-4 gap-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                            <SquarePen className="h-8 w-8"/>
                        </div>
                        <h3 className="font-bold text-lg">1. Create</h3>
                        <p className="text-gray-500">Build your profile website with an intuitive drag-and-drop editor.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                            <Users className="h-8 w-8"/>
                        </div>
                        <h3 className="font-bold text-lg">2. Share</h3>
                        <p className="text-gray-500">Post stories, reels, and updates to your feed to engage your audience.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                            <ShoppingCart className="h-8 w-8"/>
                        </div>
                        <h3 className="font-bold text-lg">3. Sell</h3>
                        <p className="text-gray-500">Launch your own shop with digital and physical products to monetize.</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4">
                            <TrendingUp className="h-8 w-8"/>
                        </div>
                        <h3 className="font-bold text-lg">4. Grow</h3>
                        <p className="text-gray-500">Connect with followers, grow your community, and analyze your reach.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Feature Highlight */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-bold uppercase text-[#4368D9]">The Builder</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mt-2">
                A Powerful, Intuitive Canvas
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Bring your vision to life without writing a single line of code. Our canvas editor is packed with features to make website building a breeze.
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span><span className="font-semibold">Drag-and-Drop Editor:</span> Easily add and arrange elements on your pages.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span><span className="font-semibold">Multi-Page Profiles:</span> Create a full website with custom navigation menus.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span><span className="font-semibold">Fully Responsive:</span> Your sites look stunning on desktop, tablet, and mobile.</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-200 rounded-lg p-4 shadow-lg">
                <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68d9a3a65891e40bc3b25818/afc517aca_ProfileBuilderCanvasPage5.png" alt="Profile Builder" className="rounded-md" />
            </div>
          </div>
        </section>

        {/* CTA Block */}
        <section className="bg-gradient-to-r from-[#4368D9] to-[#6E43D9] py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              Turn your ideas into reality today.
            </h2>
            <Button size="lg" asChild className="mt-8 bg-white text-gray-900 hover:bg-gray-200">
              <Link to={createPageUrl("Auth")}>
                Start Free Now
              </Link>
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto py-12 px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold">SocialBuilder</h3>
              <p className="text-gray-400 text-sm mt-2">Build. Connect. Share.</p>
            </div>
            <div>
              <h4 className="font-semibold">Links</h4>
              <ul className="space-y-2 mt-4 text-sm">
                <li><Link to="#" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Terms</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Privacy</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Support</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} SocialBuilder. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}