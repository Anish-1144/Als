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

// FAQ seed data
export const faqSeedData = [
  // Home Loans
  {
    question: "What is the minimum deposit required for a home loan?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "The minimum deposit varies depending on the loan type and lender. Generally, you'll need at least 5% for first home buyers with Lenders Mortgage Insurance (LMI), or 20% to avoid LMI. We can help you explore low deposit options and government grants that may be available."
          }
        ]
      }
    ],
    category: "home-loans",
    order: 1,
    isActive: true
  },
  {
    question: "How long does the home loan approval process take?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "Pre-approval typically takes 1-3 business days, while formal approval can take 7-14 days depending on the lender and complexity of your application. We work to expedite this process and keep you informed every step of the way."
          }
        ]
      }
    ],
    category: "home-loans",
    order: 2,
    isActive: true
  },
  {
    question: "Can I get a home loan if I'm self-employed?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "Yes! We work with many lenders who offer home loans for self-employed borrowers. You'll typically need to provide 2 years of tax returns and financial statements. We can also explore low-doc loan options if traditional documentation is challenging."
          }
        ]
      }
    ],
    category: "home-loans",
    order: 3,
    isActive: true
  },

  // Refinancing
  {
    question: "When should I consider refinancing my home loan?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "Consider refinancing if interest rates have dropped significantly, your current loan lacks features you need, you want to access equity, or consolidate debt. Generally, if you can save 0.5% or more on your interest rate, refinancing may be worthwhile."
          }
        ]
      }
    ],
    category: "refinancing",
    order: 1,
    isActive: true
  },
  {
    question: "What costs are involved in refinancing?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "Refinancing costs may include application fees, valuation fees, legal fees, and discharge fees from your current lender. These typically range from $1,000-$3,000. Many lenders offer cash-back incentives that can offset these costs."
          }
        ]
      }
    ],
    category: "refinancing",
    order: 2,
    isActive: true
  },

  // Commercial Loans
  {
    question: "What types of commercial properties can I finance?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "We can arrange financing for office buildings, retail spaces, warehouses, industrial properties, medical centers, and mixed-use developments. Each property type has specific lending criteria and loan-to-value ratios."
          }
        ]
      }
    ],
    category: "commercial-loans",
    order: 1,
    isActive: true
  },
  {
    question: "What is the typical loan-to-value ratio for commercial loans?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "Most commercial loans offer up to 70-80% LVR, though this varies by property type, location, and borrower strength. Some specialized commercial properties may have lower LVR limits."
          }
        ]
      }
    ],
    category: "commercial-loans",
    order: 2,
    isActive: true
  },

  // SMSF Financing
  {
    question: "Can my SMSF borrow money to buy property?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "Yes, under a Limited Recourse Borrowing Arrangement (LRBA). Your SMSF can borrow up to 70% of the property value. The property must be held in a separate trust until the loan is repaid, and strict compliance rules apply."
          }
        ]
      }
    ],
    category: "smsf-financing",
    order: 1,
    isActive: true
  },
  {
    question: "What are the minimum requirements for SMSF lending?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "Your SMSF typically needs a minimum balance of $200,000, must be compliant with ATO regulations, have a professional SMSF administrator, and an investment strategy that allows property investment."
          }
        ]
      }
    ],
    category: "smsf-financing",
    order: 2,
    isActive: true
  },

  // Application Process
  {
    question: "What documents do I need for a loan application?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "You'll typically need: ID documents, recent payslips, bank statements (3-6 months), tax returns (if self-employed), details of assets and liabilities, and information about the property you're purchasing. We'll provide a comprehensive checklist tailored to your situation."
          }
        ]
      }
    ],
    category: "application-process",
    order: 1,
    isActive: true
  },
  {
    question: "Do you charge fees for your broker services?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "No, our service is free to you. We're paid by the lenders after your loan settles, so there's no upfront cost. This means we can negotiate the best deal for you without any financial obligation on your part."
          }
        ]
      }
    ],
    category: "application-process",
    order: 2,
    isActive: true
  },

  // Rates & Fees
  {
    question: "How do interest rates get determined?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "Interest rates are influenced by the RBA cash rate, your loan-to-value ratio, credit score, employment status, loan amount, and property type. Lenders also consider their funding costs and business strategy when setting rates."
          }
        ]
      }
    ],
    category: "rates-fees",
    order: 1,
    isActive: true
  },
  {
    question: "What's the difference between comparison rate and interest rate?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "The interest rate is what you pay on the loan balance. The comparison rate includes the interest rate plus most fees and charges, giving you a better idea of the true cost of the loan for comparison purposes."
          }
        ]
      }
    ],
    category: "rates-fees",
    order: 2,
    isActive: true
  },

  // Car Financing
  {
    question: "Can I finance a car through ALS Mortgage Solutions?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "Yes, we can help you arrange car financing through our panel of lenders. We offer competitive rates for both new and used vehicle purchases, including dealer financing and chattel mortgage options for business use."
          }
        ]
      }
    ],
    category: "car-financing",
    order: 1,
    isActive: true
  },
  {
    question: "What documents do I need for car financing?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "You'll need proof of identity, income verification (payslips or business financials), and details of the vehicle you wish to purchase. The process is typically faster than home loan applications."
          }
        ]
      }
    ],
    category: "car-financing",
    order: 2,
    isActive: true
  },

  // General
  {
    question: "How many lenders do you work with?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "We work with over 30 major banks, credit unions, and non-bank lenders. This extensive panel allows us to find competitive rates and loan features that match your specific needs and circumstances."
          }
        ]
      }
    ],
    category: "general",
    order: 1,
    isActive: true
  },
  {
    question: "What makes ALS Mortgage Solutions different?",
    answer: [
      {
        type: "paragraph",
        children: [
          {
            text: "We prioritize ethical lending with no hidden incentives, offer transparent advice, maintain a diverse lender panel, and focus on long-term client relationships. Our approach is strategic, helping you build wealth through property while ensuring loans suit your future goals."
          }
        ]
      }
    ],
    category: "general",
    order: 2,
    isActive: true
  }
];