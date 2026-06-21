"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_TYPOGRAPHY = exports.SITE_FONT_PRESETS = exports.FONT_STACKS = void 0;
exports.getFontStacksForPreset = getFontStacksForPreset;
exports.isSiteFontPreset = isSiteFontPreset;
exports.mergeTypographyData = mergeTypographyData;
exports.FONT_STACKS = {
    author: 'var(--font-author), Arial, Helvetica, sans-serif',
    besley: 'var(--font-besley), Georgia, "Times New Roman", serif',
    geist: 'var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif',
    system: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};
function getFontStacksForPreset(preset) {
    switch (preset) {
        case "classic":
            return { heading: exports.FONT_STACKS.besley, body: exports.FONT_STACKS.author };
        case "author":
            return { heading: exports.FONT_STACKS.author, body: exports.FONT_STACKS.author };
        case "besley":
            return { heading: exports.FONT_STACKS.besley, body: exports.FONT_STACKS.besley };
        case "geist":
            return { heading: exports.FONT_STACKS.geist, body: exports.FONT_STACKS.geist };
        case "system":
            return { heading: exports.FONT_STACKS.system, body: exports.FONT_STACKS.system };
    }
}
exports.SITE_FONT_PRESETS = [
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
exports.DEFAULT_TYPOGRAPHY = {
    fontPreset: "classic",
};
function isSiteFontPreset(value) {
    return exports.SITE_FONT_PRESETS.some((preset) => preset.id === value);
}
function mergeTypographyData(data) {
    const preset = data?.fontPreset;
    return {
        fontPreset: preset && isSiteFontPreset(preset) ? preset : exports.DEFAULT_TYPOGRAPHY.fontPreset,
    };
}
