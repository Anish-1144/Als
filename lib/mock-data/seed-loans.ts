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

// Common Why Choose Us data
const commonWhyChooseUs = {
  sectionTitle: "Why Australians Invest With Us",
  sectionSubtitle: "More than 36,000 Australian businesses and individuals choose us as their mortgage brokers.",
  backgroundImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
  features: [
    {
      title: "Ethical Lending",
      description: "ALIC is genuinely different – an award-winning broker with no hidden financial incentives and no questionable referral partners.",
      icon: "FaHeart"
    },
    {
      title: "Diverse Lending Panel",
      description: "With more than 30 bank and non-bank partners on our lending panel, finding the right mortgage is simple.",
      icon: "FaUsers"
    },
    {
      title: "Strategic Approach",
      description: "Your loan should be one that supports your ideal future – whether that's a multi-property portfolio or a stress-free retirement.",
      icon: "FaChartLine"
    },
    {
      title: "Connect With Experts",
      description: "Access our network of leading property professionals to get the advice you need – no referral commissions involved.",
      icon: "FaHandshake"
    }
  ]
};

// Seed data for loan types
export const loanSeedData = [
  {
    title: "Home Loans",
    slug: "home-loans",
    subtitle: "Unlocking Dreams, One Home at a Time: Your Path to Affordable Home Loans with ALS Mortgage",
    heroImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
    description: "At ALS Mortgage Solutions, we're not just a mortgage lender; we're your partners in achieving homeownership dreams. With a wide range of specialized home loan products, we're here to make your journey to owning the home of your dreams a reality.",
    features: [
      {
        title: "First Home Buyers",
        description: "Fast and easy process designed specifically for first-time home buyers. Get expert guidance through every step of your home buying journey.",
        benefits: [
          { benefit: "Low deposit options available" },
          { benefit: "First Home Buyer grants assistance" },
          { benefit: "Streamlined approval process" }
        ]
      },
      {
        title: "Next Home Purchase",
        description: "Already own a home and looking to upgrade? We'll help you find the perfect solution for your next property purchase.",
        benefits: [
          { benefit: "Equity release strategies" },
          { benefit: "Bridging loan options" },
          { benefit: "Competitive upgrade rates" }
        ]
      },
      {
        title: "Investment Loans",
        description: "Build your property portfolio with our competitive investment loan options designed for wealth creation through property.",
        benefits: [
          { benefit: "Interest-only payment options" },
          { benefit: "Tax advantage strategies" },
          { benefit: "Portfolio lending solutions" }
        ]
      }
    ],
    benefits: [
      {
        title: "Competitive Rates",
        description: "Access some of the market's most competitive interest rates",
        icon: "FaDollarSign"
      },
      {
        title: "Expert Guidance",
        description: "Personalized advice from experienced mortgage brokers",
        icon: "FaHandshake"
      },
      {
        title: "Fast Approval",
        description: "Streamlined process to get you approved quickly",
        icon: "FaKey"
      }
    ],
    eligibility: [
      { requirement: "Australian citizen or permanent resident" },
      { requirement: "Stable employment history" },
      { requirement: "Satisfactory credit history" },
      { requirement: "Ability to service the loan" }
    ],
    interestRateFrom: "6.25%",
    minimumDeposit: "5%",
    maxLoanAmount: "$2M",
    loanTerm: "Up to 30 years",
    whyChooseUs: commonWhyChooseUs,
    isActive: true
  },
  {
    title: "Refinancing",
    slug: "refinancing",
    subtitle: "Switch to Better Rates and Save Thousands with Our Expert Refinancing Solutions",
    heroImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
    description: "Refinancing your home loan could save you thousands of dollars per year. Our expert team will help you find a better deal, whether you're looking for lower interest rates, better features, or to access your home's equity.",
    features: [
      {
        title: "Rate & Term Refinancing",
        description: "Switch to a lower interest rate or change your loan term to reduce monthly payments or pay off your loan faster.",
        benefits: [
          { benefit: "Lower monthly repayments" },
          { benefit: "Reduce total interest paid" },
          { benefit: "Switch from variable to fixed rates" }
        ]
      },
      {
        title: "Cash-Out Refinancing",
        description: "Access your home's equity for renovations, investments, or debt consolidation while refinancing your existing loan.",
        benefits: [
          { benefit: "Access home equity" },
          { benefit: "Consolidate high-interest debt" },
          { benefit: "Fund home improvements" }
        ]
      },
      {
        title: "Product Switch",
        description: "Change loan products with your existing lender to access better features and rates without the full refinancing process.",
        benefits: [
          { benefit: "Faster approval process" },
          { benefit: "Lower application costs" },
          { benefit: "Keep existing offset accounts" }
        ]
      }
    ],
    benefits: [
      {
        title: "Save Money",
        description: "Potentially save thousands per year with better rates",
        icon: "FaDollarSign"
      },
      {
        title: "Better Features",
        description: "Access to offset accounts, redraw facilities, and more",
        icon: "FaChartLine"
      },
      {
        title: "Expert Comparison",
        description: "We compare hundreds of loan products for you",
        icon: "FaUsers"
      }
    ],
    eligibility: [
      { requirement: "Existing home loan to refinance" },
      { requirement: "Property value assessment" },
      { requirement: "Satisfactory credit history" },
      { requirement: "Ability to service the new loan" }
    ],
    interestRateFrom: "6.15%",
    minimumDeposit: "N/A",
    maxLoanAmount: "80% LVR",
    loanTerm: "Up to 30 years",
    whyChooseUs: commonWhyChooseUs,
    isActive: true
  },
  {
    title: "Renovating",
    slug: "renovating",
    subtitle: "Transform Your Home with Construction and Renovation Loan Solutions",
    heroImage: "https://images.unsplash.com/photo-1504615755583-2916b52192a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
    description: "Whether you're building your dream home from scratch or renovating your existing property, our construction and renovation loans provide the flexibility and funds you need to bring your vision to life.",
    features: [
      {
        title: "Construction Loans",
        description: "Build your dream home with progressive drawdowns that match your construction milestones.",
        benefits: [
          { benefit: "Interest-only payments during construction" },
          { benefit: "Progressive fund releases" },
          { benefit: "Convert to standard home loan on completion" }
        ]
      },
      {
        title: "Renovation Loans",
        description: "Finance major renovations and improvements to increase your property's value and your lifestyle.",
        benefits: [
          { benefit: "Borrow up to 90% of improved property value" },
          { benefit: "Staged payment releases" },
          { benefit: "No need to sell and buy elsewhere" }
        ]
      },
      {
        title: "Knockdown Rebuild",
        description: "Demolish and rebuild on your existing block with specialized lending solutions for your project.",
        benefits: [
          { benefit: "Keep your ideal location" },
          { benefit: "Avoid stamp duty on new purchase" },
          { benefit: "Build exactly what you want" }
        ]
      }
    ],
    benefits: [
      {
        title: "Flexible Drawdowns",
        description: "Access funds as you need them during construction",
        icon: "FaKey"
      },
      {
        title: "Interest Only Option",
        description: "Pay interest only during construction phase",
        icon: "FaDollarSign"
      },
      {
        title: "Expert Support",
        description: "Guidance through the entire construction process",
        icon: "FaHandshake"
      }
    ],
    eligibility: [
      { requirement: "Detailed construction plans and costings" },
      { requirement: "Licensed builder with appropriate insurance" },
      { requirement: "Sufficient income to service loan" },
      { requirement: "Property as security for the loan" }
    ],
    interestRateFrom: "6.45%",
    minimumDeposit: "10%",
    maxLoanAmount: "Based on end value",
    loanTerm: "Up to 30 years",
    whyChooseUs: commonWhyChooseUs,
    isActive: true
  },
  {
    title: "Commercial Loans",
    slug: "commercial-loans",
    subtitle: "Fuel Your Business Growth with Tailored Commercial Lending Solutions",
    heroImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
    description: "From purchasing commercial property to expanding your business operations, our commercial loan solutions are designed to help businesses of all sizes achieve their goals with competitive rates and flexible terms.",
    features: [
      {
        title: "Commercial Property Purchase",
        description: "Secure funding for office buildings, retail spaces, warehouses, and other commercial properties.",
        benefits: [
          { benefit: "Up to 80% LVR available" },
          { benefit: "Interest-only payment options" },
          { benefit: "Quick settlement capabilities" }
        ]
      },
      {
        title: "Business Equipment Finance",
        description: "Finance essential equipment, vehicles, and machinery to grow your business operations.",
        benefits: [
          { benefit: "100% equipment financing available" },
          { benefit: "Tax advantages through leasing" },
          { benefit: "Preserve working capital" }
        ]
      },
      {
        title: "Working Capital Loans",
        description: "Access flexible funding for day-to-day business operations, inventory, and growth opportunities.",
        benefits: [
          { benefit: "Revolving credit facilities" },
          { benefit: "Seasonal business support" },
          { benefit: "Flexible repayment terms" }
        ]
      }
    ],
    benefits: [
      {
        title: "Competitive Rates",
        description: "Access to wholesale commercial lending rates",
        icon: "FaDollarSign"
      },
      {
        title: "Fast Approval",
        description: "Streamlined commercial lending process",
        icon: "FaChartLine"
      },
      {
        title: "Business Expertise",
        description: "Specialized commercial lending knowledge",
        icon: "FaUsers"
      }
    ],
    eligibility: [
      { requirement: "Established business with trading history" },
      { requirement: "Strong financial statements" },
      { requirement: "Adequate security for the loan" },
      { requirement: "Clear business purpose for funds" }
    ],
    interestRateFrom: "7.25%",
    minimumDeposit: "20%",
    maxLoanAmount: "$5M+",
    loanTerm: "Up to 25 years",
    whyChooseUs: commonWhyChooseUs,
    isActive: true
  },
  {
    title: "Car Financing",
    slug: "car-financing",
    subtitle: "Drive Away Today with Competitive Car Loans for New and Used Vehicles",
    heroImage: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
    description: "Get behind the wheel of your dream car with our flexible car financing options. Whether you're buying new or used, for personal or business use, we have competitive rates and terms to suit your budget.",
    features: [
      {
        title: "New Car Loans",
        description: "Finance new vehicles with competitive rates and flexible terms up to 7 years.",
        benefits: [
          { benefit: "Lowest rates for new vehicles" },
          { benefit: "100% financing available" },
          { benefit: "Extended warranty options" }
        ]
      },
      {
        title: "Used Car Loans",
        description: "Great rates on quality used vehicles up to 7 years old with comprehensive pre-purchase inspections.",
        benefits: [
          { benefit: "Vehicles up to 7 years old" },
          { benefit: "Pre-purchase inspection included" },
          { benefit: "Flexible deposit options" }
        ]
      },
      {
        title: "Business Vehicle Finance",
        description: "Finance commercial vehicles, fleet purchases, and business equipment with tax advantages.",
        benefits: [
          { benefit: "Tax deductible payments" },
          { benefit: "Fleet financing solutions" },
          { benefit: "Balloon payment options" }
        ]
      }
    ],
    benefits: [
      {
        title: "Low Rates",
        description: "Competitive rates starting from 6.95%",
        icon: "FaDollarSign"
      },
      {
        title: "Quick Approval",
        description: "Same day approval for qualified applicants",
        icon: "FaKey"
      },
      {
        title: "Flexible Terms",
        description: "Loan terms from 1 to 7 years available",
        icon: "FaHandshake"
      }
    ],
    eligibility: [
      { requirement: "Australian citizen or permanent resident" },
      { requirement: "Stable employment or income" },
      { requirement: "Vehicle as security for the loan" },
      { requirement: "Comprehensive insurance required" }
    ],
    interestRateFrom: "6.95%",
    minimumDeposit: "10%",
    maxLoanAmount: "$100K",
    loanTerm: "Up to 7 years",
    whyChooseUs: commonWhyChooseUs,
    isActive: true
  },
  {
    title: "SMSF Financing",
    slug: "smsf-financing",
    subtitle: "Supercharge Your Retirement with Self-Managed Super Fund Property Investment",
    heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80",
    description: "Use your Self-Managed Super Fund to invest in property and build wealth for your retirement. Our SMSF lending specialists understand the complex regulations and can structure compliant loans for your fund.",
    features: [
      {
        title: "SMSF Property Loans",
        description: "Compliant lending solutions for SMSF property investments with competitive rates and terms.",
        benefits: [
          { benefit: "Up to 80% LVR for residential property" },
          { benefit: "70% LVR for commercial property" },
          { benefit: "Interest-only payment options" }
        ]
      },
      {
        title: "Limited Recourse Borrowing",
        description: "Structured to comply with SIS Act requirements while maximizing your investment potential.",
        benefits: [
          { benefit: "SIS Act compliant structure" },
          { benefit: "Limited recourse protection" },
          { benefit: "Professional trustee options" }
        ]
      },
      {
        title: "SMSF Refinancing",
        description: "Refinance existing SMSF property loans to better rates or release equity for additional investments.",
        benefits: [
          { benefit: "Switch to better rates" },
          { benefit: "Release equity for new investments" },
          { benefit: "Consolidate multiple SMSF loans" }
        ]
      }
    ],
    benefits: [
      {
        title: "Tax Advantages",
        description: "Benefit from concessional tax treatment in super",
        icon: "FaDollarSign"
      },
      {
        title: "Specialist Knowledge",
        description: "SMSF lending and compliance expertise",
        icon: "FaUsers"
      },
      {
        title: "Retirement Wealth",
        description: "Build substantial retirement wealth through property",
        icon: "FaChartLine"
      }
    ],
    eligibility: [
      { requirement: "Compliant Self-Managed Super Fund" },
      { requirement: "Minimum fund balance of $200K" },
      { requirement: "Professional SMSF administration" },
      { requirement: "Investment strategy allowing property" }
    ],
    interestRateFrom: "7.45%",
    minimumDeposit: "20%",
    maxLoanAmount: "$2M",
    loanTerm: "Up to 30 years",
    whyChooseUs: commonWhyChooseUs,
    isActive: true
  }
];