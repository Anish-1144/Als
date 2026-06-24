"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  FaArrowRight,
  FaArrowUp,
  FaChevronDown,
  FaComments,
  FaFileLines,
  FaHandshake,
  FaKey,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import ContactCTASection from "@/app/components/ContactCTASection";
import PageHero from "@/app/components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import type { HowItWorksContent } from "@/lib/how-it-works-content";
import { isSectionVisible } from "@/lib/page-content";
import type { PageHeroApiData } from "@/lib/page-hero";

const STEP_ICONS = [FaComments, FaFileLines, FaMagnifyingGlass, FaHandshake, FaKey];

export default function HowItWorksPageClient({
  content,
  pageHero,
}: {
  content: HowItWorksContent;
  pageHero: PageHeroApiData;
}) {
  const defaultStepId = content.steps[0]?.id ?? "consultation";
  const [activeStep, setActiveStep] = useState<string>(defaultStepId);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const detailsSectionRef = useRef<HTMLElement>(null);

  const activeStepData = content.steps.find((step) => step.id === activeStep);
  const activeStepIndex = content.steps.findIndex((s) => s.id === activeStep);

  function handleStepClick(stepId: string) {
    setActiveStep(stepId);
    setTimeout(() => {
      detailsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }

  function scrollToSteps() {
    stepsContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function renderStepButton(step: (typeof content.steps)[0], index: number, stepNumber: number) {
    const Icon = STEP_ICONS[index] ?? FaComments;
    const isActive = activeStep === step.id;

    return (
      <button
        key={step.id}
        type="button"
        onClick={() => handleStepClick(step.id)}
        className={`group relative p-8 rounded-2xl transition-all duration-300 cursor-pointer text-left ${
          isActive
            ? "bg-[#00a69c] text-white shadow-xl"
            : "bg-[#2d3544] text-white hover:bg-[#353f4e] hover:shadow-lg border border-gray-600"
        }`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isActive ? "bg-white/20" : "bg-[#00a69c]/20"}`}>
            <span className={`text-xl font-bold ${isActive ? "text-white" : "text-[#00a69c]"}`}>{stepNumber}</span>
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? "bg-white/20" : "bg-[#00a69c]"}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-xl font-besley font-semibold mb-2 text-white">{step.shortTitle}</h3>
        <p className={`text-sm leading-relaxed ${isActive ? "text-white/80" : "text-gray-400"}`}>
          {step.description.length > 100 ? `${step.description.slice(0, 100)}...` : step.description}
        </p>
      </button>
    );
  }

  const ActiveIcon = activeStepIndex >= 0 ? (STEP_ICONS[activeStepIndex] ?? FaComments) : FaComments;

  return (
    <div className="font-sans">
      <PageHero
        slug="how-it-works"
        fallback={getPageHeroFallback("how-it-works")}
        initialData={pageHero}
      />

      {isSectionVisible(content.processSection) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div ref={stepsContainerRef} className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {content.processSection.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">{content.processSection.badge}</span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">{content.processSection.title}</h2>
            {content.processSection.subtitle && (
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">{content.processSection.subtitle}</p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {content.steps.slice(0, 3).map((step, index) => renderStepButton(step, index, index + 1))}
          </div>

          {content.steps.length > 3 && (
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {content.steps.slice(3).map((step, index) => renderStepButton(step, index + 3, index + 4))}
            </div>
          )}
        </div>
      </section>
      )}

      {activeStepData && (
        <section ref={detailsSectionRef} className="py-16 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#1d293d] rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[#00a69c] rounded-2xl flex items-center justify-center">
                  <ActiveIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-besley font-semibold text-white">{activeStepData.title}</h3>
                  <p className="text-[#00a69c] font-medium">
                    Step {activeStepIndex + 1} of {content.steps.length}
                  </p>
                </div>
              </div>

              <p className="text-gray-400 leading-relaxed mb-8 text-lg">{activeStepData.description}</p>

              <div className="grid md:grid-cols-2 gap-4">
                {activeStepData.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-[#00a69c]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[#00a69c] text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-300">{detail}</p>
                  </div>
                ))}
              </div>

              {isSectionVisible(content.stepDetailCta) && (
              <div className="mt-8 pt-8 border-t border-gray-600 flex flex-wrap items-center gap-4">
                <Link
                  href={content.stepDetailCta.primaryLink}
                  className="inline-flex items-center bg-[#00a69c] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0d8a99] transition-colors"
                >
                  {content.stepDetailCta.primaryLabel}
                  <FaArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <button
                  type="button"
                  onClick={scrollToSteps}
                  className="inline-flex items-center bg-transparent border border-gray-500 text-gray-300 px-6 py-4 rounded-lg font-medium hover:border-[#00a69c] hover:text-[#00a69c] transition-colors"
                >
                  <FaArrowUp className="w-4 h-4 mr-2" />
                  {content.stepDetailCta.secondaryLabel}
                </button>
              </div>
              )}
            </div>
          </div>
        </section>
      )}

      {isSectionVisible(content.faqs) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            {content.faqs.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">{content.faqs.badge}</span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">{content.faqs.title}</h2>
            {content.faqs.subtitle && <p className="text-lg text-gray-400">{content.faqs.subtitle}</p>}
          </div>

          <div className="space-y-4">
            {content.faqs.items.map((faq, index) => (
              <div key={index} className="bg-[#1d293d] rounded-xl overflow-hidden shadow-md">
                <button
                  type="button"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center hover:bg-[#253245] transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white text-left pr-4">{faq.question}</h3>
                  <FaChevronDown className={`w-5 h-5 text-[#00a69c] transition-transform flex-shrink-0 ${openFAQ === index ? "rotate-180" : ""}`} />
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={content.faqs.viewAllLink} className="inline-flex items-center text-[#00a69c] font-semibold hover:text-[#0d8a99] transition-colors">
              {content.faqs.viewAllLabel}
              <FaArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
      )}

      <ContactCTASection />
    </div>
  );
}
