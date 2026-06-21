"use client";

import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import ContactCTASection from "@/app/components/ContactCTASection";
import { getPageHeroFallback } from "@/lib/page-hero";
import type { GuidePageContent } from "@/lib/resources-content";
import { isSectionVisible } from "@/lib/page-content";
import {
  FaArrowRight,
  FaBuilding,
  FaChartLine,
  FaCheck,
  FaDollarSign,
  FaHandHoldingDollar,
  FaHouse,
  FaHouseCircleCheck,
  FaKey,
  FaPercent,
  FaPiggyBank,
  FaScaleBalanced,
  FaShieldHalved,
  FaUserShield,
} from "react-icons/fa6";

const SECTION_ICONS = [
  FaPiggyBank,
  FaShieldHalved,
  FaCheck,
  FaDollarSign,
  FaHouse,
  FaKey,
  FaChartLine,
  FaScaleBalanced,
  FaBuilding,
  FaUserShield,
  FaHandHoldingDollar,
];

const STAT_ICONS = [FaPercent, FaDollarSign, FaKey, FaChartLine];

const RELATED_ICONS = [FaHouseCircleCheck, FaBuilding, FaUserShield, FaPiggyBank, FaHouse, FaChartLine];

export default function GuidePageClient({ slug, content }: { slug: string; content: GuidePageContent }) {
  return (
    <>
      <PageHero slug={slug} fallback={getPageHeroFallback(slug)} />

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-4xl mx-auto">
          {isSectionVisible(content.introSection) && content.introParagraphs.length > 0 && (
            <div className="prose prose-lg max-w-none mb-16">
              {content.introParagraphs.map((p, i) => (
                <p key={i} className={`text-xl text-gray-200 leading-relaxed ${i < content.introParagraphs.length - 1 ? "mb-6" : ""}`}>
                  {p}
                </p>
              ))}
            </div>
          )}

          {content.sections.filter(isSectionVisible).map((section, sIndex) => {
            const Icon = SECTION_ICONS[sIndex] ?? FaHouse;
            return (
              <div key={sIndex} className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#00a69c] rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-besley font-semibold text-white">{section.title}</h2>
                </div>

                {section.introParagraphs?.map((p, i) => (
                  <p key={i} className="text-gray-200 leading-relaxed mb-6">{p}</p>
                ))}

                {section.subsections.map((sub, subIndex) => (
                  <div key={subIndex} className="mb-6">
                    {sub.title && <h3 className="text-2xl font-bold text-white mb-4">{sub.title}</h3>}
                    {sub.paragraphs.map((p, i) => (
                      <p key={i} className="text-gray-200 leading-relaxed mb-6">{p}</p>
                    ))}
                    {sub.highlightTitle && (
                      <div className="bg-[#384252] rounded-xl p-6 mb-6">
                        <h4 className="text-xl font-bold text-white mb-4">{sub.highlightTitle}</h4>
                        {sub.highlightBullets && (
                          <ul className="space-y-3">
                            {sub.highlightBullets.map((item, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <FaCheck className="w-5 h-5 text-[#00a69c] mt-1 flex-shrink-0" />
                                <span className="text-gray-200">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                    {sub.bullets && sub.bullets.length > 0 && (
                      <ul className="space-y-3 mb-6">
                        {sub.bullets.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <FaCheck className="w-5 h-5 text-[#00a69c] mt-1 flex-shrink-0" />
                            <span className="text-gray-200">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-3">
                    {section.bullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <FaCheck className="w-5 h-5 text-[#00a69c] mt-1 flex-shrink-0" />
                        <span className="text-gray-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}

          {content.closingBlock && isSectionVisible(content.closingBlock) && (
            <div className="bg-gradient-to-br from-[#2d3544] to-[#1d293d] rounded-2xl p-8 md:p-12 border border-gray-700">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-besley font-semibold text-white mb-6">{content.closingBlock.title}</h2>
                {content.closingBlock.paragraphs.map((p, i) => (
                  <p key={i} className="text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto mb-8">{p}</p>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={content.closingBlock.primaryLink} className="inline-flex items-center justify-center bg-[#00a69c] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#0d8a99] transition-colors">
                  {content.closingBlock.primaryLabel}
                  <FaArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href={content.closingBlock.secondaryLink} className="inline-flex items-center justify-center bg-[#1d293d] text-[#00a69c] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#2d3544] transition-colors border-2 border-[#00a69c]">
                  {content.closingBlock.secondaryLabel}
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {content.statsSection && isSectionVisible(content.statsSection) && content.statsSection.cards.length > 0 && (
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#e6e5e3]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-besley font-semibold text-gray-900 mb-4">{content.statsSection.title}</h2>
              {content.statsSection.subtitle && <p className="text-lg text-gray-600">{content.statsSection.subtitle}</p>}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {content.statsSection.cards.map((card, index) => {
                const Icon = STAT_ICONS[index] ?? FaDollarSign;
                return (
                  <div key={index} className="bg-[#2d3544] p-6 rounded-xl shadow-md">
                    <div className="w-12 h-12 bg-[#00a69c] rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                    <p className="text-gray-300 text-sm">{card.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {content.bottomCta && isSectionVisible(content.bottomCta) && (
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#384252] to-[#1d293d]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-besley font-semibold text-white mb-6">{content.bottomCta.title}</h2>
            <p className="text-xl text-gray-300 mb-8">{content.bottomCta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={content.bottomCta.primaryLink} className="inline-flex items-center justify-center bg-[#00a69c] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#008f86] transition-colors">
                {content.bottomCta.primaryLabel}
                <FaArrowRight className="ml-2" />
              </Link>
              <Link href={content.bottomCta.secondaryLink} className="inline-flex items-center justify-center bg-[#1d293d] text-[#00a69c] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#384252] transition-colors border-2 border-[#00a69c]">
                {content.bottomCta.secondaryLabel}
              </Link>
            </div>
          </div>
        </section>
      )}

      {content.relatedGuides && isSectionVisible(content.relatedGuides) && content.relatedGuides.cards.length > 0 && (
        <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-2xl font-besley font-semibold text-white mb-8 text-center">{content.relatedGuides.title}</h3>
            <div className="grid md:grid-cols-4 gap-6">
              {content.relatedGuides.cards.map((card, index) => {
                const Icon = RELATED_ICONS[index] ?? FaHouse;
                return (
                  <Link key={index} href={card.link ?? "#"}>
                    <div className="bg-[#384252] p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow h-full">
                      <div className="w-12 h-12 bg-[#00a69c] rounded-lg flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-white mb-2">{card.title}</h4>
                      <p className="text-gray-400 text-sm">{card.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <ContactCTASection />
    </>
  );
}
