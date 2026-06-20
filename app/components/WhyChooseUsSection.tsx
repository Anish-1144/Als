"use client";

import type { ComponentType } from "react";
import {
  HiLightBulb,
  HiUsers,
  HiShieldCheck,
  HiTrendingUp,
  HiHeart,
} from "react-icons/hi";
import {
  mergeFeatureCards,
  mergeStats,
  type FeatureCard,
  type StatItem,
} from "@/lib/homepage-content";

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  HiLightBulb,
  HiUsers,
  HiShieldCheck,
  HiTrendingUp,
  HiHeart,
};

interface WhyChooseUsSectionProps {
  whyChooseUs: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    backgroundImage?: { url: string };
    features?: FeatureCard[];
    stats?: StatItem[];
  };
}

export default function WhyChooseUsSection({
  whyChooseUs,
}: WhyChooseUsSectionProps) {
  const features = mergeFeatureCards(whyChooseUs.features);
  const stats = mergeStats(whyChooseUs.stats);
  const sectionTitle = whyChooseUs.sectionTitle ?? "Why you choose ALS";
  const sectionSubtitle =
    whyChooseUs.sectionSubtitle ??
    "More than 36,000 Australian businesses and individuals choose us as their mortgage brokers.";
  const imageUrl =
    whyChooseUs.backgroundImage?.url?.trim() || "/section2.jpg";

  return (
    <section className="relative py-12 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div
              className="aspect-[4/5] bg-cover bg-center rounded-2xl shadow-xl"
              style={{
                backgroundImage: `url('${imageUrl}')`,
              }}
            />
          </div>

          <div className="text-gray-100">
            <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6 border border-[#00a69c]/30">
              <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
              <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                ABOUT US
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight text-balance text-white">
              {sectionTitle}
            </h2>

            <p className="text-lg text-gray-400 mb-8 leading-relaxed text-pretty">
              {sectionSubtitle}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {features.map((feature, index) => {
                const IconComponent =
                  iconMap[feature.icon ?? ""] ?? HiHeart;
                return (
                  <div key={index} className="space-y-4">
                    <div className="w-12 h-12 bg-[#00a69c]/20 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-[#00a69c]" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-600">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-[#00a69c] mb-2">
                      {stat.value}
                    </div>
                    <p className="text-gray-500 text-sm uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
