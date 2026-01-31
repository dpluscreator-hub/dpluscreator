"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import VideoModal from "@/components/VideoModal";
import BookMeetingModal from "@/components/BookMeetingModal";

export default function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <>
      <section className="min-h-[70vh] relative overflow-hidden pb-4 md:pb-6">
        {/* Theme gradient background */}
        <div className="absolute inset-0 hero-gradient"></div>

        {/* Main Content */}
        <div className="relative z-20 min-h-[70vh] flex flex-col justify-center items-center">
          <div className="container mx-auto px-6 md:px-8 lg:px-12">
            <div className="max-w-6xl mx-auto text-center">
              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
               <h1
  className="text-dark leading-[0.95] tracking-[-0.03em]"
  style={{ fontFamily: 'var(--font-poppins)', fontWeight: 800 }}
>
  <span className="inline-block leading-none text-[clamp(2.5rem,10vw,8rem)] md:text-[clamp(4.5rem,10vw,7.5rem)] md:whitespace-nowrap lg:text-[clamp(5.5rem,9vw,9rem)]">
  DIGITAL AGENCY
</span>

</h1>

              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                className="mt-6 md:mt-8 text-dark/50 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-medium"
              >
                A creative social media agency focused on helping brands grow and stand out online. Fresh ideas, clean designs, and a personalized approach.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
                className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6"
              >
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="group bg-dark text-white px-7 md:px-9 py-3.5 md:py-4 rounded-full font-semibold text-sm md:text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-dark/90 flex items-center gap-2"
                >
                  Book a meeting
                  <svg 
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
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
