import mongoose, { Schema } from "mongoose";
const footerSchema = new Schema({
    companyName: { type: String, required: true },
    description: String,
    address: Schema.Types.Mixed,
    contact: Schema.Types.Mixed,
    socialLinks: [Schema.Types.Mixed],
    footerLinks: [Schema.Types.Mixed],
    copyrightText: String,
    logoUrl: String,
}, { timestamps: true });
export const Footer = mongoose.model("Footer", footerSchema);
