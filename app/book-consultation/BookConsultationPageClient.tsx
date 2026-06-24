"use client";

import ContactForm from "@/app/components/ContactForm";
import PageHero from "@/app/components/PageHero";
import { getPageHeroFallback, type PageHeroApiData } from "@/lib/page-hero";
import type { ConsultationPageContent } from "@/lib/consultation-content";
import { isSectionVisible } from "@/lib/page-content";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaFileAlt,
  FaPhone,
  FaUser,
} from "react-icons/fa";

export default function BookConsultationPageClient({
  content,
  pageHero,
}: {
  content: ConsultationPageContent;
  pageHero: PageHeroApiData;
}) {
  const { infoSection, formSection } = content;

  return (
    <div className="font-sans">
      <PageHero
        slug="book-consultation"
        fallback={getPageHeroFallback("book-consultation", { height: "h-80" })}
        initialData={pageHero}
      />

      <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#e6e5e3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {isSectionVisible(infoSection) && (
              <div>
                <h2 className="text-3xl font-besley font-semibold text-gray-900 mb-8">
                  {infoSection.title}
                </h2>

                <div className="space-y-6 mb-12">
                  {infoSection.consultationTypes.map((type, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-[#00a69c]/10 rounded-xl border border-[#00a69c]/30"
                    >
                      <div className="w-12 h-12 bg-[#00a69c]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        {type.icon === "phone" && (
                          <FaPhone className="w-5 h-5 text-[#00a69c]" />
                        )}
                        {type.icon === "video" && (
                          <FaUser className="w-5 h-5 text-[#00a69c]" />
                        )}
                        {type.icon === "person" && (
                          <FaCalendarAlt className="w-5 h-5 text-[#00a69c]" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {type.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{type.description}</p>
                        <p className="text-sm text-[#00a69c] font-medium">
                          Duration: {type.duration}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-[#00a69c]/10 rounded-xl border border-[#00a69c]/30">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <FaFileAlt className="w-5 h-5" />
                    What You&apos;ll Get
                  </h3>
                  <ul className="space-y-2 text-sm text-[#00a69c]">
                    {infoSection.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-1.5 w-1.5 h-1.5 bg-[#00a69c] rounded-full flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 p-6 bg-[#2d3544] rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    {infoSection.quickContact.title}
                  </h3>
                  <div className="flex items-center gap-4 mb-2">
                    <FaPhone className="w-4 h-4 text-[#00a69c]" />
                    <a
                      href={infoSection.quickContact.phoneLink}
                      className="text-white font-medium hover:text-[#00a69c] transition-colors"
                    >
                      {infoSection.quickContact.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <FaEnvelope className="w-4 h-4 text-[#00a69c]" />
                    <a
                      href={infoSection.quickContact.emailLink}
                      className="text-white font-medium hover:text-[#00a69c] transition-colors break-all"
                    >
                      {infoSection.quickContact.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {isSectionVisible(formSection) && (
              <div>
                <div className="bg-[#2d3544] rounded-2xl p-8">
                  <h2 className="text-2xl font-besley font-semibold text-white mb-2">
                    {formSection.title}
                  </h2>
                  {formSection.subtitle && (
                    <p className="text-gray-300 mb-8">{formSection.subtitle}</p>
                  )}

                  <ContactForm
                    submitButtonText={formSection.submitButtonText}
                    isConsultationForm
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
