import mongoose, { Schema, type Document } from "mongoose";

export interface IFooter extends Document {
  companyName: string;
  description?: string;
  address?: Record<string, string>;
  contact?: Record<string, string>;
  socialLinks?: unknown[];
  footerLinks?: unknown[];
  copyrightText?: string;
  logoUrl?: string;
}

const footerSchema = new Schema<IFooter>(
  {
    companyName: { type: String, required: true },
    description: String,
    address: Schema.Types.Mixed,
    contact: Schema.Types.Mixed,
    socialLinks: [Schema.Types.Mixed],
    footerLinks: [Schema.Types.Mixed],
    copyrightText: String,
    logoUrl: String,
  },
  { timestamps: true },
);

export const Footer = mongoose.model<IFooter>("Footer", footerSchema);
