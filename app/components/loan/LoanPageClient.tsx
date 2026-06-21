"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import ContactCTASection from "@/app/components/ContactCTASection";
import { getPageHeroFallback } from "@/lib/page-hero";
import type { LoanPageContent, ServiceSlug } from "@/lib/services-content";
import { isSectionVisible } from "@/lib/page-content";
import {
  FaHouse,
  FaKey,
  FaHandshake,
  FaChartLine,
  FaBuilding,
  FaArrowRight,
  FaChevronDown,
  FaHandHoldingDollar,
  FaPiggyBank,
  FaCar,
} from "react-icons/fa6";

const TOPIC_ICONS = [FaHouse, FaKey, FaHandshake, FaHandHoldingDollar, FaPiggyBank, FaBuilding, FaCar, FaChartLine];

export default function LoanPageClient({
  slug,
  content,
}: {
  slug: ServiceSlug;
  content: LoanPageContent;
}) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <PageHero slug={slug} fallback={getPageHeroFallback(slug)} />

      {isSectionVisible(content.topicTilesSection) && (
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {content.topicTiles.map((tile, index) => {
              const Icon = TOPIC_ICONS[index] ?? FaHouse;
              const isMiddle = index === 1;
              const className = `group relative p-8 rounded-2xl transition-all duration-300 cursor-pointer border ${
                isMiddle
                  ? "bg-[#00a69c] text-white shadow-xl scale-105 border-[#00a69c]"
                  : "bg-[#1d293d] border-gray-600 hover:border-[#00a69c] hover:shadow-xl"
              }`;
              const inner = (
                <>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${isMiddle ? "bg-white/20" : "bg-[#00a69c]/20 group-hover:bg-[#00a69c]/40"} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-8 h-8 ${isMiddle ? "text-white" : "text-[#00a69c]"}`} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${isMiddle ? "text-white" : "text-white group-hover:text-[#00a69c]"} transition-colors`}>{tile.title}</h3>
                  <p className={`leading-relaxed mb-6 ${isMiddle ? "text-white/80" : "text-gray-400"}`}>{tile.description}</p>
                  <span className={`inline-flex items-center font-medium ${isMiddle ? "text-white" : "text-[#00a69c]"}`}>
                    {tile.linkLabel ?? "Learn More"}
                    <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </>
              );

              if (tile.link && !tile.anchorId) {
                return (
                  <Link key={index} href={tile.link} className={className}>
                    {inner}
                  </Link>
                );
              }

              return (
                <div
                  key={index}
                  role={tile.anchorId ? "button" : undefined}
                  tabIndex={tile.anchorId ? 0 : undefined}
                  onClick={tile.anchorId ? () => scrollToSection(tile.anchorId!) : undefined}
                  onKeyDown={tile.anchorId ? (e) => { if (e.key === "Enter" || e.key === " ") scrollToSection(tile.anchorId!); } : undefined}
                  className={className}
                >
                  {inner}
                </div>
              );
            })}
          </div>

          {content.otherSolutions && isSectionVisible(content.otherSolutions) && content.otherSolutions.cards.length > 0 && (
            <div className="mt-16">
              <h3 className="text-3xl font-besley font-semibold text-white mb-8 text-center">{content.otherSolutions.title}</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {content.otherSolutions.cards.map((card, index) => (
                  <Link key={index} href={card.link ?? "#"} className="group bg-[#1d293d] p-8 rounded-2xl transition-all duration-300 border border-gray-600 hover:border-[#00a69c] hover:shadow-xl">
                    <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00a69c] transition-colors">{card.title}</h4>
                    <p className="text-gray-400 leading-relaxed mb-6">{card.description}</p>
                    <span className="inline-flex items-center font-medium text-[#00a69c]">
                      {card.linkLabel ?? "Learn More"}
                      <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      )}

      {content.spotlightSections.filter(isSectionVisible).map((section, index) => (
        <section key={index} id={section.id} className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544] scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8 leading-tight">{section.title}</h2>
              <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">{section.subtitle}</p>
            </div>
            <div className="bg-[#1d293d] p-8 rounded-2xl shadow-lg border border-gray-600">
              <h3 className="text-2xl font-besley font-semibold text-white mb-4">{section.cardTitle}</h3>
              <p className="text-gray-400 leading-relaxed mb-6">{section.cardBody}</p>
              {section.link && (
                <Link href={section.link} className="inline-flex items-center text-[#00a69c] font-semibold hover:text-[#0d8a99] transition-colors">
                  {section.linkLabel ?? "Learn More"}
                  <FaArrowRight className="ml-2 w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </section>
      ))}

      {content.whyUs && isSectionVisible(content.whyUs) && content.whyUs.cards.length > 0 && (
        <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-[#e6e5e3]">
          <div className="relative z-10 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {content.whyUs.badge && (
                <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                  <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">{content.whyUs.badge}</span>
                </div>
              )}
              <h2 className="text-4xl md:text-5xl font-besley font-medium text-gray-800 mb-8 leading-tight">{content.whyUs.title}</h2>
              {content.whyUs.subtitle && <p className="text-xl text-gray-700 max-w-4xl mx-auto">{content.whyUs.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.whyUs.cards.map((card, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-gray-300 shadow-lg">
                  <h3 className="text-xl font-besley font-semibold text-gray-800 mb-4">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isSectionVisible(content.benefits) && (
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              {content.benefits.badge && (
                <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                  <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">{content.benefits.badge}</span>
                </div>
              )}
              <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">{content.benefits.title}</h2>
              {content.benefits.subtitle && <p className="text-lg text-gray-400 max-w-3xl mx-auto">{content.benefits.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {content.benefits.cards.map((card, index) => (
                <div key={index} className="text-center bg-[#2d3544] p-8 rounded-2xl">
                  <h3 className="text-xl font-besley font-semibold text-white mb-4">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isSectionVisible(content.moreServices) && (
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">{content.moreServices.title}</h2>
              {content.moreServices.subtitle && <p className="text-xl text-gray-400 max-w-4xl mx-auto">{content.moreServices.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.moreServices.cards.map((card, index) => (
                <div key={index} className="bg-[#1d293d] p-8 rounded-2xl border border-gray-600 hover:border-[#00a69c] transition-colors">
                  <h3 className="text-xl font-besley font-semibold text-white mb-4">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {isSectionVisible(content.faqs) && (
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              {content.faqs.badge && (
                <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                  <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">{content.faqs.badge}</span>
                </div>
              )}
              <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">{content.faqs.title}</h2>
              {content.faqs.subtitle && <p className="text-lg text-gray-400">{content.faqs.subtitle}</p>}
            </div>
            <div className="space-y-4">
              {content.faqs.items.map((faq, index) => (
                <div key={index} className="bg-[#1d293d] rounded-xl shadow-md overflow-hidden">
                  <button type="button" onClick={() => setOpenFAQ(openFAQ === index ? null : index)} className="w-full px-6 py-5 flex justify-between items-center hover:bg-[#2d3544] transition-colors">
                    <h3 className="text-lg font-semibold text-white text-left pr-4">{faq.question}</h3>
                    <FaChevronDown className={`w-5 h-5 text-[#00a69c] transition-transform flex-shrink-0 ${openFAQ === index ? "rotate-180" : ""}`} />
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-5">
                      <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTASection />
    </>
  );
}
