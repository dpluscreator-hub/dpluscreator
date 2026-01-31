"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Social Media Management",
    slug: "social-media-management",
    description: "Build a strong social presence with strategic content planning, community engagement, and data-driven insights.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  },
  {
    title: "Graphic Design",
    slug: "graphic-design",
    description: "Create stunning visuals that capture attention and communicate your brand message effectively.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
  },
  {
    title: "Video Editing",
    slug: "video-editing",
    description: "Transform raw footage into compelling stories that engage your audience and drive results.",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80",
  },
  {
    title: "Brand Identity",
    slug: "brand-identity",
    description: "Develop a unique brand identity that resonates with your target audience and stands the test of time.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    title: "Web Design",
    slug: "web-design",
    description: "Create beautiful, functional websites that deliver exceptional user experiences across all devices.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
  },
  {
    title: "Content Creation",
    slug: "content-creation",
    description: "Craft compelling content that tells your story and connects with your audience on a deeper level.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80",
  },
  {
    title: "Ads Creatives",
    slug: "ads-creatives",
    description: "Design eye-catching advertisements that drive conversions and maximize your ROI.",
    image: "https://images.unsplash.com/photo-1533750516457-a7f992034fec?w=800&q=80",
  },
  {
    title: "Marketing",
    slug: "marketing",
    description: "Develop comprehensive marketing strategies that drive growth and achieve your business objectives.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-12 lg:py-16 bg-dark rounded-t-[40px] lg:rounded-t-[60px] relative z-30">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 lg:mb-20 gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white tracking-tight"
          >
            Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-xs md:max-w-sm text-left md:text-right text-sm lg:text-base leading-relaxed"
          >
            Explore our offerings and embark on a journey where innovation meets distinction
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {services.map((service, index) => (
            <Link href={`/services#${service.slug}`} key={service.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (index % 8) * 0.06 }}
                className="service-card bg-white rounded-[24px] lg:rounded-[28px] overflow-hidden group cursor-pointer h-full"
              >
                <div className="p-5 lg:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base lg:text-lg xl:text-xl font-display font-bold text-dark leading-tight pr-2">
                      {service.title.split(" ").map((word, i) => (
                        <span key={i}>
                          {word}
                          {i < service.title.split(" ").length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <div className="w-9 h-9 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 flex-shrink-0 shadow-md">
                      <svg
                        className="w-4 h-4 lg:w-5 lg:h-5 text-dark"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs lg:text-sm leading-relaxed line-clamp-2">{service.description}</p>
                </div>
                <div className="relative h-36 lg:h-40 mx-3 lg:mx-4 mb-3 lg:mb-4 rounded-xl lg:rounded-2xl overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
