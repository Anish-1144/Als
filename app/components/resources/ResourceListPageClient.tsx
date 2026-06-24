"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "@/app/components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import { useApiList } from "@/lib/hooks/useApiList";
import { faqSeedData } from "@/lib/mock-data/seed-faqs";
import { getActiveDocuments } from "@/lib/mock-data";
import type { ResourceListPageContent } from "@/lib/resources-content";
import type { PageHeroApiData } from "@/lib/page-hero";
import { isSectionVisible } from "@/lib/page-content";
import {
  FaArrowUpRightFromSquare,
  FaChevronDown,
  FaChevronUp,
  FaCircleQuestion,
  FaDownload,
  FaFile,
  FaFolderOpen,
  FaSearchengin,
} from "react-icons/fa6";

const faqFallback = faqSeedData.filter((faq) => faq.isActive);

function faqAnswerText(answer: unknown): string {
  if (typeof answer === "string") return answer;
  if (Array.isArray(answer)) {
    return answer.flatMap((block: { children?: { text?: string }[] }) =>
      (block.children ?? []).map((c) => c.text ?? ""),
    ).join(" ");
  }
  return "";
}

const faqCategoryLabels: Record<string, string> = {
  "home-loans": "Home Loans",
  refinancing: "Refinancing",
  "commercial-loans": "Commercial Loans",
  "car-financing": "Car Financing",
  "smsf-financing": "SMSF Financing",
  "application-process": "Application Process",
  "rates-fees": "Rates & Fees",
  general: "General Questions",
};

const docCategoryLabels: Record<string, string> = {
  "home-loans": "Home Loans",
  refinancing: "Refinancing",
  "commercial-loans": "Commercial Loans",
  "car-financing": "Car Financing",
  "smsf-financing": "SMSF Financing",
  "application-forms": "Application Forms",
  "guides-resources": "Guides & Resources",
  general: "General Documents",
};

function FAQAccordion({ faqs }: { faqs: Record<string, unknown>[] }) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [...new Set(faqs.map((f) => String(f.category ?? "general")))];

  const filteredFAQs = faqs.filter((faq) => {
    const q = String(faq.question ?? "");
    const matchesSearch =
      q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faqAnswerText(faq.answer).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 space-y-6">
        <div className="relative">
          <FaSearchengin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search frequently asked questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-[#00a69c] focus:border-transparent outline-none text-lg bg-[#2d3544] text-white placeholder-gray-400"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setSelectedCategory("all")} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "all" ? "bg-[#00a69c] text-white" : "bg-[#2d3544] text-gray-200 hover:bg-[#1d293d]"}`}>
            All Categories
          </button>
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? "bg-[#00a69c] text-white" : "bg-[#2d3544] text-gray-200 hover:bg-[#1d293d]"}`}>
              {faqCategoryLabels[category] ?? category}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12">
            <FaCircleQuestion className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No FAQs found</h3>
            <p className="text-gray-400">Try adjusting your search terms or category filter.</p>
          </div>
        ) : (
          filteredFAQs.map((faq, index) => {
            const faqId = `faq-${index}`;
            const isOpen = openItems[faqId];
            return (
              <div key={faqId} className="bg-[#2d3544] rounded-xl shadow-lg border border-gray-700 overflow-hidden">
                <button type="button" onClick={() => setOpenItems((prev) => ({ ...prev, [faqId]: !prev[faqId] }))} className="w-full px-6 py-6 text-left hover:bg-[#1d293d] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-6 h-6 bg-[#1d293d] rounded-full flex items-center justify-center mt-1">
                          <FaCircleQuestion className="w-3 h-3 text-[#00a69c]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">{String(faq.question ?? "")}</h3>
                          <span className="inline-block px-2 py-1 bg-[#1d293d] text-[#00a69c] text-xs rounded-full">
                            {faqCategoryLabels[String(faq.category ?? "general")] ?? String(faq.category)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      {isOpen ? <FaChevronUp className="w-5 h-5 text-gray-400" /> : <FaChevronDown className="w-5 h-5 text-gray-400" />}
                    </div>
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="pl-10 border-l-2 border-[#00a69c]">
                      <div className="text-gray-200 leading-relaxed">
                        {typeof faq.answer === "string" ? (
                          <p>{faq.answer}</p>
                        ) : (
                          (faq.answer as { children?: { text?: string; bold?: boolean }[] }[] | undefined)?.map((block, blockIndex) => (
                            <p key={blockIndex} className="mb-3 last:mb-0">
                              {block.children?.map((child, childIndex) => (
                                <span key={childIndex} className={child.bold ? "font-semibold" : ""}>{child.text}</span>
                              ))}
                            </p>
                          ))
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function DocumentList({ documents }: { documents: Record<string, unknown>[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = [...new Set(documents.map((d) => String(d.category ?? "general")))];

  const filteredDocuments = documents.filter((doc) => {
    const title = String(doc.title ?? "");
    const desc = String(doc.description ?? "");
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) || desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 space-y-6">
        <div className="relative">
          <FaSearchengin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input type="text" placeholder="Search documents..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 border border-gray-600 rounded-xl focus:ring-2 focus:ring-[#00a69c] focus:border-transparent outline-none text-lg bg-[#2d3544] text-white placeholder-gray-400" />
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setSelectedCategory("all")} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === "all" ? "bg-[#00a69c] text-white" : "bg-[#2d3544] text-gray-200 hover:bg-[#1d293d]"}`}>All Categories</button>
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category ? "bg-[#00a69c] text-white" : "bg-[#2d3544] text-gray-200 hover:bg-[#1d293d]"}`}>
              {docCategoryLabels[category] ?? category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <FaFolderOpen className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No documents found</h3>
            <p className="text-gray-400">Try adjusting your search terms or category filter.</p>
          </div>
        ) : (
          filteredDocuments.map((doc, index) => (
            <a key={index} href={String(doc.link ?? "#")} target="_blank" rel="noopener noreferrer" className="bg-[#2d3544] rounded-xl shadow-lg border border-gray-700 overflow-hidden hover:shadow-xl transition-shadow group">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#1d293d] rounded-lg flex items-center justify-center group-hover:bg-[#00a69c] transition-colors">
                    <FaFile className="w-6 h-6 text-[#00a69c] group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#00a69c] transition-colors">{String(doc.title ?? "")}</h3>
                    <span className="inline-block px-2 py-1 bg-[#1d293d] text-[#00a69c] text-xs rounded-full">
                      {docCategoryLabels[String(doc.category ?? "general")] ?? String(doc.category)}
                    </span>
                  </div>
                </div>
                {Boolean(doc.description) && <p className="text-gray-400 text-sm mb-4 line-clamp-3">{String(doc.description)}</p>}
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <span className="text-[#00a69c] text-sm font-medium flex items-center gap-2">
                    <FaDownload className="w-4 h-4" />
                    View Document
                  </span>
                  <FaArrowUpRightFromSquare className="w-4 h-4 text-gray-500 group-hover:text-[#00a69c] transition-colors" />
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
}

export default function ResourceListPageClient({
  slug,
  content,
  pageHero,
}: {
  slug: "faq" | "documents";
  content: ResourceListPageContent;
  pageHero?: PageHeroApiData | null;
}) {
  const faqApi = useApiList("/faqs", faqFallback);
  const docApi = useApiList("/documents", getActiveDocuments());
  const loading = slug === "faq" ? faqApi.loading : docApi.loading;
  const { intro, bottomCta } = content;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1d293d] font-sans">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#00a69c] mx-auto mb-4" />
          <p className="text-gray-400">{slug === "faq" ? "Loading FAQs..." : "Loading documents..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans">
      <PageHero
        slug={slug}
        fallback={getPageHeroFallback(slug)}
        initialData={pageHero ?? undefined}
      />

      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-7xl mx-auto">
          {isSectionVisible(intro) && (
          <div className="text-center mb-16">
            {intro.badge && (
              <div className="inline-flex items-center gap-2 bg-[#2d3544] px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full" />
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">{intro.badge}</span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">{intro.title}</h2>
            {intro.subtitle && <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">{intro.subtitle}</p>}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={intro.primaryCtaLink} className="bg-[#00a69c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#0d8a99] transition-colors">
                {intro.primaryCtaLabel}
              </Link>
              {intro.secondaryCtaLabel && intro.secondaryCtaLink && (
                <Link href={intro.secondaryCtaLink} className="bg-transparent border-2 border-[#00a69c] text-[#00a69c] px-6 py-3 rounded-lg font-semibold hover:bg-[#00a69c] hover:text-white transition-colors">
                  {intro.secondaryCtaLabel}
                </Link>
              )}
            </div>
          </div>
          )}

          {slug === "faq" ? <FAQAccordion faqs={faqApi.data} /> : <DocumentList documents={docApi.data} />}
        </div>
      </section>

      {isSectionVisible(bottomCta) && (
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#00a69c]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-besley font-medium text-white mb-6">{bottomCta.title}</h2>
          <p className="text-lg text-white/80 mb-8">{bottomCta.body}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={bottomCta.primaryLink} className="bg-white text-[#00a69c] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
              {bottomCta.primaryLabel}
            </Link>
            <Link href={bottomCta.secondaryLink} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#00a69c] transition-colors">
              {bottomCta.secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
