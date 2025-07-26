'use client';

import { useMobileDetection } from '../hooks/useMobileDetection';
import MobileMessage from './MobileMessage';

interface MobileDetectorProps {
  children: React.ReactNode;
}

export default function MobileDetector({ children }: MobileDetectorProps) {
  const isMobile = useMobileDetection();

  // Show mobile message if on mobile device
  if (isMobile) {
    return <MobileMessage />;
  }

  // Show the main app if on desktop
  return <>{children}</>;
} 