import Link from "next/link";
import ContactCTASection from "@/app/components/ContactCTASection";
import ServerPageHero from "@/app/components/ServerPageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import { getTeamData } from "@/lib/api-server";
import type { CalculatorsHubContent } from "@/lib/calculator-content";
import { isSectionVisible } from "@/lib/page-content";
import {
  FaArrowRight,
  FaChartLine,
  FaDollarSign,
  FaHouse,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa6";

const CALC_ICONS = [FaDollarSign, FaChartLine, FaHouse];

export default async function CalculatorsHubClient({ content }: { content: CalculatorsHubContent }) {
  const sortedTeam = (await getTeamData()).slice(0, 3);
  const { calculatorCardsSection, calculatorCards, teamSection, founderSpotlight } = content;

  return (
    <>
      <ServerPageHero slug="calculator" fallback={getPageHeroFallback("calculator")} />

      {isSectionVisible(calculatorCardsSection) && (
      <section className="py-20 mt-2 px-6 md:px-12 lg:px-24 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {calculatorCards.map((calc, index) => {
              const Icon = CALC_ICONS[index] ?? FaDollarSign;
              return (
                <Link key={index} href={calc.link ?? "#"} className="block">
                  <div className="group relative p-8 rounded-2xl transition-all duration-300 cursor-pointer h-full text-center bg-[#1d293d] text-white border border-gray-600 hover:border-[#00a69c] hover:shadow-xl">
                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-[#00a69c]/20 group-hover:bg-[#00a69c]/40 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-10 h-10 text-[#00a69c]" />
                    </div>
                    <h3 className="text-xl font-besley font-semibold mb-4 text-white group-hover:text-[#00a69c] transition-colors">{calc.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-6">{calc.description}</p>
                    <span className="inline-flex items-center font-medium text-[#00a69c]">
                      {calc.linkLabel ?? "Find Out More"}
                      <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {(isSectionVisible(teamSection) || isSectionVisible(founderSpotlight)) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-7xl mx-auto">
          {isSectionVisible(teamSection) && (
          <div className="text-center mb-16">
            {teamSection.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">{teamSection.badge}</span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">{teamSection.title}</h2>
            {teamSection.subtitle && <p className="text-lg text-gray-400 max-w-3xl mx-auto">{teamSection.subtitle}</p>}
          </div>
          )}

          {isSectionVisible(founderSpotlight) && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-[#2d3544] rounded-2xl shadow-lg overflow-hidden border border-gray-600">
              <div className="grid md:grid-cols-2">
                <div className="relative h-72 md:h-auto">
                  <div className="w-full h-full bg-cover min-h-[450px]" style={{ backgroundImage: `url('${founderSpotlight.imageUrl}')`, backgroundPosition: "center 65%" }} />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  {founderSpotlight.badge && (
                    <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-3 py-1 rounded-full mb-4 w-fit">
                      <span className="text-[#00a69c] text-xs font-medium uppercase tracking-wider">{founderSpotlight.badge}</span>
                    </div>
                  )}
                  <h3 className="text-2xl md:text-3xl font-besley font-semibold text-white mb-2">{founderSpotlight.name}</h3>
                  <p className="text-[#00a69c] font-medium mb-4">{founderSpotlight.role}</p>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{founderSpotlight.bio}</p>
                  <Link href={founderSpotlight.ctaLink} className="inline-flex items-center gap-2 bg-[#00a69c] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#008b83] transition-colors w-fit">
                    {founderSpotlight.ctaLabel}
                    <FaArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          )}

          {isSectionVisible(teamSection) && sortedTeam.length > 0 && (
            <div className="grid md:grid-cols-3 gap-8">
              {sortedTeam.map((member, index) => (
                <div key={member.name || index} className="bg-[#2d3544] rounded-2xl shadow-lg overflow-hidden border border-gray-600">
                  <div className="relative bg-gradient-to-br from-[#00a69c]/20 to-[#1d293d] h-64">
                    {member.image ? (
                      <div className="w-full h-full bg-cover" style={{ backgroundImage: `url(${member.image})`, backgroundPosition: "center 25%" }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-24 h-24 bg-[#00a69c] rounded-full flex items-center justify-center">
                          <span className="text-3xl font-besley font-bold text-white">
                            {member.name?.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-xl font-besley font-semibold text-white mb-1">{member.name}</h3>
                      <p className="text-[#00a69c] font-medium text-sm">{member.title}</p>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    {member.phone && (
                      <div className="flex items-center gap-3">
                        <FaPhone className="w-4 h-4 text-[#00a69c]" />
                        <a href={`tel:${member.phone}`} className="text-gray-300 hover:text-[#00a69c] text-sm">{member.phone}</a>
                      </div>
                    )}
                    {member.email && (
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="w-4 h-4 text-[#00a69c]" />
                        <a href={`mailto:${member.email}`} className="text-gray-300 hover:text-[#00a69c] text-sm break-all">{member.email}</a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      )}

      <ContactCTASection />
    </>
  );
}
