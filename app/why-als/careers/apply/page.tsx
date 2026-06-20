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

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "../../../components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import { useApiList } from "@/lib/hooks/useApiList";
import { getActiveJobPostings } from "@/lib/mock-data";
import { FaPaperclip, FaCircleCheck } from "react-icons/fa6";

export default function Apply() {
  const searchParams = useSearchParams();
  const jobId = searchParams?.get("job");

  const { data: jobs } = useApiList("/careers/postings", getActiveJobPostings());
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    jobPosting: jobId || "",
    applicantName: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
    linkedIn: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/v1/leads/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Suspense>
        <PageHero slug="careers" fallback={getPageHeroFallback("careers")} />

        <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-24 h-24 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaCircleCheck className="w-12 h-12 text-green-400" />
            </div>
            <h2 className="text-4xl font-besley font-medium text-white mb-6">
              Application Received!
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              Thank you for applying to join the ALS Mortgage Solutions team.
              We've received your application and our HR team will review it
              shortly.
            </p>
            <p className="text-gray-400 mb-8">
              If your qualifications match what we're looking for, we'll be in
              touch within 5-7 business days to schedule an initial
              conversation.
            </p>
            <a
              href="/why-als/careers"
              className="inline-block bg-[#00a69c] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0d8a99] transition-colors duration-200"
            >
              Return to Careers
            </a>
          </div>
        </section>
      </Suspense>
    );
  }

  return (
    <Suspense>
      <PageHero slug="careers" fallback={getPageHeroFallback("careers")} />

      {/* Application Form */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-besley font-medium text-white mb-4">
              Submit Your Application
            </h2>
            <p className="text-gray-400">
              Fill out the form below to apply for a position at ALS Mortgage
              Solutions. All fields marked with * are required.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-[#2d3544] rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <div className="space-y-6">
              {/* Job Selection */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Position Applying For *
                </label>
                <select
                  name="jobPosting"
                  value={formData.jobPosting}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#1d293d] text-white focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 transition-colors"
                >
                  <option value="">Select a position</option>
                  {jobs.map((job) => {
                    const jobId = String((job as { _id?: string; id?: string })._id ?? (job as { id?: string }).id);
                    return (
                    <option key={jobId} value={jobId}>
                      {job.title} - {job.location}
                    </option>
                  );
                  })}
                  <option value="general">
                    General Application (No specific role)
                  </option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="applicantName"
                  value={formData.applicantName}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#1d293d] text-white placeholder-gray-500 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john.doe@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#1d293d] text-white placeholder-gray-500 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="04XX XXX XXX"
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#1d293d] text-white placeholder-gray-500 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 transition-colors"
                />
              </div>

              {/* Resume URL/Upload */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Resume URL *
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="resumeUrl"
                    value={formData.resumeUrl}
                    onChange={handleInputChange}
                    required
                    placeholder="https://example.com/your-resume.pdf or Google Drive/Dropbox link"
                    className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#1d293d] text-white placeholder-gray-500 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 transition-colors"
                  />
                  <FaPaperclip className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Please provide a link to your resume (Google Drive, Dropbox,
                  or any public URL). Make sure the link is accessible.
                </p>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  rows={6}
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#1d293d] text-white placeholder-gray-500 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 transition-colors resize-none"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  LinkedIn Profile (Optional)
                </label>
                <input
                  type="url"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/your-profile"
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[#1d293d] text-white placeholder-gray-500 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00a69c] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0d8a99] transition-colors duration-200 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                By submitting this application, you consent to ALS Mortgage
                Solutions storing and processing your personal information in
                accordance with our Privacy Policy.
              </p>
            </div>
          </form>
        </div>
      </section>
    </Suspense>
  );
}
