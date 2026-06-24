"use client";

import { useState } from "react";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import ContactCTASection from "@/app/components/ContactCTASection";
import SectionBadge, { SectionDivider } from "@/app/components/SectionBadge";
import { getPageHeroFallback } from "@/lib/page-hero";
import type { LoanPageContent, ServiceSlug, SpotlightSection } from "@/lib/services-content";
import { isSectionVisible } from "@/lib/page-content";
import {
  FaHouse,
  FaKey,
  FaHandshake,
  FaChartLine,
  FaBuilding,
  FaArrowRight,
  FaChevronDown,
  FaHeart,
  FaUserTie,
  FaDollarSign,
  FaArrowTrendUp,
  FaShieldHalved,
  FaUsers,
  FaCheck,
  FaMoneyBillTrendUp,
  FaMoneyBillTransfer,
  FaPiggyBank,
  FaHatCowboy,
  FaPercent,
  FaChartPie,
  FaFileContract,
  FaArrowsSpin,
  FaCartShopping,
  FaCar,
  FaHandHoldingDollar,
  FaBriefcase,
} from "react-icons/fa6";

type IconCmp = typeof FaHouse;
type PageIconSet = {
  topic: IconCmp[];
  other: IconCmp[];
  spotlight: IconCmp[];
  why: IconCmp[];
  benefits: IconCmp[];
  more: IconCmp[];
};

/** Per-page icons mirroring the original hackbox pages, in section order. */
const PAGE_ICONS: Record<string, PageIconSet> = {
  "home-loans": {
    topic: [FaHouse, FaKey, FaHandshake],
    other: [FaShieldHalved, FaChartLine, FaBuilding],
    spotlight: [FaHouse, FaKey, FaHandshake],
    why: [FaHeart, FaUserTie, FaDollarSign, FaHandshake],
    benefits: [FaArrowTrendUp, FaKey, FaDollarSign],
    more: [FaChartLine, FaShieldHalved, FaUsers, FaDollarSign, FaHandshake, FaHeart],
  },
  "investment-loans": {
    topic: [FaChartLine, FaMoneyBillTrendUp, FaBuilding],
    other: [FaKey, FaPiggyBank, FaBuilding],
    spotlight: [FaChartLine, FaMoneyBillTrendUp, FaBuilding],
    why: [FaHeart, FaUserTie, FaDollarSign, FaHandshake],
    benefits: [FaArrowTrendUp, FaDollarSign, FaChartLine],
    more: [FaChartLine, FaShieldHalved, FaUsers, FaDollarSign, FaHandshake, FaHeart],
  },
  "commercial-loans": {
    topic: [FaBuilding, FaHatCowboy, FaPiggyBank],
    other: [],
    spotlight: [FaBuilding, FaHatCowboy, FaPiggyBank],
    why: [FaUserTie, FaBuilding, FaShieldHalved, FaHandshake],
    benefits: [FaArrowTrendUp, FaChartLine, FaDollarSign],
    more: [FaFileContract, FaChartPie, FaUsers, FaShieldHalved, FaHandshake, FaHeart],
  },
  "smsf-loans": {
    topic: [FaHouse, FaBuilding, FaArrowsSpin],
    other: [],
    spotlight: [FaHouse, FaBuilding, FaArrowsSpin],
    why: [FaPiggyBank, FaShieldHalved, FaUserTie, FaHandshake],
    benefits: [FaArrowTrendUp, FaShieldHalved, FaChartLine],
    more: [FaFileContract, FaUsers, FaChartPie, FaShieldHalved, FaHandshake, FaHeart],
  },
  "car-financing": {
    topic: [FaHouse, FaBriefcase, FaCartShopping],
    other: [],
    spotlight: [FaCartShopping, FaBriefcase, FaCar],
    why: [FaPercent, FaShieldHalved, FaUserTie, FaHandshake],
    benefits: [FaDollarSign, FaChartLine, FaShieldHalved],
    more: [FaCar, FaShieldHalved, FaUsers, FaDollarSign, FaHandshake, FaHeart],
  },
  refinancing: {
    topic: [FaHandHoldingDollar, FaPiggyBank, FaBuilding],
    other: [FaKey, FaChartLine, FaBuilding],
    spotlight: [FaHandHoldingDollar, FaPiggyBank, FaBuilding],
    why: [FaPercent, FaMoneyBillTransfer, FaUserTie, FaHandshake],
    benefits: [FaArrowTrendUp, FaKey, FaDollarSign],
    more: [FaPercent, FaShieldHalved, FaUsers, FaDollarSign, FaHandshake, FaHeart],
  },
};

const FALLBACK_ICONS: PageIconSet = PAGE_ICONS["home-loans"];
export default function LoanPageClient({
  slug,
  content,
  heroImage,
}: {
  slug: ServiceSlug;
  content: LoanPageContent;
  /** Resolved hero background image, reused as the Why-Us section backdrop (matches hackbox). */
  heroImage?: string;
}) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const whyUsImage = heroImage || getPageHeroFallback(slug).backgroundImage;
  // hackbox: home-loans uses a light glass treatment; all other loan pages use dark glass.
  const whyUsLight = slug === "home-loans";
  const icons = PAGE_ICONS[slug] ?? FALLBACK_ICONS;

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const isInterleaved = content.layout === "interleaved";
  const visibleSpotlights = content.spotlightSections.filter(isSectionVisible);

  function renderSpotlight(section: SpotlightSection, index: number) {
    const Icon = icons.spotlight[index] ?? FaHouse;
    return (
      <section
        key={section.id ?? index}
        id={section.id}
        className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544] scroll-mt-20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-8 leading-tight">
              {section.title}
            </h2>
            <SectionDivider />
            <p className="text-xl text-gray-400 leading-relaxed max-w-4xl mx-auto">
              {section.subtitle}
            </p>
          </div>
          <div className="bg-[#1d293d] p-8 rounded-2xl shadow-lg border border-gray-600">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-[#00a69c] rounded-2xl flex items-center justify-center shrink-0">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-4">{section.cardTitle}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{section.cardBody}</p>
                {section.link ? (
                  <Link
                    href={section.link}
                    className="inline-flex items-center text-[#00a69c] font-semibold hover:text-[#0d8a99] transition-colors"
                  >
                    {section.linkLabel ?? "Learn More"}
                    <FaCheck className="ml-2 w-4 h-4" />
                  </Link>
                ) : section.linkLabel ? (
                  <span className="inline-flex items-center text-[#00a69c] font-semibold">
                    {section.linkLabel}
                    <FaCheck className="ml-2 w-4 h-4" />
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const whyUsSection =
    content.whyUs && isSectionVisible(content.whyUs) && content.whyUs.cards.length > 0 ? (
      <section
        className={`relative py-20 px-6 md:px-12 lg:px-24 ${
          whyUsLight ? "bg-[#e6e5e3]" : "bg-[#353f4e]"
        }`}
      >
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
            whyUsLight ? "opacity-10" : "opacity-20"
          }`}
          style={{ backgroundImage: `url(${whyUsImage})` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {content.whyUs.badge && <SectionBadge label={content.whyUs.badge} />}
            <h2
              className={`text-4xl md:text-5xl font-medium mb-8 leading-tight ${
                whyUsLight ? "text-gray-800" : "text-white"
              }`}
            >
              {content.whyUs.title}
            </h2>
            {content.whyUs.subtitle && (
              <p
                className={`text-xl mb-12 leading-relaxed max-w-4xl mx-auto ${
                  whyUsLight ? "text-gray-700" : "text-gray-300"
                }`}
              >
                {content.whyUs.subtitle}
              </p>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.whyUs.cards.map((card, index) => {
              const Icon = icons.why[index] ?? FaHeart;
              return (
                <div
                  key={index}
                  className={`backdrop-blur-sm p-8 rounded-2xl ${
                    whyUsLight
                      ? "bg-white/80 border border-gray-300 shadow-lg"
                      : "bg-white/10 border border-white/20"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                      whyUsLight ? "bg-[#00a69c]/20" : "bg-white/10"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${whyUsLight ? "text-[#00a69c]" : "text-white"}`}
                    />
                  </div>
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      whyUsLight ? "text-gray-800" : "text-white"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`leading-relaxed text-sm ${
                      whyUsLight ? "text-gray-600" : "text-gray-300"
                    }`}
                  >
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    ) : null;

  const benefitsSection = isSectionVisible(content.benefits) ? (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {content.benefits.badge && <SectionBadge label={content.benefits.badge} />}
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-8">
            {content.benefits.title}
          </h2>
          {content.benefits.subtitle && (
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">{content.benefits.subtitle}</p>
          )}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {content.benefits.cards.map((card, index) => {
            const Icon = icons.benefits[index] ?? FaArrowTrendUp;
            return (
              <div key={index} className="text-center bg-[#2d3544] p-8 rounded-2xl">
                <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ) : null;

  const moreServicesSection = isSectionVisible(content.moreServices) ? (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-8">
            {content.moreServices.title}
          </h2>
          <SectionDivider />
          {content.moreServices.subtitle && (
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              {content.moreServices.subtitle}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.moreServices.cards.map((card, index) => {
            const Icon = icons.more[index] ?? FaChartLine;
            return (
              <div
                key={index}
                className="bg-[#1d293d] p-8 rounded-2xl border border-gray-600 hover:border-[#00a69c] transition-colors"
              >
                <div className="w-14 h-14 bg-[#00a69c] rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ) : null;

  const faqsSection = isSectionVisible(content.faqs) ? (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          {content.faqs.badge && <SectionBadge label={content.faqs.badge} />}
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-8">{content.faqs.title}</h2>
          {content.faqs.subtitle && (
            <p className="text-lg text-gray-400">{content.faqs.subtitle}</p>
          )}
        </div>
        <div className="space-y-4">
          {content.faqs.items.map((faq, index) => (
            <div key={index} className="bg-[#1d293d] rounded-xl shadow-md overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-[#2d3544] transition-colors"
              >
                <h3 className="text-lg font-semibold text-white text-left pr-4">{faq.question}</h3>
                <FaChevronDown
                  className={`w-5 h-5 text-[#00a69c] transition-transform shrink-0 ${
                    openFAQ === index ? "rotate-180" : ""
                  }`}
                />
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
  ) : null;

  return (
    <div className="font-sans">
      <PageHero
        slug={slug}
        fallback={getPageHeroFallback(slug, { height: "h-80" })}
        serifTitle={false}
      />

      {isSectionVisible(content.topicTilesSection) && (
        <section className="py-20 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {content.topicTiles.map((tile, index) => {
                const Icon = icons.topic[index] ?? FaHouse;
                const isMiddle = index === 1;
                const className = `group relative p-8 rounded-2xl transition-all duration-300 cursor-pointer border ${
                  isMiddle
                    ? "bg-[#00a69c] text-white shadow-xl scale-105 border-[#00a69c]"
                    : "bg-[#1d293d] border-gray-600 hover:border-[#00a69c] hover:shadow-xl"
                }`;
                const inner = (
                  <>
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                        isMiddle
                          ? "bg-white/20"
                          : "bg-[#00a69c]/20 group-hover:bg-[#00a69c]/40"
                      } group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon
                        className={`w-8 h-8 ${isMiddle ? "text-white" : "text-[#00a69c]"}`}
                      />
                    </div>
                    <h3
                      className={`text-2xl font-semibold mb-4 ${
                        isMiddle
                          ? "text-white"
                          : "text-white group-hover:text-[#00a69c]"
                      } transition-colors`}
                    >
                      {tile.title}
                    </h3>
                    <p
                      className={`leading-relaxed mb-6 ${
                        isMiddle ? "text-white/80" : "text-gray-400"
                      }`}
                    >
                      {tile.description}
                    </p>
                    <div className="mt-6">
                      <span
                        className={`inline-flex items-center font-medium ${
                          isMiddle ? "text-white" : "text-[#00a69c]"
                        }`}
                      >
                        {tile.linkLabel ?? "Learn More"}
                        <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
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
                    onClick={
                      tile.anchorId ? () => scrollToSection(tile.anchorId!) : undefined
                    }
                    onKeyDown={
                      tile.anchorId
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ")
                              scrollToSection(tile.anchorId!);
                          }
                        : undefined
                    }
                    className={className}
                  >
                    {inner}
                  </div>
                );
              })}
            </div>

            {content.otherSolutions &&
              isSectionVisible(content.otherSolutions) &&
              content.otherSolutions.cards.length > 0 && (
                <div className="mt-16">
                  <h3 className="text-3xl font-semibold text-white mb-8 text-center">
                    {content.otherSolutions.title}
                  </h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    {content.otherSolutions.cards.map((card, index) => {
                      const Icon = icons.other[index] ?? FaShieldHalved;
                      return (
                        <Link
                          key={index}
                          href={card.link ?? "#"}
                          className="group bg-[#1d293d] p-8 rounded-2xl transition-all duration-300 border border-gray-600 hover:border-[#00a69c] hover:shadow-xl"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-[#00a69c]/20 group-hover:bg-[#00a69c]/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-8 h-8 text-[#00a69c]" />
                          </div>
                          <h4 className="text-2xl font-semibold mb-4 text-white group-hover:text-[#00a69c] transition-colors">
                            {card.title}
                          </h4>
                          <p className="text-gray-400 leading-relaxed mb-6">
                            {card.description}
                          </p>
                          <span className="inline-flex items-center font-medium text-[#00a69c]">
                            {card.linkLabel ?? "Learn More"}
                            <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
          </div>
        </section>
      )}

      {isInterleaved ? (
        <>
          {visibleSpotlights[0] && renderSpotlight(visibleSpotlights[0], 0)}
          {whyUsSection}
          {visibleSpotlights[1] && renderSpotlight(visibleSpotlights[1], 1)}
          {benefitsSection}
          {visibleSpotlights[2] && renderSpotlight(visibleSpotlights[2], 2)}
          {visibleSpotlights
            .slice(3)
            .map((section, i) => renderSpotlight(section, i + 3))}
          {faqsSection}
          {moreServicesSection}
        </>
      ) : (
        <>
          {visibleSpotlights.map((section, index) =>
            renderSpotlight(section, index),
          )}
          {whyUsSection}
          {benefitsSection}
          {moreServicesSection}
          {faqsSection}
        </>
      )}

      <ContactCTASection />
    </div>
  );
}
