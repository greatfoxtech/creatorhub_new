import React from 'react';
import { HardHat } from 'lucide-react';

export default function Placeholder({ pageName }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
      <HardHat className="w-16 h-16 mb-4 text-yellow-500" />
      <h1 className="text-2xl font-bold text-white mb-2">{pageName}</h1>
      <p>This page is under construction.</p>
      <p>Full functionality will be implemented soon!</p>
    </div>
  );
}