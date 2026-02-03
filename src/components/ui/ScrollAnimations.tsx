"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollZoomProps {
  children: ReactNode;
  className?: string;
  zoomIn?: boolean; // true = zoom in on scroll, false = zoom out
  intensity?: number; // 0.1 to 0.5
}

export function ScrollZoom({ 
  children, 
  className = "", 
  zoomIn = false,
  intensity = 0.2 
}: ScrollZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const startScale = zoomIn ? 1 - intensity : 1;
    const endScale = zoomIn ? 1 : 1 - intensity;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { scale: startScale, opacity: 1 },
        {
          scale: endScale,
          opacity: zoomIn ? 1 : 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [zoomIn, intensity]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={contentRef} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number; // -1 to 1 (negative = opposite direction)
  className?: string;
}

export function Parallax({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: () => speed * 200,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={contentRef} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const el = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(el, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div ref={containerRef} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

interface SplitTextRevealProps {
  children: string;
  className?: string;
  stagger?: number;
}

export function SplitTextReveal({ 
  children, 
  className = "", 
  stagger = 0.02 
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current || charsRef.current.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(charsRef.current, {
        y: 100,
        opacity: 0,
        rotationX: -90,
        stagger: stagger,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{ perspective: "1000px" }}
    >
      {children.split("").map((char, i) => (
        <span
          key={i}
          ref={(el) => {
            if (el) charsRef.current[i] = el;
          }}
          className="inline-block"
          style={{ 
            transformStyle: "preserve-3d",
            display: char === " " ? "inline" : "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}

export default ScrollZoom;
