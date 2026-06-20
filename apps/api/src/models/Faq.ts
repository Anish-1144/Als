import mongoose, { Schema, type Document } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: unknown;
  category: string;
  order?: number;
  isActive: boolean;
}

const faqSchema = new Schema<IFaq>(
  {
    question: { type: String, required: true },
    answer: Schema.Types.Mixed,
    category: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Faq = mongoose.model<IFaq>("Faq", faqSchema);
