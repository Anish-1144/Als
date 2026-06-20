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

import Link from "next/link";
import ServerPageHero from "../components/ServerPageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import {
  FaHouse,
  FaHandshake,
  FaKey,
  FaChartLine,
  FaDollarSign,
  FaUsers,
  FaCar,
  FaBuilding,
} from "react-icons/fa6";

import { getLoansData } from "@/lib/api-server";

async function getLoans() {
  return getLoansData();
}

// Icon mapping for different loan types
const loanIcons: { [key: string]: any } = {
  "home-loans": FaHouse,
  refinancing: FaHandshake,
  renovating: FaKey,
  "commercial-loans": FaBuilding,
  "car-financing": FaCar,
  "smsf-financing": FaChartLine,
};

export default async function LoansPage() {
  const loans = await getLoans();

  return (
    <>
      <ServerPageHero slug="loans" fallback={getPageHeroFallback("loans")} />

      {/* Introduction Section */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#353f4e]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8 leading-tight">
            Find Your Perfect Loan Solution
          </h2>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="w-16 h-px bg-[#00a69c]"></div>
            <div className="w-3 h-3 bg-[#00a69c] rounded-full"></div>
            <div className="w-16 h-px bg-[#00a69c]"></div>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-12">
            At ALS Mortgage Solutions, we offer a comprehensive range of lending
            products to meet all your financial needs. From home loans to
            business finance, our expert team is here to find the right solution
            for you.
          </p>
        </div>
      </section>

      {/* Loan Products Grid */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#e6e5e3]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#00a69c]/20 px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-[#00a69c] rounded-full"></div>
              <span className="text-[#00a69c] text-sm font-medium uppercase tracking-wider">
                LOAN PRODUCTS
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-gray-900 mb-8">
              Our Lending Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive range of loan products designed to meet
              your unique financial goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* @ts-ignore */}
            {loans.map((loan, index) => {
              const IconComponent = loanIcons[loan.slug] || FaDollarSign;

              return (
                <Link key={index} href={`/loans/${loan.slug}`}>
                  <div className="group bg-[#2d3544] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-600 hover:border-[#00a69c] cursor-pointer h-full">
                    <div className="w-16 h-16 bg-[#00a69c] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-2xl font-besley font-semibold text-white mb-4 group-hover:text-[#00a69c] transition-colors">
                      {loan.title}
                    </h3>

                    <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">
                      {loan.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      {loan.interestRateFrom && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-600">
                          <span className="text-sm text-gray-400">
                            Rate from:
                          </span>
                          <span className="font-semibold text-[#00a69c]">
                            {loan.interestRateFrom}
                          </span>
                        </div>
                      )}
                      {loan.minimumDeposit && (
                        <div className="flex justify-between items-center py-2 border-b border-gray-600">
                          <span className="text-sm text-gray-400">
                            Min deposit:
                          </span>
                          <span className="font-semibold text-white">
                            {loan.minimumDeposit}
                          </span>
                        </div>
                      )}
                      {loan.loanTerm && (
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm text-gray-400">
                            Loan term:
                          </span>
                          <span className="font-semibold text-white">
                            {loan.loanTerm}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-[#00a69c] font-medium group-hover:text-[#0d8a99] transition-colors">
                      <span>Learn More</span>
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#353f4e]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">
              Why Choose ALS Mortgage Solutions?
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Experience the difference with our comprehensive lending services
              and expert guidance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-[#2d3544] p-8 rounded-2xl">
              <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaDollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-besley font-semibold text-white mb-4">
                Competitive Rates
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Access some of the market's most competitive interest rates
                across all our loan products
              </p>
            </div>

            <div className="text-center bg-[#2d3544] p-8 rounded-2xl">
              <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHandshake className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-besley font-semibold text-white mb-4">
                Expert Guidance
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Personalized advice from experienced brokers who understand your
                unique financial situation
              </p>
            </div>

            <div className="text-center bg-[#2d3544] p-8 rounded-2xl">
              <div className="w-16 h-16 bg-[#00a69c] rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-besley font-semibold text-white mb-4">
                Comprehensive Service
              </h3>
              <p className="text-gray-300 leading-relaxed">
                End-to-end support from application to settlement and beyond
                with ongoing relationship management
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-[#00a69c]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-besley font-medium text-white mb-8">
            Ready to Find Your Perfect Loan?
          </h2>
          <p className="text-xl text-white/80 mb-12 leading-relaxed">
            Contact our expert team today to discuss your needs and get a
            personalized loan solution that works for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#00a69c] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg">
              Get Pre-Approved
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#00a69c] transition-colors duration-300">
              Calculate Repayments
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
