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
import Link from "next/link";
import type { FooterData as FooterType } from "@/lib/types";
import {
  FaPhone,
  FaEnvelope,
  FaLocationDot,
  FaChevronRight,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

interface FooterProps {
  footerData?: FooterType;
}

const socialIconMap: { [key: string]: any } = {
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  youtube: FaYoutube,
};

export default function Footer({ footerData }: FooterProps) {
  if (!footerData) return null;

  return (
    <footer className="relative text-white">
      {/* Background Image - City Skyline */}
      <div
        className="absolute inset-0 bg-cover bg-bottom bg-no-repeat"
        style={{
          backgroundImage: "url('/footer.jpg')",
        }}
      />
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-[#1d293d]/90" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-9 pb-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10">
          {/* Company Info - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img
                src={footerData.logoUrl ?? "/logo-bgr.png"}
                alt={footerData.companyName}
                className="h-12 w-auto"
              />
            </div>

            {footerData.description && (
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                {footerData.description}
              </p>
            )}

            {/* Contact Info with Icons */}
            <div className="space-y-3 text-sm">
              {footerData.contact?.phone && (
                <a
                  href={`tel:${footerData.contact.phone}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-[#00a69c] transition-colors"
                >
                  <FaPhone className="w-4 h-4 text-[#00a69c]" />
                  {footerData.contact.phone}
                </a>
              )}
              {footerData.contact?.email && (
                <a
                  href={`mailto:${footerData.contact.email}`}
                  className="flex items-center gap-3 text-gray-300 hover:text-[#00a69c] transition-colors"
                >
                  <FaEnvelope className="w-4 h-4 text-[#00a69c]" />
                  {footerData.contact.email}
                </a>
              )}
              {footerData.address && (
                <div className="flex items-start gap-3 text-gray-300">
                  <FaLocationDot className="w-4 h-4 text-[#00a69c] mt-0.5" />
                  <span>
                    {footerData.address.street && footerData.address.street}
                    {footerData.address.street &&
                      (footerData.address.city || footerData.address.state) &&
                      ", "}
                    {footerData.address.city && footerData.address.city}
                    {footerData.address.city &&
                      footerData.address.state &&
                      ", "}
                    {footerData.address.state && footerData.address.state}
                    {footerData.address.zipCode &&
                      ` ${footerData.address.zipCode}`}
                  </span>
                </div>
              )}
            </div>

            {/* Social Links */}
            {footerData.socialLinks && footerData.socialLinks.length > 0 && (
              <div className="flex gap-3 pt-4">
                {footerData.socialLinks.map((social, index) => {
                  const IconComponent =
                    socialIconMap[social.platform?.toLowerCase() || ""] ||
                    FaFacebookF;
                  return (
                    <a
                      key={index}
                      href={social.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 bg-white/10 hover:bg-[#00a69c] rounded flex items-center justify-center transition-colors"
                    >
                      <IconComponent className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Link Columns */}
          {footerData.footerLinks &&
            footerData.footerLinks.length > 0 &&
            footerData.footerLinks.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {section.title}
                </h4>
                {section.links && section.links.length > 0 && (
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.url || "#"}
                          className="flex items-center gap-2 text-gray-400 text-sm hover:text-[#00a69c] transition-colors group"
                        >
                          <FaChevronRight className="w-2 h-2 text-[#00a69c] group-hover:translate-x-0.5 transition-transform" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-600/50 mt-5 pt-3 text-center">
          <p className="text-gray-500 text-sm">
            {footerData.copyrightText ||
              `© ${new Date().getFullYear()} ${footerData.companyName}. All rights reserved.`}
          </p>
        </div>
      </div>
    </footer>
  );
}
