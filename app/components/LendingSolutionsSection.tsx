"use client";

import Link from "next/link";
import { FaArrowRight, FaHome, FaChartLine, FaSync } from "react-icons/fa";
import {
  DEFAULT_SERVICE_CARDS,
  mergeServiceCards,
  type ServiceCard,
} from "@/lib/homepage-content";

const CARD_ICONS = [FaHome, FaChartLine, FaSync];

type ServicesContent = {
  sectionTitle?: string;
  sectionSubtitle?: string;
  cards?: ServiceCard[];
  /** @deprecated legacy field name */
  services?: ServiceCard[];
};

export default function LendingSolutionsSection({
  services,
}: {
  services?: ServicesContent;
}) {
  const sectionTitle =
    services?.sectionTitle ?? "Comprehensive Lending Solutions";
  const sectionSubtitle =
    services?.sectionSubtitle ??
    "Tailored property finance solutions for every stage of your journey. Explore our services to find the perfect fit for your needs.";
  const rawCards = services?.cards ?? services?.services;
  const lendingCategories = mergeServiceCards(rawCards ?? DEFAULT_SERVICE_CARDS);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            {sectionTitle}
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed text-pretty">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {lendingCategories.map((category, index) => {
            const IconComponent = CARD_ICONS[index] ?? FaHome;
            const isMiddle = index === 1;
            const linkLabel = category.linkLabel || "Learn More";

            return (
              <Link key={index} href={category.link || "#"}>
                <div
                  className={`relative p-8 rounded-2xl transition-all duration-300 cursor-pointer group border ${
                    isMiddle
                      ? "bg-[#00a69c] text-white shadow-xl scale-105 border-[#00a69c] hover:bg-[#008f87]"
                      : "bg-[#384252] text-gray-100 hover:shadow-lg border-gray-600 hover:border-[#00a69c]"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      isMiddle
                        ? "bg-white/20"
                        : "bg-[#00a69c]/20 group-hover:bg-[#00a69c]/30"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent
                      className={`w-8 h-8 ${isMiddle ? "text-white" : "text-[#00a69c]"}`}
                    />
                  </div>

                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      isMiddle
                        ? "text-white"
                        : "text-white group-hover:text-[#00a69c]"
                    } transition-colors`}
                  >
                    {category.title}
                  </h3>

                  <p
                    className={`leading-relaxed ${isMiddle ? "text-white/90" : "text-gray-400"}`}
                  >
                    {category.description}
                  </p>

                  <div className="mt-6">
                    <span
                      className={`inline-flex items-center font-medium ${
                        isMiddle ? "text-white" : "text-[#00a69c]"
                      }`}
                    >
                      {linkLabel}
                      <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
