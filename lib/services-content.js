const SERVICE_SLUGS = [
  "services",
  "home-loans",
  "investment-loans",
  "commercial-loans",
  "smsf-loans",
  "car-financing",
  "refinancing"
];
const LOAN_PRODUCT_SLUGS = [
  "home-loans",
  "investment-loans",
  "commercial-loans",
  "smsf-loans",
  "car-financing",
  "refinancing"
];
function mergeCards(defaults, raw) {
  return defaults.map((d, i) => ({ ...d, ...raw?.[i] ?? {} }));
}
function mergeTopicTiles(defaults, raw) {
  return defaults.map((d, i) => ({ ...d, ...raw?.[i] ?? {} }));
}
function mergeSpotlights(defaults, raw) {
  if (!raw?.length) return defaults;
  const rawById = new Map(
    raw.filter((s) => s.id).map((s) => [s.id, s])
  );
  return defaults.map((d, i) => {
    const byId = d.id && rawById.has(d.id) ? rawById.get(d.id) : void 0;
    const byIndex = raw[i];
    const indexMatch = byIndex && (!byIndex.id || !d.id || byIndex.id === d.id) ? byIndex : void 0;
    return { ...d, ...byId ?? indexMatch ?? {} };
  });
}
function mergeFaqs(defaults, raw) {
  const len = Math.max(defaults.length, raw?.length ?? 0);
  return Array.from({ length: len }, (_, i) => ({
    ...defaults[i] ?? { question: "", answer: "" },
    ...raw?.[i] ?? {}
  }));
}
const DEFAULT_SERVICES_CONTENT = {
  servicesList: {
    badge: "OUR SERVICES",
    title: "What we offer",
    subtitle: "Explore our comprehensive range of lending solutions designed to help you achieve your property and financial goals",
    cards: [
      {
        title: "Home Loans",
        description: "First home buyers, upgraders, and investors - we'll find the perfect loan for your situation with competitive rates and flexible terms.",
        link: "/home-loans",
        linkLabel: "Learn More"
      },
      {
        title: "Investment Loans",
        description: "Build your property portfolio with expert investment loan solutions, equity strategies, and tax-effective structures for wealth creation.",
        link: "/investment-loans",
        linkLabel: "Learn More"
      },
      {
        title: "Refinancing",
        description: "Save thousands by switching to a better rate. Access your equity, consolidate debt, or simply get a better deal on your existing loan.",
        link: "/refinancing",
        linkLabel: "Learn More"
      },
      {
        title: "SMSF Loans",
        description: "Leverage your superannuation to invest in property with specialized SMSF lending solutions and expert compliance guidance.",
        link: "/smsf-loans",
        linkLabel: "Learn More"
      },
      {
        title: "Commercial Loans",
        description: "Financing solutions for business properties, commercial premises, and mixed-use developments with flexible terms.",
        link: "/commercial-loans",
        linkLabel: "Learn More"
      },
      {
        title: "Car Financing",
        description: "Competitive vehicle finance options for personal and business use, including chattel mortgages and novated leases.",
        link: "/car-financing",
        linkLabel: "Learn More"
      },
      {
        title: "Business Loans",
        description: "Funding solutions to help your business grow, including working capital, equipment finance, and expansion loans.",
        link: "/commercial-loans",
        linkLabel: "Learn More"
      }
    ]
  },
  whyUs: {
    badge: "WHY US",
    title: "Why choose ALS",
    subtitle: "More than 36,000 Australians trust us with their property finance needs",
    cards: [
      {
        title: "Client-First Approach",
        description: "Your interests always come first. We're paid by lenders, not by you, ensuring unbiased advice."
      },
      {
        title: "Ethical Lending",
        description: "Founded on ethical principles. We focus on long-term client satisfaction, not short-term gains."
      },
      {
        title: "Expert Team",
        description: "20+ years of experience helping Australians achieve their property dreams with personalized service."
      },
      {
        title: "Proven Results",
        description: "96% loan approval rate with access to 25+ lenders for the best rates and terms."
      }
    ]
  },
  teamSection: {
    badge: "OUR TEAM",
    title: "Meet our experts",
    subtitle: "Our dedicated team of mortgage professionals is here to guide you through your property journey"
  }
};
const HOME_LOANS_DEFAULT = {
  layout: "interleaved",
  topicTilesSection: {},
  topicTiles: [
    {
      title: "Buy First Home",
      description: "Step into the property market with confidence. Access exclusive first home buyer benefits, government schemes, and lower deposit options.",
      anchorId: "first-home-section",
      linkLabel: "Learn More"
    },
    {
      title: "Next Home Purchase",
      description: "Ready to upgrade or relocate? Leverage equity, coordinate timing between selling and buying with expert guidance.",
      anchorId: "next-home-section",
      linkLabel: "Learn More"
    },
    {
      title: "Buying with a Guarantor",
      description: "Get into the property market sooner with family support. Avoid LMI and potentially borrow up to 100% of property value.",
      anchorId: "guarantor-section",
      linkLabel: "Learn More"
    }
  ],
  otherSolutions: {
    title: "Other Solutions",
    cards: [
      {
        title: "Government Guarantee Scheme",
        description: "Access home ownership with as little as 5% deposit through the First Home Guarantee and other government-backed schemes.",
        link: "/resources/first-home-buyer-guide",
        linkLabel: "Learn More"
      },
      {
        title: "Buying an Investment Property",
        description: "Build wealth through property investment with specialized loan structures and tax benefits.",
        link: "/investment-loans",
        linkLabel: "Learn More"
      },
      {
        title: "Buying Through My SMSF",
        description: "Leverage your superannuation to invest in property with an SMSF loan structure.",
        link: "/smsf-loans",
        linkLabel: "Learn More"
      }
    ]
  },
  spotlightSections: [
    {
      id: "first-home-section",
      title: "Buy Your First Home",
      subtitle: "Taking your first step onto the property ladder is an exciting milestone. We specialize in helping first home buyers navigate the complexities of purchasing their first property, with access to exclusive first home buyer benefits, government schemes, and lower deposit options. Let us help you understand your borrowing capacity and find the right loan structure for your situation.",
      cardTitle: "First Home Buyer Benefits & Programs",
      cardBody: "As a first home buyer, you have access to various government grants, stamp duty concessions, and the First Home Guarantee scheme which allows you to purchase with as little as 5% deposit. We'll help you navigate all available options to maximize your benefits and get into your first home sooner.",
      link: "/resources/first-home-buyer-guide",
      linkLabel: "View First Home Buyer Benefits & Guide"
    },
    {
      id: "next-home-section",
      title: "Next Home Purchase",
      subtitle: "Ready to upgrade or relocate? Moving to your next home is an exciting milestone. We'll help you leverage the equity in your current property, explore your finance options, and coordinate timing between selling and buying. Our team ensures a smooth transition with strategies for bridging loans, pre-approval, and competitive rates that suit your upgraded lifestyle needs.",
      cardTitle: "Upgrading Made Simple",
      cardBody: "Whether you're upsizing for a growing family, downsizing for retirement, or relocating for lifestyle or work, we provide expert guidance on leveraging your existing equity, managing the sale-purchase timeline, and securing competitive financing for your next home. Our strategies include bridging finance options, pre-approval to strengthen your position, and loan structures that maximize tax benefits if you're converting your current home to an investment property.",
      linkLabel: "Discover Your Options"
    },
    {
      id: "guarantor-section",
      title: "Buying with a Guarantor",
      subtitle: "Get into the property market sooner with family support. A guarantor loan allows a family member (usually a parent) to use their property as security, helping you avoid Lenders Mortgage Insurance (LMI) and potentially borrow up to 100% of the property value. We'll explain how guarantor loans work, the responsibilities involved, and how to structure the loan to minimize risk for all parties.",
      cardTitle: "How Guarantor Loans Work",
      cardBody: "A guarantor uses the equity in their property as additional security for your home loan. This allows you to enter the property market with a smaller deposit or no deposit at all, avoiding costly Lenders Mortgage Insurance. The guarantor doesn't make your repayments or give you money - they simply provide security. As you build equity in your property through repayments and capital growth, the guarantee can often be removed. We ensure all parties fully understand their rights and responsibilities, structuring the guarantee to protect both you and your guarantor.",
      linkLabel: "Explore Guarantor Options"
    }
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for Your Home Loan?",
    subtitle: "More than 36,000 Australian businesses and individuals choose us as their mortgage brokers. Here's why we're trusted to deliver exceptional results.",
    cards: [
      {
        title: "Client-First Approach",
        description: "Your goals are our priority. We take time to understand your unique situation and tailor solutions that align with your long-term financial objectives."
      },
      {
        title: "Expert Guidance",
        description: "Our experienced mortgage brokers bring decades of combined industry knowledge, staying current with market trends and lender policies to secure the best outcomes."
      },
      {
        title: "Access to Better Rates",
        description: "We compare loans from over 40 lenders including major banks and specialist lenders, negotiating competitive rates you may not access directly."
      },
      {
        title: "End-to-End Support",
        description: "From pre-approval to settlement and beyond, we manage the entire loan process, liaising with lenders and keeping you informed every step of the way."
      }
    ]
  },
  benefits: {
    badge: "BENEFITS",
    title: "Unlock the Power of Your Property",
    subtitle: "Strategic refinancing and smart borrowing can transform your financial future",
    cards: [
      {
        title: "Strategic Equity Access",
        description: "Strategic planning for further investments via equity access through refinancing. Equity release to further investment in the property market will enhance your property goals and accelerate your path to financial freedom."
      },
      {
        title: "Property Enhancement",
        description: "Cashout for further renovations or improvements to the property that increase the property value and better lifestyle. Strategic improvements deliver both enjoyment and strong returns on investment."
      },
      {
        title: "Smart Debt Management",
        description: "Consolidating the debts and easing your repayments to manage your finance better. This strategy simplifies your finances with one manageable payment and reduces overall interest costs."
      }
    ]
  },
  moreServices: {
    title: "More Than Just Loans",
    subtitle: "At ALS Mortgage Solutions, we provide comprehensive financial services that go beyond just finding you a loan",
    cards: [
      {
        title: "Property Investment Strategy",
        description: "We don't just arrange loans - we help you develop a comprehensive property investment strategy aligned with your financial goals, assessing market opportunities and optimal structures."
      },
      {
        title: "Ongoing Support & Reviews",
        description: "Our relationship doesn't end at settlement. We provide ongoing loan reviews, market updates, and refinancing opportunities to ensure your loan remains competitive throughout its lifetime."
      },
      {
        title: "Professional Network",
        description: "Access our trusted network of professionals including conveyancers, solicitors, accountants, financial planners, and property experts to support your entire property journey."
      },
      {
        title: "Pre-Approval & Auction Bidding",
        description: "Get pre-approved quickly to strengthen your negotiating position. We provide unconditional pre-approvals that give you confidence to bid at auctions or make offers with certainty."
      },
      {
        title: "Lender Negotiation",
        description: "Leverage our strong lender relationships and industry expertise to negotiate better rates, waived fees, and favorable loan conditions that you couldn't access directly."
      },
      {
        title: "Education & Resources",
        description: "Access our comprehensive guides, calculators, market insights, and educational resources to make informed decisions throughout your property and finance journey."
      }
    ]
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about home loans, refinancing, and property investment",
    items: [
      {
        question: "How much can I borrow for a home loan?",
        answer: "Your borrowing capacity depends on several factors including your income, expenses, existing debts, credit history, and the property value. Generally, lenders will assess your ability to service the loan based on your net income after expenses. Most lenders use a debt-to-income ratio and apply a buffer to interest rates when assessing serviceability. We can provide a comprehensive assessment of your borrowing capacity and help you understand how to maximize it."
      },
      {
        question: "What deposit do I need to buy a home?",
        answer: "While traditionally a 20% deposit is ideal to avoid Lenders Mortgage Insurance (LMI), there are many options available with smaller deposits. First home buyers may qualify for government schemes requiring as little as 5% deposit. Guarantor loans can enable you to borrow up to 100% of the property value. The right deposit amount depends on your circumstances, and we can help you explore all available options to get into the market sooner."
      },
      {
        question: "Should I choose a fixed or variable interest rate?",
        answer: "Both fixed and variable rates have advantages. Fixed rates provide certainty with consistent repayments for the fixed period (typically 1-5 years), protecting you from rate rises but preventing you from benefiting from rate drops. Variable rates fluctuate with the market, offering more flexibility with features like offset accounts and unlimited extra repayments. Many borrowers choose a split loan combining both. We'll help you assess your risk tolerance, financial situation, and market conditions to determine the best strategy."
      },
      {
        question: "What is the refinancing process and how long does it take?",
        answer: "Refinancing typically takes 4-6 weeks from application to settlement. The process involves: 1) Assessing your current loan and goals, 2) Comparing new loan options, 3) Submitting your application, 4) Property valuation, 5) Loan approval, 6) Signing loan documents, and 7) Settlement and discharge of your old loan. We manage the entire process, coordinating with lenders and your current bank to ensure a smooth transition with minimal disruption."
      },
      {
        question: "Can I access equity in my home without selling?",
        answer: "Yes, through refinancing or a home equity loan, you can access the equity you've built up in your property. Equity is the difference between your property's current market value and what you owe on your mortgage. You can typically access up to 80% of your property value (minus your existing loan) without paying LMI. This equity can be used for renovations, investment property deposits, debt consolidation, or other purposes. We'll help you calculate your available equity and structure the loan appropriately."
      },
      {
        question: "What are the tax benefits of investment property loans?",
        answer: "Investment property loans offer several tax advantages: 1) Loan interest is tax deductible, 2) Negative gearing allows you to offset losses against your taxable income, 3) Depreciation deductions on the building and fixtures, 4) Property-related expenses like maintenance, insurance, and property management fees are deductible. Structuring your investment loan correctly from the start is crucial for maximizing tax benefits. We recommend consulting with a tax advisor alongside our mortgage guidance for comprehensive planning."
      },
      {
        question: "How does a guarantor loan work?",
        answer: "A guarantor loan allows a family member (usually a parent) to use equity in their own property as additional security for your loan. This enables you to borrow more than your deposit would normally allow and avoid paying Lenders Mortgage Insurance. The guarantor doesn't make your repayments or give you money - they simply provide security. The guarantee can often be removed once you build sufficient equity in your property. We ensure all parties understand the responsibilities and help structure the guarantee to minimize risk."
      },
      {
        question: "What fees are involved in getting a home loan or refinancing?",
        answer: "Common fees include: application fees ($0-$1,000), valuation fees ($200-$600), settlement fees ($200-$800), and potentially discharge fees ($300-$400) when refinancing. When refinancing, many lenders offer cashback incentives or waive application fees to win your business. Some lenders also offer 'no fee' loan packages. Our service is typically free for you as we receive commission from the lender, and we'll provide a complete breakdown of all costs involved so there are no surprises."
      }
    ]
  }
};
function loanDefaults(topicTiles, benefitsTitle, faqSubtitle) {
  return {
    topicTilesSection: {},
    topicTiles,
    spotlightSections: [],
    benefits: {
      badge: "BENEFITS",
      title: benefitsTitle,
      subtitle: "Expert lending solutions tailored to your goals",
      cards: [
        { title: "Competitive Rates", description: "Access to 25+ lenders for the best available rates." },
        { title: "Expert Guidance", description: "Dedicated brokers guiding you through every step." },
        { title: "Fast Approval", description: "Streamlined process to keep your plans on track." }
      ]
    },
    moreServices: {
      title: "More Than Just Loans",
      subtitle: "Comprehensive financial services beyond finding you a loan",
      cards: [
        { title: "Strategic Advice", description: "Long-term planning aligned with your financial goals." },
        { title: "Refinancing", description: "Review and optimize your existing lending structure." },
        { title: "Ongoing Support", description: "We stay with you well beyond settlement." }
      ]
    },
    faqs: {
      badge: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: faqSubtitle,
      items: [
        { question: "How does the application process work?", answer: "We guide you from consultation through to settlement." },
        { question: "How long does approval take?", answer: "Typical approvals take 2\u20136 weeks depending on complexity." }
      ]
    }
  };
}
const LOAN_PAGE_DEFAULTS = {
  "home-loans": HOME_LOANS_DEFAULT,
  "investment-loans": loanDefaults(
    [
      { title: "First Investment Property", description: "Start building your portfolio with expert loan structuring.", anchorId: "first-investment-section", linkLabel: "Learn More" },
      { title: "Portfolio Expansion", description: "Leverage equity to grow your existing property portfolio.", anchorId: "portfolio-section", linkLabel: "Learn More" },
      { title: "Commercial Investment", description: "Finance commercial property investments with flexible terms.", anchorId: "commercial-investment-section", linkLabel: "Learn More" }
    ],
    "Maximise Your Investment Returns",
    "Common questions about investment property loans"
  ),
  "commercial-loans": loanDefaults(
    [
      { title: "Owner-Occupied Commercial", description: "Finance the premises your business operates from.", linkLabel: "Learn More" },
      { title: "Commercial Investment", description: "Invest in commercial property for rental income.", linkLabel: "Learn More" },
      { title: "Development Finance", description: "Funding for commercial development projects.", linkLabel: "Learn More" }
    ],
    "Commercial Lending Benefits",
    "Common questions about commercial property finance"
  ),
  "smsf-loans": loanDefaults(
    [
      { title: "Residential SMSF Property", description: "Purchase residential property through your self-managed super fund.", linkLabel: "Learn More" },
      { title: "Commercial SMSF Property", description: "Invest in commercial property via your SMSF structure.", linkLabel: "Learn More" },
      { title: "SMSF Refinancing", description: "Refinance existing SMSF loans for better rates.", linkLabel: "Learn More" }
    ],
    "SMSF Lending Expertise",
    "Common questions about SMSF property loans"
  ),
  "car-financing": loanDefaults(
    [
      { title: "Personal Car Loan", description: "Competitive rates for your next vehicle purchase.", linkLabel: "Learn More" },
      { title: "Business Vehicle Finance", description: "Chattel mortgages and finance for business fleets.", linkLabel: "Learn More" },
      { title: "Novated Lease", description: "Tax-effective vehicle salary packaging options.", linkLabel: "Learn More" }
    ],
    "Vehicle Finance Benefits",
    "Common questions about car and vehicle finance"
  ),
  refinancing: loanDefaults(
    [
      { title: "Refinance Home/Investment Loan", description: "Save thousands by refinancing to a better rate.", anchorId: "refinance-loan-section", linkLabel: "Learn More" },
      { title: "Refinance & Cashout", description: "Access equity while refinancing for better terms.", anchorId: "cashout-section", linkLabel: "Learn More" },
      { title: "Refinance SMSF Loan", description: "Optimize your SMSF property loan with better rates.", anchorId: "smsf-refinance-section", linkLabel: "Learn More" }
    ],
    "Benefits of Refinancing",
    "Common questions about refinancing your home loan"
  )
};
function mergeServicesContent(raw) {
  const d = DEFAULT_SERVICES_CONTENT;
  return {
    servicesList: {
      ...d.servicesList,
      ...raw?.servicesList,
      cards: mergeCards(d.servicesList.cards, raw?.servicesList?.cards)
    },
    whyUs: {
      ...d.whyUs,
      ...raw?.whyUs,
      cards: mergeCards(d.whyUs.cards, raw?.whyUs?.cards)
    },
    teamSection: { ...d.teamSection, ...raw?.teamSection }
  };
}
function mergeLoanPageContent(slug, raw) {
  const d = LOAN_PAGE_DEFAULTS[slug] ?? HOME_LOANS_DEFAULT;
  return {
    topicTilesSection: { ...d.topicTilesSection, ...raw?.topicTilesSection },
    topicTiles: mergeTopicTiles(d.topicTiles, raw?.topicTiles),
    otherSolutions: raw?.otherSolutions ?? d.otherSolutions ? {
      ...d.otherSolutions ?? { title: "", cards: [] },
      ...raw?.otherSolutions,
      title: raw?.otherSolutions?.title ?? d.otherSolutions?.title ?? "",
      cards: mergeCards(d.otherSolutions?.cards ?? [], raw?.otherSolutions?.cards)
    } : void 0,
    spotlightSections: mergeSpotlights(d.spotlightSections, raw?.spotlightSections),
    whyUs: d.whyUs || raw?.whyUs ? {
      ...d.whyUs ?? { title: "", cards: [] },
      ...raw?.whyUs,
      cards: mergeCards(d.whyUs?.cards ?? [], raw?.whyUs?.cards)
    } : void 0,
    benefits: {
      ...d.benefits,
      ...raw?.benefits,
      cards: mergeCards(d.benefits.cards, raw?.benefits?.cards)
    },
    moreServices: {
      ...d.moreServices,
      ...raw?.moreServices,
      cards: mergeCards(d.moreServices.cards, raw?.moreServices?.cards)
    },
    faqs: {
      ...d.faqs,
      ...raw?.faqs,
      items: mergeFaqs(d.faqs.items, raw?.faqs?.items)
    },
    layout: raw?.layout ?? d.layout
  };
}
function mergeServicePageContent(slug, raw) {
  if (slug === "services") {
    return mergeServicesContent(raw);
  }
  return mergeLoanPageContent(slug, raw);
}
function getServiceAdminPath(slug) {
  if (slug === "services") return "/admin/services";
  return `/admin/services/${slug}`;
}
export {
  DEFAULT_SERVICES_CONTENT,
  LOAN_PAGE_DEFAULTS,
  LOAN_PRODUCT_SLUGS,
  SERVICE_SLUGS,
  getServiceAdminPath,
  mergeLoanPageContent,
  mergeServicePageContent,
  mergeServicesContent
};
