"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const allServices = [
  {
    title: "Branding",
    slug: "branding",
    description: "We don't just design logos. We shape how people see, feel, and remember your brand—from identity to trust.",
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    title: "Content Creation",
    slug: "content-creation",
    description: "Scroll-stopping visuals. Clear messaging. Content that speaks your brand language and connects with the right audience.",
    features: ["Social Media Content", "Photography", "Copywriting", "Content Strategy"],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
  },
  {
    title: "Social Media Strategy",
    slug: "social-media-strategy",
    description: "From planning to posting, we build systems that grow engagement, reach the right people, and turn attention into results.",
    features: ["Content Planning", "Community Management", "Analytics & Reporting", "Growth Strategy"],
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  },
  {
    title: "Ads",
    slug: "ads",
    description: "Strategy × Creative × Results. We build ads that don't just get seen, they convert attention into action.",
    features: ["Meta Ads", "Google Ads", "Performance Optimization", "A/B Testing"],
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80",
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    description: "Clean, modern designs that communicate your message effectively and make your brand stand out.",
    features: ["Social Media Graphics", "Marketing Materials", "Presentations", "Print Design"],
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
  },
  {
    title: "Video Editing",
    slug: "video-editing",
    description: "Transform raw footage into compelling stories that engage your audience and drive results.",
    features: ["Reels & Shorts", "Promotional Videos", "Motion Graphics", "Post-Production"],
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
  },
  {
    title: "Web Design",
    slug: "web-design",
    description: "Beautiful, functional websites that deliver exceptional user experiences across all devices.",
    features: ["Responsive Design", "UI/UX Design", "Landing Pages", "Website Development"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  },
  {
    title: "Marketing",
    slug: "marketing",
    description: "Comprehensive marketing strategies that drive growth and achieve your business objectives.",
    features: ["Digital Strategy", "Campaign Management", "Email Marketing", "Analytics"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
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

      <section className="py-20 bg-white">
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
