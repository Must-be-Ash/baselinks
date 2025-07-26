'use client';
import React, { useMemo, type JSX } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TextShimmerProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  duration?: number;
  spread?: number;
  baseColor?: string;
  shimmerColor?: string;
}

export function TextShimmer({
  children,
  as: Component = 'p',
  className,
  duration = 2,
  spread = 2,
  baseColor = '#a1a1aa',
  shimmerColor = '#000',
}: TextShimmerProps) {
  const MotionComponent = motion(Component as keyof JSX.IntrinsicElements);

  const dynamicSpread = useMemo(() => {
    // If children is a string, use its length, otherwise use a default
    const textLength = typeof children === 'string' ? children.length : 20;
    return textLength * spread;
  }, [children, spread]);

  return (
    <MotionComponent
      className={cn(
        'relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent',
        className
      )}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear',
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `linear-gradient(90deg, transparent calc(50% - var(--spread)), ${shimmerColor}, transparent calc(50% + var(--spread))), linear-gradient(${baseColor}, ${baseColor})`,
        } as React.CSSProperties
      }
    >
      {children}
    </MotionComponent>
  );
} 