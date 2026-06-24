"use client";

import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";
import { DEFAULT_CTA, mergeCta, type HomeCta } from "@/lib/homepage-content";

export default function ContactCTASection({ cta }: { cta?: Partial<HomeCta> }) {
  const content = mergeCta(cta ?? DEFAULT_CTA);

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#00a69c] font-sans">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-balance">
          {content.title}
        </h2>
        <p className="text-xl text-blue-100 mb-12 leading-relaxed text-pretty">
          {content.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={content.buttonLink || "/contact"}
            className="bg-white text-[#00a69c] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            {content.buttonText}
            <FaArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
