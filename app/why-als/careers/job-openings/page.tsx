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

import { useState } from "react";
import PageHero from "../../../components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import { useApiList } from "@/lib/hooks/useApiList";
import { getActiveJobPostings } from "@/lib/mock-data";
import { formatDisplayDate } from "@/lib/format-date";
import {
  FaMapPin,
  FaClock,
  FaDollarSign,
  FaCalendarDays,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa6";

export default function JobOpenings() {
  const { data: jobs, loading } = useApiList("/careers/postings", getActiveJobPostings());
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const sortedJobs = [...jobs].sort((a, b) => (a.order || 0) - (b.order || 0));

  const toggleJob = (jobId: string) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const renderRichText = (content: any) => {
    if (!content) return null;
    if (typeof content === "string")
      return <p className="text-gray-400 leading-relaxed">{content}</p>;
    // Handle Lexical/rich text format - simplified rendering
    return (
      <div className="text-gray-400 leading-relaxed prose max-w-none">
        {JSON.stringify(content)}
      </div>
    );
  };

  return (
    <>
      <PageHero slug="careers" fallback={getPageHeroFallback("careers")} />

      {/* Introduction */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
            Join Our Growing Team
          </h2>
          <p className="text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Explore our current job opportunities and find the perfect role to
            start or advance your career in mortgage brokering.
          </p>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#e6e5e3]">
        <div className="max-w-5xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-gray-600">Loading job openings...</p>
            </div>
          ) : sortedJobs.length > 0 ? (
            <div className="space-y-6">
              {sortedJobs.map((job) => {
                const jobId = String((job as { _id?: string; id?: string })._id ?? (job as { id?: string }).id);
                return (
                <div
                  key={jobId}
                  className="bg-[#1d293d] rounded-xl shadow-lg overflow-hidden border border-[#2d3544] hover:border-[#00a69c] transition-colors"
                >
                  {/* Job Header */}
                  <button
                    onClick={() => toggleJob(jobId)}
                    className="w-full p-8 text-left hover:bg-[#2d3544] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow">
                        <h3 className="text-2xl font-besley font-semibold text-white mb-3">
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <FaMapPin className="w-4 h-4 text-[#00a69c]" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FaClock className="w-4 h-4 text-[#00a69c]" />
                            <span className="capitalize">
                              {job.type?.replace("-", " ")}
                            </span>
                          </div>
                          {job.salaryRange && (
                            <div className="flex items-center gap-2">
                              <FaDollarSign className="w-4 h-4 text-[#00a69c]" />
                              <span>{job.salaryRange}</span>
                            </div>
                          )}
                          {job.closingDate && (
                            <div className="flex items-center gap-2">
                              <FaCalendarDays className="w-4 h-4 text-[#00a69c]" />
                              <span>
                                Closes: {formatDisplayDate(job.closingDate)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex-shrink-0">
                        {expandedJob === jobId ? (
                          <FaChevronUp className="w-6 h-6 text-[#00a69c]" />
                        ) : (
                          <FaChevronDown className="w-6 h-6 text-[#00a69c]" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Job Details (Expanded) */}
                  {expandedJob === jobId && (
                    <div className="px-8 pb-8 space-y-6 border-t border-[#2d3544] pt-6">
                      {/* Description */}
                      {job.description && (
                        <div>
                          <h4 className="text-lg font-besley font-semibold text-white mb-3">
                            About the Role
                          </h4>
                          {renderRichText(job.description)}
                        </div>
                      )}

                      {/* Responsibilities */}
                      {job.responsibilities && (
                        <div>
                          <h4 className="text-lg font-besley font-semibold text-white mb-3">
                            Key Responsibilities
                          </h4>
                          {renderRichText(job.responsibilities)}
                        </div>
                      )}

                      {/* Requirements */}
                      {job.requirements && (
                        <div>
                          <h4 className="text-lg font-besley font-semibold text-white mb-3">
                            Requirements
                          </h4>
                          {renderRichText(job.requirements)}
                        </div>
                      )}

                      {/* Benefits */}
                      {job.benefits && (
                        <div>
                          <h4 className="text-lg font-besley font-semibold text-white mb-3">
                            What We Offer
                          </h4>
                          {renderRichText(job.benefits)}
                        </div>
                      )}

                      {/* Apply Button */}
                      <div className="pt-6">
                        <a
                          href={`/why-als/careers/apply?job=${jobId}`}
                          className="inline-block bg-[#00a69c] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0d8a99] transition-colors duration-200"
                        >
                          Apply for this Position
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#1d293d] rounded-xl">
              <div className="w-24 h-24 bg-[#2d3544] rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">ðŸ’¼</span>
              </div>
              <h3 className="text-2xl font-besley font-semibold text-white mb-4">
                No Open Positions Right Now
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                We don't have any open positions at the moment, but we're always
                looking for talented individuals to join our team.
              </p>
              <a
                href="/why-als/careers/apply"
                className="inline-block bg-[#00a69c] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0d8a99] transition-colors duration-200"
              >
                Submit a General Application
              </a>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-besley font-medium text-white mb-4">
            Don't See the Right Role?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            We're always interested in hearing from talented professionals. Send
            us your resume and we'll keep you in mind for future opportunities.
          </p>
          <a
            href="/why-als/careers/apply"
            className="inline-block bg-[#2d3544] text-[#00a69c] border-2 border-[#00a69c] px-8 py-4 rounded-lg font-medium hover:bg-[#00a69c] hover:text-white transition-colors duration-200"
          >
            Submit General Application
          </a>
        </div>
      </section>
    </>
  );
}
