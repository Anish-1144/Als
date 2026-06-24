"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import ContactCTASection from "@/app/components/ContactCTASection";
import SectionBadge, { SectionDivider } from "@/app/components/SectionBadge";
import { getPageHeroFallback } from "@/lib/page-hero";
import { isSectionVisible } from "@/lib/page-content";
import { getLoanIcon } from "@/app/components/loan/loan-icons";
import type {
  DetailedLoanContent,
  DetailFeatureGroup,
  DetailSpotlight,
} from "@/lib/loan-detail-content";
import {
  FaArrowRight,
  FaChevronDown,
  FaCheck,
} from "react-icons/fa6";

const TOPIC_FALLBACK = "FaHouse";

export default function DetailedLoanPageClient({
  slug,
  content,
  heroImage,
}: {
  slug: string;
  content: DetailedLoanContent;
  heroImage?: string;
}) {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const whyUsImage = heroImage || getPageHeroFallback(slug).backgroundImage;

  function scrollToSection(sectionId: string) {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const visibleSpotlights = content.spotlightSections.filter(isSectionVisible);

  // ----- feature groups (cards full-width; list/steps paired into a 2-col grid) -----
  function renderCardsGroup(group: DetailFeatureGroup, key: string) {
    return (
      <div key={key} className="mb-12">
        {group.heading && (
          <h3 className="text-3xl font-semibold text-white mb-8 text-center">{group.heading}</h3>
        )}
        <div className="grid md:grid-cols-2 gap-6">
          {(group.cards ?? []).map((card, i) => {
            const Icon = card.icon ? getLoanIcon(card.icon) : null;
            const bullets = (card.bullets ?? []).filter((b) => b.trim());
            return (
              <div
                key={i}
                className="bg-[#1d293d] p-6 rounded-xl shadow-md border border-gray-600"
              >
                <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  {Icon && <Icon className="text-[#00a69c]" />}
                  {card.title}
                </h4>
                {card.description && <p className="text-gray-400 mb-4">{card.description}</p>}
                {bullets.length > 0 && (
                  <ul className="space-y-2">
                    {bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                        <FaCheck className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function renderPanelGroup(group: DetailFeatureGroup, key: string) {
    return (
      <div key={key} className="bg-[#1d293d] p-6 rounded-xl shadow-md border border-gray-600">
        {group.heading && (
          <h4 className="text-xl font-bold text-white mb-4">{group.heading}</h4>
        )}
        {group.kind === "steps" ? (
          <div className="space-y-4">
            {(group.items ?? []).map((it, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#00a69c]/20 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-[#00a69c] font-bold">{i + 1}</span>
                </div>
                <div>
                  <h5 className="font-bold text-white mb-1">{it.title}</h5>
                  <p className="text-gray-400 text-sm">{it.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="space-y-3">
            {(group.items ?? []).map((it, i) => (
              <li key={i} className="flex items-start gap-3">
                <FaCheck className="w-5 h-5 text-[#00a69c] mt-1 shrink-0" />
                <div>
                  <h5 className="font-semibold text-white text-sm mb-1">{it.title}</h5>
                  <p className="text-gray-400 text-sm">{it.description}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  function renderFeatureGroups(groups: DetailFeatureGroup[], sectionKey: string) {
    const blocks: ReactNode[] = [];
    let panelBuffer: { group: DetailFeatureGroup; index: number }[] = [];
    const flush = () => {
      if (panelBuffer.length === 0) return;
      const cols = panelBuffer.length > 1 ? "md:grid-cols-2" : "";
      blocks.push(
        <div key={`${sectionKey}-panels-${panelBuffer[0].index}`} className={`grid ${cols} gap-8 mb-8`}>
          {panelBuffer.map(({ group, index }) => renderPanelGroup(group, `${sectionKey}-p-${index}`))}
        </div>,
      );
      panelBuffer = [];
    };
    groups.forEach((group, index) => {
      if (group.kind === "cards") {
        flush();
        blocks.push(renderCardsGroup(group, `${sectionKey}-c-${index}`));
      } else {
        panelBuffer.push({ group, index });
      }
    });
    flush();
    return blocks;
  }

  function renderSpotlight(section: DetailSpotlight, index: number) {
    const CardIcon = getLoanIcon(section.cardIcon);
    const hasBenefits = section.benefits && section.benefits.length > 0;
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

          <div className="bg-[#1d293d] p-8 rounded-2xl shadow-lg border border-gray-600 mb-12">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-[#00a69c] rounded-2xl flex items-center justify-center shrink-0">
                <CardIcon className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-white mb-6">{section.cardTitle}</h3>
                {hasBenefits ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {section.benefits!.map((b, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <FaCheck className="w-5 h-5 text-[#00a69c] mt-1 shrink-0" />
                        <div>
                          <h4 className="font-semibold text-white mb-1">{b.title}</h4>
                          <p className="text-gray-400 text-sm">{b.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : section.cardBody ? (
                  <p className="text-gray-400 leading-relaxed">{section.cardBody}</p>
                ) : null}
              </div>
            </div>
          </div>

          {section.featureGroups && section.featureGroups.length > 0 &&
            renderFeatureGroups(section.featureGroups, section.id ?? `s${index}`)}

          {section.infoBox && (
            <div
              className={`p-6 rounded-lg ${
                section.infoBox.variant === "warning"
                  ? "bg-amber-500/10 border border-amber-500/30"
                  : "bg-[#00a69c]/20"
              }`}
            >
              {section.infoBox.title && (
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  {section.infoBox.icon &&
                    (() => {
                      const Icon = getLoanIcon(section.infoBox!.icon);
                      return (
                        <Icon
                          className={
                            section.infoBox!.variant === "warning"
                              ? "text-amber-400"
                              : "text-[#00a69c]"
                          }
                        />
                      );
                    })()}
                  {section.infoBox.title}
                </h4>
              )}
              {section.infoBox.paragraphs
                .filter((p) => p.trim())
                .map((p, i, arr) => (
                  <p
                    key={i}
                    className={`text-gray-200 text-sm ${i < arr.length - 1 ? "mb-3" : ""}`}
                  >
                    {p}
                  </p>
                ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  const whyUsSection = isSectionVisible(content.whyUs) && content.whyUs.cards.length > 0 ? (
    <section className="relative py-20 px-6 md:px-12 lg:px-24 bg-[#353f4e]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${whyUsImage})` }}
      />
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {content.whyUs.badge && <SectionBadge label={content.whyUs.badge} />}
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-8 leading-tight">
            {content.whyUs.title}
          </h2>
          {content.whyUs.subtitle && (
            <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-4xl mx-auto">
              {content.whyUs.subtitle}
            </p>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.whyUs.cards.map((card, index) => {
            const Icon = getLoanIcon(card.icon);
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
              >
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{card.title}</h3>
                <p className="text-gray-300 leading-relaxed text-sm">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  ) : null;

  const benefitsSection = isSectionVisible(content.benefits) && content.benefits.cards.length > 0 ? (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          {content.benefits.badge && <SectionBadge label={content.benefits.badge} />}
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-8">{content.benefits.title}</h2>
          {content.benefits.subtitle && (
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">{content.benefits.subtitle}</p>
          )}
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {content.benefits.cards.map((card, index) => {
            const Icon = getLoanIcon(card.icon);
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

  const moreServicesSection = isSectionVisible(content.moreServices) && content.moreServices.cards.length > 0 ? (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-8">
            {content.moreServices.title}
          </h2>
          <SectionDivider />
          {content.moreServices.subtitle && (
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">{content.moreServices.subtitle}</p>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.moreServices.cards.map((card, index) => {
            const Icon = getLoanIcon(card.icon);
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

  const faqsSection = isSectionVisible(content.faqs) && content.faqs.items.length > 0 ? (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          {content.faqs.badge && <SectionBadge label={content.faqs.badge} />}
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-8">{content.faqs.title}</h2>
          {content.faqs.subtitle && <p className="text-lg text-gray-400">{content.faqs.subtitle}</p>}
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
                const Icon = getLoanIcon(tile.icon ?? TOPIC_FALLBACK);
                const isMiddle = index === 1;
                const className = `group relative p-8 rounded-2xl transition-all duration-300 cursor-pointer border ${
                  isMiddle
                    ? "bg-[#00a69c] text-white shadow-xl scale-105 border-[#00a69c]"
                    : "bg-[#1d293d] border-gray-600 hover:border-[#00a69c] hover:shadow-xl"
                }`;
                return (
                  <div
                    key={index}
                    role={tile.anchorId ? "button" : undefined}
                    tabIndex={tile.anchorId ? 0 : undefined}
                    onClick={tile.anchorId ? () => scrollToSection(tile.anchorId!) : undefined}
                    onKeyDown={
                      tile.anchorId
                        ? (e) => {
                            if (e.key === "Enter" || e.key === " ") scrollToSection(tile.anchorId!);
                          }
                        : undefined
                    }
                    className={className}
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                        isMiddle ? "bg-white/20" : "bg-[#00a69c]/20 group-hover:bg-[#00a69c]/40"
                      } group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-8 h-8 ${isMiddle ? "text-white" : "text-[#00a69c]"}`} />
                    </div>
                    <h3
                      className={`text-2xl font-bold mb-4 ${
                        isMiddle ? "text-white" : "text-white group-hover:text-[#00a69c]"
                      } transition-colors`}
                    >
                      {tile.title}
                    </h3>
                    <p className={`leading-relaxed mb-6 ${isMiddle ? "text-white/80" : "text-gray-400"}`}>
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
                      const Icon = getLoanIcon(card.icon ?? "FaShieldHalved");
                      return (
                        <Link
                          key={index}
                          href={card.link ?? "#"}
                          className="group bg-[#1d293d] p-8 rounded-2xl transition-all duration-300 border border-gray-600 hover:border-[#00a69c] hover:shadow-xl"
                        >
                          <div className="w-16 h-16 rounded-2xl bg-[#00a69c]/20 group-hover:bg-[#00a69c]/40 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                            <Icon className="w-8 h-8 text-[#00a69c]" />
                          </div>
                          <h4 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00a69c] transition-colors">
                            {card.title}
                          </h4>
                          <p className="text-gray-400 leading-relaxed mb-6">{card.description}</p>
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

      {visibleSpotlights[0] && renderSpotlight(visibleSpotlights[0], 0)}
      {whyUsSection}
      {visibleSpotlights[1] && renderSpotlight(visibleSpotlights[1], 1)}
      {benefitsSection}
      {visibleSpotlights[2] && renderSpotlight(visibleSpotlights[2], 2)}
      {visibleSpotlights.slice(3).map((section, i) => renderSpotlight(section, i + 3))}
      {faqsSection}
      {moreServicesSection}

      <ContactCTASection />
    </div>
  );
}
