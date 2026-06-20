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

import { FaPhone, FaEnvelope } from "react-icons/fa6";

interface TeamMember {
  name: string;
  title: string;
  bio?: string;
  phone?: string;
  email?: string;
  image?: string;
}

interface TeamSectionProps {
  teamSection: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  teamMembers: TeamMember[];
}

export default function TeamSection({
  teamSection,
  teamMembers,
}: TeamSectionProps) {
  if (teamMembers.length === 0) return null;

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-balance">
            {teamSection.sectionTitle}
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto text-pretty">
            {teamSection.sectionSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {teamMembers.map((member: TeamMember, index: number) => (
            <div
              key={index}
              className="bg-[#2d3544] rounded-2xl p-8 hover:shadow-lg hover:shadow-black/20 transition-shadow duration-300 border border-gray-600"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  {member.image ? (
                    <div
                      className="w-20 h-20 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${member.image})` }}
                    />
                  ) : (
                    <div className="w-20 h-20 bg-[#00a69c] rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {member.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-[#00a69c] font-medium text-sm mb-3">
                    {member.title}
                  </p>

                  {member.bio && (
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {member.bio}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    {member.phone && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaPhone className="w-3 h-3" />
                        <span>{member.phone}</span>
                      </div>
                    )}
                    {member.email && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <FaEnvelope className="w-3 h-3" />
                        <span>{member.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
