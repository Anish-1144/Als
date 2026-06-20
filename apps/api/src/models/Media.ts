import mongoose, { Schema, type Document } from "mongoose";

export interface IMedia extends Document {
  filename: string;
  originalName: string;
  url: string;
  mimeType: string;
  size: number;
  alt?: string;
}

const mediaSchema = new Schema<IMedia>(
  {
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    alt: String,
  },
  { timestamps: true },
);

export const Media = mongoose.model<IMedia>("Media", mediaSchema);
