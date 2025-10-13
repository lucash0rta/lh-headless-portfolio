'use client';

import dynamic from 'next/dynamic';

// Dynamically import Lanyard with no SSR to avoid Three.js issues
const Lanyard = dynamic(() => import('./Lanyard'), { ssr: false });

interface LanyardClientProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
}

export default function LanyardClient(props: LanyardClientProps) {
  return <Lanyard {...props} />;
}

