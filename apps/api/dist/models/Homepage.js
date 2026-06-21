import mongoose, { Schema } from "mongoose";
const homepageSchema = new Schema({
    title: String,
    hero: Schema.Types.Mixed,
    services: Schema.Types.Mixed,
    whyChooseUs: Schema.Types.Mixed,
    propertyShowcase: Schema.Types.Mixed,
    teamSection: Schema.Types.Mixed,
    awards: Schema.Types.Mixed,
    cta: Schema.Types.Mixed,
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });
export const Homepage = mongoose.model("Homepage", homepageSchema);
