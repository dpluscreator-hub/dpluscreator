"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8, // Reduced for faster response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Store the RAF callback so we can properly remove it later
    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Synchronize Lenis scroll with GSAP's ScrollTrigger (throttled)
    let scrollUpdateTicking = false;
    lenis.on('scroll', () => {
      if (!scrollUpdateTicking) {
        requestAnimationFrame(() => {
          ScrollTrigger.update();
          scrollUpdateTicking = false;
        });
        scrollUpdateTicking = true;
      }
    });

    // Add Lenis's requestAnimationFrame to GSAP's ticker
    gsap.ticker.add(rafCallback);

    // Disable lag smoothing to sync with Lenis
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(rafCallback);
      ScrollTrigger.refresh();
    };
  }, []);

  return null;
}
