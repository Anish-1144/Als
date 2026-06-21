"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CALCULATOR_PAGE_DEFAULTS = exports.DEFAULT_CALCULATORS_HUB_CONTENT = exports.CALCULATOR_TOOL_SLUGS = exports.CALCULATOR_SLUGS = void 0;
exports.mergeCalculatorsHubContent = mergeCalculatorsHubContent;
exports.mergeCalculatorPageContent = mergeCalculatorPageContent;
exports.getCalculatorAdminPath = getCalculatorAdminPath;
exports.CALCULATOR_SLUGS = [
    "calculator",
    "borrowing-capacity",
    "extra-repayments",
    "property-fees",
];
exports.CALCULATOR_TOOL_SLUGS = [
    "borrowing-capacity",
    "extra-repayments",
    "property-fees",
];
const SHARED_DISCLAIMER = {
    title: "Important Information",
    body: "This calculator provides estimates for illustrative purposes only. Results are based on the information you provide and should not be considered financial advice. Actual loan terms may vary. Contact our team for personalized advice.",
};
const SHARED_RESOURCES = {
    badge: "",
    title: "Helpful Resources",
    subtitle: "Guides & Information",
    cards: [
        {
            title: "First Home Buyer Guide",
            description: "Everything you need to know about buying your first home",
            link: "/resources/first-home-buyer-guide",
            linkLabel: "Read guide",
        },
        {
            title: "Investment Property Guide",
            description: "Build wealth through strategic property investment",
            link: "/resources/investment-guide",
            linkLabel: "Read guide",
        },
        {
            title: "Construction Loans Guide",
            description: "Finance your dream home build with construction loans",
            link: "/resources/construction-loans-guide",
            linkLabel: "Read guide",
        },
    ],
};
const SHARED_GOV_BENEFITS = {
    title: "Government Benefits",
    subtitle: "Grants & Offers",
    sectionTitle: "Available Support & Schemes",
    items: [
        "First Home Guarantee: Buy with as little as 5% deposit without LMI",
        "First Home Owner Grant: Up to $10,000 for eligible first home buyers",
        "Stamp Duty Concessions: Reduced or waived stamp duty for eligible buyers",
        "Home Builder Grant: Financial assistance for new builds and renovations",
    ],
    ctaLabel: "Learn More About Benefits",
    ctaLink: "/resources/first-home-buyer-guide",
};
const SHARED_SPECIAL_OFFER = {
    title: "Special Offer",
    body: "Get a free consultation and property assessment when you apply for a home loan this month.",
    ctaLabel: "Claim Your Offer",
    ctaLink: "/contact",
};
function mergeCards(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({ ...(defaults[i] ?? { title: "", description: "" }), ...(raw?.[i] ?? {}) }));
}
function mergeFactorCards(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({
        title: raw?.[i]?.title ?? defaults[i]?.title ?? "",
        items: raw?.[i]?.items ?? defaults[i]?.items ?? [],
    }));
}
function mergeStrategies(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({
        title: raw?.[i]?.title ?? defaults[i]?.title ?? "",
        description: raw?.[i]?.description ?? defaults[i]?.description ?? "",
    }));
}
function mergeInfoBlocks(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({
        title: raw?.[i]?.title ?? defaults[i]?.title ?? "",
        intro: raw?.[i]?.intro ?? defaults[i]?.intro,
        items: raw?.[i]?.items ?? defaults[i]?.items ?? [],
    }));
}
function mergeStringList(defaults, raw) {
    if (raw && raw.length > 0)
        return raw;
    return defaults;
}
exports.DEFAULT_CALCULATORS_HUB_CONTENT = {
    calculatorCardsSection: {},
    calculatorCards: [
        {
            title: "How Much Can I Borrow?",
            description: "Our borrowing power calculator will estimate how much you could borrow.",
            link: "/calculator/borrowing-capacity",
            linkLabel: "Find Out More",
        },
        {
            title: "Extra Repayments Calculator",
            description: "Find out how much you could save if you make extra repayments.",
            link: "/calculator/extra-repayments",
            linkLabel: "Find Out More",
        },
        {
            title: "Property Fees",
            description: "Calculate the costs of buying a property in different states.",
            link: "/calculator/property-fees",
            linkLabel: "Find Out More",
        },
    ],
    teamSection: {
        badge: "OUR TEAM",
        title: "Meet our strategists",
        subtitle: "Our experienced mortgage professionals are here to help you make informed financial decisions",
    },
    founderSpotlight: {
        badge: "Founder",
        name: "Androse Hrudayadasan",
        role: "Mortgage Broker & Managing Director",
        bio: "With years of experience in the mortgage industry, Androse leads our team with a passion for helping clients achieve their property dreams through tailored financing solutions.",
        imageUrl: "/images/androse.jpg",
        ctaLabel: "Get in Touch",
        ctaLink: "/contact",
    },
};
exports.CALCULATOR_PAGE_DEFAULTS = {
    "borrowing-capacity": {
        pageHeader: {
            title: "Borrowing Capacity Calculator",
            subtitle: "Calculate your borrowing capacity based on your income, expenses, and financial situation. Get an instant estimate of how much you could borrow for your home loan.",
        },
        iframe: {
            src: "https://mercury.connective.com.au/calculators/how-much-can-i-borrow-layout.html",
            title: "Borrowing Capacity Calculator",
            height: "700px",
        },
        disclaimer: SHARED_DISCLAIMER,
        infoSection: {
            title: "Understanding Your Borrowing Capacity",
            intro: "Your borrowing capacity is the maximum amount a lender will allow you to borrow based on your financial situation. Lenders assess several factors when determining how much you can borrow:",
            factorCards: [
                {
                    title: "Income Factors",
                    items: [
                        "Your gross annual income (salary, wages, bonuses)",
                        "Additional income sources (rental, investments)",
                        "Employment stability and type",
                    ],
                },
                {
                    title: "Expense Factors",
                    items: [
                        "Monthly living expenses and commitments",
                        "Existing debts (credit cards, personal loans)",
                        "Number of dependents",
                    ],
                },
            ],
            strategiesTitle: "Tips to Increase Your Borrowing Capacity",
            strategies: [
                { title: "", description: "Reduce existing debts and credit card limits" },
                { title: "", description: "Improve your credit score by paying bills on time" },
                { title: "", description: "Consider applying with a partner to combine incomes" },
                { title: "", description: "Save a larger deposit to reduce loan amount needed" },
                { title: "", description: "Provide evidence of stable employment history" },
            ],
        },
        resourcesSection: SHARED_RESOURCES,
        governmentBenefits: SHARED_GOV_BENEFITS,
        specialOffer: SHARED_SPECIAL_OFFER,
    },
    "extra-repayments": {
        pageHeader: {
            title: "Repayment Calculator",
            subtitle: "See how much time and money you can save by making extra repayments on your home loan. Even small additional payments can have a significant impact on your loan term and total interest paid.",
        },
        iframe: {
            src: "https://mercury.connective.com.au/calculators/extra-repayment-layout.html",
            title: "Repayment Calculator",
            height: "700px",
        },
        disclaimer: SHARED_DISCLAIMER,
        infoSection: {
            title: "The Power of Extra Repayments",
            intro: "Making extra repayments on your home loan is one of the most effective ways to reduce your interest costs and pay off your mortgage faster. Even small amounts can have a dramatic effect over time.",
            factorCards: [
                {
                    title: "How Extra Repayments Work",
                    items: [
                        "Pay more than your required minimum each month",
                        "Extra amount goes directly to reducing principal",
                        "Less principal means less interest charged",
                        "Compounds to huge savings over time",
                    ],
                },
                {
                    title: "Financial Benefits",
                    items: [
                        "Reduce loan term by years or decades",
                        "Save tens of thousands in interest",
                        "Build equity in your home faster",
                        "Achieve financial freedom sooner",
                    ],
                },
            ],
            strategiesTitle: "Strategies for Extra Repayments",
            strategies: [
                {
                    title: "Weekly or Fortnightly Payments",
                    description: "Pay half your monthly amount every fortnight to make extra annual payments without changing your lifestyle",
                },
                {
                    title: "Salary Increase Boost",
                    description: "When you get a pay rise, direct part or all of it to extra repayments instead of lifestyle inflation",
                },
                {
                    title: "Lump Sum Payments",
                    description: "Use tax refunds, bonuses, or gifts to make occasional large additional payments",
                },
                {
                    title: "Offset Account Strategy",
                    description: "Keep savings in an offset account linked to your loan to reduce interest while maintaining emergency funds",
                },
            ],
            extraBlocks: [
                {
                    title: "Example: The Power of Extra Payments",
                    intro: "On a $500,000 home loan at 6% interest over 30 years:",
                    items: [
                        "Standard payments only: Total interest $579,000+ over 30 years",
                        "With $200/month extra: Save ~$150,000 in interest and finish 10 years earlier",
                        "With $500/month extra: Save ~$280,000 in interest and finish ~18 years earlier",
                    ],
                },
            ],
        },
        resourcesSection: SHARED_RESOURCES,
        governmentBenefits: SHARED_GOV_BENEFITS,
        specialOffer: SHARED_SPECIAL_OFFER,
    },
    "property-fees": {
        pageHeader: {
            title: "Property Fees Calculator",
            subtitle: "Calculate all the costs involved in buying a property, including stamp duty, legal fees, inspections, and other hidden costs. Plan your budget more accurately with this comprehensive cost calculator.",
        },
        iframe: {
            src: "https://mercury.connective.com.au/calculators/property-fees-layout.html",
            title: "Property Fees Calculator",
            height: "700px",
        },
        disclaimer: {
            title: "Important Information",
            body: "This calculator provides estimates for illustrative purposes only. Results are based on the information you provide and should not be considered financial advice. Actual costs may vary based on your location, property type, and individual circumstances. Contact our team for personalized advice.",
        },
        infoSection: {
            title: "Understanding Property Purchase Costs",
            intro: "Buying a property involves many costs beyond just the purchase price. These include stamp duty, legal fees, valuations, pest inspections, and other charges that can add up to 5-10% of your purchase price.",
            factorCards: [
                {
                    title: "Government Costs",
                    items: [
                        "Stamp Duty: State tax on property purchases (largest cost)",
                        "Land Transfer Tax: Registration of ownership transfer",
                        "Council Rates Search: Local council property information",
                    ],
                },
                {
                    title: "Professional Services",
                    items: [
                        "Solicitor/Conveyancer: Legal documentation & registration",
                        "Valuation: Bank-required property valuation",
                        "LMI: Lenders Mortgage Insurance if deposit under 20%",
                    ],
                },
                {
                    title: "Property Inspections",
                    items: [
                        "Building Inspection: Structural & maintenance assessment",
                        "Pest Inspection: Termite and pest assessment",
                        "Pool Inspection: If property has a swimming pool",
                    ],
                },
                {
                    title: "Settlement Costs",
                    items: [
                        "Title Search: Property history verification",
                        "Insurance: Building insurance from settlement date",
                        "Utilities Setup: Connection fees for electricity, gas, water",
                    ],
                },
            ],
            strategiesTitle: "Ways to Reduce Purchase Costs",
            strategies: [
                { title: "Negotiate", description: "Stamp duty exemptions or concessions may apply if you're a first home buyer" },
                { title: "Shop Around", description: "Compare quotes from different solicitors and valuers" },
                { title: "Save Deposit", description: "Aim for 20% deposit to avoid Lenders Mortgage Insurance" },
                { title: "Shared Inspection", description: "Consider sharing building inspection costs if buying off-the-plan" },
                { title: "Government Benefits", description: "Check eligibility for first home buyer schemes and grants" },
            ],
            extraBlocks: [
                {
                    title: "Stamp Duty Explained",
                    intro: "Stamp duty is the largest cost for most property buyers. It varies significantly by state and is calculated as a percentage of the purchase price:",
                    items: [
                        "NSW: Up to 5.75%",
                        "VIC: Up to 6.0%",
                        "QLD: Up to 5.75%",
                        "WA: Up to 4.75%",
                        "First home buyers may be eligible for concessions or exemptions",
                    ],
                },
            ],
        },
        resourcesSection: SHARED_RESOURCES,
        governmentBenefits: SHARED_GOV_BENEFITS,
        specialOffer: SHARED_SPECIAL_OFFER,
    },
};
function mergeCalculatorsHubContent(raw) {
    const d = exports.DEFAULT_CALCULATORS_HUB_CONTENT;
    return {
        calculatorCardsSection: { ...d.calculatorCardsSection, ...raw?.calculatorCardsSection },
        calculatorCards: mergeCards(d.calculatorCards, raw?.calculatorCards),
        teamSection: { ...d.teamSection, ...raw?.teamSection },
        founderSpotlight: { ...d.founderSpotlight, ...raw?.founderSpotlight },
    };
}
function mergeCalculatorPageContent(slug, raw) {
    const d = exports.CALCULATOR_PAGE_DEFAULTS[slug] ?? exports.CALCULATOR_PAGE_DEFAULTS["borrowing-capacity"];
    return {
        pageHeader: { ...d.pageHeader, ...raw?.pageHeader },
        iframe: { ...d.iframe, ...raw?.iframe },
        disclaimer: { ...d.disclaimer, ...raw?.disclaimer },
        infoSection: {
            ...d.infoSection,
            ...raw?.infoSection,
            factorCards: mergeFactorCards(d.infoSection.factorCards, raw?.infoSection?.factorCards),
            strategies: raw?.infoSection?.strategies
                ? mergeStrategies(d.infoSection.strategies ?? [], raw.infoSection.strategies)
                : d.infoSection.strategies,
            extraBlocks: raw?.infoSection?.extraBlocks
                ? mergeInfoBlocks(d.infoSection.extraBlocks ?? [], raw.infoSection.extraBlocks)
                : d.infoSection.extraBlocks,
        },
        resourcesSection: {
            ...d.resourcesSection,
            ...raw?.resourcesSection,
            cards: mergeCards(d.resourcesSection.cards, raw?.resourcesSection?.cards),
        },
        governmentBenefits: {
            ...d.governmentBenefits,
            ...raw?.governmentBenefits,
            items: mergeStringList(d.governmentBenefits.items, raw?.governmentBenefits?.items),
        },
        specialOffer: { ...d.specialOffer, ...raw?.specialOffer },
    };
}
function getCalculatorAdminPath(slug) {
    if (slug === "calculator")
        return "/admin/calculators";
    return `/admin/calculators/${slug}`;
}
