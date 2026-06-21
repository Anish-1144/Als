import mongoose, { Schema } from "mongoose";
const jobApplicationSchema = new Schema({
    jobPostingId: String,
    jobTitle: String,
    applicantName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    resumeUrl: String,
    coverLetter: String,
    linkedIn: String,
    status: {
        type: String,
        enum: ["new", "reviewing", "interview", "rejected", "hired"],
        default: "new",
    },
    notes: String,
}, { timestamps: true });
export const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
