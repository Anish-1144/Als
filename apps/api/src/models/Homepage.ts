import mongoose, { Schema, type Document } from "mongoose";

export interface IHomepage extends Document {
  title?: string;
  hero?: Record<string, unknown>;
  services?: Record<string, unknown>;
  whyChooseUs?: Record<string, unknown>;
  propertyShowcase?: Record<string, unknown>;
  teamSection?: Record<string, unknown>;
  awards?: Record<string, unknown>;
  cta?: Record<string, unknown>;
  isPublished: boolean;
}

const homepageSchema = new Schema<IHomepage>(
  {
    title: String,
    hero: Schema.Types.Mixed,
    services: Schema.Types.Mixed,
    whyChooseUs: Schema.Types.Mixed,
    propertyShowcase: Schema.Types.Mixed,
    teamSection: Schema.Types.Mixed,
    awards: Schema.Types.Mixed,
    cta: Schema.Types.Mixed,
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Homepage = mongoose.model<IHomepage>("Homepage", homepageSchema);
