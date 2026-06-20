import mongoose, { Schema, type Document } from "mongoose";

export interface ILender extends Document {
  name: string;
  logo: string;
  description?: string;
  website?: string;
  category?: string;
  featured?: boolean;
  order?: number;
  isActive: boolean;
}

const lenderSchema = new Schema<ILender>(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    description: String,
    website: String,
    category: String,
    order: { type: Number, default: 0 },
    featured: Boolean,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Lender = mongoose.model<ILender>("Lender", lenderSchema);
