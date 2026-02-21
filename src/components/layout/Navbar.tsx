"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BookMeetingModal from "@/components/BookMeetingModal";
import AnimatedLogo from "@/components/AnimatedLogo";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Team", path: "/team" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isInDarkSection, setIsInDarkSection] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = 0;
    let lastScrolledState = false;
    let lastDarkState = false;

    const handleScroll = () => {
      if (rafId !== null) return; // Throttle: skip if already scheduled
      
      rafId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        
        // Only update if scroll changed significantly
        if (Math.abs(scrollY - lastScrollY) > 10) {
          lastScrollY = scrollY;
          const newScrolledState = scrollY > 20;
          
          // Only update state if it actually changed
          if (newScrolledState !== lastScrolledState) {
            lastScrolledState = newScrolledState;
            setIsScrolled(newScrolledState);
          }

          // Check for dark section (only on homepage)
          const servicesSection = document.querySelector('[aria-label="Our Services"]');
          const navbarBottom = 80;

          if (servicesSection) {
            const rect = servicesSection.getBoundingClientRect();
            const inDark = rect.top < navbarBottom && rect.bottom > navbarBottom;
            
            // Only update if state changed
            if (inDark !== lastDarkState) {
              lastDarkState = inDark;
              setIsInDarkSection(inDark);
            }
          } else if (lastDarkState) {
            lastDarkState = false;
            setIsInDarkSection(false);
          }
        }
        
        rafId = null; // Reset for next scroll event
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  // Show light nav only when in dark section on homepage
  const showLightNav = !isScrolled && isInDarkSection;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg py-4"
            : "bg-transparent py-4 lg:py-5"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between relative">
            <Link href="/" className="z-20 relative">
              <AnimatedLogo
                className="h-7 sm:h-8 lg:h-9 w-auto"
                variant={showLightNav ? "dark" : "light"}
              />
            </Link>

            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
              <div className={`flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 ${
                isScrolled 
                  ? "bg-gray-100/80 backdrop-blur-sm shadow-sm" 
                  : showLightNav
                    ? "bg-white/10 backdrop-blur-sm"
                    : "bg-dark/5 backdrop-blur-sm"
              }`}>
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all duration-300 relative ${
                      pathname === link.path
                        ? isScrolled 
                          ? "bg-dark text-white"
                          : showLightNav
                            ? "bg-white text-dark"
                            : "bg-dark text-white"
                        : isScrolled
                          ? "text-dark/70 hover:text-dark hover:bg-gray-200/50"
                          : showLightNav
                            ? "text-white/80 hover:text-white hover:bg-white/10"
                            : "text-dark/70 hover:text-dark hover:bg-dark/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 z-20">
              <Link
                href="/contact"
                className={`text-[14px] font-medium transition-all duration-300 px-4 py-2 rounded-full ${isScrolled
                  ? "text-dark/70 hover:text-dark"
                  : showLightNav
                    ? "text-white/80 hover:text-white"
                    : "text-dark/70 hover:text-dark"
                  }`}
              >
                Talk to us
              </Link>
              <span className={isScrolled ? "text-gray-300" : showLightNav ? "text-white/30" : "text-gray-300"}>|</span>
              <button
                onClick={() => setIsBookingOpen(true)}
                className={`group px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${isScrolled
                  ? "bg-dark text-white hover:bg-dark/90 hover:shadow-xl hover:scale-105"
                  : showLightNav
                    ? "bg-white text-dark hover:bg-white/90 hover:shadow-xl hover:scale-105"
                    : "bg-dark text-white hover:bg-dark/90 hover:shadow-xl hover:scale-105"
                  }`}
              >
                <span className="flex items-center gap-2">
                  Book a meeting
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>

            <button
              className={`lg:hidden z-20 p-2 -mr-2 transition-colors ${showLightNav ? "text-white" : "text-dark"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU (ORIGINAL LAYOUT WITH VISIBILITY FIXES) --- */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[100]"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute top-0 left-0 right-0 bg-[#121212] rounded-b-[2rem] shadow-2xl max-h-[85vh] overflow-hidden"
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <AnimatedLogo className="h-8 w-auto" variant="dark" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <nav className="px-4 py-4">
                  <div className="grid grid-cols-2 gap-3">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.1 }}
                      >
                        <Link
                          href={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center justify-center h-14 rounded-2xl text-[15px] font-semibold transition-all ${
                            pathname === link.path
                              ? "bg-[#F5A623] text-white shadow-lg"
                              : "bg-white/10 text-white hover:bg-white/20 active:scale-95"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-4 pb-6 pt-2"
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-5 relative overflow-hidden">
                    <div className="relative z-10">
                      <p className="text-white/60 text-sm mb-1">Ready to grow?</p>
                      <p className="text-white font-semibold text-lg mb-4">Let&apos;s start your project</p>
                      <div className="flex gap-3">
                        <Link
                          href="/contact"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex-1 text-center py-3 rounded-xl border border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                        >
                          Contact
                        </Link>
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsBookingOpen(true);
                          }}
                          className="flex-1 bg-white text-black py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all shadow-lg"
                        >
                          Book a Meeting
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <BookMeetingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
    </>
  );
}
