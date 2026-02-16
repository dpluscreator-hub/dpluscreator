"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/ContactForm";
// 1. Import the icons you want to use
import { FiMail, FiPhone } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="pt-24">
      <section className="py-20 section-pattern">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-dark mb-6">
              Let's <span className="gradient-text">Connect</span>
            </h1>
            <p className="text-xl text-dark/80 leading-relaxed">
              Ready to take your brand to the next level? Get in touch with us.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-display font-bold text-dark mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-700 mb-12 leading-relaxed">
                Have a project in mind? We'd love to hear from you. Fill out the
                form and we'll get back to you as soon as possible.
              </p>

              <div className="space-y-8">
                {/* Email Item */}
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    {/* Replaced Circle/SVG with React Icon */}
                    <FiMail className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-dark mb-1">Email</h3>
                    <a
                      href="mailto:dpluscreator@gmail.com"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      dpluscreator@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone Item */}
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <FiPhone className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-dark mb-1">Phone</h3>
                    <a
                      href="tel:+916265213360"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      +91 6265213360
                    </a>
                  </div>
                </div>

                {/* Instagram Item */}
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <FaInstagram className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-dark mb-1">
                      Instagram
                    </h3>
                    <a
                      href="https://www.instagram.com/d_pluscreator"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-colors"
                    >
                      @d_pluscreator
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="section-pattern p-8 md:p-12 rounded-3xl"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
