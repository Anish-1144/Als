import mongoose, { Schema } from "mongoose";
const loanSchema = new Schema({
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
}, { timestamps: true });
export const Loan = mongoose.model("Loan", loanSchema);
