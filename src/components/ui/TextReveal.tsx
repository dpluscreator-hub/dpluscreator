"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TextRevealProps {
  paragraph: string;
  className?: string;
}

// Word-by-word reveal animation inspired by Olivier Larose
export function TextReveal({ paragraph, className = "" }: TextRevealProps) {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = paragraph.split(" ");

  return (
    <p ref={container} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

interface WordProps {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function Word({ children, progress, range }: WordProps) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [10, 0]);

  return (
    <span className="relative mr-[0.25em] mt-[0.1em]">
      {/* Shadow/background text */}
      <span className="absolute opacity-15">{children}</span>
      {/* Animated text */}
      <motion.span style={{ opacity, y }} className="relative">
        {children}
      </motion.span>
    </span>
  );
}

// Character-by-character reveal for titles
interface CharacterRevealProps {
  text: string;
  className?: string;
}

export function CharacterReveal({ text, className = "" }: CharacterRevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <div ref={container} className={`flex flex-wrap justify-center ${className}`}>
      {words.map((word, wordIndex) => {
        const wordStart = wordIndex / words.length;
        const wordEnd = wordStart + 1 / words.length;
        const chars = word.split("");

        return (
          <span key={wordIndex} className="mr-[0.2em] inline-flex">
            {chars.map((char, charIndex) => {
              const charStart = wordStart + (charIndex / chars.length) * (wordEnd - wordStart);
              const charEnd = wordStart + ((charIndex + 1) / chars.length) * (wordEnd - wordStart);
              return (
                <Char key={charIndex} progress={scrollYProgress} range={[charStart, charEnd]}>
                  {char}
                </Char>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}

interface CharProps {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
}

function Char({ children, progress, range }: CharProps) {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const y = useTransform(progress, range, [20, 0]);
  const scale = useTransform(progress, range, [0.9, 1]);

  return (
    <span className="relative">
      <span className="absolute opacity-10">{children}</span>
      <motion.span
        style={{ opacity, y, scale }}
        className="relative inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

// Gradient text that reveals on scroll
interface GradientTextRevealProps {
  text: string;
  className?: string;
}

export function GradientTextReveal({ text, className = "" }: GradientTextRevealProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.2"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  return (
    <div ref={container} className={`relative ${className}`}>
      {/* Background text (gray) */}
      <span className="text-dark/20">{text}</span>
      {/* Gradient overlay text */}
      <motion.span
        style={{ clipPath }}
        className="absolute inset-0 gradient-text"
      >
        {text}
      </motion.span>
    </div>
  );
}

export default TextReveal;
