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

import ParallaxHero from "@/app/components/parallax-hero";
import {
  FaDollarSign,
  FaGraduationCap,
  FaHeartPulse,
  FaClock,
  FaChartLine,
  FaTrophy,
  FaHandshake,
  FaUsers,
} from "react-icons/fa6";

export default function WhyUs() {
  return (
    <div className="font-sans">
      <ParallaxHero
        title="Why Work With Us"
        subtitle="Discover what makes ALS special"
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
      />

      {/* Introduction */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
            More Than Just a Job
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            At ALS Mortgage Solutions, we believe that when our team thrives,
            our clients benefit. That's why we've created a workplace culture
            that prioritizes growth, wellbeing, and meaningful work.
          </p>
        </div>
      </section>

      {/* Benefits & Perks */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#e6e5e3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-besley font-medium text-[#1d293d] mb-6">
              Benefits & Perks
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer comprehensive benefits designed to support you both
              professionally and personally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#1d293d] rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#2d3544] rounded-lg flex items-center justify-center mb-4">
                <FaDollarSign className="w-6 h-6 text-[#00a69c]" />
              </div>
              <h3 className="text-lg font-besley font-semibold text-white mb-2">
                Competitive Salary
              </h3>
              <p className="text-gray-400 text-sm">
                Market-leading compensation packages with performance bonuses
              </p>
            </div>

            <div className="bg-[#1d293d] rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#2d3544] rounded-lg flex items-center justify-center mb-4">
                <FaGraduationCap className="w-6 h-6 text-[#00a69c]" />
              </div>
              <h3 className="text-lg font-besley font-semibold text-white mb-2">
                Learning & Development
              </h3>
              <p className="text-gray-400 text-sm">
                Ongoing training, certifications, and professional development
                opportunities
              </p>
            </div>

            <div className="bg-[#1d293d] rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#2d3544] rounded-lg flex items-center justify-center mb-4">
                <FaHeartPulse className="w-6 h-6 text-[#00a69c]" />
              </div>
              <h3 className="text-lg font-besley font-semibold text-white mb-2">
                Health & Wellness
              </h3>
              <p className="text-gray-400 text-sm">
                Comprehensive health insurance and wellness programs
              </p>
            </div>

            <div className="bg-[#1d293d] rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#2d3544] rounded-lg flex items-center justify-center mb-4">
                <FaClock className="w-6 h-6 text-[#00a69c]" />
              </div>
              <h3 className="text-lg font-besley font-semibold text-white mb-2">
                Flexible Working
              </h3>
              <p className="text-gray-400 text-sm">
                Hybrid work options and flexible hours to suit your lifestyle
              </p>
            </div>

            <div className="bg-[#1d293d] rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#2d3544] rounded-lg flex items-center justify-center mb-4">
                <FaChartLine className="w-6 h-6 text-[#00a69c]" />
              </div>
              <h3 className="text-lg font-besley font-semibold text-white mb-2">
                Career Growth
              </h3>
              <p className="text-gray-400 text-sm">
                Clear career pathways and promotion opportunities
              </p>
            </div>

            <div className="bg-[#1d293d] rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#2d3544] rounded-lg flex items-center justify-center mb-4">
                <FaTrophy className="w-6 h-6 text-[#00a69c]" />
              </div>
              <h3 className="text-lg font-besley font-semibold text-white mb-2">
                Recognition Programs
              </h3>
              <p className="text-gray-400 text-sm">
                Regular recognition and rewards for outstanding performance
              </p>
            </div>

            <div className="bg-[#1d293d] rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#2d3544] rounded-lg flex items-center justify-center mb-4">
                <FaHandshake className="w-6 h-6 text-[#00a69c]" />
              </div>
              <h3 className="text-lg font-besley font-semibold text-white mb-2">
                Team Events
              </h3>
              <p className="text-gray-400 text-sm">
                Regular team building activities and social events
              </p>
            </div>

            <div className="bg-[#1d293d] rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-[#2d3544] rounded-lg flex items-center justify-center mb-4">
                <FaUsers className="w-6 h-6 text-[#00a69c]" />
              </div>
              <h3 className="text-lg font-besley font-semibold text-white mb-2">
                Inclusive Culture
              </h3>
              <p className="text-gray-400 text-sm">
                Diverse, supportive workplace that values every voice
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Culture & Values */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-besley font-medium text-white mb-12 text-center">
            Our Culture & Values
          </h2>

          <div className="space-y-8">
            <div className="bg-gradient-to-r from-[#2d3544] to-transparent rounded-2xl p-8 border-l-4 border-[#00a69c]">
              <h3 className="text-2xl font-besley font-semibold text-white mb-4">
                Integrity First
              </h3>
              <p className="text-gray-400 leading-relaxed">
                We operate with honesty and transparency in everything we do.
                Our ethical approach to mortgage brokering means we always put
                our clients firstâ€”and we expect the same from our team members.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#2d3544] to-transparent rounded-2xl p-8 border-l-4 border-[#00a69c]">
              <h3 className="text-2xl font-besley font-semibold text-white mb-4">
                Continuous Learning
              </h3>
              <p className="text-gray-400 leading-relaxed">
                The mortgage industry is constantly evolving, and so are we. We
                invest in our team's professional development through training,
                mentorship, and opportunities to learn from industry experts.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#2d3544] to-transparent rounded-2xl p-8 border-l-4 border-[#00a69c]">
              <h3 className="text-2xl font-besley font-semibold text-white mb-4">
                Collaboration Over Competition
              </h3>
              <p className="text-gray-400 leading-relaxed">
                We believe that great things happen when people work together.
                Our team culture emphasizes collaboration, knowledge sharing,
                and mutual support.
              </p>
            </div>

            <div className="bg-gradient-to-r from-[#2d3544] to-transparent rounded-2xl p-8 border-l-4 border-[#00a69c]">
              <h3 className="text-2xl font-besley font-semibold text-white mb-4">
                Work-Life Harmony
              </h3>
              <p className="text-gray-400 leading-relaxed">
                We understand that our team members have lives outside of work.
                That's why we offer flexible working arrangements and support a
                healthy work-life balance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials from Team */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-besley font-medium text-white mb-12 text-center">
            What Our Team Says
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#1d293d] rounded-xl p-8 border border-[#1d293d]">
              <p className="text-gray-300 leading-relaxed mb-6 italic">
                "ALS has provided me with incredible opportunities for growth.
                The team is supportive, the culture is positive, and I genuinely
                look forward to coming to work every day."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00a69c] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">JM</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">John Martis</h4>
                  <p className="text-gray-400 text-sm">
                    Credit/Operation Manager
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#1d293d] rounded-xl p-8 border border-[#1d293d]">
              <p className="text-gray-300 leading-relaxed mb-6 italic">
                "What I love most about working at ALS is the focus on doing
                what's right for clients. It's refreshing to work somewhere
                where ethical practice isn't just talked aboutâ€”it's lived every
                day."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00a69c] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">NL</span>
                </div>
                <div>
                  <h4 className="text-white font-semibold">
                    Navin Gregory Lobo
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Credit Support Associate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
            Ready to Join Us?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Explore our current job openings and take the first step towards an
            exciting career at ALS.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/why-als/careers/job-openings"
              className="inline-block bg-[#00a69c] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0d8a99] transition-colors duration-200"
            >
              View Job Openings
            </a>
            <a
              href="/why-als/careers/apply"
              className="inline-block bg-[#1d293d] text-[#00a69c] border-2 border-[#00a69c] px-8 py-4 rounded-lg font-medium hover:bg-[#00a69c] hover:text-white transition-colors duration-200"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
