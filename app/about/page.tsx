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

import { useEffect, useState } from "react";
import PageHero from "../components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import { useApiList } from "@/lib/hooks/useApiList";
import { clientApiData } from "@/lib/api-client";
import { mergeAboutContent, type AboutContent, isSectionVisible } from "@/lib/page-content";
import {
  FaShield,
  FaEye,
  FaHeart,
  FaCheck,
  FaPhone,
  FaEnvelope,
  FaTrophy,
  FaStar,
  FaQuoteLeft,
  FaBuilding,
  FaCircleCheck,
  FaMapPin,
  FaCalendarDays,
  FaLinkedin,
  FaAward,
  FaMedal,
} from "react-icons/fa6";
import Link from "next/link";
import { formatDisplayDate } from "@/lib/format-date";
import {
  getActiveTeam,
  getActiveAwards,
  getActiveTestimonials,
  getActiveCommunityPosts,
  getActiveLenders,
} from "@/lib/mock-data";

const COMMITMENT_ICONS = [FaShield, FaEye, FaHeart];

export default function AboutPage() {
  const [pageContent, setPageContent] = useState<AboutContent>(() => mergeAboutContent());

  useEffect(() => {
    clientApiData<{ content?: Partial<AboutContent> }>("/pages/about").then((data) => {
      if (data?.content) setPageContent(mergeAboutContent(data.content));
    });
  }, []);

  const { data: teamMembers } = useApiList("/team", getActiveTeam());
  const { data: awards } = useApiList("/awards", getActiveAwards());
  const { data: testimonials } = useApiList("/testimonials", getActiveTestimonials());
  const { data: communityPosts } = useApiList("/community-posts", getActiveCommunityPosts());
  const { data: lenders } = useApiList("/lenders", getActiveLenders());

  // Form states
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "email",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const sortedTeam = teamMembers.sort(
    (a, b) => (a.order || 0) - (b.order || 0),
  );
  const sortedAwards = awards.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (a.order || 0) - (b.order || 0);
  });
  const sortedTestimonials = testimonials
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .slice(0, 6);
  const sortedCommunity = communityPosts
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .slice(0, 6);
  const sortedLenders = lenders
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return (a.order || 0) - (b.order || 0);
    })
    .slice(0, 12);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          />
        ))}
      </div>
    );
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch("/api/v1/leads/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      });
      const json = await res.json();
      if (json.success) setFormSubmitted(true);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <>
      <PageHero
        slug="about"
        fallback={getPageHeroFallback("about", { height: "h-90" })}
      />

      {/* OUR VISION - Mission Section Like ALIC */}
      {isSectionVisible(pageContent.vision) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video/Image Left Side */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pageContent.vision.imageUrl}
                  alt={pageContent.vision.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="text-white">
              {pageContent.vision.badge && (
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                  <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                    {pageContent.vision.badge}
                  </span>
                </div>
              )}

              <h2 className="text-4xl md:text-5xl font-besley font-medium mb-8 leading-tight">
                {pageContent.vision.title}
              </h2>

              <div className="space-y-6 text-gray-300 leading-relaxed">
                {pageContent.vision.body.split(/\n\n+/).map((para, i) => (
                  <p key={i} className={i === 4 ? "text-white font-medium" : undefined}>
                    {para}
                  </p>
                ))}
              </div>

              <Link
                href={pageContent.vision.ctaLink}
                className="inline-block mt-8 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-[#1d293d] transition-colors duration-200 uppercase tracking-wider text-sm"
              >
                {pageContent.vision.ctaText}
              </Link>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* FOUNDER MESSAGE */}
      {isSectionVisible(pageContent.founder) && (
      <section
        id="founder"
        className="py-16 px-6 md:px-12 lg:px-24 bg-[#e6e5e3]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-3 space-y-6">
              <div>
                {pageContent.founder.badge && (
                  <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-3 py-1 rounded-full mb-4">
                    <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                    <span className="text-[#00a69c] text-xs font-medium uppercase tracking-wider">
                      {pageContent.founder.badge}
                    </span>
                  </div>
                )}
                <h2 className="text-3xl md:text-4xl font-besley font-medium text-gray-800 mb-6 leading-tight">
                  {pageContent.founder.title}
                </h2>
              </div>

              <div className="space-y-4 text-gray-700">
                {pageContent.founder.body.split(/\n\n+/).map((para, i) => (
                  <p key={i} className="leading-relaxed text-base">
                    {para}
                  </p>
                ))}
              </div>

              <div className="pt-6 mt-8">
                <div className="text-2xl font-besley text-gray-500 italic mb-1 font-light">
                  {pageContent.founder.signatureShort}
                </div>
                <h3 className="text-xl font-besley font-semibold text-gray-800 mb-1">
                  {pageContent.founder.name}
                </h3>
                <p className="text-[#00a69c] font-medium text-sm">
                  {pageContent.founder.role}
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-sm ml-auto">
                <div
                  className="aspect-[3/4] bg-center bg-cover flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${pageContent.founder.imageUrl})`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* OUR COMMITMENTS */}
      {isSectionVisible(pageContent.commitments) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 --bg-[#2d3544]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {pageContent.commitments.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                  {pageContent.commitments.badge}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">
              {pageContent.commitments.title}
            </h2>
            {pageContent.commitments.subtitle && (
              <p className="text-lg text-gray-400 max-w-3xl mx-auto">
                {pageContent.commitments.subtitle}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pageContent.commitments.cards.map((card, index) => {
              const Icon = COMMITMENT_ICONS[index] ?? FaShield;
              const isMiddle = index === 1;
              return (
                <div
                  key={index}
                  className={`group p-8 rounded-2xl transition-all duration-300 border ${
                    isMiddle
                      ? "bg-[#00a69c] shadow-xl border-[#00a69c] scale-105"
                      : "bg-[#1d293d] shadow-lg hover:shadow-xl border-gray-600 hover:border-[#00a69c]"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${
                      isMiddle ? "bg-white/20" : "bg-[#00a69c]"
                    }`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-besley font-semibold text-white mb-4">
                    {card.title}
                  </h3>
                  <p className={`leading-relaxed ${isMiddle ? "text-white/90" : "text-gray-400"}`}>
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Team Members Section */}
      {isSectionVisible(pageContent.team) && (
      <section className="py-20 px-6 md:px-12 lg:px-24 --bg-[#2d3544]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {pageContent.team.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                  {pageContent.team.badge}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8 leading-tight">
              {pageContent.team.title}
            </h2>
            {pageContent.team.subtitle && (
              <div className="max-w-4xl mx-auto">
                <p className="text-lg text-gray-300 leading-relaxed mb-4">
                  {pageContent.team.subtitle}
                </p>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedTeam.length > 0 ? (
              sortedTeam.map((member, index) => (
                <div
                  key={member.name || index}
                  className="bg-[#1d293d] rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="relative bg-gradient-to-t from-[#1d293d] via-[#1d293d]/60 to-transparent h-72">
                    {member.image ? (
                      <div
                        className="w-full h-full bg-cover bg-center"
                        
                        style={{ backgroundImage: `url(${member.image})`, backgroundPosition: "center 25%" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-32 h-32 bg-[#00a69c] rounded-full flex items-center justify-center">
                          <span className="text-5xl font-besley font-bold text-white">
                            {member.name
                              ?.split(" ")
                              .map((n: string) => n[0])
                              .join("")
                              .slice(0, 2)}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-2xl font-besley font-semibold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#00a69c]/80 font-medium text-sm">
                        {member.title}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    {member.bio && (
                      <p className="text-gray-400 leading-relaxed mb-4 text-sm">
                        {member.bio}
                      </p>
                    )}
                    <div className="space-y-2 pt-4 border-t border-gray-600">
                      {member.phone && (
                        <div className="flex items-center gap-3">
                          <FaPhone className="w-4 h-4 text-[#00a69c] flex-shrink-0" />
                          <a
                            href={`tel:${member.phone}`}
                            className="text-gray-200 hover:text-[#00a69c] text-sm"
                          >
                            {member.phone}
                          </a>
                        </div>
                      )}
                      {member.email && (
                        <div className="flex items-center gap-3">
                          <FaEnvelope className="w-4 h-4 text-[#00a69c] flex-shrink-0" />
                          <a
                            href={`mailto:${member.email}`}
                            className="text-gray-200 hover:text-[#00a69c] text-sm break-all"
                          >
                            {member.email}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Default team members if none from CMS
              <>
                <div className="bg-[#1d293d] rounded-2xl p-8 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-[#00a69c] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-besley font-bold text-white">
                        JM
                      </span>
                    </div>
                    <h3 className="text-xl font-besley font-semibold text-white mb-1">
                      John Martis
                    </h3>
                    <p className="text-[#00a69c] font-medium text-sm mb-4">
                      Credit/Operation Manager
                    </p>
                  </div>
                  <div className="space-y-4 text-sm text-gray-400">
                    <p className="leading-relaxed">
                      Meet John Martis, an experienced Credit Manager with over
                      15 years of experience in mortgage industry both Australia
                      and US residential mortgage.
                    </p>
                    <p className="font-medium text-white mt-6">
                      For any application/credit enquiries, please contact John:
                    </p>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center gap-3">
                        <FaPhone className="w-4 h-4 text-[#00a69c]" />
                        <span className="text-gray-200">03 9087 7719</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="w-4 h-4 text-[#00a69c]" />
                        <span className="text-gray-200 break-all">
                          johnm@alsmortgagesolutions.com.au
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1d293d] rounded-2xl p-8 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-[#00a69c] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-besley font-bold text-white">
                        NL
                      </span>
                    </div>
                    <h3 className="text-xl font-besley font-semibold text-white mb-1">
                      Navin Gregory Lobo
                    </h3>
                    <p className="text-[#00a69c] font-medium text-sm mb-4">
                      Credit Support Associate
                    </p>
                  </div>
                  <div className="space-y-4 text-sm text-gray-400">
                    <p className="leading-relaxed">
                      Navin is new to the mortgage industry with passion to
                      learn. He had worked as client's relationship manager
                      prior to joining us. Having over 15 years of experience,
                      he is very dedicated to delivering exceptional customer
                      service.
                    </p>
                    <p className="font-medium text-white mt-6">
                      For application status post submission, please contact
                      Navin:
                    </p>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center gap-3">
                        <FaPhone className="w-4 h-4 text-[#00a69c]" />
                        <span className="text-gray-200">03 9087 7719</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="w-4 h-4 text-[#00a69c]" />
                        <span className="text-gray-200 break-all">
                          navinl@alsmortgagesolutions.com.au
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#1d293d] rounded-2xl p-8 shadow-xl">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-[#00a69c] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-besley font-bold text-white">
                        BB
                      </span>
                    </div>
                    <h3 className="text-xl font-besley font-semibold text-white mb-1">
                      Benetta Blaze
                    </h3>
                    <p className="text-[#00a69c] font-medium text-sm mb-4">
                      Admin Associate
                    </p>
                  </div>
                  <div className="space-y-4 text-sm text-gray-400">
                    <p className="leading-relaxed">
                      Benetta handles post settlement enquiries for our clients.
                      She knows that doing the right thing first time, which the
                      clients can have peace of mind to know their offset
                      accounts are linked and their repayments are set and all
                      in good hands.
                    </p>
                    <p className="font-medium text-white mt-6">
                      For any post settlement enquiries, please contact Benetta:
                    </p>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center gap-3">
                        <FaPhone className="w-4 h-4 text-[#00a69c]" />
                        <span className="text-gray-200">03 9087 7718</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="w-4 h-4 text-[#00a69c]" />
                        <span className="text-gray-200 break-all">
                          benettab@alsmortgagesolutions.com.au
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      )}

      {/* AWARDS & RECOGNITION */}
      {isSectionVisible(pageContent.achievements) && (
      <section
        id="awards"
        className="py-20 px-6 md:px-12 lg:px-24 bg-[#e2dcd0]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {pageContent.achievements.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                  {pageContent.achievements.badge}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-gray-800 mb-6">
              {pageContent.achievements.title}
            </h2>
            {pageContent.achievements.subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {pageContent.achievements.subtitle}
              </p>
            )}
          </div>

          {sortedAwards.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedAwards.slice(0, 6).map((award, index) => (
                <div
                  key={award.id || index}
                  className={`bg-[#1d293d] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow ${award.featured ? "border-2 border-[#00a69c]" : "border border-gray-700"}`}
                >
                  {award.image && (
                    <div className="h-48 bg-[#1d293d]">
                      <img
                        src={award.image}
                        alt={award.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-besley font-semibold text-white">
                        {award.title}
                      </h3>
                      <div className="bg-[#00a69c]/20 px-3 py-1 rounded-full ml-2">
                        <span className="text-[#00a69c] font-bold text-sm">
                          {award.year}
                        </span>
                      </div>
                    </div>
                    {award.organization && (
                      <p className="text-sm text-[#00a69c] font-medium mb-2">
                        {award.organization}
                      </p>
                    )}
                    {award.description && (
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {award.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaTrophy className="w-16 h-16 text-[#00a69c] mx-auto mb-4" />
              <p className="text-gray-600">
                Award information will be displayed here.
              </p>
            </div>
          )}
        </div>
      </section>
      )}

      {/* TESTIMONIALS */}
      {isSectionVisible(pageContent.testimonials) && (
      <section
        id="testimonials"
        className="py-20 px-6 md:px-12 lg:px-24 --bg-[#2d3544]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {pageContent.testimonials.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                  {pageContent.testimonials.badge}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
              {pageContent.testimonials.title}
            </h2>
            {pageContent.testimonials.subtitle && (
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {pageContent.testimonials.subtitle}
              </p>
            )}
          </div>

          {sortedTestimonials.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.clientName || index}
                  className="bg-[#1d293d] rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow relative"
                >
                  <div className="absolute top-6 right-6 opacity-10">
                    <FaQuoteLeft className="w-12 h-12 text-[#00a69c]" />
                  </div>
                  <div className="mb-4 relative z-10">
                    {renderStars(testimonial.rating || 5)}
                  </div>
                  <p className="text-gray-200 leading-relaxed mb-6 relative z-10 italic">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-600">
                    {testimonial.clientImage ? (
                      <img
                        src={testimonial.clientImage}
                        alt={testimonial.clientName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-[#00a69c]/20 rounded-full flex items-center justify-center">
                        <span className="text-[#00a69c] font-semibold">
                          {testimonial.clientName
                            ?.split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.clientName}
                      </h4>
                      {testimonial.clientTitle && (
                        <p className="text-sm text-gray-500">
                          {testimonial.clientTitle}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaQuoteLeft className="w-16 h-16 text-[#00a69c] mx-auto mb-4" />
              <p className="text-gray-500">
                Client testimonials will be displayed here.
              </p>
            </div>
          )}
        </div>
      </section>
      )}

      {/* CAREERS CTA */}
      {isSectionVisible(pageContent.joinTeam) && (
      <section
        id="careers"
        className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-[#00a69c] to-[#00a69c]"
      >
        <div className="max-w-6xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-besley font-medium mb-6">
            {pageContent.joinTeam.title}
          </h2>
          <p className="text-xl text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
            {pageContent.joinTeam.subtitle}
          </p>
          <Link
            href={pageContent.joinTeam.buttonLink}
            className="inline-block bg-white text-[#00a69c] px-8 py-4 rounded-lg font-medium hover:--bg-[#2d3544] hover:text-white transition-colors duration-200"
          >
            {pageContent.joinTeam.buttonText}
          </Link>
        </div>
      </section>
      )}

      {/* COMMUNITY INVOLVEMENT */}
      {isSectionVisible(pageContent.givingBack) && (
      <section
        id="community"
        className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {pageContent.givingBack.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                  {pageContent.givingBack.badge}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
              {pageContent.givingBack.title}
            </h2>
            {pageContent.givingBack.subtitle && (
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {pageContent.givingBack.subtitle}
              </p>
            )}
          </div>

          {sortedCommunity.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedCommunity.map((post, index) => (
                <div
                  key={post.id || index}
                  className="bg-[#1d293d] rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-64 overflow-hidden bg-[#1d293d]">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#00a69c]/20 to-[#00a69c]/20">
                        <FaHeart className="w-16 h-16 text-[#00a69c]" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-besley font-semibold text-white mb-3 group-hover:text-[#00a69c] transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                      {post.date && (
                        <div className="flex items-center gap-1">
                          <FaCalendarDays className="w-4 h-4" />
                          <span>
                            {formatDisplayDate(post.date)}
                          </span>
                        </div>
                      )}
                      {post.location && (
                        <div className="flex items-center gap-1">
                          <FaMapPin className="w-4 h-4" />
                          <span>{post.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaHeart className="w-16 h-16 text-[#00a69c] mx-auto mb-4" />
              <p className="text-gray-500">
                Community involvement posts will be displayed here.
              </p>
            </div>
          )}
        </div>
      </section>
      )}

      {/* PANEL OF LENDERS */}
      {isSectionVisible(pageContent.partners) && (
      <section
        id="lenders"
        className="py-20 px-6 md:px-12 lg:px-24 --bg-[#2d3544]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {pageContent.partners.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                  {pageContent.partners.badge}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
              {pageContent.partners.title}
            </h2>
            {pageContent.partners.subtitle && (
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {pageContent.partners.subtitle}
              </p>
            )}
          </div>

          {sortedLenders.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {sortedLenders.map((lender, index) => (
                <div
                  key={lender.id || index}
                  className={`bg-[#1d293d] rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden ${lender.featured ? "ring-2 ring-[#00a69c]" : ""}`}
                >
                  <div className="aspect-square bg-[#1d293d] p-4 flex items-center justify-center border-b border-gray-600">
                    {lender.logo ? (
                      <img
                        src={lender.logo}
                        alt={lender.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="text-center">
                        <FaBuilding className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                        <span className="text-xs font-medium text-gray-400">
                          {lender.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaBuilding className="w-16 h-16 text-[#00a69c] mx-auto mb-4" />
              <p className="text-gray-500">
                Lender information will be displayed here.
              </p>
            </div>
          )}
        </div>
      </section>
      )}

      {/* GET IN TOUCH / CONTACT */}
      {isSectionVisible(pageContent.contact) && (
      <section
        id="contact"
        className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            {pageContent.contact.badge && (
              <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
                <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
                <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                  {pageContent.contact.badge}
                </span>
              </div>
            )}
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-6">
              {pageContent.contact.title}
            </h2>
            {pageContent.contact.subtitle && (
              <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
                {pageContent.contact.subtitle}
              </p>
            )}
          </div>

          {formSubmitted ? (
            <div className="max-w-3xl mx-auto text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <FaCircleCheck className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-besley font-medium text-white mb-4">
                {pageContent.contact.successTitle}
              </h3>
              <p className="text-lg text-gray-400 mb-8">
                {pageContent.contact.successMessage}
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-5 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="text-2xl font-besley font-semibold text-white mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#00a69c]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaPhone className="w-5 h-5 text-[#00a69c]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Phone</h4>
                        <a
                          href={`tel:${pageContent.contact.phone.replace(/\s/g, "")}`}
                          className="text-[#00a69c] hover:underline"
                        >
                          {pageContent.contact.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#00a69c]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaEnvelope className="w-5 h-5 text-[#00a69c]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Email</h4>
                        <a
                          href={`mailto:${pageContent.contact.email}`}
                          className="text-[#00a69c] hover:underline break-all"
                        >
                          {pageContent.contact.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#00a69c]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <FaCircleCheck className="w-5 h-5 text-[#00a69c]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          Address
                        </h4>
                        <p className="text-gray-400">
                          {pageContent.contact.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="--bg-[#2d3544] rounded-2xl p-8 md:p-12 shadow-lg">
                  <h3 className="text-2xl font-besley font-semibold text-white mb-6">
                    {pageContent.contact.formTitle}
                  </h3>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={contactForm.name}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              name: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 bg-[#1d293d] text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              email: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 bg-[#1d293d] text-white"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={contactForm.phone}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              phone: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 bg-[#1d293d] text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white mb-2">
                          Subject *
                        </label>
                        <input
                          type="text"
                          name="subject"
                          value={contactForm.subject}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              subject: e.target.value,
                            })
                          }
                          required
                          className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 bg-[#1d293d] text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg border border-gray-600 focus:border-[#00a69c] focus:ring-2 focus:ring-[#00a69c]/20 resize-none bg-[#1d293d] text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={formLoading}
                      className="w-full bg-[#00a69c] text-white px-8 py-4 rounded-lg font-medium hover:bg-[#0d8a99] transition-colors disabled:bg-gray-600"
                    >
                      {formLoading ? "Sending..." : "Send Message"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      )}
    </>
  );
}
