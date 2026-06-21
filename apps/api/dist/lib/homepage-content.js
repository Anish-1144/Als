"use strict";
/** Default homepage content — used as fallbacks when CMS fields are empty */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_CTA = exports.DEFAULT_HOW_IT_WORKS_STEPS = exports.DEFAULT_STATS = exports.DEFAULT_FEATURE_CARDS = exports.DEFAULT_SERVICE_CARDS = void 0;
exports.mergeServiceCards = mergeServiceCards;
exports.mergeFeatureCards = mergeFeatureCards;
exports.mergeStats = mergeStats;
exports.mergeSteps = mergeSteps;
exports.mergeCta = mergeCta;
exports.DEFAULT_SERVICE_CARDS = [
    {
        title: "Buy a Home",
        description: "Explore tailored home loan solutions for first-time buyers, upgraders, and specialized financing options to turn your property dreams into reality.",
        link: "/home-loans",
        linkLabel: "Learn More",
    },
    {
        title: "Buy an Investment",
        description: "Build your property portfolio with expert investment loan solutions, equity strategies, and tax-effective structures for wealth creation.",
        link: "/investment-loans",
        linkLabel: "Learn More",
    },
    {
        title: "Refinance",
        description: "Save thousands with better rates, access your equity, or consolidate debt. Discover refinancing solutions tailored to your financial goals.",
        link: "/refinancing",
        linkLabel: "Learn More",
    },
];
exports.DEFAULT_FEATURE_CARDS = [
    {
        title: "Ethical Lending",
        description: "ALS is genuinely different – an award-winning broker with no hidden financial incentives and no questionable referral partners.",
        icon: "HiShieldCheck",
    },
    {
        title: "Diverse Lending Panel",
        description: "With more than 30 bank and non-bank partners on our lending panel, finding the right mortgage is simple.",
        icon: "HiTrendingUp",
    },
    {
        title: "Strategic Approach",
        description: "Your loan should be one that supports your ideal future – whether that's a multi-property portfolio or a stress-free retirement.",
        icon: "HiLightBulb",
    },
    {
        title: "Connect With Experts",
        description: "Access our network of leading property professionals to get the advice you need – no referral commissions involved.",
        icon: "HiUsers",
    },
];
exports.DEFAULT_STATS = [
    { value: "11+", label: "Years Experience" },
    { value: "2+", label: "Lenders" },
    { value: "300+", label: "Happy Clients" },
    { value: "10+", label: "Awards Won" },
];
exports.DEFAULT_HOW_IT_WORKS_STEPS = [
    {
        title: "Consultation",
        description: "We begin with a comprehensive discussion about your financial goals, current situation, and property aspirations.",
    },
    {
        title: "Documentation",
        description: "We guide you through the document collection process, making it as simple as possible.",
    },
    {
        title: "Lender Search",
        description: "We search across our panel of 25+ lenders to find the best loan options for your situation.",
    },
    {
        title: "Application",
        description: "Once you've chosen your preferred lender, we handle the entire application process.",
    },
    {
        title: "Settlement",
        description: "We support you through settlement and beyond. Our relationship doesn't end when the loan settles.",
    },
];
exports.DEFAULT_CTA = {
    title: "Ready to Start Your Property Journey?",
    subtitle: "Get in touch with our expert team today for a free consultation and personalized lending solution.",
    buttonText: "Get Started",
    buttonLink: "/contact",
};
function mergeServiceCards(raw) {
    const cards = raw ?? [];
    return exports.DEFAULT_SERVICE_CARDS.map((def, i) => ({
        ...def,
        ...(cards[i] ?? {}),
    }));
}
function mergeFeatureCards(raw) {
    const cards = raw ?? [];
    return exports.DEFAULT_FEATURE_CARDS.map((def, i) => ({
        ...def,
        ...(cards[i] ?? {}),
    }));
}
function mergeStats(raw) {
    const stats = raw ?? [];
    return exports.DEFAULT_STATS.map((def, i) => ({
        ...def,
        ...(stats[i] ?? {}),
    }));
}
function mergeSteps(raw) {
    const steps = raw ?? [];
    return exports.DEFAULT_HOW_IT_WORKS_STEPS.map((def, i) => ({
        ...def,
        ...(steps[i] ?? {}),
    }));
}
function mergeCta(raw) {
    return { ...exports.DEFAULT_CTA, ...raw };
}
