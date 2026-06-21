import mongoose, { Schema } from "mongoose";
const pageSchema = new Schema({
    slug: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    group: { type: String, required: true },
    path: { type: String, required: true },
    heroTitle: { type: String, required: true },
    heroSubtitle: { type: String, default: "" },
    heroBackgroundImage: { type: String, default: "" },
    seoDescription: String,
    content: Schema.Types.Mixed,
    isPublished: { type: Boolean, default: true },
}, { timestamps: true });
export const Page = mongoose.model("Page", pageSchema);
