import mongoose, { Schema, type Document } from "mongoose";

export interface IAward extends Document {
  title: string;
  year: number;
  organization?: string;
  description?: string;
  image?: string;
  category?: string;
  order?: number;
  featured?: boolean;
  isActive: boolean;
}

const awardSchema = new Schema<IAward>(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    organization: String,
    description: String,
    image: String,
    category: String,
    order: { type: Number, default: 0 },
    featured: Boolean,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Award = mongoose.model<IAward>("Award", awardSchema);
