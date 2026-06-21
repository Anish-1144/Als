import Link from "next/link";
import ContactCTASection from "@/app/components/ContactCTASection";
import ServerPageHero from "@/app/components/ServerPageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import { getTeamData } from "@/lib/api-server";
import type { ServicesContent } from "@/lib/services-content";
import { isSectionVisible } from "@/lib/page-content";
import {
  FaHouse,
  FaChartLine,
  FaArrowsRotate,
  FaBuilding,
  FaCar,
  FaPiggyBank,
  FaBriefcase,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaHeart,
  FaShieldHalved,
  FaUsers,
  FaStar,
} from "react-icons/fa6";

const SERVICE_ICONS = [FaHouse, FaChartLine, FaArrowsRotate, FaPiggyBank, FaBuilding, FaCar, FaBriefcase];
const WHY_ICONS = [FaHeart, FaShieldHalved, FaUsers, FaStar];

export default async function ServicesPageClient({ content }: { content: ServicesContent }) {
  const sortedTeam = (await getTeamData()).slice(0, 6);
  const { servicesList, whyUs, teamSection } = content;

  return (
    <>
      <ServerPageHero slug="services" fallback={getPageHeroFallback("services", { height: "h-80" })} />

      {isSectionVisible(servicesList) && (
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {servicesList.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">{servicesList.badge}</span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">{servicesList.title}</h2>
            {servicesList.subtitle && <p className="text-lg text-gray-400 max-w-3xl mx-auto">{servicesList.subtitle}</p>}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.cards.map((service, index) => {
              const Icon = SERVICE_ICONS[index] ?? FaHouse;
              return (
                <Link key={index} href={service.link ?? "#"}>
                  <div className="group relative p-8 rounded-2xl transition-all duration-300 cursor-pointer h-full bg-[#1d293d] text-white hover:shadow-xl border border-gray-600 hover:border-[#00a69c]">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#00a69c]/20 group-hover:bg-[#00a69c]/40 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-8 h-8 text-[#00a69c]" />
                    </div>
                    <h3 className="text-2xl font-besley font-semibold mb-4 text-white group-hover:text-[#00a69c] transition-colors">{service.title}</h3>
                    <p className="leading-relaxed mb-6 text-gray-400">{service.description}</p>
                    <span className="inline-flex items-center font-medium text-[#00a69c]">
                      {service.linkLabel ?? "Learn More"}
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

      {isSectionVisible(whyUs) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {whyUs.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">{whyUs.badge}</span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">{whyUs.title}</h2>
            {whyUs.subtitle && <p className="text-lg text-gray-300 max-w-3xl mx-auto">{whyUs.subtitle}</p>}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyUs.cards.map((card, index) => {
              const Icon = WHY_ICONS[index] ?? FaHeart;
              return (
                <div key={index} className="bg-[#1d293d] backdrop-blur-sm p-8 rounded-2xl border border-gray-600 text-center hover:border-[#00a69c] transition-colors">
                  <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-besley font-semibold text-white mb-4">{card.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {isSectionVisible(teamSection) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {teamSection.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">{teamSection.badge}</span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">{teamSection.title}</h2>
            {teamSection.subtitle && <p className="text-lg text-gray-400 max-w-3xl mx-auto">{teamSection.subtitle}</p>}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTeam.slice(0, 3).map((member, index) => (
              <div key={member.name || index} className="bg-[#2d3544] rounded-2xl shadow-xl overflow-hidden border border-gray-600">
                <div className="relative bg-gradient-to-br from-[#00a69c]/20 to-[#00a69c]/10 h-64">
                  {member.image ? (
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${member.image})` }} />
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
          <div className="text-center mt-12">
            <Link href="/about" className="inline-flex items-center text-[#00a69c] font-semibold hover:text-white transition-colors">
              View Full Team
              <FaArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      )}

      <ContactCTASection />
    </>
  );
}
