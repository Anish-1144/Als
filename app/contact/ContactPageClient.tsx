"use client";

import ContactForm from "@/app/components/ContactForm";
import PageHero from "@/app/components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import type { ContactPageContent } from "@/lib/contact-content";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

type PageHeroData = {
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
};

export default function ContactPageClient({
  content,
  pageData,
}: {
  content: ContactPageContent;
  pageData: PageHeroData | null;
}) {
  const { infoSection, map, whyUs, formSection } = content;

  return (
    <>
      <PageHero slug="contact" fallback={getPageHeroFallback("contact", { height: "h-80" })} initialData={pageData} />

      <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-besley font-semibold text-white mb-8">{infoSection.title}</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00a69c]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaPhone className="w-5 h-5 text-[#00a69c]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{infoSection.phone.title}</h3>
                      <a href={infoSection.phone.link ?? `tel:${infoSection.phone.value}`} className="text-[#00a69c] hover:underline text-lg">
                        {infoSection.phone.value}
                      </a>
                      {infoSection.phone.note && <p className="text-sm text-gray-400 mt-1">{infoSection.phone.note}</p>}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00a69c]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="w-5 h-5 text-[#00a69c]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{infoSection.email.title}</h3>
                      <a href={infoSection.email.link ?? `mailto:${infoSection.email.value}`} className="text-[#00a69c] hover:underline break-all">
                        {infoSection.email.value}
                      </a>
                      {infoSection.email.note && <p className="text-sm text-gray-400 mt-1">{infoSection.email.note}</p>}
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00a69c]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaMapMarkerAlt className="w-5 h-5 text-[#00a69c]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{infoSection.address.title}</h3>
                      <p className="text-gray-300">
                        {infoSection.address.lines.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < infoSection.address.lines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#00a69c]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaClock className="w-5 h-5 text-[#00a69c]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{infoSection.hours.title}</h3>
                      <p className="text-gray-300">
                        {infoSection.hours.lines.map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < infoSection.hours.lines.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold text-white mb-4">{map.title}</h3>
                <div className="rounded-xl overflow-hidden shadow-lg h-[300px]">
                  <iframe
                    src={map.embedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={map.title}
                  />
                </div>
              </div>

              <div className="p-6 bg-[#2d3544] rounded-xl border border-gray-600">
                <h3 className="text-lg font-semibold text-white mb-3">{whyUs.title}</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  {whyUs.items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#00a69c] rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-[#2d3544] rounded-2xl p-8 lg:p-12 shadow-lg">
                <h2 className="text-2xl font-besley font-semibold text-white mb-2">{formSection.title}</h2>
                <p className="text-gray-400 mb-8">{formSection.subtitle}</p>
                <ContactForm submitButtonText={formSection.submitButtonText} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
