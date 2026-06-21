function mergeSteps(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({
        id: raw?.[i]?.id ?? defaults[i]?.id ?? `step-${i + 1}`,
        title: raw?.[i]?.title ?? defaults[i]?.title ?? "",
        shortTitle: raw?.[i]?.shortTitle ?? defaults[i]?.shortTitle ?? "",
        description: raw?.[i]?.description ?? defaults[i]?.description ?? "",
        details: raw?.[i]?.details ?? defaults[i]?.details ?? [],
    }));
}
function mergeFaqs(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => ({
        question: raw?.[i]?.question ?? defaults[i]?.question ?? "",
        answer: raw?.[i]?.answer ?? defaults[i]?.answer ?? "",
    }));
}
export const DEFAULT_HOW_IT_WORKS_CONTENT = {
    processSection: {
        badge: "OUR PROCESS",
        title: "Simple steps to your new home",
        subtitle: "We make the mortgage process straightforward and stress-free. Here's how we help you achieve your property goals.",
    },
    steps: [
        {
            id: "consultation",
            title: "Initial Consultation",
            shortTitle: "Consultation",
            description: "We begin with a comprehensive discussion about your financial goals, current situation, and property aspirations. This helps us understand exactly what you need.",
            details: [
                "Free 30-minute consultation",
                "Discuss your financial goals and timeline",
                "Review your current financial situation",
                "Understand your property requirements",
                "Assess your borrowing capacity",
            ],
        },
        {
            id: "documentation",
            title: "Document Collection",
            shortTitle: "Documentation",
            description: "We guide you through the document collection process, making it as simple as possible. Our team handles all the paperwork so you don't have to.",
            details: [
                "Provide a clear checklist of required documents",
                "Help you gather income verification",
                "Assist with asset and liability statements",
                "Review all documents for completeness",
                "Ensure compliance with lender requirements",
            ],
        },
        {
            id: "search",
            title: "Lender Search",
            shortTitle: "Lender Search",
            description: "We search across our panel of 25+ lenders to find the best loan options for your situation. We compare rates, features, and terms to find your perfect match.",
            details: [
                "Access to 25+ major banks and lenders",
                "Compare interest rates and features",
                "Evaluate loan terms and conditions",
                "Consider your specific circumstances",
                "Present top 3 recommended options",
            ],
        },
        {
            id: "application",
            title: "Application Submission",
            shortTitle: "Application",
            description: "Once you've chosen your preferred lender, we handle the entire application process. We submit your application and liaise with the lender on your behalf.",
            details: [
                "Prepare and submit your application",
                "Handle all lender communications",
                "Track application progress",
                "Address any lender queries promptly",
                "Keep you informed at every stage",
            ],
        },
        {
            id: "settlement",
            title: "Settlement & Beyond",
            shortTitle: "Settlement",
            description: "We support you through settlement and beyond. Our relationship doesn't end when the loan settles – we're here for ongoing reviews and future needs.",
            details: [
                "Coordinate with all parties for settlement",
                "Ensure smooth fund transfer",
                "Post-settlement account setup assistance",
                "Annual loan reviews",
                "Support for future property purchases",
            ],
        },
    ],
    stepDetailCta: {
        primaryLabel: "Start Your Journey",
        primaryLink: "/book-consultation",
        secondaryLabel: "Back to Steps",
    },
    faqs: {
        badge: "FAQ",
        title: "Frequently asked questions",
        subtitle: "Got questions? We've got answers.",
        items: [
            {
                question: "How long does the loan process take?",
                answer: "The typical loan process takes 2-4 weeks from application to approval, and another 4-6 weeks to settlement. However, this can vary depending on the lender and complexity of your situation. We work to expedite the process wherever possible.",
            },
            {
                question: "Is there a fee for your services?",
                answer: "Our service is free for most clients. We are paid a commission by the lender upon successful settlement. This means our advice is independent and focused on finding you the best loan – not the one that pays us the most.",
            },
            {
                question: "What documents do I need to provide?",
                answer: "Typically, you'll need proof of identity, income verification (payslips, tax returns), bank statements, details of assets and liabilities, and information about the property you're purchasing. We'll provide a detailed checklist tailored to your situation.",
            },
            {
                question: "Can you help if I've been rejected by a bank?",
                answer: "Absolutely. With access to over 25 lenders including specialist and non-bank lenders, we often find solutions for clients who have been declined elsewhere. Each lender has different criteria, and we know which ones are best suited to various situations.",
            },
            {
                question: "How do you choose which lender to recommend?",
                answer: "We consider multiple factors including interest rates, loan features, your specific circumstances, lender policies, approval likelihood, and settlement timeframes. We present you with options and explain the pros and cons of each.",
            },
        ],
        viewAllLabel: "View All FAQs",
        viewAllLink: "/resources/faq",
    },
};
export function mergeHowItWorksContent(raw) {
    const d = DEFAULT_HOW_IT_WORKS_CONTENT;
    return {
        processSection: { ...d.processSection, ...raw?.processSection },
        steps: mergeSteps(d.steps, raw?.steps),
        stepDetailCta: { ...d.stepDetailCta, ...raw?.stepDetailCta },
        faqs: {
            ...d.faqs,
            ...raw?.faqs,
            items: mergeFaqs(d.faqs.items, raw?.faqs?.items),
        },
    };
}
