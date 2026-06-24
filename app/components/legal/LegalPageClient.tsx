"use client";

import Link from "next/link";
import PageHero from "@/app/components/PageHero";
import { getPageHeroFallback, type PageHeroApiData } from "@/lib/page-hero";
import type { LegalPageContent } from "@/lib/legal-content";

export default function LegalPageClient({
  slug,
  content,
  pageHero,
}: {
  slug: string;
  content: LegalPageContent;
  pageHero: PageHeroApiData;
}) {
  return (
    <div className="font-sans">
      <PageHero
        slug={slug}
        fallback={getPageHeroFallback(slug, { height: "h-72" })}
        initialData={pageHero}
      />

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-4xl mx-auto">
          {content.lastUpdated && (
            <p className="text-sm text-gray-400 mb-8">Last updated: {content.lastUpdated}</p>
          )}

          {content.introParagraphs.length > 0 && (
            <div className="mb-12 space-y-6">
              {content.introParagraphs.map((p, i) => (
                <p key={i} className="text-xl text-gray-200 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}

          <div className="space-y-12">
            {content.sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-2xl md:text-3xl font-besley font-semibold text-white mb-4">
                  {section.title}
                </h2>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-lg text-gray-300 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2 mt-4">
                    {section.bullets.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-lg text-gray-300">
                        <span className="text-[#00a69c] mt-1.5 shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {content.footerNote && (
            <div className="mt-16 pt-8 border-t border-gray-600">
              <p className="text-gray-400 text-sm leading-relaxed">{content.footerNote}</p>
            </div>
          )}

          <div className="mt-12">
            <Link
              href="/contact"
              className="inline-flex items-center text-[#00a69c] font-medium hover:text-[#0d8a99] transition-colors"
            >
              Questions? Contact us →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
