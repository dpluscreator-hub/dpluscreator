"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const allServices = [
  {
    title: "Creative & Design Services",
    slug: "creative-design",
    description: "Stunning visuals that capture attention and communicate your brand message effectively. From logos to complete brand identities, we create designs that make your business stand out.",
    features: [
      "Logo Design & Branding",
      "Social Media Post Design",
      "Poster & Banner Design",
      "Flyer & Brochure Design",
      "Business Card & Visiting Card Design",
      "Packaging Design",
      "Product Mockups",
      "Presentation Design (PPT)",
      "Thumbnail Design (YouTube/Social Media)"
    ],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
  },
  {
    title: "Video Production & Editing",
    slug: "video-production",
    description: "Transform raw footage into compelling cinematic stories that engage your audience and drive results. Professional video production from concept to final cut.",
    features: [
      "Content Shoot (Product, Corporate, Event)",
      "Social Media Reels & Shorts",
      "YouTube Video Editing",
      "Motion Graphics & Animation",
      "Product Demo Videos",
      "Explainer Videos",
      "Advertisement Videos (TV/Digital)",
      "Infographic Videos",
      "Product 3D Animation"
    ],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    description: "Comprehensive digital marketing strategies that drive growth and achieve your business objectives. From SEO to paid advertising, we cover it all.",
    features: [
      "Search Engine Optimization (SEO)",
      "Local SEO & Technical SEO",
      "On-page & Off-page SEO",
      "Google My Business Optimization",
      "Social Media Marketing (Instagram, Facebook, LinkedIn, YouTube)",
      "WhatsApp Business Marketing",
      "Paid Advertising (Google, Meta, YouTube, LinkedIn Ads)",
      "Content Strategy & Copywriting",
      "Email Marketing & Cold Email Campaigns",
      "WhatsApp Broadcast Campaigns",
      "Influencer Marketing & Collaboration"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "E-commerce Solutions",
    slug: "ecommerce-solutions",
    description: "Complete e-commerce management services to help you succeed on all major marketplaces. From product listing to review management, we handle everything.",
    features: [
      "Product Listing (Amazon, Flipkart, Meesho)",
      "Marketplace Management",
      "Inventory Monitoring",
      "Product Photography & Editing",
      "A+ Content Creation",
      "Review Management",
      "E-commerce SEO"
    ],
    image: "https://images.unsplash.com/photo-1763872011479-aa293bf083a8?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Web Design & Development",
    slug: "web-development",
    description: "Beautiful, functional, high-performance websites that deliver exceptional user experiences across all devices. From simple business sites to complex web applications.",
    features: [
      "Business Website Design",
      "E-commerce Website Development",
      "Landing Page Design",
      "WordPress Development",
      "Shopify Store Setup",
      "Multi-vendor E-commerce Platform",
      "WhatsApp Integration (Chat Widget, Business API)",
      "AI Chatbot Integration",
      "WhatsApp Bot for Customer Support",
      "Payment Gateway Integration",
      "CRM Integration",
      "Website Maintenance & Support",
      "Mobile-Responsive Design",
      "Website Speed Optimization",
      "Custom Web Application Development"
    ],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  },
  {
    title: "Brand Strategy & Consulting",
    slug: "brand-strategy",
    description: "Strategic guidance to help your brand grow and thrive in the digital landscape. We analyze, strategize, and help you make data-driven decisions.",
    features: [
      "Brand Identity Development",
      "Social Media Strategy",
      "Digital Marketing Consultation",
      "Competitor Analysis",
      "Performance Analytics & Reporting"
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
];

export default function ServicesPage() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, []);

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
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-dark/80 leading-relaxed">
              From strategy to execution, we offer complete digital services that help your brand grow online.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-32">
            {allServices.map((service, index) => (
              <motion.div
                key={service.title}
                id={service.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center scroll-mt-32 ${
                  index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-dark mb-6">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary inline-block">
                    Get Started
                  </Link>
                </div>

                <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                  <div className="relative h-96 rounded-3xl overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-dark text-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-400 leading-relaxed mb-12">
              Let's discuss how we can help your brand grow in the digital world.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Book a meeting
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
