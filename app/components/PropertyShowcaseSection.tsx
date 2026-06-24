"use client";

import {
  FaComments,
  FaFileLines,
  FaMagnifyingGlass,
  FaHandshake,
  FaKey,
} from "react-icons/fa6";
import {
  mergeSteps,
  type HowItWorksStep,
} from "@/lib/homepage-content";

const STEP_ICONS = [
  FaComments,
  FaFileLines,
  FaMagnifyingGlass,
  FaHandshake,
  FaKey,
];

interface PropertyShowcaseSectionProps {
  propertyShowcase: {
    sectionTitle?: string;
    sectionSubtitle?: string;
    steps?: HowItWorksStep[];
  };
}

export default function PropertyShowcaseSection({
  propertyShowcase,
}: PropertyShowcaseSectionProps) {
  const sectionTitle = propertyShowcase.sectionTitle ?? "How it works";
  const sectionSubtitle =
    propertyShowcase.sectionSubtitle ??
    "From dream homes to investment properties, we help you secure the financing for your property goals.";
  const steps = mergeSteps(propertyShowcase.steps);

  return (
    <section className="relative py-12 px-6 md:px-12 lg:px-24 bg-[#f3e6da] font-sans">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#00a69c]">
            {sectionTitle}
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {steps.slice(0, 3).map((step, index) => {
            const IconComponent = STEP_ICONS[index] ?? FaComments;

            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#00a69c]/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-[#00a69c]">
                      {index + 1}
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-[#00a69c] rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#00a69c] mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {steps.slice(3, 5).map((step, index) => {
            const IconComponent = STEP_ICONS[index + 3] ?? FaKey;

            return (
              <div
                key={index + 3}
                className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#00a69c]/20 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold text-[#00a69c]">
                      {index + 4}
                    </span>
                  </div>
                  <div className="w-10 h-10 bg-[#00a69c] rounded-xl flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#00a69c] mb-2">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
