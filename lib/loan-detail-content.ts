import type { ContentCard, SectionHeader, SectionVisibility } from "@/lib/page-content";
import type { FaqItem, TopicTile } from "@/lib/services-content";

export type DetailBenefit = { title: string; description: string };
export type DetailFeatureCard = {
  icon?: string;
  title: string;
  description?: string;
  bullets?: string[];
};
export type DetailFeatureItem = { title: string; description: string };
export type DetailFeatureGroup = {
  kind: "cards" | "list" | "steps";
  heading?: string;
  cards?: DetailFeatureCard[];
  items?: DetailFeatureItem[];
};
export type DetailInfoBox = {
  variant: "warning" | "highlight";
  icon?: string;
  title?: string;
  paragraphs: string[];
};
export type DetailSpotlight = SectionVisibility & {
  id?: string;
  title: string;
  subtitle: string;
  cardIcon?: string;
  cardTitle: string;
  cardBody?: string;
  benefits?: DetailBenefit[];
  featureGroups?: DetailFeatureGroup[];
  infoBox?: DetailInfoBox | null;
};

export type DetailedLoanContent = {
  topicTilesSection: SectionVisibility;
  topicTiles: TopicTile[];
  otherSolutions?: SectionVisibility & { title: string; cards: ContentCard[] };
  spotlightSections: DetailSpotlight[];
  whyUs: SectionHeader & { cards: ContentCard[] };
  benefits: SectionHeader & { cards: ContentCard[] };
  moreServices: SectionHeader & { cards: ContentCard[] };
  faqs: SectionHeader & { items: FaqItem[] };
};

export const DETAILED_LOAN_SLUGS = [
  "commercial-loans",
  "smsf-loans",
  "car-financing",
  "refinancing",
] as const;

export type DetailedLoanSlug = (typeof DETAILED_LOAN_SLUGS)[number];

export function isDetailedLoanSlug(slug: string): slug is DetailedLoanSlug {
  return (DETAILED_LOAN_SLUGS as readonly string[]).includes(slug);
}

const COMMERCIAL_LOANS_DETAIL: DetailedLoanContent = {
  topicTilesSection: {},
  topicTiles: [
    {
      title: "Buy a Commercial Property",
      description:
        "Finance office spaces, retail shops, warehouses, and industrial properties with flexible commercial loan solutions.",
      anchorId: "commercial-property-section",
      icon: "FaBuilding",
      linkLabel: "Learn More",
    },
    {
      title: "Finance for a Development",
      description:
        "Construction and development finance for residential subdivisions, unit developments, and commercial projects.",
      anchorId: "development-finance-section",
      icon: "FaHatCowboy",
      linkLabel: "Learn More",
    },
    {
      title: "Buy through my SMSF",
      description:
        "Purchase commercial property through your self-managed super fund for long-term wealth creation and tax benefits.",
      anchorId: "smsf-commercial-section",
      icon: "FaPiggyBank",
      linkLabel: "Learn More",
    },
  ],
  spotlightSections: [
    {
      id: "commercial-property-section",
      title: "Buy a Commercial Property",
      subtitle:
        "Commercial property finance helps businesses and investors acquire office spaces, retail premises, warehouses, industrial facilities, and mixed-use properties. Build wealth through commercial real estate with tailored financing solutions.",
      cardIcon: "FaBuilding",
      cardTitle: "Types of Commercial Properties We Finance",
      benefits: [
        { title: "Office Buildings", description: "Single or multi-tenant office spaces, medical suites, professional offices, and corporate headquarters." },
        { title: "Retail Premises", description: "Shopping centers, standalone shops, strip malls, restaurants, and hospitality venues." },
        { title: "Industrial & Warehouses", description: "Warehouses, distribution centers, manufacturing facilities, and logistics hubs." },
        { title: "Mixed-Use Properties", description: "Properties combining residential, commercial, retail, or office spaces in one development." },
        { title: "Specialty Properties", description: "Medical centers, childcare facilities, service stations, car washes, and self-storage facilities." },
        { title: "Owner-Occupied", description: "Purchase commercial property for your own business operations with favorable owner-occupier rates." },
      ],
      featureGroups: [
        {
          kind: "cards",
          heading: "Commercial Loan Features",
          cards: [
            { icon: "FaPercent", title: "Competitive Rates", description: "Access competitive interest rates for commercial property, typically starting from 6.5-9% p.a. depending on property type, LVR, and covenant strength.", bullets: ["Fixed and variable rate options", "Lower rates for owner-occupied properties", "Rate discounts for strong tenant covenants"] },
            { icon: "FaChartPie", title: "Flexible Loan Structures", description: "Customize your loan to match your business cash flow and investment strategy with flexible terms and repayment options.", bullets: ["Loan terms from 1 to 30 years", "Interest-only periods up to 10 years", "Principal and interest or IO options"] },
            { icon: "FaDollarSign", title: "High LVR Options", description: "Borrow up to 80% of the property value for investment commercial property, or up to 90% for owner-occupied premises.", bullets: ["Up to 80% LVR for investment properties", "Up to 90% LVR for owner-occupiers", "Cross-collateralization options available"] },
            { icon: "FaFileContract", title: "Tax Benefits", description: "Maximize tax deductions on your commercial property investment with expert structuring advice.", bullets: ["Interest payments are tax deductible", "Depreciation benefits on building and fit-out", "GST credits for eligible purchases"] },
          ],
        },
      ],
      infoBox: {
        variant: "highlight",
        icon: "FaLandmark",
        title: "Why Invest in Commercial Property?",
        paragraphs: [
          "Commercial property offers higher rental yields (typically 5-8% compared to 2-4% for residential), longer lease terms providing stable income, and less landlord obligations than residential properties. Many commercial leases are triple-net, meaning tenants pay rates, insurance, and maintenance costs.",
          "Commercial properties can also appreciate significantly in value based on rental income performance, making them excellent wealth-building assets for businesses and investors.",
        ],
      },
    },
    {
      id: "development-finance-section",
      title: "Finance for a Development",
      subtitle:
        "Development finance funds the construction of new properties or major renovations. Whether you're building residential units, townhouses, subdivisions, or commercial developments, we'll help you secure the funding you need.",
      cardIcon: "FaHatCowboy",
      cardTitle: "Types of Development Finance",
      benefits: [],
      featureGroups: [
        {
          kind: "list",
          heading: "Types of Development Finance",
          items: [
            { title: "Residential Development", description: "Finance for residential developments including unit blocks, townhouses, dual occupancies, and land subdivisions. Suitable for builders and developers of all sizes. Coverage includes 2-100+ unit developments, land subdivision and civil works, and townhouse and duplex construction." },
            { title: "Commercial Development", description: "Funding for commercial construction projects including office buildings, retail centers, warehouses, and mixed-use developments. Coverage includes office and retail construction, industrial and warehouse projects, and mixed-use developments." },
            { title: "Construction Loans", description: "Progressive drawdown facilities that release funds as construction milestones are completed, ensuring you only pay interest on funds drawn. Coverage includes progress payment structures, interest capitalization options, and 12-24 month construction terms." },
            { title: "Mezzanine Finance", description: "Additional funding to bridge equity gaps or increase project scope. Sits between senior debt and equity, typically at higher interest rates. Coverage includes filling equity shortfalls, increasing development capacity, and short-term 1-3 year facilities." },
          ],
        },
        {
          kind: "cards",
          heading: "Development Loan Features and Requirements",
          cards: [
            { icon: "FaCheck", title: "Development Loan Features", description: "All of the features you need for development finance", bullets: ["LVR up to 80% of total development costs including land, construction, and holding costs", "Option to capitalize interest during construction, reducing cash flow requirements", "Funds released as construction stages are completed and certified by quantity surveyors", "Help structuring your exit via sales, refinance to investment loans, or permanent financing"] },
            { icon: "FaCheck", title: "What You'll Need", description: "Documentation requirements for development finance applications", bullets: ["Detailed project feasibility showing costs, sales projections, and profit margins", "Development approval (DA) or construction certificate (CC) from local council", "Fixed-price building contract with licensed builder or quantity surveyor's cost estimates", "Track record of completed developments, though first-time developers are considered"] },
          ],
        },
      ],
      infoBox: {
        variant: "warning",
        icon: "FaShieldHalved",
        title: "Development Finance Considerations",
        paragraphs: [
          "Development finance is more complex than standard property loans. Lenders assess project viability, your experience, market conditions, presales (for larger projects), and exit strategies. Interest rates are typically higher (8-12% p.a.) due to construction risk. We help you prepare comprehensive applications that maximize approval chances and minimize costs.",
        ],
      },
    },
    {
      id: "smsf-commercial-section",
      title: "Buy Commercial Property through Your SMSF",
      subtitle:
        "Self-managed super funds can purchase commercial property, including property your business operates from. This powerful strategy allows you to build retirement wealth while potentially reducing business overheads.",
      cardIcon: "FaPiggyBank",
      cardTitle: "Benefits of SMSF Commercial Property",
      benefits: [
        { title: "Lease to Your Business", description: "Your SMSF can purchase commercial property and lease it to your business at market rates, with rent paid to your super fund." },
        { title: "Concessional Tax Rate", description: "Rental income is taxed at just 15% in accumulation phase or 0% in pension phase, far lower than personal tax rates." },
        { title: "Build Super Wealth", description: "Property appreciation and rental income grow your superannuation balance in a tax-effective environment." },
        { title: "Business Tax Deductions", description: "Your business can claim rent payments as tax deductions, reducing taxable income while building super." },
        { title: "Asset Protection", description: "Property held in SMSF is protected from business creditors and provides separation of business and personal assets." },
        { title: "Capital Gains Discount", description: "One-third CGT discount in accumulation phase, or 0% capital gains tax if sold during pension phase." },
      ],
      featureGroups: [
        {
          kind: "cards",
          heading: "SMSF Loan Requirements and Considerations",
          cards: [
            { icon: "FaCheck", title: "SMSF Loan Requirements", description: "Key requirements for SMSF commercial property financing", bullets: ["Property must be held in a bare trust structure with limited recourse to SMSF assets", "Typically up to 80% LVR for commercial property, requiring 20% deposit from SMSF funds", "Investment must satisfy the sole purpose test of providing retirement benefits to members", "If leasing to related party, rent must be at commercial market rates supported by valuation"] },
            { icon: "FaCheck", title: "Important Considerations", description: "Important factors to consider for SMSF property investment", bullets: ["Work with SMSF accountants and financial advisors to ensure compliance with super regulations", "SMSF must pay all property costs from fund income or member contributions", "Consider how you'll repay the loan and what happens if business circumstances change", "Most commercial property types are eligible, but residential cannot be leased to members"] },
          ],
        },
      ],
      infoBox: null,
    },
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for Commercial Loans?",
    subtitle: "We specialize in complex commercial transactions and have access to specialist commercial lenders beyond the major banks.",
    cards: [
      { icon: "FaUserTie", title: "Commercial Specialists", description: "Our team has extensive experience in commercial property finance, understanding complex deals and structuring solutions." },
      { icon: "FaBuilding", title: "Extensive Lender Panel", description: "Access to specialist commercial lenders, private lenders, and non-bank institutions beyond the major banks." },
      { icon: "FaShieldHalved", title: "Deal Structuring", description: "Expert advice on structuring your commercial loan for optimal tax benefits and asset protection." },
      { icon: "FaHandshake", title: "End-to-End Support", description: "We manage the entire process from pre-approval to settlement, liaising with all parties involved." },
    ],
  },
  benefits: {
    badge: "BENEFITS",
    title: "Commercial Loan Advantages",
    subtitle: "Build wealth and grow your business through strategic commercial property investment",
    cards: [
      { icon: "FaChartLine", title: "Higher Rental Yields", description: "Commercial properties typically deliver rental yields of 5-8% compared to 2-4% for residential, providing stronger cash flow and faster wealth accumulation for investors and business owners." },
      { icon: "FaShieldHalved", title: "Longer Lease Terms", description: "Commercial tenants typically sign 3-10 year leases with built-in rent increases, providing stable, predictable income and reducing vacancy risk compared to residential properties." },
      { icon: "FaDollarSign", title: "Tax & Depreciation Benefits", description: "Maximize tax deductions through interest payments, depreciation on buildings and fit-outs, and GST credits. Commercial property offers superior tax benefits for businesses and investors." },
    ],
  },
  moreServices: {
    title: "More Than Just Commercial Loans",
    subtitle: "At ALS Mortgage Solutions, we provide comprehensive commercial finance services beyond just finding you a loan",
    cards: [
      { icon: "FaFileContract", title: "Lease Review & Negotiation", description: "Expert advice on commercial lease terms and structuring to ensure favorable conditions that support your loan application and protect your interests." },
      { icon: "FaChartPie", title: "Investment Strategy", description: "Strategic advice on commercial property investment including market analysis, yield assessment, and portfolio diversification strategies." },
      { icon: "FaUsers", title: "Professional Network", description: "Access to our network of commercial property specialists including accountants, lawyers, valuers, and quantity surveyors." },
      { icon: "FaShieldHalved", title: "Structure & Tax Planning", description: "Guidance on optimal ownership structures (companies, trusts, SMSF) for asset protection and tax efficiency in consultation with your accountant." },
      { icon: "FaHandshake", title: "Lender Relationship Management", description: "Ongoing relationship management with your lender for future funding needs, loan variations, and maintaining favorable terms." },
      { icon: "FaHeart", title: "Portfolio Reviews", description: "Regular reviews of your commercial property portfolio and loans to identify refinancing opportunities and optimize your investment returns." },
    ],
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about commercial loans",
    items: [
      { question: "What deposit do I need for a commercial property loan?", answer: "Commercial property loans typically require a minimum 20% deposit, though some lenders may lend up to 80% LVR for strong borrowers with good property covenants. Owner-occupied commercial properties may qualify for higher LVRs (up to 90%) with stronger servicing. The actual LVR depends on property type, location, tenant quality, lease terms, and your financial position. Specialist properties or those in regional areas may require larger deposits (30-40%). We can help you understand what deposit you'll need based on your specific circumstances." },
      { question: "How do lenders assess commercial property loans?", answer: "Lenders assess commercial loans differently than residential. Key factors include: property income (rental yield and lease terms), tenant covenant strength (financial stability of tenants), property location and condition, your business or investment experience, serviceability (ability to meet repayments from rent and other income), and security value (property valuation). For owner-occupied properties, business cash flow and trading history are crucial. We help you prepare comprehensive applications addressing all assessment criteria to maximize approval chances." },
      { question: "What's the difference between owner-occupied and investment commercial loans?", answer: "Owner-occupied loans are for businesses purchasing property they'll operate from (51%+ of space). They typically offer lower interest rates (0.5-1% lower), higher LVRs (up to 90%), and focus on business serviceability. Investment commercial loans are for properties leased to third parties, assessed on rental income and tenant quality, typically capped at 80% LVR with slightly higher rates. Owner-occupied loans often have better terms as your business success directly impacts loan repayment, making them lower risk for lenders." },
      { question: "Can I use residential property as security for a commercial loan?", answer: "Yes, you can use residential property as additional security (cross-collateralization) to increase borrowing capacity or reduce the deposit required for commercial property. This is common for first-time commercial buyers or when purchasing property with weak tenant covenants. However, this puts your home at risk if the business struggles. Some lenders offer higher LVRs when residential property is offered as additional security. We can help you understand the risks and structure this appropriately with separate securities where possible." },
      { question: "What are the typical loan terms for commercial property?", answer: "Commercial property loans typically have 25-30 year terms, though 15-25 years is more common. Interest-only periods of 5-10 years are standard for investment properties, allowing investors to maximize cash flow and claim tax deductions. Owner-occupied loans may have shorter interest-only periods (1-5 years). Loan terms can be structured to align with lease expiry dates for investment properties. Development loans are typically 12-24 months with interest-only payments. We help you structure loan terms to optimize your cash flow and investment strategy." },
      { question: "What types of commercial properties are easiest to finance?", answer: "Easiest to finance: office buildings and retail shops in metropolitan areas with strong tenant covenants, long lease terms, and good locations. Medical centers, childcare centers with government-backed tenants, and industrial warehouses in strong markets are also favorable. More difficult: specialty properties (service stations, pubs, car washes), properties in regional or remote areas, older buildings requiring significant capital expenditure, and properties with short lease terms or weak tenants. We have access to specialist lenders who can finance harder-to-place properties that major banks decline." },
      { question: "Can I refinance my commercial property loan?", answer: "Yes, commercial property loans can be refinanced to access better rates, release equity for business growth or additional investments, consolidate debts, or switch lenders for better service and features. Refinancing is worth considering when your fixed rate expires, interest rates drop significantly, your property has appreciated creating equity, or you want to restructure your loan. Exit fees and break costs may apply, particularly for fixed-rate loans. We'll calculate whether refinancing makes financial sense by comparing all costs against potential savings and benefits." },
      { question: "How long does commercial loan approval take?", answer: "Commercial loan approvals typically take 2-6 weeks, longer than residential loans due to complexity. Timeline includes: initial assessment (2-3 days), formal application submission (1 week), property valuation (1-2 weeks), credit assessment and approval (1-2 weeks), and documentation and settlement (2-3 weeks). Complex deals, development finance, or specialist properties may take 8-12 weeks. To expedite approval: provide comprehensive documentation upfront, have a clear investment strategy and business plan, choose an experienced broker who knows commercial lenders, and ensure the property has strong tenant covenants and location. We manage the process end-to-end to minimize delays." },
    ],
  },
};

const SMSF_LOANS_DETAIL: DetailedLoanContent = {
  topicTilesSection: {},
  topicTiles: [
    { title: "Buy a Residential Property through SMSF", description: "Invest in residential property through your super fund for long-term wealth creation with tax-effective returns.", anchorId: "residential-smsf-section", icon: "FaHouse", linkLabel: "Learn More" },
    { title: "Buy a Commercial Property through SMSF", description: "Purchase commercial property your business operates from, paying rent to your super fund for retirement wealth.", anchorId: "commercial-smsf-section", icon: "FaBuilding", linkLabel: "Learn More" },
    { title: "Refinance an Existing SMSF Loan", description: "Access better rates and terms on your current SMSF property loan while maintaining compliance with regulations.", anchorId: "refinance-smsf-section", icon: "FaArrowsSpin", linkLabel: "Learn More" },
  ],
  spotlightSections: [
    {
      id: "residential-smsf-section",
      title: "Buy a Residential Property through SMSF",
      subtitle: "Self-managed super funds can purchase residential investment properties using Limited Recourse Borrowing Arrangements (LRBA). Build your retirement wealth through property while enjoying concessional tax treatment on rental income and capital gains.",
      cardIcon: "FaHouse",
      cardTitle: "Benefits of SMSF Residential Property",
      benefits: [
        { title: "Tax-Effective Income", description: "Rental income is taxed at just 15% during accumulation phase, or 0% if your SMSF is in pension phase." },
        { title: "Capital Gains Concessions", description: "One-third capital gains tax discount in accumulation, or 0% CGT if sold during pension phase." },
        { title: "Property Diversification", description: "Diversify your super portfolio beyond shares and cash with tangible property assets." },
        { title: "Leverage Your Super", description: "Use borrowed funds to purchase property, amplifying your super fund's investment capacity." },
        { title: "Asset Protection", description: "Property held in SMSF is protected from personal creditors and bankruptcy proceedings." },
        { title: "Build Retirement Wealth", description: "Long-term property appreciation grows your retirement savings in a tax-effective environment." },
      ],
      featureGroups: [
        {
          kind: "cards",
          heading: "SMSF Residential Loan Features",
          cards: [
            { icon: "FaPercent", title: "Competitive SMSF Rates", description: "Access SMSF-specialist lender rates starting from 6.5-8.5% p.a. for residential investment properties held in your super fund.", bullets: ["Fixed and variable rate options", "Rates comparable to standard investment loans", "Interest-only options available"] },
            { icon: "FaDollarSign", title: "High LVR Available", description: "Borrow up to 80% of the property value with SMSF-specialist lenders who understand super fund lending requirements.", bullets: ["Up to 80% LVR for residential property", "20% deposit required from SMSF funds", "No LMI charges for SMSF loans"] },
            { icon: "FaFileContract", title: "Limited Recourse Structure", description: "Property held in bare trust with limited recourse, protecting other SMSF assets if loan defaults occur.", bullets: ["Bare trust structure required by law", "Lender's recourse limited to property only", "Other SMSF assets protected"] },
            { icon: "FaLandmark", title: "Compliant Loan Terms", description: "Loan terms structured to comply with superannuation regulations and ATO requirements for SMSFs.", bullets: ["15-30 year loan terms available", "Interest-only periods up to 5 years", "Meets sole purpose test requirements"] },
          ],
        },
      ],
      infoBox: {
        variant: "warning",
        icon: "FaShieldHalved",
        title: "Important SMSF Residential Property Rules",
        paragraphs: [
          "Residential property purchased by your SMSF cannot be lived in by you, any SMSF member, or related parties. It must be rented to unrelated third parties at market rates. The property cannot be improved or renovated during the loan term (only essential repairs allowed). Your SMSF must have sufficient cash flow from contributions and rental income to service the loan and pay all property expenses.",
          "We work with SMSF accountants and financial advisors to ensure your property purchase complies with all superannuation regulations and ATO requirements.",
        ],
      },
    },
    {
      id: "commercial-smsf-section",
      title: "Buy a Commercial Property through SMSF",
      subtitle: "SMSFs can purchase commercial property and lease it to a related party, including your own business. This powerful strategy allows your business to pay rent to your super fund, building retirement wealth while potentially reducing business overheads through tax-deductible rent payments.",
      cardIcon: "FaBuilding",
      cardTitle: "Benefits of SMSF Commercial Property",
      benefits: [
        { title: "Lease to Your Business", description: "Your SMSF can lease commercial property to your business or related entity, creating a tax-effective arrangement." },
        { title: "Business Tax Deductions", description: "Your business claims rent payments as tax deductions while building your super fund balance." },
        { title: "Tax-Effective Returns", description: "Rental income taxed at 15% (accumulation) or 0% (pension), far lower than personal tax rates." },
        { title: "Control Business Premises", description: "Secure your business location long-term while building retirement wealth through property ownership." },
        { title: "Asset Protection", description: "Property in SMSF is protected from business creditors, separating business and retirement assets." },
        { title: "Capital Gains Benefits", description: "Reduced CGT on property sale (one-third discount or 0% if in pension phase)." },
      ],
      featureGroups: [
        {
          kind: "list",
          heading: "SMSF Commercial Loan Features",
          items: [
            { title: "Up to 80% LVR", description: "Borrow up to 80% of commercial property value with 20% deposit from SMSF funds." },
            { title: "Competitive Rates", description: "SMSF commercial property rates from 6.5-8.5% p.a. depending on property and covenant." },
            { title: "Interest-Only Available", description: "Interest-only periods to maximize cash flow within your SMSF during accumulation." },
            { title: "Flexible Terms", description: "Loan terms from 15-30 years to align with your retirement planning strategy." },
          ],
        },
        {
          kind: "list",
          heading: "Key Requirements",
          items: [
            { title: "Market Rate Rent", description: "Rent charged to related parties must be at commercial market rates supported by valuation." },
            { title: "Formal Lease Agreement", description: "Written lease agreement required with proper terms, conditions, and market rent." },
            { title: "Sole Purpose Test", description: "Investment must meet sole purpose test of providing retirement benefits to members." },
            { title: "SMSF Cash Flow", description: "Sufficient funds from rent and contributions to service loan and pay all expenses." },
          ],
        },
      ],
      infoBox: {
        variant: "highlight",
        icon: "FaPiggyBank",
        title: "SMSF Commercial Property Strategy",
        paragraphs: [
          "This strategy works exceptionally well for business owners who currently pay rent to third-party landlords. By purchasing your business premises through your SMSF, you redirect rent payments to your super fund instead. Your business continues to claim rent as a tax deduction, but the money builds your retirement wealth at concessional tax rates (15% or 0%) instead of enriching a landlord.",
          "Over time, loan repayments build equity in an asset your SMSF owns, creating substantial retirement wealth while your business occupies the premises. We work with your accountant and financial advisor to structure this correctly and ensure compliance with all SMSF regulations.",
        ],
      },
    },
    {
      id: "refinance-smsf-section",
      title: "Refinance an Existing SMSF Loan",
      subtitle: "Refinance your existing SMSF property loan to access better interest rates, improved loan features, or release equity for additional investments. Save thousands while maintaining compliance with all SMSF regulations.",
      cardIcon: "FaArrowsSpin",
      cardTitle: "Why Refinance Your SMSF Loan?",
      benefits: [
        { title: "Lower Interest Rates", description: "Secure better rates to reduce interest costs and improve your SMSF's investment returns." },
        { title: "Better Loan Features", description: "Access improved features like offset accounts, flexible repayment options, or longer interest-only periods." },
        { title: "Release Equity", description: "Access property equity for additional SMSF property investments or other permitted investments." },
        { title: "Switch Loan Types", description: "Change from fixed to variable rates or vice versa based on market conditions and your strategy." },
        { title: "Improve Cash Flow", description: "Reduce monthly repayments to improve SMSF cash flow for other investments or member pensions." },
        { title: "Better Lender Service", description: "Switch to lenders with better SMSF understanding, faster processing, and specialist support." },
      ],
      featureGroups: [
        {
          kind: "steps",
          heading: "SMSF Refinance Process",
          items: [
            { title: "Loan Review", description: "We review your current SMSF loan, rates, fees, and features to identify potential savings." },
            { title: "Lender Comparison", description: "Compare SMSF-specialist lenders to find the best rates and terms for your situation." },
            { title: "Application & Approval", description: "Submit application with SMSF documentation and manage the approval process end-to-end." },
            { title: "Settlement", description: "Coordinate settlement, discharge old loan, and ensure bare trust transfers correctly to new lender." },
          ],
        },
        {
          kind: "list",
          heading: "What You'll Need",
          items: [
            { title: "SMSF Documentation", description: "Trust deed, financial statements, tax returns, and member statements for the SMSF." },
            { title: "Current Loan Details", description: "Loan statements, payout figures, and details of bare trust holding the property." },
            { title: "Property Information", description: "Property valuation, rental agreement (if applicable), and rates notice." },
            { title: "Accountant Details", description: "Contact information for your SMSF accountant to coordinate compliance matters." },
          ],
        },
      ],
      infoBox: {
        variant: "highlight",
        icon: "FaMoneyBillTransfer",
        title: "SMSF Refinance Savings",
        paragraphs: [
          "Even a 0.5% reduction in interest rate can save your SMSF tens of thousands over the life of the loan. For example, on a $500,000 SMSF loan, a 0.5% rate reduction saves approximately $2,500 per year, or $62,500 over 25 years. These savings compound in your tax-effective super environment, significantly boosting retirement wealth.",
          "We calculate the total benefit including rate savings, improved features, and any equity release, comparing this against refinancing costs (discharge fees, application fees, valuation). If refinancing makes sense, we manage the entire process while ensuring continued SMSF compliance.",
        ],
      },
    },
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for SMSF Loans?",
    subtitle: "We specialize in SMSF lending and work with specialist lenders who understand the unique requirements of super fund property loans.",
    cards: [
      { icon: "FaPiggyBank", title: "SMSF Specialists", description: "Deep expertise in SMSF lending regulations, compliance requirements, and specialist lender policies." },
      { icon: "FaShieldHalved", title: "Compliance Focused", description: "We ensure your loan structure meets all ATO and superannuation law requirements to protect your SMSF." },
      { icon: "FaUserTie", title: "Specialist Lender Access", description: "Access to SMSF-specialist lenders who offer competitive rates and understand super fund lending." },
      { icon: "FaHandshake", title: "Accountant Collaboration", description: "We work closely with your SMSF accountant to ensure seamless integration and compliance." },
    ],
  },
  benefits: {
    badge: "BENEFITS",
    title: "SMSF Property Loan Advantages",
    subtitle: "Build significant retirement wealth through tax-effective property investment in your super fund",
    cards: [
      { icon: "FaDollarSign", title: "Tax-Effective Growth", description: "Rental income and capital gains are taxed at concessional rates (15% accumulation, 0% pension), significantly lower than personal tax rates, accelerating wealth accumulation for retirement." },
      { icon: "FaShieldHalved", title: "Asset Protection & Control", description: "Property held in SMSF is protected from personal and business creditors. For business owners, you control your premises while building retirement wealth through ownership in your super fund." },
      { icon: "FaChartLine", title: "Leverage & Diversification", description: "Use borrowed funds to amplify your super fund's property investment capacity. Diversify beyond traditional super investments (shares, cash) into tangible property assets for balanced portfolio growth." },
    ],
  },
  moreServices: {
    title: "More Than Just SMSF Loans",
    subtitle: "At ALS Mortgage Solutions, we provide comprehensive SMSF lending services that go beyond just finding you a loan",
    cards: [
      { icon: "FaFileContract", title: "Compliance Guidance", description: "Expert advice on SMSF regulations, ATO requirements, and structuring your loan to meet all compliance obligations." },
      { icon: "FaUsers", title: "Accountant Coordination", description: "We work closely with your SMSF accountant to ensure seamless integration and proper documentation for compliance." },
      { icon: "FaChartPie", title: "Investment Strategy", description: "Help developing your SMSF investment strategy to document property investment rationale and satisfy ATO requirements." },
      { icon: "FaShieldHalved", title: "Bare Trust Setup", description: "Arrangement of proper bare trust documentation and structure to hold property under Limited Recourse Borrowing rules." },
      { icon: "FaHandshake", title: "Ongoing SMSF Support", description: "Regular reviews of your SMSF loan to identify refinancing opportunities and ensure continued optimal structure." },
      { icon: "FaHeart", title: "Cash Flow Modeling", description: "Detailed modeling of SMSF cash flows to ensure you can comfortably service the loan and meet all obligations." },
    ],
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about SMSF property loans",
    items: [
      { question: "Can my SMSF borrow to buy property?", answer: "Yes, SMSFs can borrow to purchase property using a Limited Recourse Borrowing Arrangement (LRBA). The property must be held in a bare trust with the SMSF as beneficiary, and the loan must have limited recourse (lender can only claim the property, not other SMSF assets, if default occurs). This allows your super fund to leverage and purchase property worth more than your current SMSF balance. The property can be residential (rented to unrelated parties only) or commercial (can be leased to related parties including your business)." },
      { question: "How much deposit does my SMSF need?", answer: "SMSF property loans typically require a 20% deposit, meaning you can borrow up to 80% of the property value. This deposit must come from your SMSF's existing funds, which can include member contributions, rollover funds from other super accounts, or proceeds from selling other SMSF investments. Some lenders may require larger deposits (30-40%) for certain property types or locations. Your SMSF must also have sufficient cash reserves beyond the deposit to cover stamp duty, legal fees, ongoing loan repayments, and property expenses." },
      { question: "What are the interest rates for SMSF loans?", answer: "SMSF loan interest rates typically range from 6.5-8.5% p.a., depending on property type (residential vs commercial), loan amount, LVR, and whether the property is leased to a related party. Rates are generally 0.5-1.5% higher than standard residential loans due to the specialized nature and compliance requirements of SMSF lending. However, the tax-effective environment of super (15% tax on income vs personal rates up to 47%) often means the after-tax cost is lower than borrowing personally. We access SMSF-specialist lenders who offer competitive rates for super fund property loans." },
      { question: "Can my SMSF buy a property I want to live in?", answer: "No, your SMSF cannot purchase residential property for you or any SMSF member to live in. This violates the sole purpose test (super must be for retirement only) and related party rules. Residential property purchased by your SMSF must be rented to unrelated third parties at market rates. However, your SMSF CAN purchase commercial property and lease it to your business or related entity, as long as rent is at market rates. This is a powerful strategy for business owners to build super while controlling business premises." },
      { question: "What happens if my SMSF can't make loan repayments?", answer: "If your SMSF cannot meet loan repayments, the lender can only claim the property held in the bare trust (limited recourse). Other SMSF assets are protected. However, this is still serious as you'd lose the property and any equity built up. To avoid this: ensure adequate SMSF cash flow from rental income and member contributions, maintain cash reserves for vacancies and repairs, have a clear strategy for servicing the loan, and consider insurance for income protection. We help you model SMSF cash flows before proceeding to ensure serviceability." },
      { question: "Can my SMSF renovate or improve the property?", answer: "Under LRBA rules, you cannot make improvements or renovations to SMSF property during the loan term - only essential repairs and maintenance are allowed. This is because improvements would change the 'single acquirable asset' held in the bare trust, violating SMSF borrowing rules. Once the loan is fully repaid, you can make any improvements or renovations you like. Some lenders and advisors interpret the rules slightly differently, so it's crucial to work with your SMSF accountant to understand what's permitted. Generally, essential repairs (fixing broken items) are allowed but improvements (adding value) are not." },
      { question: "What documents does my SMSF need for a property loan?", answer: "SMSF property loans require: SMSF trust deed (showing borrowing powers), recent SMSF financial statements and tax returns, member statements showing contributions and balances, investment strategy documenting property investment rationale, minutes of trustee meetings approving the property purchase, property valuation or purchase contract, rental agreement or market rent assessment, bare trust deed (can be arranged at settlement), and trustee identification documents. We provide a complete checklist and help coordinate with your SMSF accountant to ensure all documentation is correct and compliant." },
      { question: "Should I use my SMSF to buy property or invest another way?", answer: "SMSF property investment suits those who: understand property markets and are comfortable with property risk, have sufficient SMSF balance for deposit and reserves ($100k+ minimum typically), can maintain cash flow for loan repayments and expenses, want direct control over a tangible asset, and are comfortable with illiquid investments (property is harder to sell than shares). It's not suitable if your SMSF has limited funds, you need regular high income from your super, you can't handle illiquidity, or you lack property knowledge. Speak with a financial advisor to assess if SMSF property fits your overall retirement strategy and risk profile." },
    ],
  },
};

const CAR_FINANCING_DETAIL: DetailedLoanContent = {
  topicTilesSection: {},
  topicTiles: [
    { title: "Finance for a Car - Home Owner", description: "Leverage your home equity to secure competitive car finance rates with flexible repayment options.", anchorId: "homeowner-finance-section", icon: "FaHouse", linkLabel: "Learn More" },
    { title: "Finance a Vehicle - Business Owner", description: "Tax-effective vehicle finance solutions including chattel mortgage, novated lease, and commercial hire purchase.", anchorId: "business-finance-section", icon: "FaBriefcase", linkLabel: "Learn More" },
    { title: "Buy a New Car", description: "Get pre-approved car finance to negotiate like a cash buyer and drive away in your new vehicle sooner.", anchorId: "new-car-section", icon: "FaCartShopping", linkLabel: "Learn More" },
  ],
  spotlightSections: [
    {
      id: "homeowner-finance-section",
      title: "Car Finance for Home Owners",
      subtitle: "As a home owner, you have access to more competitive car financing options. Use your property equity to secure lower interest rates and flexible repayment terms for your next vehicle purchase.",
      cardIcon: "FaCartShopping",
      cardTitle: "Benefits of Home Owner Car Finance",
      benefits: [
        { title: "Lower Interest Rates", description: "Access rates as low as home loan rates by using your property as security, significantly lower than unsecured car loans." },
        { title: "Higher Borrowing Capacity", description: "Borrow larger amounts for luxury or premium vehicles by leveraging your home equity." },
        { title: "Flexible Loan Terms", description: "Choose loan terms up to 7 years with options for interest-only periods to reduce initial repayments." },
        { title: "Tax Benefits Available", description: "If using the vehicle for business purposes, you may be eligible for tax deductions on interest payments." },
        { title: "Offset Account Options", description: "Link an offset account to reduce interest charges and pay off your car loan faster." },
        { title: "Keep Your Savings Intact", description: "Finance your vehicle purchase without depleting your cash reserves or emergency funds." },
      ],
      featureGroups: [
        {
          kind: "cards",
          heading: "Home Owner Finance Options",
          cards: [
            { title: "Equity Release", description: "Refinance your home loan and access equity to purchase your vehicle outright. This gives you the lowest interest rates and full ownership from day one.", bullets: ["Home loan rates (typically 5-7% p.a.)", "Own the car outright immediately", "Longer repayment terms available"] },
            { title: "Secured Car Loan", description: "A car loan secured against your property for better rates than standard car loans, while keeping your home loan separate.", bullets: ["Better rates than unsecured car loans", "Keep home and car finance separate", "Dedicated car loan terms (1-7 years)"] },
          ],
        },
      ],
      infoBox: null,
    },
    {
      id: "business-finance-section",
      title: "Vehicle Finance for Business Owners",
      subtitle: "Choose from tax-effective vehicle finance options designed specifically for business owners. Whether you're buying a work vehicle, company car, or commercial fleet, we'll help you structure the finance to maximize tax benefits and preserve cash flow.",
      cardIcon: "FaBriefcase",
      cardTitle: "Business Vehicle Finance Options",
      benefits: [],
      featureGroups: [
        {
          kind: "cards",
          heading: "Business Vehicle Finance Options",
          cards: [
            { title: "Chattel Mortgage", description: "The most popular option for businesses. You own the vehicle from day one and claim GST credits and tax deductions on interest and depreciation.", bullets: ["Claim GST on the purchase price (if registered)", "Tax deductions on interest and depreciation", "Balloon payment options to reduce monthly costs"] },
            { title: "Commercial Hire Purchase", description: "Similar to chattel mortgage but you don't own the vehicle until the final payment. Good for businesses wanting to claim maximum deductions.", bullets: ["100% tax deductible for business use", "Fixed interest rates available", "No deposit required in some cases"] },
            { title: "Novated Lease", description: "Perfect for employees wanting to salary package a vehicle. Your employer makes payments from pre-tax salary, reducing your taxable income.", bullets: ["Pay from pre-tax income, reducing tax", "Bundle all vehicle costs (fuel, insurance, servicing)", "Keep the vehicle if you change jobs"] },
            { title: "Finance Lease", description: "The lender owns the vehicle while you use it. At the end, you can buy it, trade it, or return it. Great for businesses wanting off-balance-sheet financing.", bullets: ["Lease payments are tax deductible", "Vehicle stays off your balance sheet", "Flexible end-of-lease options"] },
          ],
        },
      ],
      infoBox: {
        variant: "warning",
        icon: "FaShieldHalved",
        title: "Important Tax Considerations",
        paragraphs: [
          "The tax benefits of business vehicle finance depend on how you use the vehicle and your business structure. We recommend consulting with your accountant to determine the most tax-effective option for your situation. We work closely with accountants to ensure your car finance aligns with your overall tax strategy.",
        ],
      },
    },
    {
      id: "new-car-section",
      title: "Buy a New Car with Confidence",
      subtitle: "Get pre-approved car finance before you start shopping. This gives you the power to negotiate like a cash buyer, helps you set a realistic budget, and speeds up the purchase process when you find the perfect vehicle.",
      cardIcon: "FaCartShopping",
      cardTitle: "How Pre-Approval Works",
      benefits: [],
      featureGroups: [
        {
          kind: "steps",
          heading: "How Pre-Approval Works",
          items: [
            { title: "Apply for Pre-Approval", description: "Submit a quick application with your income, expenses, and desired loan amount. We'll assess your borrowing capacity and find the best lender for your situation." },
            { title: "Get Your Approval Amount", description: "Receive confirmation of your approved loan amount and interest rate, typically within 24-48 hours. You'll know exactly how much you can spend." },
            { title: "Shop with Confidence", description: "Browse dealerships knowing you have finance ready to go. Negotiate better deals by demonstrating you're a serious buyer with approved funding." },
            { title: "Finalize and Drive Away", description: "Once you've chosen your vehicle, we'll finalize the paperwork with the lender and arrange for funds to be released directly to the dealer. You can drive away the same day." },
          ],
        },
        {
          kind: "cards",
          heading: "New Car vs Used Car Finance",
          cards: [
            { title: "New Cars", bullets: ["Lower interest rates (from 5.99% p.a.)", "Longer loan terms available (up to 7 years)", "Manufacturer warranties and better reliability"] },
            { title: "Used Cars", bullets: ["Lower purchase price and faster depreciation", "Still competitive rates from 6.99% p.a.", "Finance available for cars up to 12 years old"] },
          ],
        },
        {
          kind: "list",
          heading: "What to Consider Before Buying",
          items: [
            { title: "Total Cost of Ownership", description: "Consider insurance, registration, fuel, and maintenance costs alongside your loan repayments." },
            { title: "Depreciation", description: "New cars lose 15-20% of value in the first year. Consider if a nearly-new used car offers better value." },
            { title: "Loan Term", description: "Shorter terms mean higher repayments but less total interest paid. Don't extend beyond the car's useful life." },
            { title: "Deposit Amount", description: "A larger deposit (20%+) reduces your loan amount and interest charges, and may help you avoid LMI." },
          ],
        },
      ],
      infoBox: null,
    },
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for Car Financing?",
    subtitle: "We compare car finance options from multiple lenders to find you the best rates and terms for your situation.",
    cards: [
      { icon: "FaPercent", title: "Competitive Rates", description: "Access exclusive rates and deals from over 40 lenders that you won't find going direct." },
      { icon: "FaShieldHalved", title: "Expert Guidance", description: "Our specialists help you choose the right finance structure for your tax and cash flow needs." },
      { icon: "FaUserTie", title: "Quick Approvals", description: "Get pre-approved in as little as 24 hours, so you can negotiate confidently with dealers." },
      { icon: "FaHandshake", title: "No Lender Fees", description: "Our service is completely free - we're paid by the lender, so you get expert advice at no cost." },
    ],
  },
  benefits: {
    badge: "BENEFITS",
    title: "Car Finance Advantages",
    subtitle: "Smart financing helps you drive the car you want while maintaining financial flexibility",
    cards: [
      { icon: "FaDollarSign", title: "Preserve Cash Flow", description: "Keep your savings and emergency funds intact while spreading the cost of your vehicle over manageable monthly payments. This maintains your financial flexibility for other opportunities or unexpected expenses." },
      { icon: "FaChartLine", title: "Build Credit History", description: "Successfully managing a car loan builds your credit profile and improves your credit score, making it easier to access finance for property and other major purchases in the future." },
      { icon: "FaShieldHalved", title: "Tax Benefits for Business", description: "Business owners and self-employed individuals can access significant tax deductions on vehicle finance, including GST credits, interest deductions, and depreciation benefits that reduce the overall cost." },
    ],
  },
  moreServices: {
    title: "More Than Just Car Loans",
    subtitle: "At ALS Mortgage Solutions, we provide comprehensive car financing services that go beyond just finding you a loan",
    cards: [
      { icon: "FaCar", title: "Pre-Purchase Inspection", description: "We can arrange professional vehicle inspections for used cars to ensure you're making a sound investment before committing to finance." },
      { icon: "FaShieldHalved", title: "Insurance Comparison", description: "Access competitive comprehensive car insurance quotes through our partners to protect your investment and meet lender requirements." },
      { icon: "FaUsers", title: "Trade-In Assistance", description: "Get help valuing your current vehicle and negotiating the best trade-in price to maximize your deposit for the new car." },
      { icon: "FaDollarSign", title: "Balloon Payment Planning", description: "Strategic advice on balloon payments to reduce monthly costs, with clear plans for refinancing or paying out the balloon when it's due." },
      { icon: "FaHandshake", title: "Dealer Negotiation Support", description: "With pre-approved finance, you have the power to negotiate better deals on the vehicle price and drive-away costs." },
      { icon: "FaHeart", title: "Ongoing Loan Reviews", description: "We regularly review your car loan to identify refinancing opportunities if better rates become available during your loan term." },
    ],
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about car financing",
    items: [
      { question: "What's the difference between a car loan and a personal loan?", answer: "A car loan is secured against the vehicle you're purchasing, which means the lender can repossess the car if you default. This security allows lenders to offer lower interest rates (typically 6-12% p.a.) compared to unsecured personal loans (9-20% p.a.). Car loans also typically have longer terms (up to 7 years) and higher borrowing amounts. The downside is you can't sell the car until the loan is paid off without the lender's consent. Personal loans offer more flexibility but cost more in interest." },
      { question: "How much deposit do I need for a car loan?", answer: "Most lenders prefer a deposit of at least 10-20% of the car's value, though some lenders offer no-deposit car loans for borrowers with strong credit and income. A larger deposit reduces your loan amount, lowers your monthly repayments, and may help you secure better interest rates. For business vehicle finance, some lenders allow 100% financing of the vehicle cost. If you're a home owner using equity, you may not need a cash deposit at all. We can help you determine the optimal deposit for your situation." },
      { question: "Can I get car finance with bad credit?", answer: "Yes, car finance is available for people with bad credit, though you'll likely face higher interest rates and may need a larger deposit. We work with specialist lenders who consider your current financial situation and income, not just your credit history. To improve your chances: provide a larger deposit (20%+), choose a more affordable vehicle, show steady employment and income, and consider a guarantor if possible. Interest rates for bad credit car loans typically range from 12-18% p.a. compared to 6-10% for good credit." },
      { question: "What's better for business: chattel mortgage or novated lease?", answer: "It depends on your situation. Chattel mortgage is best for business owners and self-employed people who use the vehicle primarily for business. You own the car, claim GST and tax deductions on interest and depreciation, and have flexibility with balloon payments. Novated lease is better for employees who want to salary package a vehicle through their employer. You pay from pre-tax income, reducing your taxable income, and can bundle all running costs. Chattel mortgage offers more ownership and flexibility, while novated lease provides greater tax benefits for employees. We recommend discussing with your accountant." },
      { question: "How quickly can I get approved for car finance?", answer: "Pre-approval can be obtained in as little as 24 hours for straightforward applications with standard employment and good credit. Full approval after choosing your vehicle typically takes 2-5 business days. Factors affecting approval time include: employment type (PAYG is faster than self-employed), credit history (clean credit is faster), documentation completeness, and lender processes. We can expedite applications if you've found a vehicle you want to secure quickly. Once approved, funds are usually released within 1-2 days, allowing you to complete the purchase immediately." },
      { question: "Should I get finance through the dealer or a broker?", answer: "Using a broker like ALS gives you access to more lenders and better rates. Dealers typically work with 2-3 preferred lenders and may receive commissions for steering you toward certain products, which can mean higher rates. Brokers compare 40+ lenders to find the best deal for your situation, often securing rates 0.5-2% lower than dealer finance. We also provide unbiased advice on loan structure, terms, and features. However, some manufacturers offer special promotional rates through dealers that may be competitive. We can compare dealer offers against our options to ensure you get the best deal." },
      { question: "What happens if I want to sell my car before the loan is paid off?", answer: "You can sell a car with an outstanding loan, but you'll need to pay out the remaining balance when you sell. If the sale price exceeds your loan balance, you keep the difference. If you owe more than the car is worth (negative equity), you'll need to pay the shortfall. The process involves: getting a payout figure from your lender, selling the car, paying the payout amount to release the lender's security, and transferring ownership to the buyer. Some lenders charge early repayment fees. We can help you refinance the shortfall into your next car loan if needed." },
      { question: "Can I include insurance and warranty costs in my car loan?", answer: "Yes, many lenders allow you to include comprehensive car insurance, extended warranty, gap insurance, and even registration costs in your car loan. This spreads these upfront costs over the loan term, reducing your initial cash outlay. However, financing these costs means you'll pay interest on them over the loan term, increasing the total cost. For example, financing $2,000 of insurance over 5 years at 8% p.a. will cost approximately $2,400 total. Consider whether it's better to pay these costs upfront if you have the cash available. We can help you calculate the best approach." },
    ],
  },
};

const REFINANCING_DETAIL: DetailedLoanContent = {
  topicTilesSection: {},
  topicTiles: [
    { title: "Refinance Home/Investment Loan", description: "Save thousands by refinancing to a better rate. Access better features, reduce repayments, or switch to a more suitable loan structure.", anchorId: "refinance-loan-section", icon: "FaHandHoldingDollar", linkLabel: "Learn More" },
    { title: "Refinance & Cashout", description: "Access your property equity for renovations, investment opportunities, or debt consolidation while refinancing.", anchorId: "cashout-section", icon: "FaPiggyBank", linkLabel: "Learn More" },
    { title: "Refinance SMSF Loan", description: "Optimize your SMSF property loan with better rates and terms while ensuring compliance with all regulations.", anchorId: "smsf-refinance-section", icon: "FaBuilding", linkLabel: "Learn More" },
  ],
  otherSolutions: {
    title: "Other Solutions",
    cards: [
      { title: "Home Loans", description: "Explore competitive home loan options for purchasing your next property.", link: "/home-loans", linkLabel: "Learn More" },
      { title: "Investment Loans", description: "Build your property portfolio with investment property financing.", link: "/investment-loans", linkLabel: "Learn More" },
      { title: "SMSF Loans", description: "Invest in property through your self-managed super fund.", link: "/smsf-loans", linkLabel: "Learn More" },
    ],
  },
  spotlightSections: [
    {
      id: "refinance-loan-section",
      title: "Refinance Home/Investment Loan",
      subtitle: "Lower your interest rate and reduce monthly repayments by switching to a more competitive loan. Refinancing can help you save thousands over the life of your loan, switch between fixed and variable rates, remove LMI, or access better loan features like offset accounts and redraw facilities. We compare hundreds of loan products to find you the best deal, handling the entire switch process with minimal hassle.",
      cardIcon: "FaHandHoldingDollar",
      cardTitle: "Why Refinance Your Home or Investment Loan?",
      benefits: [
        { title: "Lower Interest Rates", description: "Secure a better rate and reduce your monthly repayments, potentially saving thousands over the loan term." },
        { title: "Better Loan Features", description: "Access offset accounts, redraw facilities, and flexible repayment options that your current loan may not offer." },
        { title: "Consolidate Debts", description: "Combine multiple loans into one manageable payment with a lower overall interest rate." },
        { title: "Switch Loan Types", description: "Change from variable to fixed (or vice versa), or switch from interest-only to principal and interest." },
        { title: "Remove LMI", description: "If you've built sufficient equity, refinancing can eliminate Lenders Mortgage Insurance costs." },
        { title: "Adjust Loan Term", description: "Extend your loan term to reduce repayments or shorten it to pay off your mortgage faster." },
      ],
      featureGroups: [],
      infoBox: null,
    },
    {
      id: "cashout-section",
      title: "Refinance & Cash Out",
      subtitle: "Access the equity you've built in your property while refinancing. Cash-out refinancing lets you tap into your home's equity for renovations, investment opportunities, debt consolidation, or other financial goals. This strategy allows you to borrow against your property's increased value while potentially securing a better interest rate. We'll help you determine how much equity you can access and structure the loan responsibly.",
      cardIcon: "FaPiggyBank",
      cardTitle: "What Can You Use Cash Out For?",
      benefits: [
        { title: "Home Renovations", description: "Cashout for further renovations or improvements to the property that increase the property value and better lifestyle." },
        { title: "Investment Property Deposit", description: "Equity release to further investment in the property market will enhance your property goals." },
        { title: "Debt Consolidation", description: "Consolidating the debts and easing your repayments to manage your finance better." },
        { title: "Business Investment", description: "Fund business expansion, equipment purchases, or other wealth-building opportunities." },
      ],
      featureGroups: [],
      infoBox: null,
    },
    {
      id: "smsf-refinance-section",
      title: "Refinance SMSF Loan",
      subtitle: "Optimize your SMSF property investment with better loan terms. If your SMSF holds property, refinancing can help you access better interest rates, adjust loan structures, or release equity for additional investments within your super fund. We understand the unique compliance requirements and work with specialist SMSF lenders to ensure your refinance meets all regulatory obligations.",
      cardIcon: "FaBuilding",
      cardTitle: "SMSF Refinancing Expertise",
      cardBody: "Refinancing an SMSF property loan requires specialized knowledge of superannuation regulations, bare trust arrangements, and limited recourse borrowing structures. We work exclusively with SMSF-specialist lenders who understand the compliance requirements and offer competitive rates for super funds. Whether you're looking to reduce your interest rate, access equity for additional property investments within your SMSF, or restructure your loan terms, we ensure every aspect of your refinance maintains compliance with ATO regulations and your fund's investment strategy.",
      benefits: [],
      featureGroups: [],
      infoBox: null,
    },
  ],
  whyUs: {
    badge: "WHY CHOOSE US",
    title: "Why Choose ALS for Refinancing?",
    subtitle: "We've helped thousands of Australians save money and access better loan features through refinancing. Here's why you should choose us.",
    cards: [
      { icon: "FaPercent", title: "Rate Comparison", description: "We compare hundreds of loan products from over 40 lenders to find you the most competitive rates and terms available." },
      { icon: "FaMoneyBillTransfer", title: "Free Refinance Assessment", description: "Get a complimentary refinance health check to see how much you could save. No obligations, just expert advice." },
      { icon: "FaUserTie", title: "Seamless Process", description: "We handle all paperwork and coordinate with both your current and new lender for a smooth transition with minimal disruption." },
      { icon: "FaHandshake", title: "Ongoing Support", description: "We regularly review your loan to ensure it remains competitive, alerting you to new refinancing opportunities." },
    ],
  },
  benefits: {
    badge: "BENEFITS",
    title: "Refinancing Advantages",
    subtitle: "Unlock equity and optimize your financial position through strategic refinancing",
    cards: [
      { icon: "FaArrowTrendUp", title: "Strategic Equity Access", description: "Strategic planning for further investments via equity access through refinancing. Equity release to further investment in the property market will enhance your property goals and accelerate your path to financial freedom." },
      { icon: "FaKey", title: "Property Enhancement", description: "Cashout for further renovations or improvements to the property that increase the property value and better lifestyle. Strategic improvements deliver both enjoyment and strong returns on investment." },
      { icon: "FaDollarSign", title: "Smart Debt Management", description: "Consolidating the debts and easing your repayments to manage your finance better. This strategy simplifies your finances with one manageable payment and reduces overall interest costs." },
    ],
  },
  moreServices: {
    title: "More Than Just Loans",
    subtitle: "At ALS Mortgage Solutions, we provide comprehensive refinancing services that go beyond just finding you a better rate",
    cards: [
      { icon: "FaPercent", title: "Free Refinance Health Check", description: "Get a complimentary assessment of your current loan to identify potential savings, better features, and refinancing opportunities with no obligation." },
      { icon: "FaShieldHalved", title: "Ongoing Rate Monitoring", description: "We regularly monitor market rates and your loan to alert you to new refinancing opportunities, ensuring your loan remains competitive." },
      { icon: "FaUsers", title: "Full Process Management", description: "We handle all paperwork, coordinate with your current and new lender, and manage the entire refinancing process from start to settlement." },
      { icon: "FaDollarSign", title: "Equity Access Planning", description: "Strategic advice on accessing and using your property equity for renovations, investments, or debt consolidation while refinancing." },
      { icon: "FaHandshake", title: "Lender Negotiation", description: "We leverage our relationships with lenders to negotiate better rates, cashback offers, and waived fees that you can't access directly." },
      { icon: "FaHeart", title: "Refinancing Calculators", description: "Access our refinancing calculators to estimate your savings, break-even point, and total benefit before making a decision." },
    ],
  },
  faqs: {
    badge: "FAQ",
    title: "Frequently Asked Questions",
    subtitle: "Get answers to common questions about refinancing",
    items: [
      { question: "When should I consider refinancing my home loan?", answer: "Consider refinancing when: 1) Interest rates have dropped significantly since you took out your loan, 2) Your fixed rate period is ending and you want to lock in a new rate, 3) Your financial situation has improved and you can access better rates, 4) You want to access equity for renovations or investment, 5) You need better loan features like an offset account, or 6) You want to consolidate debts. Generally, if you can save 0.5% or more on your interest rate, refinancing is worth considering. We provide a free assessment to calculate your potential savings." },
      { question: "How much does it cost to refinance?", answer: "Refinancing costs typically include: application fees ($0-$1,000, though many lenders waive this), valuation fees ($200-$600), settlement fees ($200-$800), and discharge fees from your current lender ($300-$400). Some lenders offer cashback incentives ($2,000-$4,000) or no-fee refinancing packages that can offset these costs. Our service is free - we're paid by the lender. We'll calculate whether the savings outweigh the costs and help you choose lenders with minimal fees or cashback offers to maximize your benefit." },
      { question: "How long does the refinancing process take?", answer: "Refinancing typically takes 4-6 weeks from application to settlement. The timeline includes: application and document submission (1-3 days), property valuation (3-7 days), loan assessment and approval (7-14 days), formal approval and documentation (3-5 days), and settlement (14-21 days after approval). We can expedite the process if needed. During this time, we handle all communication with lenders and coordinate with your current bank to ensure a smooth transition with no gap in your loan." },
      { question: "Will refinancing affect my credit score?", answer: "Refinancing can have a minor temporary impact on your credit score. When you apply, the lender will conduct a credit check (a 'hard inquiry'), which may reduce your score by a few points temporarily. However, if you make your new loan repayments on time, your credit score will improve over time. To minimize impact, avoid making multiple applications with different lenders - let us submit your application to the most suitable lender. Closing your old loan account may also have a small impact, but this is outweighed by the long-term benefits of a better loan." },
      { question: "Can I access equity when refinancing?", answer: "Yes, refinancing is one of the best ways to access your property equity. You can typically borrow up to 80% of your property's value (minus your existing loan) without paying Lenders Mortgage Insurance. For example, if your property is worth $800,000 and you owe $400,000, you could potentially access up to $240,000 in equity ($640,000 x 80% = $640,000 - $400,000 = $240,000). This equity can be used for renovations, investment property deposits, debt consolidation, or other purposes. We'll help you calculate your available equity and structure the refinance appropriately." },
      { question: "What documents do I need to refinance?", answer: "You'll typically need: proof of identity (driver's license, passport), proof of income (recent payslips, tax returns if self-employed), employment verification, recent bank statements (3-6 months), details of assets and liabilities, rates notice or property valuation, current loan statements, and proof of address. If you're refinancing an investment property, you'll also need rental agreements and rental income evidence. We'll provide a complete checklist and help you gather everything needed to ensure a smooth application process." },
      { question: "Can I refinance if I have bad credit?", answer: "Yes, refinancing with bad credit is possible but may be more challenging. Your options depend on the severity and recency of credit issues. Minor issues (one or two late payments) typically won't prevent refinancing. More serious issues (defaults, bankruptcies) may require specialist lenders who are more lenient but charge higher rates. If you've improved your financial situation since taking out your current loan, you may still access competitive rates. We work with lenders who have varying credit policies and can find the best option for your situation. Sometimes it's worth waiting 6-12 months to improve your credit before refinancing." },
      { question: "Should I refinance to a fixed or variable rate?", answer: "The choice depends on your circumstances and market conditions. Fixed rates provide certainty and protection from rate rises (typically 1-5 years), but you miss out if rates fall and usually have less flexibility (limited extra repayments, no offset account). Variable rates fluctuate with the market but offer flexibility with offset accounts, unlimited extra repayments, and the ability to take advantage of rate drops. Many borrowers choose a split loan (part fixed, part variable) for a balance of certainty and flexibility. We'll help you assess current market conditions, rate forecasts, and your personal situation to make the best decision." },
    ],
  },
};

export const DETAILED_LOAN_DEFAULTS: Record<DetailedLoanSlug, DetailedLoanContent> = {
  "commercial-loans": COMMERCIAL_LOANS_DETAIL,
  "smsf-loans": SMSF_LOANS_DETAIL,
  "car-financing": CAR_FINANCING_DETAIL,
  refinancing: REFINANCING_DETAIL,
};

export function mergeDetailedLoanContent(
  slug: string,
  raw?: Partial<DetailedLoanContent>,
): DetailedLoanContent {
  const d = DETAILED_LOAN_DEFAULTS[slug as DetailedLoanSlug] ?? SMSF_LOANS_DETAIL;
  if (!raw || Object.keys(raw).length === 0) return d;
  return {
    topicTilesSection: { ...d.topicTilesSection, ...raw.topicTilesSection },
    topicTiles: raw.topicTiles ?? d.topicTiles,
    otherSolutions: raw.otherSolutions ?? d.otherSolutions,
    spotlightSections: raw.spotlightSections ?? d.spotlightSections,
    whyUs: raw.whyUs
      ? { ...d.whyUs, ...raw.whyUs, cards: raw.whyUs.cards ?? d.whyUs.cards }
      : d.whyUs,
    benefits: raw.benefits
      ? { ...d.benefits, ...raw.benefits, cards: raw.benefits.cards ?? d.benefits.cards }
      : d.benefits,
    moreServices: raw.moreServices
      ? { ...d.moreServices, ...raw.moreServices, cards: raw.moreServices.cards ?? d.moreServices.cards }
      : d.moreServices,
    faqs: raw.faqs
      ? { ...d.faqs, ...raw.faqs, items: raw.faqs.items ?? d.faqs.items }
      : d.faqs,
  };
}
