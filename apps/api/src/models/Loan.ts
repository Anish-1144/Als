import mongoose, { Schema, type Document } from "mongoose";

export interface ILoan extends Document {
  title: string;
  slug: string;
  subtitle?: string;
  heroImage?: string;
  description?: string;
  features?: unknown[];
  benefits?: unknown[];
  eligibility?: unknown[];
  interestRateFrom?: string;
  minimumDeposit?: string;
  maxLoanAmount?: string;
  loanTerm?: string;
  whyChooseUs?: Record<string, unknown>;
  isPublished: boolean;
  isActive?: boolean;
}

const loanSchema = new Schema<ILoan>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    subtitle: String,
    heroImage: String,
    description: String,
    features: [Schema.Types.Mixed],
    benefits: [Schema.Types.Mixed],
    eligibility: [Schema.Types.Mixed],
    interestRateFrom: String,
    minimumDeposit: String,
    maxLoanAmount: String,
    loanTerm: String,
    whyChooseUs: Schema.Types.Mixed,
    isPublished: { type: Boolean, default: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Loan = mongoose.model<ILoan>("Loan", loanSchema);
