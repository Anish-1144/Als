import mongoose, { Schema } from "mongoose";
const jobPostingSchema = new Schema({
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
}, { timestamps: true });
export const JobPosting = mongoose.model("JobPosting", jobPostingSchema);
