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

interface AwardsSectionProps {
  awards: {
    sectionTitle: string;
    description: string;
    founderName: string;
    founderTitle: string;
    founderImage?: { url: string };
  };
}

export default function AwardsSection({ awards }: AwardsSectionProps) {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-gray-100">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight text-balance text-white">
              {awards.sectionTitle}
            </h2>

            <p className="text-xl text-gray-400 mb-8 leading-relaxed text-pretty">
              {awards.description}
            </p>

            <div className="flex items-center gap-4 pt-8 border-t border-gray-600">
              <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">AH</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {awards.founderName}
                </h3>
                <p className="text-[#00a69c] text-sm">{awards.founderTitle}</p>
              </div>
            </div>
          </div>

          <div className="relative">
            {awards.founderImage && (
              <div
                className="aspect-[4/5] bg-cover bg-center rounded-2xl shadow-xl"
                style={{ backgroundImage: `url(${awards.founderImage?.url})` }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
