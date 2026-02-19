"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const workCategories = [
  {
    id: "reels",
    title: "Reels & Short-Form",
    subtitle: "CONTENT CREATION",
    workTitle: "Instagram Reel for Fashion Brand",
    description: "Short-form reel for Brands.",
    videoUrl: "https://res.cloudinary.com/dk6htc9uw/video/upload/v1770110216/VIDEO_18_1_zqff21.mp4",
    color: "#F5A623",
  },
  {
    id: "motion",
    title: "Motion Graphics",
    subtitle: "ANIMATION",
    workTitle: "Product",
    description: "Animated explainer showcasing features and benefits with smooth transitions.",
    videoUrl: "https://res.cloudinary.com/dk6htc9uw/video/upload/v1770110216/coffee_jto4nz.mp4",
    color: "#7C3AED",
  },
  {
    id: "3d",
    title: "3D & Visual Effects",
    subtitle: "VFX PRODUCTION",
    workTitle: "Cinematic VFX Shot",
    description: "Realistic 3D compositing with lighting, tracking, and VFX integration.",
    videoUrl: "https://res.cloudinary.com/dk6htc9uw/video/upload/v1770110220/Sequence_01_2_hl9m2u.mp4",
    color: "#06B6D4",
  },
];

// Lazy Video Component - Only loads when in viewport
function LazyVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100px" }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={isInView ? src : undefined}
      autoPlay={isInView}
      loop
      muted
      playsInline
      className={className}
      preload="none"
    />
  );
}

// Simplified paragraph component - no per-word animation on mobile
function ParagraphReveal({ text, className }: { text: string; className?: string }) {
  return (
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {text}
    </motion.p>
  );
}

export default function ProjectShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    let timeoutId: number;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', debouncedResize, { passive: true });
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Header parallax effect - disabled on mobile
  const { scrollYProgress: headerProgress } = useScroll({
    target: headerRef,
    offset: ["start end", "end start"],
  });
  
  const headerY = useTransform(headerProgress, [0, 1], [0, isMobile ? 0 : -100]);
  const headerOpacity = useTransform(headerProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0.5]);

  // GSAP animations - simplified for mobile
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const video = card.querySelector("video");
        const content = card.querySelector(".card-content");

        // Simple fade-in for mobile, full animation for desktop
        if (isMobile) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none none",
              },
            }
          );
        } else {
          // Full 3D animation for desktop
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 120,
              rotationX: 10,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );

          // Video zoom on scroll - desktop only
          if (video) {
            gsap.fromTo(
              video,
              { scale: 1.2 },
              {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1, // Reduced for faster response
                },
              }
            );
          }

          // Content slide animation - desktop only
          if (content) {
            const isReversed = index % 2 === 1;
            const contentChildren = content.children;
            gsap.fromTo(
              contentChildren,
              {
                x: isReversed ? 60 : -60,
                opacity: 0,
              },
              {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 80%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      aria-label="Our Work"
      className="relative py-10 md:py-16 lg:py-20 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Ambient Background with subtle movement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[250px] md:w-[600px] h-[250px] md:h-[600px] bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Scroll Animation */}
        <motion.div
          ref={headerRef}
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-6 md:mb-8 lg:mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-dark/5 backdrop-blur-sm px-4 py-2 rounded-full mb-3 md:mb-5"
          >
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-dark/70 font-medium text-xs md:text-sm tracking-wider uppercase">
              Our Portfolio
            </span>
          </motion.div>

          <h2 className="text-[1.75rem] sm:text-3xl md:text-5xl lg:text-6xl font-bold text-dark mb-3 md:mb-6 leading-[1] tracking-tight">
            Visuals that speak
            <br />
            <span className="gradient-text">Content that performs</span>
          </h2>

          <ParagraphReveal 
            text="From 3D animation to viral reels, see how we bring brands to life."
            className="text-[13px] sm:text-sm md:text-lg lg:text-xl text-dark/60 max-w-xl md:max-w-3xl mx-auto leading-relaxed justify-center"
          />
        </motion.div>

        {/* Work Categories - Premium Cards with GSAP */}
        <div className="space-y-8 md:space-y-12 lg:space-y-14">
          {workCategories.map((category, index) => (
            <div
              key={category.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* First item (Reels) - Vertical video layout */}
              {index === 0 ? (
                <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-5 lg:gap-10 items-center max-w-4xl mx-auto">
                  {/* Content Side */}
                  <div className="card-content text-center lg:text-left w-full">
                    <div className="flex items-center gap-2.5 mb-3 justify-center lg:justify-start">
                      <span className="w-6 h-[2px]" style={{ backgroundColor: category.color }} />
                      <span className="text-[10px] font-bold tracking-[0.12em] uppercase" style={{ color: category.color }}>
                        {category.subtitle}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-dark mb-2 lg:mb-3 leading-[1.1] tracking-tight">
                      {category.title}
                    </h3>
                    <p className="text-[13px] sm:text-sm text-dark/60 mb-4 lg:mb-5 leading-relaxed max-w-sm mx-auto lg:mx-0">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2.5 justify-center lg:justify-start">
                      <Link
                        href="/contact"
                        className="group/btn inline-flex items-center gap-2 bg-dark text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full font-semibold text-xs sm:text-sm transition-all duration-500 hover:bg-primary hover:text-dark hover:shadow-lg hover:scale-105"
                      >
                        Start a Project
                        <svg className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Video Side - Vertical/Portrait */}
                  <div className="flex justify-center lg:justify-end w-full">
                    <div className="relative group/video w-[200px] sm:w-[220px] md:w-[250px] lg:w-[280px]">
                      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-dark">
                        <LazyVideo
                          src={category.videoUrl}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-500" />
                        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 opacity-0 group-hover/video:opacity-100 translate-y-2 group-hover/video:translate-y-0 transition-all duration-500">
                          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex-shrink-0">
                            <svg className="w-3 h-3 text-dark ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </span>
                          <span className="text-white text-xs font-medium truncate">{category.workTitle}</span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className="text-3xl font-bold opacity-30" style={{ color: category.color }}>01</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
              /* Regular horizontal layout for Motion Graphics and 3D */
              <div
                className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                {/* Content Side */}
                <div 
                  className={`card-content lg:col-span-5 ${
                    index % 2 === 1 ? "lg:col-start-8" : ""
                  }`}
                >
                  {/* Category Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <span 
                      className="w-8 h-[2px]"
                      style={{ backgroundColor: category.color }}
                    />
                    <span 
                      className="text-xs font-bold tracking-[0.15em] uppercase"
                      style={{ color: category.color }}
                    >
                      {category.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark mb-4 leading-[1.1] tracking-tight">
                    {category.title}
                  </h3>

                  <p className="text-sm md:text-base text-dark/60 mb-6 leading-relaxed max-w-md">
                    {category.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="group/btn inline-flex items-center gap-2 bg-dark text-white px-5 py-3 rounded-full font-semibold text-sm transition-all duration-500 hover:bg-primary hover:text-dark hover:shadow-lg hover:scale-105"
                    >
                      Start a Project
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Video Side - Horizontal */}
                <div className={`lg:col-span-7 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                  <div className="relative group/video">
                    <div className="relative h-[250px] md:h-[320px] lg:h-[380px] rounded-2xl overflow-hidden shadow-xl bg-dark">
                      <LazyVideo
                        src={category.videoUrl}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-0 group-hover/video:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 opacity-0 group-hover/video:opacity-100 translate-y-2 group-hover/video:translate-y-0 transition-all duration-500">
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm shadow-lg">
                          <svg className="w-3.5 h-3.5 text-dark ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </span>
                        <span className="text-white text-sm font-medium">{category.workTitle}</span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="text-4xl md:text-5xl font-bold opacity-25" style={{ color: category.color }}>
                          0{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-12 md:mt-20 lg:mt-28 text-center"
        >
          <div className="bg-gradient-to-br from-dark via-gray-900 to-dark rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 bg-primary rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-purple-600 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-6">
                Ready to create something amazing?
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/70 mb-5 md:mb-8 max-w-xl md:max-w-2xl mx-auto">
                Let&apos;s bring your vision to life with creative work that drives real results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
                <Link
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-dark px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Start Your Project
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
                <Link
                  href="/services"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 md:py-4 rounded-full font-semibold text-sm md:text-base hover:bg-white/10 transition-all duration-300"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
