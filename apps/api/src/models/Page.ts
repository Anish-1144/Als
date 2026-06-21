import mongoose, { Schema, type Document } from "mongoose";

export interface IPage extends Document {
  slug: string;
  label: string;
  group: string;
  path: string;
  heroTitle: string;
  heroSubtitle: string;
  heroBackgroundImage: string;
  seoDescription?: string;
  content?: Record<string, unknown>;
  isPublished: boolean;
}

const pageSchema = new Schema<IPage>(
  {
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
  },
  { timestamps: true },
);

export const Page = mongoose.model<IPage>("Page", pageSchema);
