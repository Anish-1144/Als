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

import { useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ParallaxHero from "../../../components/parallax-hero";
import { useApiList } from "@/lib/hooks/useApiList";
import { getActiveJobPostings } from "@/lib/mock-data";
import { FaPaperclip, FaCircleCheck, FaXmark } from "react-icons/fa6";

const RESUME_MAX_BYTES = 5 * 1024 * 1024;
const RESUME_ACCEPT = ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function isAllowedResume(file: File) {
  const ext = file.name.split(".").pop()?.toLowerCase();
  return ext === "pdf" || ext === "doc" || ext === "docx";
}

export default function Apply() {
  return (
    <Suspense>
      <ApplyForm />
    </Suspense>
  );
}

function ApplyForm() {
  const searchParams = useSearchParams();
  const jobId = searchParams?.get("job");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: jobs } = useApiList("/careers/postings", getActiveJobPostings());
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [resumeFileName, setResumeFileName] = useState("");
  const [resumeError, setResumeError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState({
    jobPosting: jobId || "",
    applicantName: "",
    email: "",
    phone: "",
    resumeUrl: "",
    resumeFileName: "",
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

  const handleResumeUpload = async (file: File) => {
    setResumeError("");
    if (!isAllowedResume(file)) {
      setResumeError("Please upload a PDF, DOC, or DOCX file.");
      return;
    }
    if (file.size > RESUME_MAX_BYTES) {
      setResumeError("Resume must be 5MB or smaller.");
      return;
    }

    setUploading(true);
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/v1/careers/upload-resume", {
        method: "POST",
        body,
      });
      const json = await res.json();
      if (json.success && json.data?.url) {
        setFormData((prev) => ({
          ...prev,
          resumeUrl: json.data.url,
          resumeFileName: json.data.fileName ?? file.name,
        }));
        setResumeFileName(json.data.fileName ?? file.name);
      } else {
        setResumeError(json.error?.message ?? "Failed to upload resume.");
        setFormData((prev) => ({ ...prev, resumeUrl: "", resumeFileName: "" }));
        setResumeFileName("");
      }
    } catch {
      setResumeError("Failed to upload resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    if (!formData.resumeUrl) {
      setResumeError("Please upload your resume.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/v1/leads/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) setSubmitted(true);
      else setSubmitError(json.error?.message ?? "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="font-sans">
        <ParallaxHero
          title="Application Submitted"
          subtitle="Thank you for your interest"
          backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"
        />

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
      </div>
    );
  }

  return (
    <div className="font-sans">
      <ParallaxHero
        title="Apply for a Position"
        subtitle="Start your journey with ALS"
        backgroundImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2015&q=80"
      />

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

              {/* Resume Upload */}
              <div>
                <label className="block text-sm font-semibold text-white mb-2">
                  Upload Resume *
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={RESUME_ACCEPT}
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleResumeUpload(file);
                    e.target.value = "";
                  }}
                />
                <div className="rounded-lg border border-gray-600 bg-[#1d293d] p-4">
                  {formData.resumeUrl ? (
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <FaPaperclip className="w-4 h-4 text-[#00a69c] shrink-0" />
                        <span className="text-white text-sm truncate">{resumeFileName || "Resume uploaded"}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, resumeUrl: "" }));
                          setResumeFileName("");
                          setResumeError("");
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                        aria-label="Remove resume"
                      >
                        <FaXmark className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      disabled={uploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-600 px-4 py-6 text-sm text-gray-300 hover:border-[#00a69c] hover:text-white transition-colors disabled:opacity-60"
                    >
                      <FaPaperclip className="w-4 h-4" />
                      {uploading ? "Uploading resume..." : "Click to upload resume (PDF, DOC, DOCX — max 5MB)"}
                    </button>
                  )}
                </div>
                {resumeError && (
                  <p className="text-xs text-red-400 mt-2">{resumeError}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Your resume is uploaded securely via Cloudinary. Maximum file size is 5MB.
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
                {submitError && (
                  <p className="text-sm text-red-400 text-center mb-4">{submitError}</p>
                )}
                <button
                  type="submit"
                  disabled={loading || uploading || !formData.resumeUrl}
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
    </div>
  );
}
