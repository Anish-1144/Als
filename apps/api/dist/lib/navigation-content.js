"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_NAVIGATION = exports.DEFAULT_LOGO_URL = void 0;
exports.mergeNavigationData = mergeNavigationData;
exports.DEFAULT_LOGO_URL = "/logo-bgr.png";
exports.DEFAULT_NAVIGATION = {
    logoUrl: exports.DEFAULT_LOGO_URL,
    logoAlt: "ALS Mortgage Solutions",
};
function mergeNavigationData(data) {
    return {
        logoUrl: data?.logoUrl?.trim() || exports.DEFAULT_NAVIGATION.logoUrl,
        logoAlt: data?.logoAlt?.trim() || exports.DEFAULT_NAVIGATION.logoAlt,
    };
}
