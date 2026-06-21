"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOAN_PAGE_DEFAULTS = exports.DEFAULT_SERVICES_CONTENT = exports.LOAN_PRODUCT_SLUGS = exports.SERVICE_SLUGS = void 0;
exports.mergeServicesContent = mergeServicesContent;
exports.mergeLoanPageContent = mergeLoanPageContent;
exports.mergeServicePageContent = mergeServicePageContent;
exports.getServiceAdminPath = getServiceAdminPath;
exports.SERVICE_SLUGS = [
    "services",
    "home-loans",
    "investment-loans",
    "commercial-loans",
    "smsf-loans",
    "car-financing",
    "refinancing",
];
exports.LOAN_PRODUCT_SLUGS = [
    "home-loans",
    "investment-loans",
    "commercial-loans",
    "smsf-loans",
    "car-financing",
    "refinancing",
];
function mergeCards(defaults, raw) {
    return defaults.map((d, i) => ({ ...d, ...(raw?.[i] ?? {}) }));
}
function mergeTopicTiles(defaults, raw) {
    return defaults.map((d, i) => ({ ...d, ...(raw?.[i] ?? {}) }));
}
function mergeSpotlights(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({
        ...(defaults[i] ?? { title: "", subtitle: "", cardTitle: "", cardBody: "" }),
        ...(raw?.[i] ?? {}),
    }));
}
function mergeFaqs(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({
        ...(defaults[i] ?? { question: "", answer: "" }),
        ...(raw?.[i] ?? {}),
    }));
}
exports.DEFAULT_SERVICES_CONTENT = {
    servicesList: {
        badge: "OUR SERVICES",
        title: "What we offer",
        subtitle: "Explore our comprehensive range of lending solutions designed to help you achieve your property and financial goals",
        cards: [
            {
                title: "Home Loans",
                description: "First home buyers, upgraders, and investors - we'll find the perfect loan for your situation with competitive rates and flexible terms.",
                link: "/home-loans",
                linkLabel: "Learn More",
            },
            {
                title: "Investment Loans",
                description: "Build your property portfolio with expert investment loan solutions, equity strategies, and tax-effective structures for wealth creation.",
                link: "/investment-loans",
                linkLabel: "Learn More",
            },
            {
                title: "Refinancing",
                description: "Save thousands by switching to a better rate. Access your equity, consolidate debt, or simply get a better deal on your existing loan.",
                link: "/refinancing",
                linkLabel: "Learn More",
            },
            {
                title: "SMSF Loans",
                description: "Leverage your superannuation to invest in property with specialized SMSF lending solutions and expert compliance guidance.",
                link: "/smsf-loans",
                linkLabel: "Learn More",
            },
            {
                title: "Commercial Loans",
                description: "Financing solutions for business properties, commercial premises, and mixed-use developments with flexible terms.",
                link: "/commercial-loans",
                linkLabel: "Learn More",
            },
            {
                title: "Car Financing",
                description: "Competitive vehicle finance options for personal and business use, including chattel mortgages and novated leases.",
                link: "/car-financing",
                linkLabel: "Learn More",
            },
            {
                title: "Business Loans",
                description: "Funding solutions to help your business grow, including working capital, equipment finance, and expansion loans.",
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
                description: "Your interests always come first. We're paid by lenders, not by you, ensuring unbiased advice.",
            },
            {
                title: "Ethical Lending",
                description: "Founded on ethical principles. We focus on long-term client satisfaction, not short-term gains.",
            },
            {
                title: "Expert Team",
                description: "20+ years of experience helping Australians achieve their property dreams with personalized service.",
            },
            {
                title: "Proven Results",
                description: "96% loan approval rate with access to 25+ lenders for the best rates and terms.",
            },
        ],
    },
    teamSection: {
        badge: "OUR TEAM",
        title: "Meet our experts",
        subtitle: "Our dedicated team of mortgage professionals is here to guide you through your property journey",
    },
};
const HOME_LOANS_DEFAULT = {
    topicTilesSection: {},
    topicTiles: [
        {
            title: "Buy First Home",
            description: "Step into the property market with confidence. Access exclusive first home buyer benefits, government schemes, and lower deposit options.",
            anchorId: "first-home-section",
            linkLabel: "Learn More",
        },
        {
            title: "Next Home Purchase",
            description: "Ready to upgrade or relocate? Leverage equity, coordinate timing between selling and buying with expert guidance.",
            anchorId: "next-home-section",
            linkLabel: "Learn More",
        },
        {
            title: "Buying with a Guarantor",
            description: "Get into the property market sooner with family support. Avoid LMI and potentially borrow up to 100% of property value.",
            anchorId: "guarantor-section",
            linkLabel: "Learn More",
        },
    ],
    otherSolutions: {
        title: "Other Solutions",
        cards: [
            {
                title: "Government Guarantee Scheme",
                description: "Access home ownership with as little as 5% deposit through the First Home Guarantee and other government-backed schemes.",
                link: "/resources/first-home-buyer-guide",
                linkLabel: "Learn More",
            },
            {
                title: "Buying an Investment Property",
                description: "Build wealth through property investment with specialized loan structures and tax benefits.",
                link: "/investment-loans",
                linkLabel: "Learn More",
            },
            {
                title: "Buying Through My SMSF",
                description: "Leverage your superannuation to invest in property with an SMSF loan structure.",
                link: "/smsf-loans",
                linkLabel: "Learn More",
            },
        ],
    },
    spotlightSections: [
        {
            id: "first-home-section",
            title: "Buy Your First Home",
            subtitle: "Taking your first step onto the property ladder is an exciting milestone. We specialize in helping first home buyers navigate the complexities of purchasing their first property.",
            cardTitle: "First Home Buyer Benefits & Programs",
            cardBody: "As a first home buyer, you have access to various government grants, stamp duty concessions, and the First Home Guarantee scheme which allows you to purchase with as little as 5% deposit.",
            link: "/resources/first-home-buyer-guide",
            linkLabel: "View First Home Buyer Benefits & Guide",
        },
        {
            id: "guarantor-section",
            title: "Buying with a Guarantor",
            subtitle: "Get into the property market sooner with family support. A guarantor loan allows a family member to use their property as security.",
            cardTitle: "How Guarantor Loans Work",
            cardBody: "A guarantor uses the equity in their property as additional security for your home loan. This allows you to enter the property market with a smaller deposit or no deposit at all.",
            linkLabel: "Explore Guarantor Options",
        },
    ],
    whyUs: {
        badge: "WHY CHOOSE US",
        title: "Why Choose ALS for Your Home Loan?",
        subtitle: "More than 36,000 Australian businesses and individuals choose us as their mortgage brokers.",
        cards: [
            { title: "Client-First Approach", description: "Your interests always come first with unbiased advice." },
            { title: "Expert Guidance", description: "20+ years experience navigating the lending landscape." },
            { title: "Wide Lender Panel", description: "Access to 25+ lenders for competitive rates and terms." },
            { title: "End-to-End Support", description: "From pre-approval through settlement and beyond." },
        ],
    },
    benefits: {
        badge: "BENEFITS",
        title: "Unlock the Power of Your Property",
        subtitle: "Strategic refinancing and smart borrowing can transform your financial future",
        cards: [
            {
                title: "Strategic Equity Access",
                description: "Strategic planning for further investments via equity access through refinancing.",
            },
            {
                title: "Property Enhancement",
                description: "Cashout for renovations or improvements that increase property value.",
            },
            {
                title: "Smart Debt Management",
                description: "Consolidating debts and easing repayments to manage your finance better.",
            },
        ],
    },
    moreServices: {
        title: "More Than Just Loans",
        subtitle: "At ALS Mortgage Solutions, we provide comprehensive financial services that go beyond just finding you a loan",
        cards: [
            { title: "Property Investment Strategy", description: "Expert guidance on building a successful property portfolio." },
            { title: "Refinancing Solutions", description: "Optimize your existing loans for better rates and features." },
            { title: "Financial Planning", description: "Holistic advice aligned with your long-term wealth goals." },
        ],
    },
    faqs: {
        badge: "FAQ",
        title: "Frequently Asked Questions",
        subtitle: "Get answers to common questions about home loans, refinancing, and property investment",
        items: [
            {
                question: "How much can I borrow for a home loan?",
                answer: "Your borrowing capacity depends on income, expenses, existing debts, credit history, and property value.",
            },
            {
                question: "What deposit do I need to buy a home?",
                answer: "While 20% is ideal to avoid LMI, first home buyers may qualify for schemes requiring as little as 5% deposit.",
            },
            {
                question: "Should I choose a fixed or variable interest rate?",
                answer: "Fixed rates provide certainty; variable rates offer flexibility. Many borrowers choose a split loan combining both.",
            },
        ],
    },
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
                { title: "Fast Approval", description: "Streamlined process to keep your plans on track." },
            ],
        },
        moreServices: {
            title: "More Than Just Loans",
            subtitle: "Comprehensive financial services beyond finding you a loan",
            cards: [
                { title: "Strategic Advice", description: "Long-term planning aligned with your financial goals." },
                { title: "Refinancing", description: "Review and optimize your existing lending structure." },
                { title: "Ongoing Support", description: "We stay with you well beyond settlement." },
            ],
        },
        faqs: {
            badge: "FAQ",
            title: "Frequently Asked Questions",
            subtitle: faqSubtitle,
            items: [
                { question: "How does the application process work?", answer: "We guide you from consultation through to settlement." },
                { question: "How long does approval take?", answer: "Typical approvals take 2–6 weeks depending on complexity." },
            ],
        },
    };
}
exports.LOAN_PAGE_DEFAULTS = {
    "home-loans": HOME_LOANS_DEFAULT,
    "investment-loans": loanDefaults([
        { title: "First Investment Property", description: "Start building your portfolio with expert loan structuring.", anchorId: "first-investment-section", linkLabel: "Learn More" },
        { title: "Portfolio Expansion", description: "Leverage equity to grow your existing property portfolio.", anchorId: "portfolio-section", linkLabel: "Learn More" },
        { title: "Commercial Investment", description: "Finance commercial property investments with flexible terms.", anchorId: "commercial-investment-section", linkLabel: "Learn More" },
    ], "Maximise Your Investment Returns", "Common questions about investment property loans"),
    "commercial-loans": loanDefaults([
        { title: "Owner-Occupied Commercial", description: "Finance the premises your business operates from.", linkLabel: "Learn More" },
        { title: "Commercial Investment", description: "Invest in commercial property for rental income.", linkLabel: "Learn More" },
        { title: "Development Finance", description: "Funding for commercial development projects.", linkLabel: "Learn More" },
    ], "Commercial Lending Benefits", "Common questions about commercial property finance"),
    "smsf-loans": loanDefaults([
        { title: "Residential SMSF Property", description: "Purchase residential property through your self-managed super fund.", linkLabel: "Learn More" },
        { title: "Commercial SMSF Property", description: "Invest in commercial property via your SMSF structure.", linkLabel: "Learn More" },
        { title: "SMSF Refinancing", description: "Refinance existing SMSF loans for better rates.", linkLabel: "Learn More" },
    ], "SMSF Lending Expertise", "Common questions about SMSF property loans"),
    "car-financing": loanDefaults([
        { title: "Personal Car Loan", description: "Competitive rates for your next vehicle purchase.", linkLabel: "Learn More" },
        { title: "Business Vehicle Finance", description: "Chattel mortgages and finance for business fleets.", linkLabel: "Learn More" },
        { title: "Novated Lease", description: "Tax-effective vehicle salary packaging options.", linkLabel: "Learn More" },
    ], "Vehicle Finance Benefits", "Common questions about car and vehicle finance"),
    refinancing: loanDefaults([
        { title: "Refinance Home/Investment Loan", description: "Save thousands by refinancing to a better rate.", anchorId: "refinance-loan-section", linkLabel: "Learn More" },
        { title: "Refinance & Cashout", description: "Access equity while refinancing for better terms.", anchorId: "cashout-section", linkLabel: "Learn More" },
        { title: "Refinance SMSF Loan", description: "Optimize your SMSF property loan with better rates.", anchorId: "smsf-refinance-section", linkLabel: "Learn More" },
    ], "Benefits of Refinancing", "Common questions about refinancing your home loan"),
};
function mergeServicesContent(raw) {
    const d = exports.DEFAULT_SERVICES_CONTENT;
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
function mergeLoanPageContent(slug, raw) {
    const d = exports.LOAN_PAGE_DEFAULTS[slug] ?? HOME_LOANS_DEFAULT;
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
    };
}
function mergeServicePageContent(slug, raw) {
    if (slug === "services") {
        return mergeServicesContent(raw);
    }
    return mergeLoanPageContent(slug, raw);
}
function getServiceAdminPath(slug) {
    if (slug === "services")
        return "/admin/services";
    return `/admin/services/${slug}`;
}
