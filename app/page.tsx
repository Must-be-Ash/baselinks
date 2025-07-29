"use client";

import Step1Clone from './components/Step1Clone';
import Step2CDPKeys from './components/Step2CDPKeys';
import Step3EnvGenerator from './components/Step3EnvGenerator';
import Step4CORS from './components/Step4CORS';
import { TextShimmer } from '../components/ui/text-shimmer';

export default function EnvGenerator() {
  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 w-full">
          <TextShimmer 
            as="h1" 
            className="text-6xl font-bold mb-2 mt-10"
            duration={2.5}
            spread={1.5}
            baseColor="#0052FF"
            shimmerColor="#ffffff"
          >
            TipChain
          </TextShimmer>
          <p style={{color: '#888888'}} className="text-lg">
            make your own page in 4 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-16 w-full flex flex-col items-center">
          <Step1Clone />
          <Step2CDPKeys />
          <Step3EnvGenerator />
          <Step4CORS />
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 w-full">
          <a
            href="https://portal.cdp.coinbase.com/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <TextShimmer 
              as="p"
              duration={2}
              spread={1}
              baseColor="#888888"
              shimmerColor="#ffffff"
            >
              powered by <span style={{ color: 'rgba(0, 81, 255, 0.7)', fontWeight: 'bold', background: 'transparent' }}>Coinbase Developer Platform</span>
            </TextShimmer>
          </a>
        </div>
      </div>
    </div>
  );
}