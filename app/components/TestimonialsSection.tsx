// Copyright (C) 2025 Anuj
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

"use client";

import { FaStar, FaQuoteLeft } from "react-icons/fa6";

interface Testimonial {
  clientName: string;
  clientTitle?: string;
  testimonial: string;
  rating: number;
  clientImage?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d] font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6 border border-[#00a69c]/30">
            <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
            <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
              TESTIMONIALS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-balance">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed text-pretty">
            Don't just take our word for it - hear from the thousands of
            satisfied clients who've achieved their property dreams with our
            help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials
            .slice(0, 6)
            .map((testimonial: Testimonial, index: number) => (
              <div
                key={index}
                className="bg-[#2d3544] p-8 rounded-2xl border border-gray-600 hover:shadow-lg hover:shadow-black/20 transition-shadow duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                  ))}
                </div>

                <div className="relative mb-6">
                  <FaQuoteLeft className="w-6 h-6 text-[#00a69c]/30 absolute -top-2 -left-2" />
                  <p className="text-gray-300 leading-relaxed pl-4">
                    "{testimonial.testimonial}"
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {testimonial.clientImage ? (
                    <div
                      className="w-12 h-12 rounded-full bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${testimonial.clientImage})`,
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-[#00a69c] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {testimonial.clientName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-semibold text-white">
                      {testimonial.clientName}
                    </h4>
                    {testimonial.clientTitle && (
                      <p className="text-gray-400 text-sm">
                        {testimonial.clientTitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
