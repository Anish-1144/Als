export const FONT_STACKS = {
    author: 'var(--font-author), Arial, Helvetica, sans-serif',
    besley: 'var(--font-besley), Georgia, "Times New Roman", serif',
    geist: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
    system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};
export function getFontStacksForPreset(preset) {
    switch (preset) {
        case "classic":
            return { heading: FONT_STACKS.besley, body: FONT_STACKS.author };
        case "author":
            return { heading: FONT_STACKS.author, body: FONT_STACKS.author };
        case "besley":
            return { heading: FONT_STACKS.besley, body: FONT_STACKS.besley };
        case "geist":
            return { heading: FONT_STACKS.geist, body: FONT_STACKS.geist };
        case "system":
            return { heading: FONT_STACKS.system, body: FONT_STACKS.system };
    }
}
export const SITE_FONT_PRESETS = [
    {
        id: "classic",
        label: "Classic ALS",
        description: "Author for body text and Besley for headings — the original site look.",
        sample: "The quick brown fox jumps over the lazy dog.",
    },
    {
        id: "author",
        label: "Author",
        description: "Modern sans-serif across the entire website.",
        sample: "The quick brown fox jumps over the lazy dog.",
    },
    {
        id: "besley",
        label: "Besley",
        description: "Elegant serif across the entire website.",
        sample: "The quick brown fox jumps over the lazy dog.",
    },
    {
        id: "geist",
        label: "Geist Sans",
        description: "Clean geometric sans-serif across the entire website.",
        sample: "The quick brown fox jumps over the lazy dog.",
    },
    {
        id: "system",
        label: "System",
        description: "Uses the visitor's device font for maximum native feel.",
        sample: "The quick brown fox jumps over the lazy dog.",
    },
];
export const DEFAULT_TYPOGRAPHY = {
    fontPreset: "classic",
};
export function isSiteFontPreset(value) {
    return SITE_FONT_PRESETS.some((preset) => preset.id === value);
}
export function mergeTypographyData(data) {
    const preset = data?.fontPreset;
    return {
        fontPreset: preset && isSiteFontPreset(preset) ? preset : DEFAULT_TYPOGRAPHY.fontPreset,
    };
}
