import mongoose, { Schema, type Document } from "mongoose";

export interface IResourceDocument extends Document {
  title: string;
  description?: string;
  link: string;
  category: string;
  order?: number;
  isActive: boolean;
}

const documentSchema = new Schema<IResourceDocument>(
  {
    title: { type: String, required: true },
    description: String,
    link: { type: String, required: true },
    category: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const ResourceDocument = mongoose.model<IResourceDocument>(
  "Document",
  documentSchema,
);
