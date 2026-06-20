import mongoose, { Schema, type Document } from "mongoose";

export interface ITestimonial extends Document {
  clientName: string;
  clientTitle?: string;
  clientImage?: string;
  testimonial: string;
  rating?: number;
  loanType?: string;
  featured?: boolean;
  order?: number;
  isActive: boolean;
}

const testimonialSchema = new Schema<ITestimonial>(
  {
    clientName: { type: String, required: true },
    clientTitle: String,
    clientImage: String,
    testimonial: { type: String, required: true },
    rating: Number,
    loanType: String,
    featured: Boolean,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Testimonial = mongoose.model<ITestimonial>(
  "Testimonial",
  testimonialSchema,
);
