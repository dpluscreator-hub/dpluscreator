"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Skip animations on mobile for performance
    if (isMobile) return;
    
    const shapes = containerRef.current?.querySelectorAll(".blob-shape");
    if (!shapes) return;

    const animations: gsap.core.Tween[] = [];
    
    shapes.forEach((shape, index) => {
      const anim = gsap.to(shape, {
        x: `random(-20, 20)`,
        y: `random(-20, 20)`,
        rotation: `random(-10, 10)`,
        duration: gsap.utils.random(10, 15),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.8,
      });
      animations.push(anim);
    });

    return () => animations.forEach(anim => anim.kill());
  }, [isMobile]);

  // Simplified static background for mobile
  if (isMobile) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px]">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/15 via-primary/8 to-transparent blur-[80px]" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px]">
          <div className="w-full h-full rounded-full bg-gradient-to-tl from-amber-200/10 to-transparent blur-[60px]" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute w-full h-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="60" />
          </filter>
          <filter id="blur-filter-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="80" />
          </filter>
          <linearGradient id="gradient-primary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="gradient-secondary" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A1A1A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="gradient-accent" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#F5A623" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#FFD080" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#F5A623" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        <ellipse
          className="blob-shape"
          cx="20%"
          cy="30%"
          rx="300"
          ry="250"
          fill="url(#gradient-primary)"
          filter="url(#blur-filter-lg)"
        />

        <ellipse
          className="blob-shape"
          cx="75%"
          cy="25%"
          rx="350"
          ry="280"
          fill="url(#gradient-accent)"
          filter="url(#blur-filter-lg)"
        />

        <ellipse
          className="blob-shape"
          cx="60%"
          cy="70%"
          rx="280"
          ry="220"
          fill="url(#gradient-secondary)"
          filter="url(#blur-filter)"
        />
      </svg>

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] blob-shape">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-[100px]" />
      </div>

      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] blob-shape">
        <div className="w-full h-full rounded-full bg-gradient-to-tl from-amber-200/15 via-orange-100/10 to-transparent blur-[80px]" />
      </div>
    </div>
  );
}
