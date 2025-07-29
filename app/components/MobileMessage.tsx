'use client';

import { Monitor, Smartphone } from 'lucide-react';

export default function MobileMessage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center">
        {/* Icons */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <div className="p-4 bg-gray-800 rounded-full">
            <Smartphone size={32} className="text-gray-400" />
          </div>
          <div className="text-gray-600 text-2xl">→</div>
          <div className="p-4 bg-blue-600 rounded-full">
            <Monitor size={32} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-4">
          Desktop Only
        </h1>

        {/* Message */}
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
        tip-chain is designed for desktop use to provide the best experience for setting up your crypto donation page.
        </p>

        {/* Call to Action */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <p className="text-white font-medium mb-2">
            Please visit us on desktop to:
          </p>
          <ul className="text-gray-400 text-sm space-y-1 text-left">
            <li>• Generate your .env file</li>
            <li>• Configure CDP settings</li>
            <li>• Set up your donation page</li>
            <li>• Access all features</li>
          </ul>
        </div>

        {/* Powered by */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <p className="text-gray-500 text-sm">
            powered by{' '}
            <span className="text-blue-400 font-medium">
              Coinbase Developer Platform
            </span>
          </p>
        </div>
      </div>
    </div>
  );
} 