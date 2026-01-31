"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 md:py-20 section-pattern">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-dark mb-4">
              About <span className="gradient-text">Us</span>
            </h1>
            <p className="text-lg text-dark/60">
              Growth Over Services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-dark/70 mb-6 leading-relaxed">
                We are a <span className="text-primary font-semibold">creative</span> social media agency focused on helping brands <span className="text-primary font-semibold">grow</span> and stand out online. Our goal is to turn ideas into meaningful content that builds a strong and clear digital presence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-6">
                How We Work
              </h2>
              <p className="text-lg text-dark/70 mb-6 leading-relaxed">
                We work with a simple and smart process. First, we <span className="text-dark font-semibold">understand</span> your brand and audience, then we create content that matches your vision and current trends.
              </p>
              <p className="text-lg text-dark/70 leading-relaxed">
                Every post is designed with a purpose, not just for looks.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-6">
                What Makes Us Different
              </h2>
              <p className="text-lg text-dark/70 leading-relaxed">
                What makes us <span className="text-dark font-semibold">different</span> is our mix of creativity and strategy. Fresh ideas, clean designs, and a personalized approach that helps brands grow.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 md:py-20 bg-dark text-white">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-display font-bold text-center mb-12"
          >
            What We Do
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              "Social Media Management",
              "Graphic Design",
              "Video Editing",
              "Brand Identity",
              "Web Design",
              "Content Creation",
              "Ads Creatives",
              "Marketing",
            ].map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white/5 p-4 rounded-xl text-center hover:bg-white/10 transition-colors"
              >
                <span className="text-sm md:text-base font-medium">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 section-pattern">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-4">
              Just Getting Started
            </h2>
            <p className="text-lg text-dark/60 mb-8">
              Let's build something big together.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-dark text-white px-6 py-3 rounded-full font-semibold hover:bg-dark/90 transition-colors"
            >
              Get in Touch
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
