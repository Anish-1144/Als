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

import ContactForm from "../components/ContactForm";
import {
  FaCalendarAlt,
  FaUser,
  FaFileAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const mockConsultationData = {
  title: "Book a Consultation",
  subtitle: "Schedule a free consultation with our expert mortgage brokers.",
  heroSection: {
    title: "Book Your Free Consultation",
    subtitle:
      "Get personalized advice from our experienced mortgage brokers. We'll help you understand your options and find the best loan solution for your needs.",
    backgroundImage: "/consultation-hero-background.jpg",
  },
  consultationInfo: {
    consultationTypes: [
      {
        title: "Phone Consultation",
        description: "Convenient phone call at your preferred time",
        duration: "30-45 minutes",
        icon: "phone",
      },
      {
        title: "Video Consultation",
        description: "Face-to-face meeting via video call",
        duration: "45-60 minutes",
        icon: "video",
      },
      {
        title: "In-Person Meeting",
        description: "Meet at our office or your preferred location",
        duration: "60-90 minutes",
        icon: "person",
      },
    ],
    benefits: [
      "Free assessment of your financial situation",
      "Personalized loan recommendations",
      "Competitive rate comparison",
      "Pre-approval guidance",
      "Ongoing support throughout the process",
    ],
  },
  formSettings: {
    formTitle: "Schedule Your Consultation",
    formSubtitle:
      "Choose your preferred consultation type and we'll contact you to confirm the details.",
    submitButtonText: "Book Consultation",
  },
};

export default function BookConsultationPage() {
  const dataToUse = mockConsultationData;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#353f4e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#00a69c] to-[#353f4e]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15),transparent_50%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16">
          <div className="text-center text-white">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">
              {dataToUse.heroSection.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {dataToUse.heroSection.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Content */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#e6e5e3]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Consultation Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Choose Your Consultation Type
              </h2>

              {/* Consultation Types */}
              <div className="space-y-6 mb-12">
                {dataToUse.consultationInfo?.consultationTypes?.map(
                  (type, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-[#00a69c]/10 rounded-xl border border-[#00a69c]/30"
                    >
                      <div className="w-12 h-12 bg-[#00a69c]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        {type.icon === "phone" && (
                          <FaPhone className="w-5 h-5 text-[#00a69c]" />
                        )}
                        {type.icon === "video" && (
                          <FaUser className="w-5 h-5 text-[#00a69c]" />
                        )}
                        {type.icon === "person" && (
                          <FaCalendarAlt className="w-5 h-5 text-[#00a69c]" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {type.title}
                        </h3>
                        <p className="text-gray-600 mb-2">{type.description}</p>
                        <p className="text-sm text-[#00a69c] font-medium">
                          Duration: {type.duration}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* Benefits */}
              <div className="p-6 bg-[#00a69c]/10 rounded-xl border border-[#00a69c]/30">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <FaFileAlt className="w-5 h-5" />
                  What You'll Get
                </h3>
                <ul className="space-y-2 text-sm text-[#00a69c]">
                  {dataToUse.consultationInfo?.benefits?.map(
                    (benefit, index) => (
                      <li key={index}>â€¢ {benefit}</li>
                    ),
                  )}
                </ul>
              </div>

              {/* Quick Contact */}
              <div className="mt-8 p-6 bg-[#2d3544] rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Prefer to Call?
                </h3>
                <div className="flex items-center gap-4 mb-2">
                  <FaPhone className="w-4 h-4 text-[#00a69c]" />
                  <span className="text-white font-medium">1300 257 467</span>
                </div>
                <div className="flex items-center gap-4">
                  <FaEnvelope className="w-4 h-4 text-[#00a69c]" />
                  <span className="text-white font-medium">
                    info@example.com
                  </span>
                </div>
              </div>
            </div>

            {/* Consultation Form */}
            <div>
              <div className="bg-[#2d3544] rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {dataToUse.formSettings?.formTitle}
                </h2>
                {dataToUse.formSettings?.formSubtitle && (
                  <p className="text-gray-300 mb-8">
                    {dataToUse.formSettings.formSubtitle}
                  </p>
                )}

                <ContactForm
                  submitButtonText={
                    dataToUse.formSettings?.submitButtonText ??
                    "Book Consultation"
                  }
                  isConsultationForm={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
