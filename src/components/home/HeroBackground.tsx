"use client";

import { useRef, useEffect, useState } from "react";

export default function HeroBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* PayU-style curved lines */}
      <svg 
        className="absolute w-full h-full" 
        viewBox="0 0 1440 900" 
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        {/* Main curved line - from bottom left, curves up and around */}
        <path
          d="M-100 750 Q 200 650, 400 580 T 800 450 T 1200 350 T 1600 280"
          stroke="rgba(245, 166, 35, 0.35)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Secondary curved line - slightly offset */}
        <path
          d="M-50 850 Q 250 750, 500 680 T 900 550 T 1300 420 T 1700 350"
          stroke="rgba(245, 166, 35, 0.2)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Third subtle line */}
        <path
          d="M-150 680 Q 150 580, 350 510 T 750 380 T 1150 280 T 1550 210"
          stroke="rgba(245, 166, 35, 0.12)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
      </svg>

      {/* Subtle gradient blobs for depth */}
      {!isMobile && (
        <>
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px]">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-[120px]" />
          </div>
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px]">
            <div className="w-full h-full rounded-full bg-gradient-to-tl from-amber-200/8 via-orange-100/5 to-transparent blur-[100px]" />
          </div>
        </>
      )}
    </div>
  );
}
