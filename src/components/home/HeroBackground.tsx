"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin();

export default function HeroBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const shapes = containerRef.current?.querySelectorAll(".blob-shape");
    if (!shapes) return;

    shapes.forEach((shape, index) => {
      gsap.to(shape, {
        x: `random(-30, 30)`,
        y: `random(-30, 30)`,
        rotation: `random(-15, 15)`,
        scale: `random(0.9, 1.1)`,
        duration: gsap.utils.random(8, 12),
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.5,
      });
    });
  }, { scope: containerRef });

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

        <ellipse
          className="blob-shape"
          cx="35%"
          cy="75%"
          rx="250"
          ry="200"
          fill="url(#gradient-primary)"
          filter="url(#blur-filter-lg)"
          opacity="0.6"
        />

        <ellipse
          className="blob-shape"
          cx="85%"
          cy="60%"
          rx="200"
          ry="180"
          fill="url(#gradient-accent)"
          filter="url(#blur-filter)"
          opacity="0.5"
        />
      </svg>

      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] blob-shape">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-[100px]" />
      </div>

      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] blob-shape">
        <div className="w-full h-full rounded-full bg-gradient-to-tl from-amber-200/15 via-orange-100/10 to-transparent blur-[80px]" />
      </div>

      <div className="absolute bottom-1/4 left-1/3 w-[350px] h-[350px] blob-shape">
        <div className="w-full h-full rounded-full bg-gradient-to-tr from-gray-200/20 via-gray-100/10 to-transparent blur-[90px]" />
      </div>
    </div>
  );
}
