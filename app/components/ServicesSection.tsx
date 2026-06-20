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
import { FaArrowRight } from "react-icons/fa6";
import { HiHome, HiOfficeBuilding, HiTrendingUp } from "react-icons/hi";

const iconMap: { [key: string]: any } = {
  HiHome,
  HiOfficeBuilding,
  HiTrendingUp,
};

interface Service {
  title: string;
  description: string;
  icon: string;
  link: string;
}

interface ServicesSectionProps {
  services: {
    sectionTitle: string;
    sectionSubtitle: string;
    services: Service[];
  };
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#2d3544]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
            {services.sectionTitle}
          </h2>
          <p className="text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed text-pretty">
            {services.sectionSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.services.map((service: Service, index: number) => {
            const IconComponent = iconMap[service.icon] || HiHome;
            const isMiddle = index === 1;

            return (
              <Link key={index} href={service.link}>
                <div
                  className={`relative p-8 rounded-2xl transition-all duration-300 cursor-pointer group border ${
                    isMiddle
                      ? "bg-[#00a69c] text-white shadow-xl scale-105 border-[#00a69c]"
                      : "bg-[#1d293d] text-gray-100 hover:shadow-lg border-gray-600 hover:border-[#00a69c]"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      isMiddle
                        ? "bg-white/20"
                        : "bg-[#00a69c]/20 group-hover:bg-[#00a69c]/30"
                    } group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent
                      className={`w-8 h-8 ${isMiddle ? "text-white" : "text-[#00a69c]"}`}
                    />
                  </div>

                  <h3
                    className={`text-2xl font-bold mb-4 ${
                      isMiddle
                        ? "text-white"
                        : "text-white group-hover:text-[#00a69c]"
                    } transition-colors`}
                  >
                    {service.title}
                  </h3>

                  <p
                    className={`leading-relaxed ${isMiddle ? "text-blue-100" : "text-gray-400"}`}
                  >
                    {service.description}
                  </p>

                  <div className="mt-6">
                    <span
                      className={`inline-flex items-center font-medium ${
                        isMiddle ? "text-white" : "text-[#00a69c]"
                      }`}
                    >
                      Learn More
                      <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
