"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BookMeetingModal from "@/components/BookMeetingModal";

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
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            ? "bg-white/98 backdrop-blur-lg shadow-lg py-3"
            : "bg-transparent py-5 lg:py-6"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="z-20 relative">
              <Image
                src="/logo.svg"
                alt="Digital Creator"
                width={140}
                height={35}
                className="h-8 lg:h-9 w-auto"
                priority
              />
            </Link>

            {/* Center Navigation */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`text-[15px] font-medium transition-all duration-200 hover:text-primary relative ${
                    pathname === link.path 
                      ? "text-primary" 
                      : "text-dark/80 hover:text-dark"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                href="/contact"
                className="text-[15px] font-medium text-dark/70 hover:text-dark transition-colors px-4 py-2"
              >
                Talk to us
              </Link>
              <span className="text-gray-300 mx-1">|</span>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="bg-dark text-white px-6 py-2.5 rounded-full text-[14px] font-semibold hover:bg-dark/90 hover:shadow-lg transition-all duration-300 ml-2"
              >
                Book a meeting
              </button>
            </div>

        <button
          className="lg:hidden text-dark z-20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-[100]"
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute inset-0 bg-dark/60 backdrop-blur-md"
              />

              {/* Menu Panel */}
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="absolute top-0 left-0 right-0 bg-white rounded-b-[2rem] shadow-2xl max-h-[85vh] overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5">
                  <Image
                    src="/logo.svg"
                    alt="Digital Creator"
                    width={120}
                    height={30}
                    className="h-8 w-auto"
                  />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-11 h-11 flex items-center justify-center rounded-full bg-dark text-white hover:bg-primary transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="px-4 pb-4">
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
                              ? "bg-primary text-dark shadow-lg"
                              : "bg-gray-50 text-dark/80 hover:bg-gray-100 active:scale-95"
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>

                {/* CTA Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="px-4 pb-6 pt-2"
                >
                  <div className="bg-dark rounded-2xl p-5 relative overflow-hidden">
                    {/* Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary rounded-full -translate-y-1/2 translate-x-1/2" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary rounded-full translate-y-1/2 -translate-x-1/2" />
                    </div>
                    
                    <div className="relative z-10">
                      <p className="text-white/60 text-sm mb-1">Ready to grow?</p>
                      <p className="text-white font-semibold text-lg mb-4">Let's start your project</p>
                      <div className="flex gap-3">
                        <Link
                          href="/contact"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex-1 text-center py-3 rounded-xl border-2 border-white/20 text-white text-sm font-semibold hover:bg-white/10 transition-all"
                        >
                          Contact
                        </Link>
                        <button
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsBookingOpen(true);
                          }}
                          className="flex-1 bg-primary text-dark py-3 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all shadow-lg"
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
