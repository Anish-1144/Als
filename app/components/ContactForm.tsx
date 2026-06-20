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
import { FaPaperPlane } from "react-icons/fa6";

interface ContactFormProps {
  submitButtonText: string;
  isConsultationForm?: boolean;
}

export default function ContactForm({
  submitButtonText,
  isConsultationForm = false,
}: ContactFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: isConsultationForm ? "phone-consultation" : "home-loan",
    consultationType: isConsultationForm ? "phone" : "",
    preferredTime: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
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
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const endpoint = isConsultationForm
      ? "/api/v1/leads/consultation"
      : "/api/v1/leads/contact";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        setSubmitStatus("success");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          subject: isConsultationForm ? "phone-consultation" : "home-loan",
          consultationType: isConsultationForm ? "phone" : "",
          preferredTime: "",
          message: "",
        });
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaPaperPlane className="w-6 h-6 text-green-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-gray-400">We'll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Fields */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            First Name *
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1d293d] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00a69c] focus:border-transparent transition-colors text-white placeholder-gray-500"
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Last Name *
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1d293d] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00a69c] focus:border-transparent transition-colors text-white placeholder-gray-500"
            placeholder="Enter your last name"
          />
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1d293d] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00a69c] focus:border-transparent transition-colors text-white placeholder-gray-500"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#1d293d] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00a69c] focus:border-transparent transition-colors text-white placeholder-gray-500"
            placeholder="0400 000 000"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          {isConsultationForm ? "Consultation Topic *" : "Type of Loan *"}
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-[#1d293d] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00a69c] focus:border-transparent transition-colors text-white"
        >
          {isConsultationForm ? (
            <>
              <option value="phone-consultation">Phone Consultation</option>
              <option value="video-consultation">Video Consultation</option>
              <option value="in-person-consultation">
                In-Person Consultation
              </option>
              <option value="general-inquiry">General Inquiry</option>
            </>
          ) : (
            <>
              <option value="home-loan">Home Loan</option>
              <option value="refinancing">Refinancing</option>
              <option value="investment-property">Investment Property</option>
              <option value="commercial-loan">Commercial Loan</option>
              <option value="construction-loan">Construction Loan</option>
              <option value="bridging-finance">Bridging Finance</option>
              <option value="other">Other</option>
            </>
          )}
        </select>
      </div>

      {/* Consultation Type - Only show for consultation form */}
      {isConsultationForm && (
        <div>
          <label
            htmlFor="consultationType"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Preferred Consultation Type *
          </label>
          <select
            id="consultationType"
            name="consultationType"
            value={formData.consultationType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[#1d293d] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00a69c] focus:border-transparent transition-colors text-white"
          >
            <option value="phone">Phone Call</option>
            <option value="video">Video Call</option>
            <option value="in-person">In-Person Meeting</option>
          </select>
        </div>
      )}

      {/* Preferred Time - Only show for consultation form */}
      {isConsultationForm && (
        <div>
          <label
            htmlFor="preferredTime"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Preferred Time
          </label>
          <input
            type="text"
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[#1d293d] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00a69c] focus:border-transparent transition-colors text-white placeholder-gray-500"
            placeholder="e.g., Monday mornings, weekday evenings, etc."
          />
        </div>
      )}

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-[#1d293d] border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#00a69c] focus:border-transparent transition-colors resize-vertical text-white placeholder-gray-500"
          placeholder="Tell us about your property goals, loan requirements, or any questions you have..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 bg-[#00a69c] hover:bg-[#0d8a99] disabled:bg-[#00a69c]/60"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Sending...
          </>
        ) : (
          <>
            {submitButtonText}
            <FaPaperPlane className="w-4 h-4" />
          </>
        )}
      </button>

      {submitStatus === "error" && (
        <p className="text-red-400 text-sm text-center">
          Something went wrong. Please try again or call us directly.
        </p>
      )}

      {/* Privacy Notice */}
      <p className="text-xs text-gray-500 text-center">
        By submitting this form, you consent to being contacted by our team
        regarding your inquiry. We respect your privacy and will never share
        your information with third parties.
      </p>
    </form>
  );
}
