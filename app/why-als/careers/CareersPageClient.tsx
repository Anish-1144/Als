"use client";

import PageHero from "@/app/components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import type { CareersContent } from "@/lib/page-content";
import { isSectionVisible } from "@/lib/page-content";
import type { PageHeroApiData } from "@/lib/page-hero";
import { FaRocket, FaUsers, FaLightbulb, FaHeart, FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const BENEFIT_ICONS = [FaRocket, FaUsers, FaLightbulb, FaHeart];

export default function CareersPageClient({
  content,
  pageHero,
}: {
  content: CareersContent;
  pageHero: PageHeroApiData;
}) {
  const { intro, benefits, navCards, cta } = content;

  return (
    <div className="font-sans">
      <PageHero
        slug="careers"
        fallback={getPageHeroFallback("careers")}
        initialData={pageHero}
      />

      {isSectionVisible(intro) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {intro.badge && (
                <div className="inline-flex items-center gap-2 bg-[#2d3544] px-4 py-2 rounded-full mb-6">
                  <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                  <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                    {intro.badge}
                  </span>
                </div>
              )}
              <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6 leading-tight">
                {intro.title}
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed mb-6">{intro.paragraph1}</p>
              <p className="text-lg text-gray-200 leading-relaxed">{intro.paragraph2}</p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-[#00a69c] to-[#0d8a99] rounded-2xl p-1">
                <div className="bg-[#2d3544] rounded-xl p-8">
                  <div className="aspect-video rounded-lg overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={intro.imageUrl} alt="Team collaboration" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {isSectionVisible(benefits) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#e6e5e3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-[#1d293d] mb-6">
              {benefits.title}
            </h2>
            {benefits.subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">{benefits.subtitle}</p>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.cards.map((card, index) => {
              const Icon = BENEFIT_ICONS[index] ?? FaRocket;
              return (
                <div key={index} className="bg-[#1d293d] rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-14 h-14 bg-[#00a69c] rounded-xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-besley font-semibold text-white mb-3">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {isSectionVisible(navCards) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-besley font-medium text-white mb-12 text-center">
            {navCards.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {navCards.cards.map((card, index) => {
              const isFeatured = index === navCards.cards.length - 1;
              const href = card.link ?? "#";
              return (
                <Link key={index} href={href} className="group">
                  <div
                    className={`rounded-2xl p-8 transition-all duration-300 h-full ${
                      isFeatured
                        ? "bg-gradient-to-br from-[#00a69c] to-[#0d8a99] hover:shadow-2xl"
                        : "bg-gradient-to-br from-[#2d3544] to-[#1d293d] border-2 border-[#2d3544] hover:border-[#00a69c]"
                    }`}
                  >
                    <h3 className={`text-2xl font-besley font-semibold mb-4 ${isFeatured ? "text-white" : "text-white group-hover:text-[#00a69c]"} transition-colors`}>
                      {card.title}
                    </h3>
                    <p className={`mb-6 leading-relaxed ${isFeatured ? "text-gray-100" : "text-gray-400"}`}>
                      {card.description}
                    </p>
                    <div className={`flex items-center gap-2 font-medium group-hover:gap-4 transition-all ${isFeatured ? "text-white" : "text-[#00a69c]"}`}>
                      {card.linkLabel ?? "Learn More"} <FaArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {isSectionVisible(cta) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">{cta.title}</h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">{cta.subtitle}</p>
          <a
            href={cta.buttonLink}
            className="inline-block bg-[#00a69c] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0d8a99] transition-colors duration-200"
          >
            {cta.buttonText}
          </a>
        </div>
      </section>
      )}
    </div>
  );
}
