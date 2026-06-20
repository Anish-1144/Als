import mongoose, { Schema, type Document } from "mongoose";

export interface IJobPosting extends Document {
  title: string;
  location: string;
  type: string;
  description: unknown;
  responsibilities?: unknown;
  requirements?: unknown;
  benefits?: unknown;
  salaryRange?: string;
  closingDate?: string;
  isActive: boolean;
  order?: number;
}

const jobPostingSchema = new Schema<IJobPosting>(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    description: Schema.Types.Mixed,
    responsibilities: Schema.Types.Mixed,
    requirements: Schema.Types.Mixed,
    benefits: Schema.Types.Mixed,
    salaryRange: String,
    closingDate: String,
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const JobPosting = mongoose.model<IJobPosting>(
  "JobPosting",
  jobPostingSchema,
);
