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

import PageHero from "@/app/components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import {
  FaPaperPlane,
  FaUserCheck,
  FaComments,
  FaClipboardCheck,
  FaHandshake,
} from "react-icons/fa6";

export default function RecruitmentProcess() {
  return (
    <>
      <PageHero slug="careers" fallback={getPageHeroFallback("careers")} />

      {/* Introduction */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
            A Transparent, Fair Process
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            We believe in transparency from the very beginning. Here's what you
            can expect when you apply for a position at ALS Mortgage Solutions.
          </p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#e6e5e3]">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center">
                  <FaPaperPlane className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-grow bg-[#1d293d] rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-besley font-semibold text-white">
                    Step 1: Application
                  </h3>
                  <span className="bg-[#2d3544] text-[#00a69c] text-xs font-semibold px-3 py-1 rounded-full">
                    1-2 days
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Submit your application through our careers portal. Make sure
                  to include:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00a69c] mt-1">â€¢</span>
                    <span>
                      An up-to-date resume highlighting your relevant experience
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00a69c] mt-1">â€¢</span>
                    <span>
                      A cover letter explaining why you're interested in the
                      role
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00a69c] mt-1">â€¢</span>
                    <span>Any relevant certifications or qualifications</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center">
                  <FaUserCheck className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-grow bg-[#1d293d] rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-besley font-semibold text-white">
                    Step 2: Initial Review
                  </h3>
                  <span className="bg-[#2d3544] text-[#00a69c] text-xs font-semibold px-3 py-1 rounded-full">
                    3-5 days
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  Our HR team will review your application to assess your
                  qualifications and fit for the role. If you're shortlisted,
                  we'll contact you to schedule a phone screening.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  During this brief call (15-20 minutes), we'll discuss your
                  background, career goals, and answer any initial questions you
                  might have about the role or our company.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center">
                  <FaComments className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-grow bg-[#1d293d] rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-besley font-semibold text-white">
                    Step 3: Interviews
                  </h3>
                  <span className="bg-[#2d3544] text-[#00a69c] text-xs font-semibold px-3 py-1 rounded-full">
                    1-2 weeks
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  You'll typically have 2-3 interviews:
                </p>
                <div className="space-y-3">
                  <div className="pl-4 border-l-2 border-[#00a69c]/30">
                    <h4 className="font-semibold text-white mb-1">
                      First Interview
                    </h4>
                    <p className="text-gray-400 text-sm">
                      With the hiring manager to discuss your skills,
                      experience, and how you'd approach the role.
                    </p>
                  </div>
                  <div className="pl-4 border-l-2 border-[#00a69c]/30">
                    <h4 className="font-semibold text-white mb-1">
                      Second Interview
                    </h4>
                    <p className="text-gray-400 text-sm">
                      Meet the team you'd be working with and dive deeper into
                      technical or role-specific topics.
                    </p>
                  </div>
                  <div className="pl-4 border-l-2 border-[#00a69c]/30">
                    <h4 className="font-semibold text-white mb-1">
                      Final Interview (if needed)
                    </h4>
                    <p className="text-gray-400 text-sm">
                      With senior leadership to discuss company culture,
                      long-term goals, and answer any remaining questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center">
                  <FaClipboardCheck className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-grow bg-[#1d293d] rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-besley font-semibold text-white">
                    Step 4: Assessment & Checks
                  </h3>
                  <span className="bg-[#2d3544] text-[#00a69c] text-xs font-semibold px-3 py-1 rounded-full">
                    3-5 days
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  For certain roles, we may ask you to complete:
                </p>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00a69c] mt-1">â€¢</span>
                    <span>Skills assessment or practical task</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00a69c] mt-1">â€¢</span>
                    <span>Reference checks with previous employers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00a69c] mt-1">â€¢</span>
                    <span>
                      Background checks (as required by law for financial
                      services roles)
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center">
                  <FaHandshake className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="flex-grow bg-[#1d293d] rounded-xl p-8 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-besley font-semibold text-white">
                    Step 5: Offer & Onboarding
                  </h3>
                  <span className="bg-[#2d3544] text-[#00a69c] text-xs font-semibold px-3 py-1 rounded-full">
                    1-2 weeks
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-4">
                  If you're successful, we'll extend a formal offer including:
                </p>
                <ul className="space-y-2 text-gray-400 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00a69c] mt-1">â€¢</span>
                    <span>Detailed compensation package</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00a69c] mt-1">â€¢</span>
                    <span>Benefits and perks information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00a69c] mt-1">â€¢</span>
                    <span>Start date and onboarding schedule</span>
                  </li>
                </ul>
                <p className="text-gray-400 leading-relaxed">
                  Once you accept, we'll begin the onboarding process to ensure
                  you're set up for success from day one!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-besley font-medium text-white mb-8 text-center">
            Tips for Success
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#2d3544] rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">
                Research Our Company
              </h3>
              <p className="text-gray-400 text-sm">
                Understand our values, mission, and what makes us different.
                Visit our website and read client testimonials to get a sense of
                our culture.
              </p>
            </div>

            <div className="bg-[#2d3544] rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">
                Prepare Questions
              </h3>
              <p className="text-gray-400 text-sm">
                We love candidates who ask thoughtful questions. Prepare
                questions about the role, team, growth opportunities, and
                company culture.
              </p>
            </div>

            <div className="bg-[#2d3544] rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Be Yourself</h3>
              <p className="text-gray-400 text-sm">
                Authenticity matters to us. We want to know the real youâ€”your
                strengths, your passions, and how you work best.
              </p>
            </div>

            <div className="bg-[#2d3544] rounded-xl p-6">
              <h3 className="font-semibold text-white mb-2">Follow Up</h3>
              <p className="text-gray-400 text-sm">
                Send a thank-you email after each interview. It shows
                professionalism and reinforces your interest in the position.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-besley font-medium text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed mb-8">
            Check out our current openings or submit a general application
            today.
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
              className="inline-block bg-[#e6e5e3] text-[#2d3544] px-8 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
