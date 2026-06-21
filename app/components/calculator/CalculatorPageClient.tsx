"use client";

import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import ContactCTASection from "@/app/components/ContactCTASection";
import { getPageHeroFallback } from "@/lib/page-hero";
import type { CalculatorPageContent } from "@/lib/calculator-content";
import { isSectionVisible } from "@/lib/page-content";
import {
  FaArrowRight,
  FaBookOpen,
  FaChartLine,
  FaDollarSign,
  FaGift,
  FaHammer,
  FaHouse,
} from "react-icons/fa6";

const RESOURCE_ICONS = [FaHouse, FaChartLine, FaHammer];

export default function CalculatorPageClient({
  slug,
  content,
}: {
  slug: string;
  content: CalculatorPageContent;
}) {
  const { pageHeader, iframe, disclaimer, infoSection, resourcesSection, governmentBenefits, specialOffer } = content;

  return (
    <>
      <PageHero slug={slug} fallback={getPageHeroFallback(slug, { height: "h-80" })} />

      <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-7xl mx-auto">
          {isSectionVisible(pageHeader) && (
            <div className="mb-6">
              <h1 className="text-3xl font-besley font-semibold text-white mb-3">{pageHeader.title}</h1>
              <p className="text-lg text-gray-200 leading-relaxed">{pageHeader.subtitle}</p>
            </div>
          )}
          <div className="mb-8">
            <div className="bg-[#2d3544] rounded-2xl shadow-xl border border-gray-600 overflow-hidden">
              <div className="relative min-h-[600px]">
                <iframe
                  src={iframe.src}
                  className="w-full border-0 rounded-lg bg-white"
                  style={{ height: iframe.height }}
                  title={iframe.title}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {isSectionVisible(disclaimer) && (
              <div className="bg-[#2d3544] border border-[#00a69c] rounded-2xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#00a69c] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">{disclaimer.title}</h4>
                    <p className="text-sm text-gray-200 leading-relaxed">{disclaimer.body}</p>
                  </div>
                </div>
              </div>
              )}

              {isSectionVisible(infoSection) && (
              <div className="bg-[#2d3544] rounded-2xl shadow-lg border border-gray-600 p-8">
                <h3 className="text-2xl font-besley font-semibold text-white mb-6">{infoSection.title}</h3>
                <div className="space-y-4 text-gray-200">
                  <p className="leading-relaxed">{infoSection.intro}</p>
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    {infoSection.factorCards.map((card, index) => (
                      <div key={index} className="bg-[#1d293d] p-6 rounded-xl">
                        <h4 className="font-semibold text-white mb-3">{card.title}</h4>
                        <ul className="space-y-2 text-sm">
                          {card.items.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#00a69c] mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {infoSection.strategiesTitle && (infoSection.strategies?.length ?? 0) > 0 && (
                    <div className="bg-[#1d293d] p-6 rounded-xl mt-6">
                      <h4 className="font-semibold text-white mb-3">{infoSection.strategiesTitle}</h4>
                      <div className="space-y-3 text-sm">
                        {infoSection.strategies!.map((item, index) =>
                          item.title ? (
                            <div key={index} className="flex items-start gap-3">
                              <span className="text-[#00a69c] font-bold flex-shrink-0">{index + 1}.</span>
                              <div>
                                <p className="font-semibold text-white">{item.title}</p>
                                <p className="text-gray-400">{item.description}</p>
                              </div>
                            </div>
                          ) : (
                            <div key={index} className="flex items-start gap-2">
                              <span className="text-[#00a69c] mt-1">✓</span>
                              <span>{item.description}</span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}

                  {(infoSection.extraBlocks ?? []).map((block, index) => (
                    <div key={index} className="bg-[#1d293d] border border-[#00a69c]/40 p-6 rounded-xl mt-6">
                      <h4 className="font-semibold text-white mb-3">{block.title}</h4>
                      {block.intro && <p className="text-sm mb-3">{block.intro}</p>}
                      <ul className="space-y-2 text-sm">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#00a69c] mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              )}

              {isSectionVisible(resourcesSection) && (
              <div className="bg-[#2d3544] rounded-2xl shadow-lg border border-gray-600 overflow-hidden">
                <div className="bg-gradient-to-r from-[#173ab7] to-[#1e4fd1] p-4">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <FaBookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{resourcesSection.title}</h3>
                      {resourcesSection.subtitle && <p className="text-xs text-white/70">{resourcesSection.subtitle}</p>}
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {resourcesSection.cards.map((card, index) => {
                    const Icon = RESOURCE_ICONS[index] ?? FaHouse;
                    return (
                      <Link key={index} href={card.link ?? "#"} className="block group">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1d293d] hover:bg-[#3d4759] transition-all duration-300 border border-gray-600">
                          <div className="w-12 h-12 bg-[#173ab7] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-white group-hover:text-[#00a69c] transition-colors">{card.title}</h4>
                            <p className="text-sm text-gray-400">{card.description}</p>
                          </div>
                          <FaArrowRight className="w-4 h-4 text-[#00a69c] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
              )}
            </div>

            <div className="space-y-6">
              {isSectionVisible(governmentBenefits) && (
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl shadow-lg border-2 border-green-600 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <FaGift className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{governmentBenefits.title}</h3>
                      <p className="text-xs text-green-100">{governmentBenefits.subtitle}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-semibold text-white mb-3">{governmentBenefits.sectionTitle}</h4>
                  <div className="space-y-3 text-sm text-gray-200">
                    {governmentBenefits.items.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                  <Link href={governmentBenefits.ctaLink} className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm">
                    {governmentBenefits.ctaLabel}
                    <FaArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              )}

              <Link href="/calculator" className="block w-full bg-[#2d3544] text-white px-6 py-4 rounded-2xl font-semibold hover:bg-[#3d4759] transition-colors border border-gray-600 text-center">
                <span className="flex items-center justify-center gap-2">
                  <FaDollarSign className="w-5 h-5 text-[#00a69c]" />
                  Other Calculators
                  <FaArrowRight className="w-4 h-4" />
                </span>
              </Link>

              {isSectionVisible(specialOffer) && (
              <div className="bg-gradient-to-br from-[#00a69c] to-[#173ab7] rounded-2xl shadow-lg overflow-hidden text-white p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGift className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{specialOffer.title}</h3>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">{specialOffer.body}</p>
                  <Link href={specialOffer.ctaLink} className="inline-flex items-center gap-2 bg-white text-[#173ab7] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm">
                    {specialOffer.ctaLabel}
                    <FaArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
