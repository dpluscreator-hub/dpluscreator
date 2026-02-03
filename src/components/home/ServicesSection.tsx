"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// --- Configuration for easy tuning ---
const CONFIG = {
  sensitivity: 0.8,
  activeWindow: 0.15,
  blurMax: 15, // Reduced from 20
  rotateMax: 6, // Reduced from 8
  scaleMin: 0.88, // Slightly higher for less scaling
  xOffsetPercent: 100, // Reduced from 120
};

interface Service {
  title: string;
  slug: string;
  description: string;
  image: string;
  tags: string[];
}

const services: Service[] = [
  {
    title: "Social Media",
    slug: "social-media-management",
    description: "Strategic content planning and community engagement that builds a loyal following.",
    image: "https://images.unsplash.com/photo-1690883794145-e96486fbe66b?q=80&w=1132&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    tags: ["Strategy", "Engagement"],
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    description: "Stunning visuals that capture attention and communicate your brand message effectively.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    tags: ["Branding", "UI/UX"],
  },
  {
    title: "Video Editing",
    slug: "video-editing",
    description: "Transform raw footage into compelling cinematic stories that drive results.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
    tags: ["Motion", "Storytelling"],
  },
  {
    title: "Brand Identity",
    slug: "brand-identity",
    description: "Develop a unique voice and aesthetic that resonates with your target audience.",
    image: "https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    tags: ["Logo", "Guidelines"],
  },
  {
    title: "Web Design",
    slug: "web-design",
    description: "Functional, high-performance websites delivering exceptional user experiences.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
    tags: ["Development", "SEO"],
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = cardsRef.current.filter(Boolean) as HTMLElement[];
    const numSections = sections.length;
    if (numSections === 0) return;

    // --- Setup ---
    gsap.set(container, { perspective: 1000 });
    gsap.set(sections, { 
      position: "absolute", 
      inset: 0, 
      transformStyle: "preserve-3d",
    });

    // --- Main Scroll Logic ---
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `+=${numSections * 100 * CONFIG.sensitivity}%`, 
      pin: true,
      scrub: isMobile ? 1 : 0.5, // Smoother scrub on mobile
      onUpdate: (self) => {
        const globalProgress = self.progress * (numSections - 1);

        sections.forEach((section, index) => {
          const diff = globalProgress - index;
          
          let opacity = 0;
          let scale = 1;
          let xPercent = 0;
          let rotateY = 0;
          let zIndex = 0;

          if (Math.abs(diff) <= CONFIG.activeWindow) {
             scale = 1;
             xPercent = 0;
             rotateY = 0;
             opacity = 1;
             zIndex = 100;
          } 
          else if (diff > CONFIG.activeWindow) {
             const exitProgress = (diff - CONFIG.activeWindow) / (1 - CONFIG.activeWindow);
             
             scale = 1 - (exitProgress * (1 - CONFIG.scaleMin));
             xPercent = -exitProgress * 15;
             rotateY = exitProgress * CONFIG.rotateMax;
             opacity = 1 - exitProgress * 0.5;
             zIndex = 50 - index;
          } 
          else if (diff < -CONFIG.activeWindow) {
             const enterProgress = (Math.abs(diff) - CONFIG.activeWindow) / (1 - CONFIG.activeWindow);
             const clampedEnter = Math.min(1, enterProgress);

             scale = 1 - (clampedEnter * (1 - CONFIG.scaleMin));
             xPercent = clampedEnter * CONFIG.xOffsetPercent;
             rotateY = -clampedEnter * CONFIG.rotateMax;
             opacity = Math.max(0, 1 - clampedEnter);
             zIndex = 50 + index; 
          }

          // No blur filter on mobile for performance
          gsap.set(section, {
            opacity,
            scale,
            xPercent,
            rotateY,
            zIndex,
            pointerEvents: Math.abs(diff) < 0.3 ? "auto" : "none"
          });
        });
      }
    });

  }, { scope: containerRef, dependencies: [isMobile] });

  return (
    <section className="bg-black relative overflow-hidden" aria-label="Our Services">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full blur-[128px] pointer-events-none" />

      <div ref={containerRef} className="h-screen w-full relative flex flex-col justify-center pt-16 md:pt-0">
        
        <div className="absolute top-12 md:top-20 left-0 w-full z-40 pointer-events-none px-4">
          <div className="container mx-auto px-2 md:px-6 lg:px-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-3 md:pb-5">
              <div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight">Services</h2>
                <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base font-normal tracking-normal max-w-xl">
                  Explore our offerings and embark on a journey where innovation meets distinction
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 h-[60vh] md:h-[500px] relative mt-16 md:mt-20">
          {services.map((service, index) => (
            <div
              key={service.slug}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="w-full h-full flex items-center justify-center absolute inset-0"
            >
              <ServiceCard service={service} index={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <Link href={`/services/${service.slug}`} className="block w-full max-w-5xl h-full group perspective-1000">
      <article className="h-full w-full bg-[#0f0f0f] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden relative shadow-2xl transition-shadow duration-300 group-hover:shadow-purple-900/20">
        
        {/* Mobile: Image on top, Content below */}
        <div className="md:hidden relative h-[35%] w-full">
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="100vw"
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            priority={index === 1} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/50 to-transparent" />
          <div className="absolute top-3 left-4 flex items-center gap-2">
            <span className="text-white/60 text-[10px] font-mono tracking-widest">{String(index).padStart(2, '0')}</span>
            <div className="h-px w-6 bg-white/30"></div>
            <div className="flex gap-1.5">
              {service.tags.map((tag) => (
                <span key={tag} className="text-[8px] uppercase tracking-wider font-semibold text-white/80 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Mobile Content */}
        <div className="md:hidden relative z-20 h-[65%] p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight tracking-tight">
              {service.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {service.description}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-4 text-white">
            <span className="font-medium text-xs tracking-wide">VIEW DETAILS</span>
            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Desktop: Side by side layout */}
        <div className="hidden md:flex relative z-20 h-full bg-[#0f0f0f] overflow-hidden flex-shrink-0 w-[50%]">
           <div className="w-full h-full flex flex-col justify-between p-10 lg:p-14 min-w-[400px]">
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-white/40 text-sm font-mono tracking-widest">{String(index).padStart(2, '0')}</span>
                  <div className="h-px w-12 bg-white/20"></div>
                  <div className="flex gap-2">
                    {service.tags.map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold text-white/70 bg-white/5 border border-white/5 px-2 py-1 rounded-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-md font-light">
                  {service.description}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-8 text-white">
                <span className="font-medium text-sm tracking-wide">VIEW DETAILS</span>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>
           </div>
        </div>

        {/* Desktop: Image on right side */}
        <div className="hidden md:block absolute top-0 right-0 w-[55%] h-full bg-gray-900 z-10">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0f0f0f] to-transparent z-10" />
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="50vw"
            className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            priority={index === 1} 
          />
        </div>
      </article>
    </Link>
  );
}