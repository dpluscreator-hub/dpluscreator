"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    fetch("/assets/intro-video.mp4", { method: "HEAD" })
      .then((res) => setHasVideo(res.ok))
      .catch(() => setHasVideo(false));
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black z-[9999] flex items-center justify-center p-0"
          style={{ margin: 0, padding: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-[min(450px,90vw)] mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl"
            style={{ aspectRatio: '9/16', height: 'min(90vh, 800px)' }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center z-20 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {hasVideo ? (
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                src="/assets/intro-video.mp4"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/60 text-sm">Add intro-video.mp4</p>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-3 font-semibold hover:opacity-80 transition-all duration-300"
      >
        <div className="w-12 h-12 md:w-14 md:h-14 bg-dark rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-white ml-0.5"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="text-dark text-sm md:text-base font-medium">Watch Intro</span>
      </button>

      {mounted && createPortal(modalContent, document.getElementById('modal-root')!)}
    </>
  );
}
