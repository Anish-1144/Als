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

import PageHero from "@/app/components/PageHero";
import { getPageHeroFallback } from "@/lib/page-hero";
import ContactCTASection from "../../components/ContactCTASection";
import {
  FaPercent,
  FaDollarSign,
  FaArrowRight,
  FaGift,
  FaBookOpen,
  FaChartLine,
  FaHammer,
  FaHouse,
} from "react-icons/fa6";
import Link from "next/link";

export default function LoanRepaymentCalculatorPage() {
  return (
    <>
      <PageHero slug="calculator" fallback={getPageHeroFallback("calculator", { height: "h-80" })} />

      {/* Main Calculator Section - 2 Column Layout */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#1d293d]">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Calculator */}
            <div className="lg:col-span-2">
              {/* Calculator Header */}
              <div className="mb-6">
                <h1 className="text-3xl font-besley font-semibold text-white mb-3">
                  Loan Repayment Calculator
                </h1>
                <p className="text-lg text-gray-200 leading-relaxed">
                  Estimate your monthly loan repayments based on the loan
                  amount, interest rate, and loan term. Plan your budget with
                  confidence and understand your financial commitments.
                </p>
              </div>

              {/* Calculator Card */}
              <div className="bg-[#2d3544] rounded-2xl shadow-xl border border-gray-600 overflow-hidden">
                {/* Calculator Iframe */}
                <div className="relative bg-gradient-to-br from-green-900 to-emerald-950 p-8 min-h-[600px]">
                  <iframe
                    src="https://mercury.connective.com.au/calculators/loan-repayment-layout.html"
                    className="w-full h-[700px] border-0 rounded-lg bg-white"
                    title="Loan Repayment Calculator"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                  />
                </div>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 bg-[#2d3544] border border-[#00a69c] rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#00a69c] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">
                      Important Information
                    </h4>
                    <p className="text-sm text-gray-200 leading-relaxed">
                      This calculator provides estimates for illustrative
                      purposes only. Results are based on the information you
                      provide and should not be considered financial advice.
                      Actual loan terms may vary. Contact our team for
                      personalized advice.
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-8 bg-[#2d3544] rounded-2xl shadow-lg border border-gray-600 p-8">
                <h3 className="text-2xl font-besley font-semibold text-white mb-6">
                  Understanding Your Loan Repayments
                </h3>
                <div className="space-y-4 text-gray-200">
                  <p className="leading-relaxed">
                    Your loan repayments are determined by three main factors:
                    the loan amount (principal), the interest rate, and the loan
                    term. Understanding how these factors interact helps you
                    make informed decisions about your home loan.
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-[#1d293d] p-6 rounded-xl">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <FaPercent className="text-green-500" />
                        Principal & Interest
                      </h4>
                      <p className="text-sm mb-3">
                        Most home loans are principal and interest (P&I),
                        meaning each repayment includes:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>
                            <strong>Principal:</strong> Reduces your loan
                            balance
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>
                            <strong>Interest:</strong> Cost of borrowing the
                            money
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-[#1d293d] p-6 rounded-xl">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <FaDollarSign className="text-[#00a69c]" />
                        Interest-Only Loans
                      </h4>
                      <p className="text-sm mb-3">
                        Interest-only loans are typically used for investment
                        properties:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a69c] mt-1">•</span>
                          <span>Lower initial repayments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a69c] mt-1">•</span>
                          <span>No reduction in loan balance</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a69c] mt-1">•</span>
                          <span>Usually limited to 5 years</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#1d293d] p-6 rounded-xl mt-6">
                    <h4 className="font-semibold text-white mb-3">
                      Factors That Affect Your Repayments
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>
                            <strong>Loan Amount:</strong> Higher loan = higher
                            repayments
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>
                            <strong>Interest Rate:</strong> Even small rate
                            changes impact repayments
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>
                            <strong>Loan Term:</strong> Longer term = lower
                            repayments but more interest
                          </span>
                        </li>
                      </ul>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a69c] mt-1">✓</span>
                          <span>
                            <strong>Repayment Frequency:</strong> Weekly,
                            fortnightly, or monthly
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a69c] mt-1">✓</span>
                          <span>
                            <strong>Fixed vs Variable:</strong> Fixed rate
                            provides certainty
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#00a69c] mt-1">✓</span>
                          <span>
                            <strong>Offset Account:</strong> Can reduce interest
                            charged
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-[#1d293d] border border-amber-600 p-6 rounded-xl mt-6">
                    <h4 className="font-semibold text-white mb-3">Smart Tip</h4>
                    <p className="text-sm">
                      Making repayments fortnightly instead of monthly can save
                      you thousands over the life of your loan. By paying half
                      your monthly repayment every two weeks, you'll make an
                      extra month's payment each year, reducing your loan term
                      and total interest paid.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Government Benefits & Resources */}
            <div className="space-y-6">
              {/* Government Benefits Card */}
              <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-2xl shadow-lg border-2 border-green-600 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <FaGift className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Government Benefits</h3>
                      <p className="text-xs text-green-100">Grants & Offers</p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-white mb-3">
                    Available Support & Schemes
                  </h4>
                  <div className="space-y-3 text-sm text-gray-200">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p>
                        <strong>First Home Guarantee:</strong> Buy with as
                        little as 5% deposit without LMI
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p>
                        <strong>First Home Owner Grant:</strong> Up to $10,000
                        for eligible first home buyers
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p>
                        <strong>Stamp Duty Concessions:</strong> Reduced or
                        waived stamp duty for eligible buyers
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0"></div>
                      <p>
                        <strong>Home Builder Grant:</strong> Financial
                        assistance for new builds and renovations
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/resources/first-home-buyer-guide"
                    className="mt-4 w-full bg-green-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    Learn More About Benefits
                    <FaArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Other Calculators */}
              <div className="bg-[#2d3544] rounded-2xl shadow-lg border border-gray-600 overflow-hidden">
                <div className="bg-gradient-to-r from-[#00a69c] to-[#0d8a99] p-4">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <FaDollarSign className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Other Calculators</h3>
                      <p className="text-xs text-white/70">
                        Explore More Tools
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <Link
                    href="/resources/calculator/borrowing-capacity"
                    className="block p-4 rounded-xl bg-[#1d293d] hover:bg-[#3d4759] transition-all duration-300 border border-gray-600 group"
                  >
                    <h4 className="font-semibold text-white mb-1 group-hover:text-[#00a69c] transition-colors">
                      Borrowing Capacity Calculator
                    </h4>
                    <p className="text-sm text-gray-400">
                      Calculate how much you can borrow
                    </p>
                  </Link>

                  <Link
                    href="/resources/calculator/extra-repayments"
                    className="block p-4 rounded-xl bg-[#1d293d] hover:bg-[#3d4759] transition-all duration-300 border border-gray-600 group"
                  >
                    <h4 className="font-semibold text-white mb-1 group-hover:text-green-400 transition-colors">
                      Repayment Calculator
                    </h4>
                    <p className="text-sm text-gray-400">
                      See savings from extra payments
                    </p>
                  </Link>

                  <Link
                    href="/resources/calculator/property-fees"
                    className="block p-4 rounded-xl bg-[#1d293d] hover:bg-[#3d4759] transition-all duration-300 border border-gray-600 group"
                  >
                    <h4 className="font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                      Property Fees Calculator
                    </h4>
                    <p className="text-sm text-gray-400">
                      Calculate total purchase costs
                    </p>
                  </Link>
                </div>
              </div>

              {/* Helpful Resources Section */}
              <div className="bg-[#2d3544] rounded-2xl shadow-lg border border-gray-600 overflow-hidden">
                <div className="bg-gradient-to-r from-[#173ab7] to-[#1e4fd1] p-4">
                  <div className="flex items-center gap-3 text-white">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <FaBookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Helpful Resources</h3>
                      <p className="text-xs text-white/70">
                        Guides & Information
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <Link
                    href="/resources/first-home-buyer-guide"
                    className="block group"
                  >
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1d293d] hover:bg-[#3d4759] transition-all duration-300 border border-gray-600">
                      <div className="w-12 h-12 bg-[#173ab7] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FaHouse className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white mb-1 group-hover:text-[#00a69c] transition-colors">
                          First Home Buyer Guide
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Everything you need to know about buying your first
                          home
                        </p>
                      </div>
                      <FaArrowRight className="w-4 h-4 text-[#00a69c] mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>

                  <Link
                    href="/resources/investment-guide"
                    className="block group"
                  >
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1d293d] hover:bg-[#3d4759] transition-all duration-300 border border-gray-600">
                      <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FaChartLine className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white mb-1 group-hover:text-green-400 transition-colors">
                          Investment Property Guide
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Build wealth through strategic property investment
                        </p>
                      </div>
                      <FaArrowRight className="w-4 h-4 text-green-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>

                  <Link
                    href="/resources/construction-loans-guide"
                    className="block group"
                  >
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1d293d] hover:bg-[#3d4759] transition-all duration-300 border border-gray-600">
                      <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <FaHammer className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-white mb-1 group-hover:text-orange-400 transition-colors">
                          Construction Loans Guide
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Finance your dream home build with construction loans
                        </p>
                      </div>
                      <FaArrowRight className="w-4 h-4 text-orange-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                </div>
              </div>

              {/* Special Offer Card */}
              <div className="bg-gradient-to-br from-[#00a69c] to-[#173ab7] rounded-2xl shadow-lg overflow-hidden text-white p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaGift className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Special Offer</h3>
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    Get a free consultation and property assessment when you
                    apply for a home loan this month.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-[#173ab7] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm"
                  >
                    Claim Your Offer
                    <FaArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <ContactCTASection />
    </>
  );
}
