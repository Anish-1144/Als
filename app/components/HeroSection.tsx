"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

type HeroContent = {
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
};

const DEFAULT_HERO_IMAGE = "/hero.jpg";

export default function HeroSection({ hero }: { hero?: HeroContent }) {
  const title = hero?.title ?? "Your Goals, Our Strategy";
  const titleHighlight = hero?.titleHighlight ?? "Lending for a Better Tomorrow";
  const imageUrl = hero?.imageUrl?.trim() || DEFAULT_HERO_IMAGE;
  const imageAlt = hero?.imageAlt ?? "ALS Mortgage Solutions";

  return (
    <motion.section
      className="relative bg-[#1d293d] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-full max-w- 7xl mx-auto px-6 md:px-12 lg:px-24 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto lg:items-end lg:justify-between gap-8 mb-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 rounded-full border-2 border-[#00a69c]"></div>
              <span className="text-gray-300 text-sm font-medium uppercase tracking-wider">
                Home to Australia&apos;s #1 Brokers
              </span>
            </div>

            <h1>
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-bold leading-tight tracking-tight">
                {title}
              </span>
              <span className="block text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#00a69c] font-bold leading-tight tracking-tight mt-2">
                {titleHighlight}
              </span>
            </h1>
          </div>

          <div className="lg:text-right lg:pb-4">
            <Link
              href="/services"
              className="group inline-flex flex-col items-start lg:items-end"
            >
              <span className="text-white text-sm uppercase tracking-wider font-medium flex items-center gap-2 mb-2">
                Our Solutions
                <FaChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="block w-32 h-[2px] bg-gradient-to-r from-[#00a69c] to-transparent lg:bg-gradient-to-l"></span>
            </Link>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="aspect-[16/9] mx-auto w-full rounded-2xl shadow-2xl overflow-hidden relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
