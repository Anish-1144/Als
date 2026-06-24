"use client";

import PageHero from "@/app/components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import type { WhyAlsContent } from "@/lib/page-content";
import { isSectionVisible } from "@/lib/page-content";
import type { PageHeroApiData } from "@/lib/page-hero";
import {
  FaShield,
  FaUsers,
  FaHandshake,
  FaChartLine,
  FaAward,
  FaClock,
  FaArrowRight,
  FaBriefcase,
  FaGraduationCap,
  FaUserTie,
  FaHeart,
  FaBuilding,
  FaPhone,
} from "react-icons/fa6";
import Link from "next/link";

const REASON_ICONS = [FaShield, FaUsers, FaHandshake, FaChartLine, FaAward, FaClock];
const EXPLORE_ICONS = [FaBuilding, FaBriefcase, FaPhone];

export default function WhyAlsPageClient({
  content,
  pageHero,
}: {
  content: WhyAlsContent;
  pageHero: PageHeroApiData;
}) {
  const { reasons, process, explore, cta } = content;

  return (
    <div className="font-sans">
      <PageHero
        slug="why-als"
        fallback={getPageHeroFallback("why-als")}
        initialData={pageHero}
      />

      {isSectionVisible(reasons) && (
      <section className="py-20 pt-10 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {reasons.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                  {reasons.badge}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
              {reasons.title}
            </h2>
            {reasons.subtitle && (
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">{reasons.subtitle}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.cards.map((reason, index) => {
              const IconComponent = REASON_ICONS[index] ?? FaShield;
              const isMiddle = index === 1;
              return (
                <div
                  key={index}
                  className={`group p-8 rounded-2xl transition-all duration-300 border ${
                    isMiddle
                      ? "bg-[#00a69c] text-white shadow-xl scale-105 border-[#00a69c]"
                      : "bg-[#2d3544] hover:shadow-xl border-gray-600 hover:border-[#00a69c]"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      isMiddle ? "bg-white/20" : "bg-[#00a69c]/20 group-hover:bg-[#00a69c]/30"
                    } transition-colors duration-300`}
                  >
                    <IconComponent className={`w-8 h-8 ${isMiddle ? "text-white" : "text-[#00a69c]"}`} />
                  </div>
                  <h3 className="text-xl font-besley font-semibold mb-4 text-white">{reason.title}</h3>
                  <p className={`leading-relaxed ${isMiddle ? "text-white/90" : "text-gray-400"}`}>
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {isSectionVisible(process) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {process.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                  {process.badge}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
              {process.title}
            </h2>
            {process.subtitle && (
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">{process.subtitle}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-[#1d293d] p-8 rounded-2xl border border-gray-600 hover:border-[#00a69c] transition-colors h-full">
                  <div className="text-5xl font-besley font-bold text-[#00a69c]/30 mb-4">
                    {step.step ?? String(index + 1).padStart(2, "0")}
                  </div>
                  <h3 className="text-xl font-besley font-semibold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
                {index < process.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <FaArrowRight className="w-6 h-6 text-[#00a69c]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {isSectionVisible(explore) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {explore.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                  {explore.badge}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
              {explore.title}
            </h2>
            {explore.subtitle && (
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">{explore.subtitle}</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {explore.cards.map((card, index) => {
              const IconComponent = EXPLORE_ICONS[index] ?? FaBuilding;
              const isMiddle = index === 1;
              const href = card.link ?? "#";
              return (
                <Link key={index} href={href} className="group">
                  <div
                    className={`p-8 rounded-2xl border transition-all duration-300 h-full ${
                      isMiddle
                        ? "bg-[#00a69c] border-[#00a69c] shadow-xl scale-105"
                        : "bg-[#2d3544] border-gray-600 hover:border-[#00a69c]"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                        isMiddle ? "bg-white/20" : "bg-[#00a69c]/20 group-hover:bg-[#00a69c]/30"
                      } transition-colors`}
                    >
                      <IconComponent className={`w-8 h-8 ${isMiddle ? "text-white" : "text-[#00a69c]"}`} />
                    </div>
                    <h3
                      className={`text-xl font-besley font-semibold mb-4 ${
                        isMiddle ? "text-white" : "text-white group-hover:text-[#00a69c]"
                      } transition-colors`}
                    >
                      {card.title}
                    </h3>
                    <p className={`leading-relaxed mb-6 ${isMiddle ? "text-white/90" : "text-gray-400"}`}>
                      {card.description}
                    </p>
                    <span
                      className={`inline-flex items-center font-medium ${
                        isMiddle ? "text-white" : "text-[#00a69c]"
                      }`}
                    >
                      {card.linkLabel ?? "Learn More"}
                      <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 bg-[#2d3544] rounded-2xl p-8 border border-gray-600">
            <h3 className="text-2xl font-besley font-semibold text-white mb-6 text-center">
              Explore Career Opportunities
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/why-als/careers/job-openings" className="flex items-center gap-3 p-4 bg-[#1d293d] rounded-xl hover:bg-[#00a69c]/10 transition-colors group">
                <div className="w-10 h-10 bg-[#00a69c]/20 rounded-lg flex items-center justify-center">
                  <FaBriefcase className="w-5 h-5 text-[#00a69c]" />
                </div>
                <div>
                  <div className="text-white font-medium group-hover:text-[#00a69c] transition-colors">Job Openings</div>
                  <div className="text-gray-500 text-sm">View all positions</div>
                </div>
              </Link>
              <Link href="/why-als/careers/why-us" className="flex items-center gap-3 p-4 bg-[#1d293d] rounded-xl hover:bg-[#00a69c]/10 transition-colors group">
                <div className="w-10 h-10 bg-[#00a69c]/20 rounded-lg flex items-center justify-center">
                  <FaHeart className="w-5 h-5 text-[#00a69c]" />
                </div>
                <div>
                  <div className="text-white font-medium group-hover:text-[#00a69c] transition-colors">Why Work Here</div>
                  <div className="text-gray-500 text-sm">Benefits & culture</div>
                </div>
              </Link>
              <Link href="/why-als/careers/recruitment-process" className="flex items-center gap-3 p-4 bg-[#1d293d] rounded-xl hover:bg-[#00a69c]/10 transition-colors group">
                <div className="w-10 h-10 bg-[#00a69c]/20 rounded-lg flex items-center justify-center">
                  <FaGraduationCap className="w-5 h-5 text-[#00a69c]" />
                </div>
                <div>
                  <div className="text-white font-medium group-hover:text-[#00a69c] transition-colors">Recruitment Process</div>
                  <div className="text-gray-500 text-sm">How to apply</div>
                </div>
              </Link>
              <Link href="/why-als/careers/apply" className="flex items-center gap-3 p-4 bg-[#00a69c] rounded-xl hover:bg-[#008f87] transition-colors group">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FaUserTie className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white font-medium">Apply Now</div>
                  <div className="text-white/70 text-sm">Submit application</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      )}

      {isSectionVisible(cta) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#00a69c] to-[#008f87]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-besley font-medium mb-6">{cta.title}</h2>
          <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">{cta.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={cta.primaryLink} className="inline-block bg-white text-[#00a69c] px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200">
              {cta.primaryText}
            </Link>
            {cta.secondaryText && cta.secondaryLink && (
              <Link href={cta.secondaryLink} className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-[#00a69c] transition-colors duration-200">
                {cta.secondaryText}
              </Link>
            )}
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
