import type { ContentCard, SectionHeader, SectionVisibility } from "@/lib/page-content";

export type FaqItem = { question: string; answer: string };

export type SpotlightSection = SectionVisibility & {
  id?: string;
  title: string;
  subtitle: string;
  cardTitle: string;
  cardBody: string;
  link?: string;
  linkLabel?: string;
};

export type TopicTile = ContentCard & { anchorId?: string };

export type ServicesContent = {
  servicesList: SectionHeader & { cards: ContentCard[] };
  whyUs: SectionHeader & { cards: ContentCard[] };
  teamSection: SectionHeader;
};

export type LoanPageContent = {
  topicTilesSection: SectionVisibility;
  topicTiles: TopicTile[];
  otherSolutions?: SectionVisibility & { title: string; cards: ContentCard[] };
  spotlightSections: SpotlightSection[];
  whyUs?: SectionHeader & { cards: ContentCard[] };
  benefits: SectionHeader & { cards: ContentCard[] };
  moreServices: SectionHeader & { cards: ContentCard[] };
  faqs: SectionHeader & { items: FaqItem[] };
  /** Interleaves spotlight / why-us / benefits blocks like the hackbox home-loans page */
  layout?: "interleaved" | "stacked";
};

export const SERVICE_SLUGS = [
  "services",
  "home-loans",
  "investment-loans",
  "commercial-loans",
  "smsf-loans",
  "car-financing",
  "refinancing",
] as const;

export type ServiceSlug = (typeof SERVICE_SLUGS)[number];

export const LOAN_PRODUCT_SLUGS = [
  "home-loans",
  "investment-loans",
  "commercial-loans",
  "smsf-loans",
  "car-financing",
  "refinancing",
] as const;

function mergeCards(defaults: ContentCard[], raw?: ContentCard[]): ContentCard[] {
  return defaults.map((d, i) => ({ ...d, ...(raw?.[i] ?? {}) }));
}

function mergeTopicTiles(defaults: TopicTile[], raw?: TopicTile[]): TopicTile[] {
  return defaults.map((d, i) => ({ ...d, ...(raw?.[i] ?? {}) }));
}

function mergeSpotlights(defaults: SpotlightSection[], raw?: SpotlightSection[]): SpotlightSection[] {
  if (!raw?.length) return defaults;
  const rawById = new Map(
    raw.filter((s) => s.id).map((s) => [s.id as string, s]),
  );
  return defaults.map((d, i) => {
    const byId = d.id && rawById.has(d.id) ? rawById.get(d.id)! : undefined;
    const byIndex = raw[i];
    const indexMatch =
      byIndex && (!byIndex.id || !d.id || byIndex.id === d.id) ? byIndex : undefined;
    return { ...d, ...(byId ?? indexMatch ?? {}) };
  });
}

function mergeFaqs(defaults: FaqItem[], raw?: FaqItem[]): FaqItem[] {
  const len = Math.max(defaults.length, raw?.length ?? 0);
  return Array.from({ length: len }, (_, i) => ({
    ...(defaults[i] ?? { question: "", answer: "" }),
    ...(raw?.[i] ?? {}),
  }));
}

export const DEFAULT_SERVICES_CONTENT: ServicesContent = {
  servicesList: {
    badge: "OUR SERVICES",
    title: "What we offer",
    subtitle:
      "Explore our comprehensive range of lending solutions designed to help you achieve your property and financial goals",
    cards: [
      {
        title: "Home Loans",
        description:
          "First home buyers, upgraders, and investors - we'll find the perfect loan for your situation with competitive rates and flexible terms.",
        link: "/home-loans",
        linkLabel: "Learn More",
      },
      {
        title: "Investment Loans",
        description:
          "Build your property portfolio with expert investment loan solutions, equity strategies, and tax-effective structures for wealth creation.",
        link: "/investment-loans",
        linkLabel: "Learn More",
      },
      {
        title: "Refinancing",
        description:
          "Save thousands by switching to a better rate. Access your equity, consolidate debt, or simply get a better deal on your existing loan.",
        link: "/refinancing",
        linkLabel: "Learn More",
      },
      {
        title: "SMSF Loans",
        description:
          "Leverage your superannuation to invest in property with specialized SMSF lending solutions and expert compliance guidance.",
        link: "/smsf-loans",
        linkLabel: "Learn More",
      },
      {
        title: "Commercial Loans",
        description:
          "Financing solutions for business properties, commercial premises, and mixed-use developments with flexible terms.",
        link: "/commercial-loans",
        linkLabel: "Learn More",
      },
      {
        title: "Car Financing",
        description:
          "Competitive vehicle finance options for personal and business use, including chattel mortgages and novated leases.",
        link: "/car-financing",
        linkLabel: "Learn More",
      },
      {
        title: "Business Loans",
        description:
          "Funding solutions to help your business grow, including working capital, equipment finance, and expansion loans.",
        link: "/commercial-loans",
        linkLabel: "Learn More",
      },
    ],
  },
  whyUs: {
    badge: "WHY US",
    title: "Why choose ALS",
    subtitle: "More than 36,000 Australians trust us with their property finance needs",
    cards: [
      {
        title: "Client-First Approach",
        description:
          "Your interests always come first. We're paid by lenders, not by you, ensuring unbiased advice.",
      },
      {
        title: "Ethical Lending",
        description:
          "Founded on ethical principles. We focus on long-term client satisfaction, not short-term gains.",
      },
      {
        title: "Expert Team",
        description:
          "20+ years of experience helping Australians achieve their property dreams with personalized service.",
      },
      {
        title: "Proven Results",
        description:
          "96% loan approval rate with access to 25+ lenders for the best rates and terms.",
      },
    ],
  },
  teamSection: {
    badge: "OUR TEAM",
    title: "Meet our experts",
    subtitle:
      "Our dedicated team of mortgage professionals is here to guide you through your property journey",
  },
};

const HOME_LOANS_DEFAULT: LoanPageContent = {
  layout: "interleaved",
  topicTilesSection: {},
  topicTiles: [
    {
      title: "Buy First Home",
      description:
        "Step into the property market with confidence. Access exclusive first home buyer benefits, government schemes, and lower deposit options.",
      anchorId: "first-home-section",
      linkLabel: "Learn More",
    },
    {
      title: "Next Home Purchase",
      description:
        "Ready to upgrade or relocate? Leverage equity, coordinate timing between selling and buying with expert guidance.",
      anchorId: "next-home-section",
      linkLabel: "Learn More",
    },
    {
      title: "Buying with a Guarantor",
      description:
        "Get into the property market sooner with family support. Avoid LMI and potentially borrow up to 100% of property value.",
      anchorId: "guarantor-section",
      linkLabel: "Learn More",
    },
  ],
  otherSolutions: {
    title: "Other Solutions",
    cards: [
      {
        title: "Government Guarantee Scheme",
        description:
          "Access home ownership with as little as 5% deposit through the First Home Guarantee and other government-backed schemes.",
        link: "/resources/first-home-buyer-guide",
        linkLabel: "Learn More",
      },
      {
        title: "Buying an Investment Property",
        description:
          "Build wealth through property investment with specialized loan structures and tax benefits.",
        link: "/investment-loans",
        linkLabel: "Learn More",
      },
      {
        title: "Buying Through My SMSF",
        description:
          "Leverage your superannuation to invest in property with an SMSF loan structure.",
        link: "/smsf-loans",
        linkLabel: "Learn More",
      },
    ],
  },
  spotlightSections: [
    {
      id: "first-home-section",
      title: "Buy Your First Home",
      subtitle:
        "Taking your first step onto the property ladder is an exciting milestone. We specialize in helping first home buyers navigate the complexities of purchasing their first property, with access to exclusive first home buyer benefits, government schemes, and lower deposit options. Let us help you understand your borrowing capacity and find the right loan structure for your situation.",
      cardTitle: "First Home Buyer Benefits & Programs",
      cardBody:
        "As a first home buyer, you have access to various government grants, stamp duty concessions, and the First Home Guarantee scheme which allows you to purchase with as little as 5% deposit. We'll help you navigate all available options to maximize your benefits and get into your first home sooner.",
      link: "/resources/first-home-buyer-guide",
      linkLabel: "View First Home Buyer Benefits & Guide",
    },
    {
      id: "next-home-section",
      title: "Next Home Purchase",
      subtitle:
        "Ready to upgrade or relocate? Moving to your next home is an exciting milestone. We'll help you leverage the equity in your current property, explore your finance options, and coordinate timing between selling and buying. Our team ensures a smooth transition with strategies for bridging loans, pre-approval, and competitive rates that suit your upgraded lifestyle needs.",
      cardTitle: "Upgrading Made Simple",
      cardBody:
        "Whether you're upsizing for a growing family, downsizing for retirement, or relocating for lifestyle or work, we provide expert guidance on leveraging your existing equity, managing the sale-purchase timeline, and securing competitive financing for your next home. Our strategies include bridging finance options, pre-approval to strengthen your position, and loan structures that maximize tax benefits if you're converting your current home to an investment property.",
      linkLabel: "Discover Your Options",
    },
    {
      id: "guarantor-section",
      title: "Buying with a Guarantor",
      subtitle:
        "Get into the property market sooner with family support. A guarantor loan allows a family member (usually a parent) to use their property as security, helping you avoid Lenders Mortgage Insurance (LMI) and potentially borrow up to 100% of the property value. We'll explain how guarantor loans work, the responsibilities involved, and how to structure the loan to minimize risk for all parties.",
      cardTitle: "How Guarantor Loans Work",
      cardBody:
        "A guarantor uses the equity in their property as additional security for your home loan. This allows you to enter the property market with a smaller deposit or no deposit at all, avoiding costly Lenders Mortgage Insurance. The guarantor doesn't make your repayments or give you money - they simply provide security. As you build equity in your property through repayments and capital growth, the guarantee can often be removed. We ensure all parties fully understand their rights and responsibilities, structuring the guarantee to protect both you and your guarantor.",
      linkLabel: "Explore Guarantor Options",
    },
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for Your Home Loan?",
    subtitle:
      "More than 36,000 Australian businesses and individuals choose us as their mortgage brokers. Here's why we're trusted to deliver exceptional results.",
    cards: [
      {
        title: "Client-First Approach",
        description:
          "Your goals are our priority. We take time to understand your unique situation and tailor solutions that align with your long-term financial objectives.",
      },
      {
        title: "Expert Guidance",
        description:
          "Our experienced mortgage brokers bring decades of combined industry knowledge, staying current with market trends and lender policies to secure the best outcomes.",
      },
      {
        title: "Access to Better Rates",
        description:
          "We compare loans from over 40 lenders including major banks and specialist lenders, negotiating competitive rates you may not access directly.",
      },
      {
        title: "End-to-End Support",
        description:
          "From pre-approval to settlement and beyond, we manage the entire loan process, liaising with lenders and keeping you informed every step of the way.",
      },
    ],
  },
  benefits: {
    badge: "BENEFITS",
    title: "Unlock the Power of Your Property",
    subtitle: "Strategic refinancing and smart borrowing can transform your financial future",
    cards: [
      {
        title: "Strategic Equity Access",
        description:
          "Strategic planning for further investments via equity access through refinancing. Equity release to further investment in the property market will enhance your property goals and accelerate your path to financial freedom.",
      },
      {
        title: "Property Enhancement",
        description:
          "Cashout for further renovations or improvements to the property that increase the property value and better lifestyle. Strategic improvements deliver both enjoyment and strong returns on investment.",
      },
      {
        title: "Smart Debt Management",
        description:
          "Consolidating the debts and easing your repayments to manage your finance better. This strategy simplifies your finances with one manageable payment and reduces overall interest costs.",
      },
    ],
  },
  moreServices: {
    title: "More Than Just Loans",
    subtitle:
      "At ALS Mortgage Solutions, we provide comprehensive financial services that go beyond just finding you a loan",
    cards: [
      {
        title: "Property Investment Strategy",
        description:
          "We don't just arrange loans - we help you develop a comprehensive property investment strategy aligned with your financial goals, assessing market opportunities and optimal structures.",
      },
      {
        title: "Ongoing Support & Reviews",
        description:
          "Our relationship doesn't end at settlement. We provide ongoing loan reviews, market updates, and refinancing opportunities to ensure your loan remains competitive throughout its lifetime.",
      },
      {
        title: "Professional Network",
        description:
          "Access our trusted network of professionals including conveyancers, solicitors, accountants, financial planners, and property experts to support your entire property journey.",
      },
      {
        title: "Pre-Approval & Auction Bidding",
        description:
          "Get pre-approved quickly to strengthen your negotiating position. We provide unconditional pre-approvals that give you confidence to bid at auctions or make offers with certainty.",
      },
      {
        title: "Lender Negotiation",
        description:
          "Leverage our strong lender relationships and industry expertise to negotiate better rates, waived fees, and favorable loan conditions that you couldn't access directly.",
      },
      {
        title: "Education & Resources",
        description:
          "Access our comprehensive guides, calculators, market insights, and educational resources to make informed decisions throughout your property and finance journey.",
      },
    ],
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle:
      "Get answers to common questions about home loans, refinancing, and property investment",
    items: [
      {
        question: "How much can I borrow for a home loan?",
        answer:
          "Your borrowing capacity depends on several factors including your income, expenses, existing debts, credit history, and the property value. Generally, lenders will assess your ability to service the loan based on your net income after expenses. Most lenders use a debt-to-income ratio and apply a buffer to interest rates when assessing serviceability. We can provide a comprehensive assessment of your borrowing capacity and help you understand how to maximize it.",
      },
      {
        question: "What deposit do I need to buy a home?",
        answer:
          "While traditionally a 20% deposit is ideal to avoid Lenders Mortgage Insurance (LMI), there are many options available with smaller deposits. First home buyers may qualify for government schemes requiring as little as 5% deposit. Guarantor loans can enable you to borrow up to 100% of the property value. The right deposit amount depends on your circumstances, and we can help you explore all available options to get into the market sooner.",
      },
      {
        question: "Should I choose a fixed or variable interest rate?",
        answer:
          "Both fixed and variable rates have advantages. Fixed rates provide certainty with consistent repayments for the fixed period (typically 1-5 years), protecting you from rate rises but preventing you from benefiting from rate drops. Variable rates fluctuate with the market, offering more flexibility with features like offset accounts and unlimited extra repayments. Many borrowers choose a split loan combining both. We'll help you assess your risk tolerance, financial situation, and market conditions to determine the best strategy.",
      },
      {
        question: "What is the refinancing process and how long does it take?",
        answer:
          "Refinancing typically takes 4-6 weeks from application to settlement. The process involves: 1) Assessing your current loan and goals, 2) Comparing new loan options, 3) Submitting your application, 4) Property valuation, 5) Loan approval, 6) Signing loan documents, and 7) Settlement and discharge of your old loan. We manage the entire process, coordinating with lenders and your current bank to ensure a smooth transition with minimal disruption.",
      },
      {
        question: "Can I access equity in my home without selling?",
        answer:
          "Yes, through refinancing or a home equity loan, you can access the equity you've built up in your property. Equity is the difference between your property's current market value and what you owe on your mortgage. You can typically access up to 80% of your property value (minus your existing loan) without paying LMI. This equity can be used for renovations, investment property deposits, debt consolidation, or other purposes. We'll help you calculate your available equity and structure the loan appropriately.",
      },
      {
        question: "What are the tax benefits of investment property loans?",
        answer:
          "Investment property loans offer several tax advantages: 1) Loan interest is tax deductible, 2) Negative gearing allows you to offset losses against your taxable income, 3) Depreciation deductions on the building and fixtures, 4) Property-related expenses like maintenance, insurance, and property management fees are deductible. Structuring your investment loan correctly from the start is crucial for maximizing tax benefits. We recommend consulting with a tax advisor alongside our mortgage guidance for comprehensive planning.",
      },
      {
        question: "How does a guarantor loan work?",
        answer:
          "A guarantor loan allows a family member (usually a parent) to use equity in their own property as additional security for your loan. This enables you to borrow more than your deposit would normally allow and avoid paying Lenders Mortgage Insurance. The guarantor doesn't make your repayments or give you money - they simply provide security. The guarantee can often be removed once you build sufficient equity in your property. We ensure all parties understand the responsibilities and help structure the guarantee to minimize risk.",
      },
      {
        question: "What fees are involved in getting a home loan or refinancing?",
        answer:
          "Common fees include: application fees ($0-$1,000), valuation fees ($200-$600), settlement fees ($200-$800), and potentially discharge fees ($300-$400) when refinancing. When refinancing, many lenders offer cashback incentives or waive application fees to win your business. Some lenders also offer 'no fee' loan packages. Our service is typically free for you as we receive commission from the lender, and we'll provide a complete breakdown of all costs involved so there are no surprises.",
      },
    ],
  },
};

const INVESTMENT_LOANS_DEFAULT: LoanPageContent = {
  layout: "interleaved",
  topicTilesSection: {},
  topicTiles: [
    {
      title: "Buying 1st Investment Property",
      description:
        "Start building wealth through property investment with tailored financing, strategic advice, and competitive investor rates.",
      anchorId: "first-investment-section",
      linkLabel: "Learn More",
    },
    {
      title: "Purchasing Next Investment Property",
      description:
        "Expand your portfolio with equity leverage strategies and tax-effective loan structures for experienced investors.",
      anchorId: "next-investment-section",
      linkLabel: "Learn More",
    },
    {
      title: "Buying Through My SMSF",
      description:
        "Leverage your superannuation to build wealth through property with SMSF-compliant loan solutions.",
      anchorId: "smsf-section",
      linkLabel: "Learn More",
    },
  ],
  otherSolutions: {
    title: "Other Solutions",
    cards: [
      {
        title: "Home Loans",
        description:
          "Explore home loan options for owner-occupied properties with competitive rates and flexible terms.",
        link: "/home-loans",
        linkLabel: "Learn More",
      },
      {
        title: "Refinancing",
        description:
          "Access equity in your existing property to fund your investment property deposit or get better rates.",
        link: "/refinancing",
        linkLabel: "Learn More",
      },
      {
        title: "Commercial Loans",
        description:
          "Finance commercial properties and mixed-use developments with specialized lending solutions.",
        link: "/commercial-loans",
        linkLabel: "Learn More",
      },
    ],
  },
  spotlightSections: [
    {
      id: "first-investment-section",
      title: "Buying Your First Investment Property",
      subtitle:
        "Start building wealth through property investment. We'll guide you through choosing the right investment strategy, understanding rental yields, negative gearing benefits, and structuring your loan for optimal tax efficiency. Our team helps you navigate deposit requirements, interest-only options, and lender policies specific to investment properties to set a strong foundation for your investment journey.",
      cardTitle: "Investment Property Finance Strategies",
      cardBody:
        "As a first-time property investor, you'll benefit from our expert guidance on loan structures, tax optimization, and investment strategies. We help you understand the difference between principal and interest vs interest-only loans, negative gearing advantages, depreciation benefits, and how to maximize your rental income. Our network of property advisors can also assist with property selection, location analysis, and long-term growth potential.",
      linkLabel: "Start Your Investment Journey",
    },
    {
      id: "next-investment-section",
      title: "Purchasing Next Investment Property",
      subtitle:
        "Expand your investment portfolio strategically. We'll help you leverage equity from existing properties, structure cross-collateralization arrangements, and assess your borrowing capacity for additional investments. Our expertise in portfolio lending ensures you maintain healthy serviceability while growing your property assets, with strategies for capital growth and cash flow optimization.",
      cardTitle: "Portfolio Growth Strategies",
      cardBody:
        "Building a successful property portfolio requires careful planning and strategic financing. We help experienced investors leverage existing equity through refinancing or equity release, structure loans to maximize tax benefits, navigate cross-collateralization decisions, and maintain strong serviceability ratios. Our portfolio lending specialists understand how to present multiple property holdings to lenders for optimal approval outcomes, while our strategies focus on balancing capital growth properties with positive cash flow investments.",
      linkLabel: "Grow Your Portfolio",
    },
    {
      id: "smsf-section",
      title: "Buying Through My SMSF",
      subtitle:
        "Unlock the power of your superannuation for property investment. SMSF lending allows you to purchase residential or commercial property within your self-managed super fund, combining retirement savings with property investment. We specialize in the complex regulations, compliance requirements, and bare trust structures needed for SMSF property loans, ensuring your investment meets all legal requirements.",
      cardTitle: "SMSF Property Investment",
      cardBody:
        "Self-Managed Super Fund property investment offers unique advantages for building retirement wealth through property. We navigate the complex regulations including bare trust arrangements, limited recourse borrowing arrangements (LRBA), sole purpose test compliance, and related party transaction rules. Our SMSF specialists work with your accountant and financial advisor to ensure proper structure, help you understand contribution limits and liquidity requirements, and connect you with specialist SMSF lenders offering competitive rates and terms.",
      link: "/smsf-loans",
      linkLabel: "Explore SMSF Investment Options",
    },
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for Investment Property Loans?",
    subtitle:
      "More than 36,000 Australian businesses and individuals choose us as their mortgage brokers. Here's why we're trusted to deliver exceptional investment property finance results.",
    cards: [
      {
        title: "Investment Expertise",
        description:
          "Our team specializes in investment property finance, understanding the nuances of investor lending, tax implications, and portfolio growth strategies.",
      },
      {
        title: "Strategic Planning",
        description:
          "We don't just arrange loans - we help develop comprehensive investment strategies aligned with your wealth-building goals and risk tolerance.",
      },
      {
        title: "Tax-Effective Structures",
        description:
          "We structure investment loans to maximize tax deductions, negative gearing benefits, and depreciation advantages for optimal returns.",
      },
      {
        title: "Investor Lender Access",
        description:
          "Access to specialist investment lenders with competitive investor rates, higher LVR options, and flexible serviceability criteria.",
      },
    ],
  },
  benefits: {
    badge: "BENEFITS",
    title: "Investment Property Loan Benefits",
    subtitle: "Maximize your returns with strategic investment property financing",
    cards: [
      {
        title: "Strategic Equity Access",
        description:
          "Strategic planning for further investments via equity access through refinancing. Equity release to further investment in the property market will enhance your property goals and accelerate your path to financial freedom.",
      },
      {
        title: "Tax Deductibility",
        description:
          "Investment loan interest is fully tax deductible, reducing your taxable income. Combined with negative gearing and depreciation benefits, investment properties offer significant tax advantages to build wealth efficiently.",
      },
      {
        title: "Portfolio Diversification",
        description:
          "Build a diversified property portfolio across different locations and property types. Strategic financing enables you to spread risk while maximizing capital growth and rental income opportunities.",
      },
    ],
  },
  moreServices: {
    title: "More Than Just Loans",
    subtitle:
      "At ALS Mortgage Solutions, we provide comprehensive investment property services that go beyond just finding you a loan",
    cards: [
      {
        title: "Investment Strategy Development",
        description:
          "We help you develop a comprehensive property investment strategy aligned with your financial goals, risk tolerance, and timeline - assessing market opportunities and optimal portfolio structures.",
      },
      {
        title: "Tax Optimization Advice",
        description:
          "Structure your investment loans for maximum tax efficiency. We work with tax accountants to ensure you're leveraging negative gearing, depreciation, and deductions effectively.",
      },
      {
        title: "Property Professional Network",
        description:
          "Access our network of buyers agents, property managers, building inspectors, and investment advisors to support your entire investment journey.",
      },
      {
        title: "Portfolio Lending Expertise",
        description:
          "Specialist support for investors with multiple properties. We understand complex portfolio lending, cross-collateralization decisions, and serviceability optimization.",
      },
      {
        title: "Ongoing Portfolio Reviews",
        description:
          "Regular portfolio health checks to identify refinancing opportunities, equity release strategies, and loan structure optimizations as your portfolio grows.",
      },
      {
        title: "Investment Education",
        description:
          "Access educational resources, market insights, and investment analysis tools to make informed decisions and grow your property investment knowledge.",
      },
    ],
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about investment property loans",
    items: [
      {
        question: "What deposit do I need for an investment property?",
        answer:
          "Investment property loans typically require a 20% deposit to avoid Lenders Mortgage Insurance (LMI). However, some lenders offer investment loans with 10-15% deposits, though LMI will apply. If you have equity in your existing property, you may be able to use this equity as your deposit through refinancing or a guarantor structure. We can help you assess your options and find the most suitable approach for your situation.",
      },
      {
        question:
          "Should I choose interest-only or principal and interest for investment loans?",
        answer:
          "Interest-only loans are popular for investment properties as they maximize tax deductions (all interest is deductible) and improve cash flow. This allows you to use the savings to invest in additional properties or pay down non-deductible debt. However, you're not building equity through repayments. Principal and interest loans build equity faster and have lower overall interest costs. Many investors use interest-only during the growth phase and switch to P&I later. We'll help you choose based on your investment strategy and tax position.",
      },
      {
        question: "What are the tax benefits of investment property loans?",
        answer:
          "Investment property loans offer significant tax advantages: 1) All loan interest is tax deductible against your rental income, 2) Negative gearing allows you to offset losses against your other taxable income, 3) Depreciation on the building and fixtures provides additional deductions, 4) All property-related expenses (rates, insurance, maintenance, property management) are deductible. These benefits can significantly reduce your after-tax cost of holding investment property. We recommend working with a tax accountant to maximize these benefits.",
      },
      {
        question:
          "How do lenders assess my borrowing capacity for investment properties?",
        answer:
          "Lenders assess investment property borrowing differently than owner-occupied homes. They typically only count 80% of rental income in serviceability calculations (assuming 20% for costs and vacancies), and may apply higher interest rate buffers. They'll consider your existing debts, living expenses, income, and rental income from the investment property. If you own multiple properties, they'll assess your entire portfolio. Strong rental yields, stable employment, and good credit history improve your borrowing capacity. We'll help present your application for the best outcome.",
      },
      {
        question: "Can I use equity in my home to buy an investment property?",
        answer:
          "Yes, using equity in your existing property is one of the most common ways to fund an investment property purchase. If you have 20% or more equity in your home, you can access this through refinancing or a home equity loan to use as a deposit for your investment property. This strategy allows you to enter the investment market without saving a cash deposit. We'll help you calculate your available equity, structure the loans appropriately, and ensure you maintain healthy serviceability across both properties.",
      },
      {
        question: "What is negative gearing and how does it work?",
        answer:
          "Negative gearing occurs when your property expenses (including loan interest, rates, insurance, maintenance, and management fees) exceed your rental income. This 'loss' can be offset against your other taxable income, reducing your overall tax liability. For example, if your property costs you $10,000 more per year than it earns in rent, and you're in the 37% tax bracket, you could save $3,700 in tax. While you're making a cash loss, the tax benefits plus anticipated capital growth make it an attractive wealth-building strategy for many investors.",
      },
      {
        question: "Should I cross-collateralize my investment properties?",
        answer:
          "Cross-collateralization means using multiple properties as security for one or more loans. Advantages include easier approval, potentially better rates, and simpler management. However, disadvantages include difficulty selling individual properties (as they secure other loans), one lender having control over all properties, and potential complications if you experience financial difficulty. Generally, sophisticated investors prefer to keep properties in separate loan facilities for maximum flexibility. We'll help you understand the pros and cons based on your specific situation and long-term strategy.",
      },
      {
        question: "How does SMSF property investment work?",
        answer:
          "SMSF property investment involves your self-managed super fund purchasing property using a Limited Recourse Borrowing Arrangement (LRBA). The property is held in a bare trust separate from other SMSF assets, and the fund makes loan repayments using contributions and rental income. Key requirements include: the property must meet the sole purpose test (retirement benefit), can't be lived in by members or related parties, requires arm's length transactions, and has strict compliance obligations. Benefits include tax-advantaged growth and potential for substantial retirement wealth. We work with specialist SMSF lenders and recommend coordinating with your accountant and financial advisor.",
      },
    ],
  },
};

const COMMERCIAL_LOANS_DEFAULT: LoanPageContent = {
  layout: "interleaved",
  topicTilesSection: {},
  topicTiles: [
    {
      title: "Buy a Commercial Property",
      description:
        "Finance office spaces, retail shops, warehouses, and industrial properties with flexible commercial loan solutions.",
      anchorId: "commercial-property-section",
      linkLabel: "Learn More",
    },
    {
      title: "Finance for a Development",
      description:
        "Construction and development finance for residential subdivisions, unit developments, and commercial projects.",
      anchorId: "development-finance-section",
      linkLabel: "Learn More",
    },
    {
      title: "Buy through my SMSF",
      description:
        "Purchase commercial property through your self-managed super fund for long-term wealth creation and tax benefits.",
      anchorId: "smsf-commercial-section",
      linkLabel: "Learn More",
    },
  ],
  spotlightSections: [
    {
      id: "commercial-property-section",
      title: "Buy a Commercial Property",
      subtitle:
        "Commercial property finance helps businesses and investors acquire office spaces, retail premises, warehouses, industrial facilities, and mixed-use properties. Build wealth through commercial real estate with tailored financing solutions.",
      cardTitle: "Types of Commercial Properties We Finance",
      cardBody:
        "Office Buildings: Single or multi-tenant office spaces, medical suites, professional offices, and corporate headquarters. Retail Premises: Shopping centers, standalone shops, strip malls, restaurants, and hospitality venues. Industrial & Warehouses: Warehouses, distribution centers, manufacturing facilities, and logistics hubs. Mixed-Use Properties: Properties combining residential, commercial, retail, or office spaces in one development. Specialty Properties: Medical centers, childcare facilities, service stations, car washes, and self-storage facilities. Owner-Occupied: Purchase commercial property for your own business operations with favorable owner-occupier rates.",
    },
    {
      id: "development-finance-section",
      title: "Finance for a Development",
      subtitle:
        "Development finance funds the construction of new properties or major renovations. Whether you're building residential units, townhouses, subdivisions, or commercial developments, we'll help you secure the funding you need.",
      cardTitle: "Types of Development Finance",
      cardBody:
        "Residential Development: Finance for residential developments including unit blocks, townhouses, dual occupancies, and land subdivisions. Suitable for builders and developers of all sizes (2-100+ unit developments, land subdivision and civil works, townhouse and duplex construction). Commercial Development: Funding for commercial construction projects including office buildings, retail centers, warehouses, and mixed-use developments. Construction Loans: Progressive drawdown facilities that release funds as construction milestones are completed, ensuring you only pay interest on funds drawn (progress payment structures, interest capitalization options, 12-24 month construction terms). Mezzanine Finance: Additional funding to bridge equity gaps or increase project scope. Sits between senior debt and equity, typically at higher interest rates.",
    },
    {
      id: "smsf-commercial-section",
      title: "Buy Commercial Property through Your SMSF",
      subtitle:
        "Self-managed super funds can purchase commercial property, including property your business operates from. This powerful strategy allows you to build retirement wealth while potentially reducing business overheads.",
      cardTitle: "Benefits of SMSF Commercial Property",
      cardBody:
        "Lease to Your Business: Your SMSF can purchase commercial property and lease it to your business at market rates, with rent paid to your super fund. Concessional Tax Rate: Rental income is taxed at just 15% in accumulation phase or 0% in pension phase, far lower than personal tax rates. Build Super Wealth: Property appreciation and rental income grow your superannuation balance in a tax-effective environment. Business Tax Deductions: Your business can claim rent payments as tax deductions, reducing taxable income while building super. Asset Protection: Property held in SMSF is protected from business creditors and provides separation of business and personal assets. Capital Gains Discount: One-third CGT discount in accumulation phase, or 0% capital gains tax if sold during pension phase.",
    },
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for Commercial Loans?",
    subtitle:
      "We specialize in complex commercial transactions and have access to specialist commercial lenders beyond the major banks.",
    cards: [
      {
        title: "Commercial Specialists",
        description:
          "Our team has extensive experience in commercial property finance, understanding complex deals and structuring solutions.",
      },
      {
        title: "Extensive Lender Panel",
        description:
          "Access to specialist commercial lenders, private lenders, and non-bank institutions beyond the major banks.",
      },
      {
        title: "Deal Structuring",
        description:
          "Expert advice on structuring your commercial loan for optimal tax benefits and asset protection.",
      },
      {
        title: "End-to-End Support",
        description:
          "We manage the entire process from pre-approval to settlement, liaising with all parties involved.",
      },
    ],
  },
  benefits: {
    badge: "BENEFITS",
    title: "Commercial Loan Advantages",
    subtitle:
      "Build wealth and grow your business through strategic commercial property investment",
    cards: [
      {
        title: "Higher Rental Yields",
        description:
          "Commercial properties typically deliver rental yields of 5-8% compared to 2-4% for residential, providing stronger cash flow and faster wealth accumulation for investors and business owners.",
      },
      {
        title: "Longer Lease Terms",
        description:
          "Commercial tenants typically sign 3-10 year leases with built-in rent increases, providing stable, predictable income and reducing vacancy risk compared to residential properties.",
      },
      {
        title: "Tax & Depreciation Benefits",
        description:
          "Maximize tax deductions through interest payments, depreciation on buildings and fit-outs, and GST credits. Commercial property offers superior tax benefits for businesses and investors.",
      },
    ],
  },
  moreServices: {
    title: "More Than Just Commercial Loans",
    subtitle:
      "At ALS Mortgage Solutions, we provide comprehensive commercial finance services beyond just finding you a loan",
    cards: [
      {
        title: "Lease Review & Negotiation",
        description:
          "Expert advice on commercial lease terms and structuring to ensure favorable conditions that support your loan application and protect your interests.",
      },
      {
        title: "Investment Strategy",
        description:
          "Strategic advice on commercial property investment including market analysis, yield assessment, and portfolio diversification strategies.",
      },
      {
        title: "Professional Network",
        description:
          "Access to our network of commercial property specialists including accountants, lawyers, valuers, and quantity surveyors.",
      },
      {
        title: "Structure & Tax Planning",
        description:
          "Guidance on optimal ownership structures (companies, trusts, SMSF) for asset protection and tax efficiency in consultation with your accountant.",
      },
      {
        title: "Lender Relationship Management",
        description:
          "Ongoing relationship management with your lender for future funding needs, loan variations, and maintaining favorable terms.",
      },
      {
        title: "Portfolio Reviews",
        description:
          "Regular reviews of your commercial property portfolio and loans to identify refinancing opportunities and optimize your investment returns.",
      },
    ],
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about commercial loans",
    items: [
      {
        question: "What deposit do I need for a commercial property loan?",
        answer:
          "Commercial property loans typically require a minimum 20% deposit, though some lenders may lend up to 80% LVR for strong borrowers with good property covenants. Owner-occupied commercial properties may qualify for higher LVRs (up to 90%) with stronger servicing. The actual LVR depends on property type, location, tenant quality, lease terms, and your financial position. Specialist properties or those in regional areas may require larger deposits (30-40%). We can help you understand what deposit you'll need based on your specific circumstances.",
      },
      {
        question: "How do lenders assess commercial property loans?",
        answer:
          "Lenders assess commercial loans differently than residential. Key factors include: property income (rental yield and lease terms), tenant covenant strength (financial stability of tenants), property location and condition, your business or investment experience, serviceability (ability to meet repayments from rent and other income), and security value (property valuation). For owner-occupied properties, business cash flow and trading history are crucial. We help you prepare comprehensive applications addressing all assessment criteria to maximize approval chances.",
      },
      {
        question:
          "What's the difference between owner-occupied and investment commercial loans?",
        answer:
          "Owner-occupied loans are for businesses purchasing property they'll operate from (51%+ of space). They typically offer lower interest rates (0.5-1% lower), higher LVRs (up to 90%), and focus on business serviceability. Investment commercial loans are for properties leased to third parties, assessed on rental income and tenant quality, typically capped at 80% LVR with slightly higher rates. Owner-occupied loans often have better terms as your business success directly impacts loan repayment, making them lower risk for lenders.",
      },
      {
        question: "Can I use residential property as security for a commercial loan?",
        answer:
          "Yes, you can use residential property as additional security (cross-collateralization) to increase borrowing capacity or reduce the deposit required for commercial property. This is common for first-time commercial buyers or when purchasing property with weak tenant covenants. However, this puts your home at risk if the business struggles. Some lenders offer higher LVRs when residential property is offered as additional security. We can help you understand the risks and structure this appropriately with separate securities where possible.",
      },
      {
        question: "What are the typical loan terms for commercial property?",
        answer:
          "Commercial property loans typically have 25-30 year terms, though 15-25 years is more common. Interest-only periods of 5-10 years are standard for investment properties, allowing investors to maximize cash flow and claim tax deductions. Owner-occupied loans may have shorter interest-only periods (1-5 years). Loan terms can be structured to align with lease expiry dates for investment properties. Development loans are typically 12-24 months with interest-only payments. We help you structure loan terms to optimize your cash flow and investment strategy.",
      },
      {
        question: "What types of commercial properties are easiest to finance?",
        answer:
          "Easiest to finance: office buildings and retail shops in metropolitan areas with strong tenant covenants, long lease terms, and good locations. Medical centers, childcare centers with government-backed tenants, and industrial warehouses in strong markets are also favorable. More difficult: specialty properties (service stations, pubs, car washes), properties in regional or remote areas, older buildings requiring significant capital expenditure, and properties with short lease terms or weak tenants. We have access to specialist lenders who can finance harder-to-place properties that major banks decline.",
      },
      {
        question: "Can I refinance my commercial property loan?",
        answer:
          "Yes, commercial property loans can be refinanced to access better rates, release equity for business growth or additional investments, consolidate debts, or switch lenders for better service and features. Refinancing is worth considering when your fixed rate expires, interest rates drop significantly, your property has appreciated creating equity, or you want to restructure your loan. Exit fees and break costs may apply, particularly for fixed-rate loans. We'll calculate whether refinancing makes financial sense by comparing all costs against potential savings and benefits.",
      },
      {
        question: "How long does commercial loan approval take?",
        answer:
          "Commercial loan approvals typically take 2-6 weeks, longer than residential loans due to complexity. Timeline includes: initial assessment (2-3 days), formal application submission (1 week), property valuation (1-2 weeks), credit assessment and approval (1-2 weeks), and documentation and settlement (2-3 weeks). Complex deals, development finance, or specialist properties may take 8-12 weeks. To expedite approval: provide comprehensive documentation upfront, have a clear investment strategy and business plan, choose an experienced broker who knows commercial lenders, and ensure the property has strong tenant covenants and location. We manage the process end-to-end to minimize delays.",
      },
    ],
  },
};

const SMSF_LOANS_DEFAULT: LoanPageContent = {
  layout: "interleaved",
  topicTilesSection: {},
  topicTiles: [
    {
      title: "Buy a Residential Property through SMSF",
      description:
        "Invest in residential property through your super fund for long-term wealth creation with tax-effective returns.",
      anchorId: "residential-smsf-section",
      linkLabel: "Learn More",
    },
    {
      title: "Buy a Commercial Property through SMSF",
      description:
        "Purchase commercial property your business operates from, paying rent to your super fund for retirement wealth.",
      anchorId: "commercial-smsf-section",
      linkLabel: "Learn More",
    },
    {
      title: "Refinance an Existing SMSF Loan",
      description:
        "Access better rates and terms on your current SMSF property loan while maintaining compliance with regulations.",
      anchorId: "refinance-smsf-section",
      linkLabel: "Learn More",
    },
  ],
  spotlightSections: [
    {
      id: "residential-smsf-section",
      title: "Buy a Residential Property through SMSF",
      subtitle:
        "Self-managed super funds can purchase residential investment properties using Limited Recourse Borrowing Arrangements (LRBA). Build your retirement wealth through property while enjoying concessional tax treatment on rental income and capital gains.",
      cardTitle: "Benefits of SMSF Residential Property",
      cardBody:
        "Tax-Effective Income: Rental income is taxed at just 15% during accumulation phase, or 0% if your SMSF is in pension phase. Capital Gains Concessions: One-third capital gains tax discount in accumulation, or 0% CGT if sold during pension phase. Property Diversification: Diversify your super portfolio beyond shares and cash with tangible property assets. Leverage Your Super: Use borrowed funds to purchase property, amplifying your super fund's investment capacity. Asset Protection: Property held in SMSF is protected from personal creditors and bankruptcy proceedings. Build Retirement Wealth: Long-term property appreciation grows your retirement savings in a tax-effective environment.",
    },
    {
      id: "commercial-smsf-section",
      title: "Buy a Commercial Property through SMSF",
      subtitle:
        "SMSFs can purchase commercial property and lease it to a related party, including your own business. This powerful strategy allows your business to pay rent to your super fund, building retirement wealth while potentially reducing business overheads through tax-deductible rent payments.",
      cardTitle: "Benefits of SMSF Commercial Property",
      cardBody:
        "Lease to Your Business: Your SMSF can lease commercial property to your business or related entity, creating a tax-effective arrangement. Business Tax Deductions: Your business claims rent payments as tax deductions while building your super fund balance. Tax-Effective Returns: Rental income taxed at 15% (accumulation) or 0% (pension), far lower than personal tax rates. Control Business Premises: Secure your business location long-term while building retirement wealth through property ownership. Asset Protection: Property in SMSF is protected from business creditors, separating business and retirement assets. Capital Gains Benefits: Reduced CGT on property sale (one-third discount or 0% if in pension phase).",
    },
    {
      id: "refinance-smsf-section",
      title: "Refinance an Existing SMSF Loan",
      subtitle:
        "Refinance your existing SMSF property loan to access better interest rates, improved loan features, or release equity for additional investments. Save thousands while maintaining compliance with all SMSF regulations.",
      cardTitle: "Why Refinance Your SMSF Loan?",
      cardBody:
        "Lower Interest Rates: Secure better rates to reduce interest costs and improve your SMSF's investment returns. Better Loan Features: Access improved features like offset accounts, flexible repayment options, or longer interest-only periods. Release Equity: Access property equity for additional SMSF property investments or other permitted investments. Switch Loan Types: Change from fixed to variable rates or vice versa based on market conditions and your strategy. Improve Cash Flow: Reduce monthly repayments to improve SMSF cash flow for other investments or member pensions. Better Lender Service: Switch to lenders with better SMSF understanding, faster processing, and specialist support.",
    },
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for SMSF Loans?",
    subtitle:
      "We specialize in SMSF lending and work with specialist lenders who understand the unique requirements of super fund property loans.",
    cards: [
      {
        title: "SMSF Specialists",
        description:
          "Deep expertise in SMSF lending regulations, compliance requirements, and specialist lender policies.",
      },
      {
        title: "Compliance Focused",
        description:
          "We ensure your loan structure meets all ATO and superannuation law requirements to protect your SMSF.",
      },
      {
        title: "Specialist Lender Access",
        description:
          "Access to SMSF-specialist lenders who offer competitive rates and understand super fund lending.",
      },
      {
        title: "Accountant Collaboration",
        description:
          "We work closely with your SMSF accountant to ensure seamless integration and compliance.",
      },
    ],
  },
  benefits: {
    badge: "BENEFITS",
    title: "SMSF Property Loan Advantages",
    subtitle:
      "Build significant retirement wealth through tax-effective property investment in your super fund",
    cards: [
      {
        title: "Tax-Effective Growth",
        description:
          "Rental income and capital gains are taxed at concessional rates (15% accumulation, 0% pension), significantly lower than personal tax rates, accelerating wealth accumulation for retirement.",
      },
      {
        title: "Asset Protection & Control",
        description:
          "Property held in SMSF is protected from personal and business creditors. For business owners, you control your premises while building retirement wealth through ownership in your super fund.",
      },
      {
        title: "Leverage & Diversification",
        description:
          "Use borrowed funds to amplify your super fund's property investment capacity. Diversify beyond traditional super investments (shares, cash) into tangible property assets for balanced portfolio growth.",
      },
    ],
  },
  moreServices: {
    title: "More Than Just SMSF Loans",
    subtitle:
      "At ALS Mortgage Solutions, we provide comprehensive SMSF lending services that go beyond just finding you a loan",
    cards: [
      {
        title: "Compliance Guidance",
        description:
          "Expert advice on SMSF regulations, ATO requirements, and structuring your loan to meet all compliance obligations.",
      },
      {
        title: "Accountant Coordination",
        description:
          "We work closely with your SMSF accountant to ensure seamless integration and proper documentation for compliance.",
      },
      {
        title: "Investment Strategy",
        description:
          "Help developing your SMSF investment strategy to document property investment rationale and satisfy ATO requirements.",
      },
      {
        title: "Bare Trust Setup",
        description:
          "Arrangement of proper bare trust documentation and structure to hold property under Limited Recourse Borrowing rules.",
      },
      {
        title: "Ongoing SMSF Support",
        description:
          "Regular reviews of your SMSF loan to identify refinancing opportunities and ensure continued optimal structure.",
      },
      {
        title: "Cash Flow Modeling",
        description:
          "Detailed modeling of SMSF cash flows to ensure you can comfortably service the loan and meet all obligations.",
      },
    ],
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about SMSF property loans",
    items: [
      {
        question: "Can my SMSF borrow to buy property?",
        answer:
          "Yes, SMSFs can borrow to purchase property using a Limited Recourse Borrowing Arrangement (LRBA). The property must be held in a bare trust with the SMSF as beneficiary, and the loan must have limited recourse (lender can only claim the property, not other SMSF assets, if default occurs). This allows your super fund to leverage and purchase property worth more than your current SMSF balance. The property can be residential (rented to unrelated parties only) or commercial (can be leased to related parties including your business).",
      },
      {
        question: "How much deposit does my SMSF need?",
        answer:
          "SMSF property loans typically require a 20% deposit, meaning you can borrow up to 80% of the property value. This deposit must come from your SMSF's existing funds, which can include member contributions, rollover funds from other super accounts, or proceeds from selling other SMSF investments. Some lenders may require larger deposits (30-40%) for certain property types or locations. Your SMSF must also have sufficient cash reserves beyond the deposit to cover stamp duty, legal fees, ongoing loan repayments, and property expenses.",
      },
      {
        question: "What are the interest rates for SMSF loans?",
        answer:
          "SMSF loan interest rates typically range from 6.5-8.5% p.a., depending on property type (residential vs commercial), loan amount, LVR, and whether the property is leased to a related party. Rates are generally 0.5-1.5% higher than standard residential loans due to the specialized nature and compliance requirements of SMSF lending. However, the tax-effective environment of super (15% tax on income vs personal rates up to 47%) often means the after-tax cost is lower than borrowing personally. We access SMSF-specialist lenders who offer competitive rates for super fund property loans.",
      },
      {
        question: "Can my SMSF buy a property I want to live in?",
        answer:
          "No, your SMSF cannot purchase residential property for you or any SMSF member to live in. This violates the sole purpose test (super must be for retirement only) and related party rules. Residential property purchased by your SMSF must be rented to unrelated third parties at market rates. However, your SMSF CAN purchase commercial property and lease it to your business or related entity, as long as rent is at market rates. This is a powerful strategy for business owners to build super while controlling business premises.",
      },
      {
        question: "What happens if my SMSF can't make loan repayments?",
        answer:
          "If your SMSF cannot meet loan repayments, the lender can only claim the property held in the bare trust (limited recourse). Other SMSF assets are protected. However, this is still serious as you'd lose the property and any equity built up. To avoid this: ensure adequate SMSF cash flow from rental income and member contributions, maintain cash reserves for vacancies and repairs, have a clear strategy for servicing the loan, and consider insurance for income protection. We help you model SMSF cash flows before proceeding to ensure serviceability.",
      },
      {
        question: "Can my SMSF renovate or improve the property?",
        answer:
          "Under LRBA rules, you cannot make improvements or renovations to SMSF property during the loan term - only essential repairs and maintenance are allowed. This is because improvements would change the 'single acquirable asset' held in the bare trust, violating SMSF borrowing rules. Once the loan is fully repaid, you can make any improvements or renovations you like. Some lenders and advisors interpret the rules slightly differently, so it's crucial to work with your SMSF accountant to understand what's permitted. Generally, essential repairs (fixing broken items) are allowed but improvements (adding value) are not.",
      },
      {
        question: "What documents does my SMSF need for a property loan?",
        answer:
          "SMSF property loans require: SMSF trust deed (showing borrowing powers), recent SMSF financial statements and tax returns, member statements showing contributions and balances, investment strategy documenting property investment rationale, minutes of trustee meetings approving the property purchase, property valuation or purchase contract, rental agreement or market rent assessment, bare trust deed (can be arranged at settlement), and trustee identification documents. We provide a complete checklist and help coordinate with your SMSF accountant to ensure all documentation is correct and compliant.",
      },
      {
        question: "Should I use my SMSF to buy property or invest another way?",
        answer:
          "SMSF property investment suits those who: understand property markets and are comfortable with property risk, have sufficient SMSF balance for deposit and reserves ($100k+ minimum typically), can maintain cash flow for loan repayments and expenses, want direct control over a tangible asset, and are comfortable with illiquid investments (property is harder to sell than shares). It's not suitable if your SMSF has limited funds, you need regular high income from your super, you can't handle illiquidity, or you lack property knowledge. Speak with a financial advisor to assess if SMSF property fits your overall retirement strategy and risk profile.",
      },
    ],
  },
};

const CAR_FINANCING_DEFAULT: LoanPageContent = {
  layout: "interleaved",
  topicTilesSection: {},
  topicTiles: [
    {
      title: "Finance for a Car - Home Owner",
      description:
        "Leverage your home equity to secure competitive car finance rates with flexible repayment options.",
      anchorId: "homeowner-finance-section",
      linkLabel: "Learn More",
    },
    {
      title: "Finance a Vehicle - Business Owner",
      description:
        "Tax-effective vehicle finance solutions including chattel mortgage, novated lease, and commercial hire purchase.",
      anchorId: "business-finance-section",
      linkLabel: "Learn More",
    },
    {
      title: "Buy a New Car",
      description:
        "Get pre-approved car finance to negotiate like a cash buyer and drive away in your new vehicle sooner.",
      anchorId: "new-car-section",
      linkLabel: "Learn More",
    },
  ],
  spotlightSections: [
    {
      id: "homeowner-finance-section",
      title: "Car Finance for Home Owners",
      subtitle:
        "As a home owner, you have access to more competitive car financing options. Use your property equity to secure lower interest rates and flexible repayment terms for your next vehicle purchase.",
      cardTitle: "Benefits of Home Owner Car Finance",
      cardBody:
        "Lower Interest Rates: Access rates as low as home loan rates by using your property as security, significantly lower than unsecured car loans. Higher Borrowing Capacity: Borrow larger amounts for luxury or premium vehicles by leveraging your home equity. Flexible Loan Terms: Choose loan terms up to 7 years with options for interest-only periods to reduce initial repayments. Tax Benefits Available: If using the vehicle for business purposes, you may be eligible for tax deductions on interest payments. Offset Account Options: Link an offset account to reduce interest charges and pay off your car loan faster. Keep Your Savings Intact: Finance your vehicle purchase without depleting your cash reserves or emergency funds. Finance options include Equity Release (refinance your home loan and access equity to purchase your vehicle outright at home loan rates) and a Secured Car Loan (secured against your property for better rates than standard car loans, while keeping your home loan separate).",
    },
    {
      id: "business-finance-section",
      title: "Vehicle Finance for Business Owners",
      subtitle:
        "Choose from tax-effective vehicle finance options designed specifically for business owners. Whether you're buying a work vehicle, company car, or commercial fleet, we'll help you structure the finance to maximize tax benefits and preserve cash flow.",
      cardTitle: "Business Vehicle Finance Options",
      cardBody:
        "Chattel Mortgage: The most popular option for businesses. You own the vehicle from day one and claim GST credits and tax deductions on interest and depreciation, with balloon payment options to reduce monthly costs. Commercial Hire Purchase: Similar to chattel mortgage but you don't own the vehicle until the final payment. Good for businesses wanting to claim maximum deductions, with fixed interest rates and no deposit required in some cases. Novated Lease: Perfect for employees wanting to salary package a vehicle. Your employer makes payments from pre-tax salary, reducing your taxable income, and you can bundle all vehicle costs (fuel, insurance, servicing). Finance Lease: The lender owns the vehicle while you use it. At the end, you can buy it, trade it, or return it - great for businesses wanting off-balance-sheet financing. Important: the tax benefits of business vehicle finance depend on how you use the vehicle and your business structure - we recommend consulting your accountant to determine the most tax-effective option.",
    },
    {
      id: "new-car-section",
      title: "Buy a New Car with Confidence",
      subtitle:
        "Get pre-approved car finance before you start shopping. This gives you the power to negotiate like a cash buyer, helps you set a realistic budget, and speeds up the purchase process when you find the perfect vehicle.",
      cardTitle: "How Pre-Approval Works",
      cardBody:
        "1) Apply for Pre-Approval: Submit a quick application with your income, expenses, and desired loan amount. We'll assess your borrowing capacity and find the best lender. 2) Get Your Approval Amount: Receive confirmation of your approved loan amount and interest rate, typically within 24-48 hours. 3) Shop with Confidence: Browse dealerships knowing you have finance ready to go, and negotiate better deals as a serious buyer with approved funding. 4) Finalize and Drive Away: Once you've chosen your vehicle, we'll finalize the paperwork and arrange for funds to be released directly to the dealer. New cars offer lower interest rates (from 5.99% p.a.) and longer terms (up to 7 years); used cars have lower purchase price with competitive rates from 6.99% p.a. (finance available for cars up to 12 years old). Before buying, consider total cost of ownership, depreciation, loan term, and deposit amount.",
    },
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for Car Financing?",
    subtitle:
      "We compare car finance options from multiple lenders to find you the best rates and terms for your situation.",
    cards: [
      {
        title: "Competitive Rates",
        description:
          "Access exclusive rates and deals from over 40 lenders that you won't find going direct.",
      },
      {
        title: "Expert Guidance",
        description:
          "Our specialists help you choose the right finance structure for your tax and cash flow needs.",
      },
      {
        title: "Quick Approvals",
        description:
          "Get pre-approved in as little as 24 hours, so you can negotiate confidently with dealers.",
      },
      {
        title: "No Lender Fees",
        description:
          "Our service is completely free - we're paid by the lender, so you get expert advice at no cost.",
      },
    ],
  },
  benefits: {
    badge: "BENEFITS",
    title: "Car Finance Advantages",
    subtitle:
      "Smart financing helps you drive the car you want while maintaining financial flexibility",
    cards: [
      {
        title: "Preserve Cash Flow",
        description:
          "Keep your savings and emergency funds intact while spreading the cost of your vehicle over manageable monthly payments. This maintains your financial flexibility for other opportunities or unexpected expenses.",
      },
      {
        title: "Build Credit History",
        description:
          "Successfully managing a car loan builds your credit profile and improves your credit score, making it easier to access finance for property and other major purchases in the future.",
      },
      {
        title: "Tax Benefits for Business",
        description:
          "Business owners and self-employed individuals can access significant tax deductions on vehicle finance, including GST credits, interest deductions, and depreciation benefits that reduce the overall cost.",
      },
    ],
  },
  moreServices: {
    title: "More Than Just Car Loans",
    subtitle:
      "At ALS Mortgage Solutions, we provide comprehensive car financing services that go beyond just finding you a loan",
    cards: [
      {
        title: "Pre-Purchase Inspection",
        description:
          "We can arrange professional vehicle inspections for used cars to ensure you're making a sound investment before committing to finance.",
      },
      {
        title: "Insurance Comparison",
        description:
          "Access competitive comprehensive car insurance quotes through our partners to protect your investment and meet lender requirements.",
      },
      {
        title: "Trade-In Assistance",
        description:
          "Get help valuing your current vehicle and negotiating the best trade-in price to maximize your deposit for the new car.",
      },
      {
        title: "Balloon Payment Planning",
        description:
          "Strategic advice on balloon payments to reduce monthly costs, with clear plans for refinancing or paying out the balloon when it's due.",
      },
      {
        title: "Dealer Negotiation Support",
        description:
          "With pre-approved finance, you have the power to negotiate better deals on the vehicle price and drive-away costs.",
      },
      {
        title: "Ongoing Loan Reviews",
        description:
          "We regularly review your car loan to identify refinancing opportunities if better rates become available during your loan term.",
      },
    ],
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about car financing",
    items: [
      {
        question: "What's the difference between a car loan and a personal loan?",
        answer:
          "A car loan is secured against the vehicle you're purchasing, which means the lender can repossess the car if you default. This security allows lenders to offer lower interest rates (typically 6-12% p.a.) compared to unsecured personal loans (9-20% p.a.). Car loans also typically have longer terms (up to 7 years) and higher borrowing amounts. The downside is you can't sell the car until the loan is paid off without the lender's consent. Personal loans offer more flexibility but cost more in interest.",
      },
      {
        question: "How much deposit do I need for a car loan?",
        answer:
          "Most lenders prefer a deposit of at least 10-20% of the car's value, though some lenders offer no-deposit car loans for borrowers with strong credit and income. A larger deposit reduces your loan amount, lowers your monthly repayments, and may help you secure better interest rates. For business vehicle finance, some lenders allow 100% financing of the vehicle cost. If you're a home owner using equity, you may not need a cash deposit at all. We can help you determine the optimal deposit for your situation.",
      },
      {
        question: "Can I get car finance with bad credit?",
        answer:
          "Yes, car finance is available for people with bad credit, though you'll likely face higher interest rates and may need a larger deposit. We work with specialist lenders who consider your current financial situation and income, not just your credit history. To improve your chances: provide a larger deposit (20%+), choose a more affordable vehicle, show steady employment and income, and consider a guarantor if possible. Interest rates for bad credit car loans typically range from 12-18% p.a. compared to 6-10% for good credit.",
      },
      {
        question: "What's better for business: chattel mortgage or novated lease?",
        answer:
          "It depends on your situation. Chattel mortgage is best for business owners and self-employed people who use the vehicle primarily for business. You own the car, claim GST and tax deductions on interest and depreciation, and have flexibility with balloon payments. Novated lease is better for employees who want to salary package a vehicle through their employer. You pay from pre-tax income, reducing your taxable income, and can bundle all running costs. Chattel mortgage offers more ownership and flexibility, while novated lease provides greater tax benefits for employees. We recommend discussing with your accountant.",
      },
      {
        question: "How quickly can I get approved for car finance?",
        answer:
          "Pre-approval can be obtained in as little as 24 hours for straightforward applications with standard employment and good credit. Full approval after choosing your vehicle typically takes 2-5 business days. Factors affecting approval time include: employment type (PAYG is faster than self-employed), credit history (clean credit is faster), documentation completeness, and lender processes. We can expedite applications if you've found a vehicle you want to secure quickly. Once approved, funds are usually released within 1-2 days, allowing you to complete the purchase immediately.",
      },
      {
        question: "Should I get finance through the dealer or a broker?",
        answer:
          "Using a broker like ALS gives you access to more lenders and better rates. Dealers typically work with 2-3 preferred lenders and may receive commissions for steering you toward certain products, which can mean higher rates. Brokers compare 40+ lenders to find the best deal for your situation, often securing rates 0.5-2% lower than dealer finance. We also provide unbiased advice on loan structure, terms, and features. However, some manufacturers offer special promotional rates through dealers that may be competitive. We can compare dealer offers against our options to ensure you get the best deal.",
      },
      {
        question:
          "What happens if I want to sell my car before the loan is paid off?",
        answer:
          "You can sell a car with an outstanding loan, but you'll need to pay out the remaining balance when you sell. If the sale price exceeds your loan balance, you keep the difference. If you owe more than the car is worth (negative equity), you'll need to pay the shortfall. The process involves: getting a payout figure from your lender, selling the car, paying the payout amount to release the lender's security, and transferring ownership to the buyer. Some lenders charge early repayment fees. We can help you refinance the shortfall into your next car loan if needed.",
      },
      {
        question: "Can I include insurance and warranty costs in my car loan?",
        answer:
          "Yes, many lenders allow you to include comprehensive car insurance, extended warranty, gap insurance, and even registration costs in your car loan. This spreads these upfront costs over the loan term, reducing your initial cash outlay. However, financing these costs means you'll pay interest on them over the loan term, increasing the total cost. For example, financing $2,000 of insurance over 5 years at 8% p.a. will cost approximately $2,400 total. Consider whether it's better to pay these costs upfront if you have the cash available. We can help you calculate the best approach.",
      },
    ],
  },
};

const REFINANCING_DEFAULT: LoanPageContent = {
  layout: "interleaved",
  topicTilesSection: {},
  topicTiles: [
    {
      title: "Refinance Home/Investment Loan",
      description:
        "Save thousands by refinancing to a better rate. Access better features, reduce repayments, or switch to a more suitable loan structure.",
      anchorId: "refinance-loan-section",
      linkLabel: "Learn More",
    },
    {
      title: "Refinance & Cashout",
      description:
        "Access your property equity for renovations, investment opportunities, or debt consolidation while refinancing.",
      anchorId: "cashout-section",
      linkLabel: "Learn More",
    },
    {
      title: "Refinance SMSF Loan",
      description:
        "Optimize your SMSF property loan with better rates and terms while ensuring compliance with all regulations.",
      anchorId: "smsf-refinance-section",
      linkLabel: "Learn More",
    },
  ],
  otherSolutions: {
    title: "Other Solutions",
    cards: [
      {
        title: "Home Loans",
        description: "Explore competitive home loan options for purchasing your next property.",
        link: "/home-loans",
        linkLabel: "Learn More",
      },
      {
        title: "Investment Loans",
        description: "Build your property portfolio with investment property financing.",
        link: "/investment-loans",
        linkLabel: "Learn More",
      },
      {
        title: "SMSF Loans",
        description: "Invest in property through your self-managed super fund.",
        link: "/smsf-loans",
        linkLabel: "Learn More",
      },
    ],
  },
  spotlightSections: [
    {
      id: "refinance-loan-section",
      title: "Refinance Home/Investment Loan",
      subtitle:
        "Lower your interest rate and reduce monthly repayments by switching to a more competitive loan. Refinancing can help you save thousands over the life of your loan, switch between fixed and variable rates, remove LMI, or access better loan features like offset accounts and redraw facilities. We compare hundreds of loan products to find you the best deal, handling the entire switch process with minimal hassle.",
      cardTitle: "Why Refinance Your Home or Investment Loan?",
      cardBody:
        "Lower Interest Rates: Secure a better rate and reduce your monthly repayments, potentially saving thousands over the loan term. Better Loan Features: Access offset accounts, redraw facilities, and flexible repayment options that your current loan may not offer. Consolidate Debts: Combine multiple loans into one manageable payment with a lower overall interest rate. Switch Loan Types: Change from variable to fixed (or vice versa), or switch from interest-only to principal and interest. Remove LMI: If you've built sufficient equity, refinancing can eliminate Lenders Mortgage Insurance costs. Adjust Loan Term: Extend your loan term to reduce repayments or shorten it to pay off your mortgage faster.",
      linkLabel: "Check Your Refinance Savings",
    },
    {
      id: "cashout-section",
      title: "Refinance & Cash Out",
      subtitle:
        "Access the equity you've built in your property while refinancing. Cash-out refinancing lets you tap into your home's equity for renovations, investment opportunities, debt consolidation, or other financial goals. This strategy allows you to borrow against your property's increased value while potentially securing a better interest rate. We'll help you determine how much equity you can access and structure the loan responsibly.",
      cardTitle: "What Can You Use Cash Out For?",
      cardBody:
        "Home Renovations: Cashout for further renovations or improvements to the property that increase the property value and better lifestyle. Investment Property Deposit: Equity release to further investment in the property market will enhance your property goals. Debt Consolidation: Consolidating the debts and easing your repayments to manage your finance better. Business Investment: Fund business expansion, equipment purchases, or other wealth-building opportunities.",
      linkLabel: "Calculate Your Available Equity",
    },
    {
      id: "smsf-refinance-section",
      title: "Refinance SMSF Loan",
      subtitle:
        "Optimize your SMSF property investment with better loan terms. If your SMSF holds property, refinancing can help you access better interest rates, adjust loan structures, or release equity for additional investments within your super fund. We understand the unique compliance requirements and work with specialist SMSF lenders to ensure your refinance meets all regulatory obligations.",
      cardTitle: "SMSF Refinancing Expertise",
      cardBody:
        "Refinancing an SMSF property loan requires specialized knowledge of superannuation regulations, bare trust arrangements, and limited recourse borrowing structures. We work exclusively with SMSF-specialist lenders who understand the compliance requirements and offer competitive rates for super funds. Whether you're looking to reduce your interest rate, access equity for additional property investments within your SMSF, or restructure your loan terms, we ensure every aspect of your refinance maintains compliance with ATO regulations and your fund's investment strategy.",
      link: "/smsf-loans",
      linkLabel: "Learn More About SMSF Loans",
    },
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for Refinancing?",
    subtitle:
      "We've helped thousands of Australians save money and access better loan features through refinancing. Here's why you should choose us.",
    cards: [
      {
        title: "Rate Comparison",
        description:
          "We compare hundreds of loan products from over 40 lenders to find you the most competitive rates and terms available.",
      },
      {
        title: "Free Refinance Assessment",
        description:
          "Get a complimentary refinance health check to see how much you could save. No obligations, just expert advice.",
      },
      {
        title: "Seamless Process",
        description:
          "We handle all paperwork and coordinate with both your current and new lender for a smooth transition with minimal disruption.",
      },
      {
        title: "Ongoing Support",
        description:
          "We regularly review your loan to ensure it remains competitive, alerting you to new refinancing opportunities.",
      },
    ],
  },
  benefits: {
    badge: "BENEFITS",
    title: "Refinancing Advantages",
    subtitle: "Unlock equity and optimize your financial position through strategic refinancing",
    cards: [
      {
        title: "Strategic Equity Access",
        description:
          "Strategic planning for further investments via equity access through refinancing. Equity release to further investment in the property market will enhance your property goals and accelerate your path to financial freedom.",
      },
      {
        title: "Property Enhancement",
        description:
          "Cashout for further renovations or improvements to the property that increase the property value and better lifestyle. Strategic improvements deliver both enjoyment and strong returns on investment.",
      },
      {
        title: "Smart Debt Management",
        description:
          "Consolidating the debts and easing your repayments to manage your finance better. This strategy simplifies your finances with one manageable payment and reduces overall interest costs.",
      },
    ],
  },
  moreServices: {
    title: "More Than Just Loans",
    subtitle:
      "At ALS Mortgage Solutions, we provide comprehensive refinancing services that go beyond just finding you a better rate",
    cards: [
      {
        title: "Free Refinance Health Check",
        description:
          "Get a complimentary assessment of your current loan to identify potential savings, better features, and refinancing opportunities with no obligation.",
      },
      {
        title: "Ongoing Rate Monitoring",
        description:
          "We regularly monitor market rates and your loan to alert you to new refinancing opportunities, ensuring your loan remains competitive.",
      },
      {
        title: "Full Process Management",
        description:
          "We handle all paperwork, coordinate with your current and new lender, and manage the entire refinancing process from start to settlement.",
      },
      {
        title: "Equity Access Planning",
        description:
          "Strategic advice on accessing and using your property equity for renovations, investments, or debt consolidation while refinancing.",
      },
      {
        title: "Lender Negotiation",
        description:
          "We leverage our relationships with lenders to negotiate better rates, cashback offers, and waived fees that you can't access directly.",
      },
      {
        title: "Refinancing Calculators",
        description:
          "Access our refinancing calculators to estimate your savings, break-even point, and total benefit before making a decision.",
      },
    ],
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about refinancing",
    items: [
      {
        question: "When should I consider refinancing my home loan?",
        answer:
          "Consider refinancing when: 1) Interest rates have dropped significantly since you took out your loan, 2) Your fixed rate period is ending and you want to lock in a new rate, 3) Your financial situation has improved and you can access better rates, 4) You want to access equity for renovations or investment, 5) You need better loan features like an offset account, or 6) You want to consolidate debts. Generally, if you can save 0.5% or more on your interest rate, refinancing is worth considering. We provide a free assessment to calculate your potential savings.",
      },
      {
        question: "How much does it cost to refinance?",
        answer:
          "Refinancing costs typically include: application fees ($0-$1,000, though many lenders waive this), valuation fees ($200-$600), settlement fees ($200-$800), and discharge fees from your current lender ($300-$400). Some lenders offer cashback incentives ($2,000-$4,000) or no-fee refinancing packages that can offset these costs. Our service is free - we're paid by the lender. We'll calculate whether the savings outweigh the costs and help you choose lenders with minimal fees or cashback offers to maximize your benefit.",
      },
      {
        question: "How long does the refinancing process take?",
        answer:
          "Refinancing typically takes 4-6 weeks from application to settlement. The timeline includes: application and document submission (1-3 days), property valuation (3-7 days), loan assessment and approval (7-14 days), formal approval and documentation (3-5 days), and settlement (14-21 days after approval). We can expedite the process if needed. During this time, we handle all communication with lenders and coordinate with your current bank to ensure a smooth transition with no gap in your loan.",
      },
      {
        question: "Will refinancing affect my credit score?",
        answer:
          "Refinancing can have a minor temporary impact on your credit score. When you apply, the lender will conduct a credit check (a 'hard inquiry'), which may reduce your score by a few points temporarily. However, if you make your new loan repayments on time, your credit score will improve over time. To minimize impact, avoid making multiple applications with different lenders - let us submit your application to the most suitable lender. Closing your old loan account may also have a small impact, but this is outweighed by the long-term benefits of a better loan.",
      },
      {
        question: "Can I access equity when refinancing?",
        answer:
          "Yes, refinancing is one of the best ways to access your property equity. You can typically borrow up to 80% of your property's value (minus your existing loan) without paying Lenders Mortgage Insurance. For example, if your property is worth $800,000 and you owe $400,000, you could potentially access up to $240,000 in equity. This equity can be used for renovations, investment property deposits, debt consolidation, or other purposes. We'll help you calculate your available equity and structure the refinance appropriately.",
      },
      {
        question: "What documents do I need to refinance?",
        answer:
          "You'll typically need: proof of identity (driver's license, passport), proof of income (recent payslips, tax returns if self-employed), employment verification, recent bank statements (3-6 months), details of assets and liabilities, rates notice or property valuation, current loan statements, and proof of address. If you're refinancing an investment property, you'll also need rental agreements and rental income evidence. We'll provide a complete checklist and help you gather everything needed to ensure a smooth application process.",
      },
      {
        question: "Can I refinance if I have bad credit?",
        answer:
          "Yes, refinancing with bad credit is possible but may be more challenging. Your options depend on the severity and recency of credit issues. Minor issues (one or two late payments) typically won't prevent refinancing. More serious issues (defaults, bankruptcies) may require specialist lenders who are more lenient but charge higher rates. If you've improved your financial situation since taking out your current loan, you may still access competitive rates. We work with lenders who have varying credit policies and can find the best option for your situation. Sometimes it's worth waiting 6-12 months to improve your credit before refinancing.",
      },
      {
        question: "Should I refinance to a fixed or variable rate?",
        answer:
          "The choice depends on your circumstances and market conditions. Fixed rates provide certainty and protection from rate rises (typically 1-5 years), but you miss out if rates fall and usually have less flexibility (limited extra repayments, no offset account). Variable rates fluctuate with the market but offer flexibility with offset accounts, unlimited extra repayments, and the ability to take advantage of rate drops. Many borrowers choose a split loan (part fixed, part variable) for a balance of certainty and flexibility. We'll help you assess current market conditions, rate forecasts, and your personal situation to make the best decision.",
      },
    ],
  },
};

export const LOAN_PAGE_DEFAULTS: Record<string, LoanPageContent> = {
  "home-loans": HOME_LOANS_DEFAULT,
  "investment-loans": INVESTMENT_LOANS_DEFAULT,
  "commercial-loans": COMMERCIAL_LOANS_DEFAULT,
  "smsf-loans": SMSF_LOANS_DEFAULT,
  "car-financing": CAR_FINANCING_DEFAULT,
  refinancing: REFINANCING_DEFAULT,
};

export function mergeServicesContent(raw?: Partial<ServicesContent>): ServicesContent {
  const d = DEFAULT_SERVICES_CONTENT;
  return {
    servicesList: {
      ...d.servicesList,
      ...raw?.servicesList,
      cards: mergeCards(d.servicesList.cards, raw?.servicesList?.cards),
    },
    whyUs: {
      ...d.whyUs,
      ...raw?.whyUs,
      cards: mergeCards(d.whyUs.cards, raw?.whyUs?.cards),
    },
    teamSection: { ...d.teamSection, ...raw?.teamSection },
  };
}

export function mergeLoanPageContent(slug: string, raw?: Partial<LoanPageContent>): LoanPageContent {
  const d = LOAN_PAGE_DEFAULTS[slug] ?? HOME_LOANS_DEFAULT;
  return {
    topicTilesSection: { ...d.topicTilesSection, ...raw?.topicTilesSection },
    topicTiles: mergeTopicTiles(d.topicTiles, raw?.topicTiles),
    otherSolutions: raw?.otherSolutions ?? d.otherSolutions
      ? {
          ...(d.otherSolutions ?? { title: "", cards: [] }),
          ...raw?.otherSolutions,
          title: raw?.otherSolutions?.title ?? d.otherSolutions?.title ?? "",
          cards: mergeCards(d.otherSolutions?.cards ?? [], raw?.otherSolutions?.cards),
        }
      : undefined,
    spotlightSections: mergeSpotlights(d.spotlightSections, raw?.spotlightSections),
    whyUs: d.whyUs || raw?.whyUs
      ? {
          ...(d.whyUs ?? { title: "", cards: [] }),
          ...raw?.whyUs,
          cards: mergeCards(d.whyUs?.cards ?? [], raw?.whyUs?.cards),
        }
      : undefined,
    benefits: {
      ...d.benefits,
      ...raw?.benefits,
      cards: mergeCards(d.benefits.cards, raw?.benefits?.cards),
    },
    moreServices: {
      ...d.moreServices,
      ...raw?.moreServices,
      cards: mergeCards(d.moreServices.cards, raw?.moreServices?.cards),
    },
    faqs: {
      ...d.faqs,
      ...raw?.faqs,
      items: mergeFaqs(d.faqs.items, raw?.faqs?.items),
    },
    layout: raw?.layout ?? d.layout,
  };
}

export function mergeServicePageContent(
  slug: ServiceSlug,
  raw?: Record<string, unknown>,
): Record<string, unknown> {
  if (slug === "services") {
    return mergeServicesContent(raw as Partial<ServicesContent>) as unknown as Record<string, unknown>;
  }
  return mergeLoanPageContent(slug, raw as Partial<LoanPageContent>) as unknown as Record<string, unknown>;
}

export function getServiceAdminPath(slug: ServiceSlug): string {
  if (slug === "services") return "/admin/services";
  return `/admin/services/${slug}`;
}
