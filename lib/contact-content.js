function mergeLines(defaults, raw) {
    if (raw && raw.length > 0)
        return raw;
    return defaults;
}
function mergeItems(defaults, raw) {
    const len = Math.max(defaults.length, raw?.length ?? 0);
    return Array.from({ length: len }, (_, i) => raw?.[i] ?? defaults[i] ?? "");
}
function mergeDetail(defaults, raw) {
    return { ...defaults, ...raw };
}
export const DEFAULT_CONTACT_CONTENT = {
    infoSection: {
        title: "Get in Touch",
        phone: {
            title: "Phone",
            value: "03 9087 7719",
            link: "tel:0390877719",
            note: "Call us for immediate assistance",
        },
        email: {
            title: "Email",
            value: "info@alsmortgagesolutions.com.au",
            link: "mailto:info@alsmortgagesolutions.com.au",
            note: "We'll respond within 24 hours",
        },
        address: {
            title: "Office Address",
            lines: ["Level 1, 123 Collins Street", "Melbourne VIC 3000", "Australia"],
        },
        hours: {
            title: "Business Hours",
            lines: ["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 9:00 AM - 2:00 PM", "Sunday: Closed"],
        },
    },
    map: {
        title: "Find Us",
        embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153169!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sCollins%20St%2C%20Melbourne%20VIC%203000!5e0!3m2!1sen!2sau!4v1639000000000!5m2!1sen!2sau",
    },
    whyUs: {
        title: "Why Choose Us?",
        items: [
            "Licensed and regulated mortgage brokers",
            "Access to 25+ lenders and competitive rates",
            "Free consultation and ongoing support",
            "20+ years of industry experience",
        ],
    },
    formSection: {
        title: "Send Us a Message",
        subtitle: "Fill out the form below and we'll get back to you within 24 hours.",
        submitButtonText: "Send Message",
    },
};
export function mergeContactContent(raw) {
    const d = DEFAULT_CONTACT_CONTENT;
    return {
        infoSection: {
            ...d.infoSection,
            ...raw?.infoSection,
            title: raw?.infoSection?.title ?? d.infoSection.title,
            phone: mergeDetail(d.infoSection.phone, raw?.infoSection?.phone),
            email: mergeDetail(d.infoSection.email, raw?.infoSection?.email),
            address: {
                title: raw?.infoSection?.address?.title ?? d.infoSection.address.title,
                lines: mergeLines(d.infoSection.address.lines, raw?.infoSection?.address?.lines),
            },
            hours: {
                title: raw?.infoSection?.hours?.title ?? d.infoSection.hours.title,
                lines: mergeLines(d.infoSection.hours.lines, raw?.infoSection?.hours?.lines),
            },
        },
        map: { ...d.map, ...raw?.map },
        whyUs: {
            ...d.whyUs,
            ...raw?.whyUs,
            items: mergeItems(d.whyUs.items, raw?.whyUs?.items),
        },
        formSection: { ...d.formSection, ...raw?.formSection },
    };
}
