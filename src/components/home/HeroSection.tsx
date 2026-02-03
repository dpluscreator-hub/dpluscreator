"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import VideoModal from "@/components/VideoModal";
import BookMeetingModal from "@/components/BookMeetingModal";
import HeroBackground from "./HeroBackground";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  // Parallax scroll transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      // Premium zoom + 3D rotation effect
      gsap.to(contentRef.current, {
        scale: 0.85,
        rotateX: 5,
        y: 80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "80% top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section 
        ref={sectionRef}
        className="min-h-[45vh] md:min-h-[75vh] relative overflow-hidden pb-4 md:pb-6 pt-20 md:pt-0"
      >
        <div className="absolute inset-0 hero-gradient"></div>

        <HeroBackground />

        <div 
          ref={contentRef}
          className="relative z-20 min-h-[45vh] md:min-h-[75vh] flex flex-col justify-center items-center"
        >
          <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-12">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h1
                  className="text-dark leading-[0.95] tracking-[-0.03em]"
                  style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800 }}
                >
                  <span className="block leading-none text-[1.8rem] xs:text-[2.2rem] sm:text-[2.8rem] md:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem] whitespace-nowrap">
                    DIGITAL AGENCY
                  </span>
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="mt-4 md:mt-6 text-dark/60 text-[12px] sm:text-[13px] md:text-sm lg:text-base max-w-sm md:max-w-lg lg:max-w-xl mx-auto leading-[1.6] font-medium"
              >
                A creative social media agency focused on helping brands grow and stand out online. Fresh ideas, clean designs, and a personalized approach.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                className="mt-5 md:mt-8 flex flex-row items-center justify-center gap-3 sm:gap-4"
              >
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="group relative bg-dark text-white px-5 sm:px-6 md:px-7 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold text-[13px] sm:text-sm md:text-base shadow-xl transition-all duration-300 hover:bg-brand-primary hover:text-dark hover:shadow-[0_0_30px_rgba(245,166,35,0.5)] hover:scale-105 inline-flex items-center gap-2 overflow-hidden"
                >
                  {/* Subtle shimmer effect on hover */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                  <span className="relative">Book a meeting</span>
                  <svg
                    className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <VideoModal />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <BookMeetingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
