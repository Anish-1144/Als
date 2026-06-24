import mongoose, { Schema, type Document } from "mongoose";

export type ApplicationStatus = "new" | "reviewing" | "interview" | "rejected" | "hired";

export interface IJobApplication extends Document {
  jobPostingId?: string;
  jobTitle?: string;
  applicantName: string;
  email: string;
  phone?: string;
  resumeUrl?: string;
  resumeFileName?: string;
  coverLetter?: string;
  linkedIn?: string;
  status: ApplicationStatus;
  notes?: string;
}

const jobApplicationSchema = new Schema<IJobApplication>(
  {
    jobPostingId: String,
    jobTitle: String,
    applicantName: { type: String, required: true },
    email: { type: String, required: true },
    phone: String,
    resumeUrl: String,
    resumeFileName: String,
    coverLetter: String,
    linkedIn: String,
    status: {
      type: String,
      enum: ["new", "reviewing", "interview", "rejected", "hired"],
      default: "new",
    },
    notes: String,
  },
  { timestamps: true },
);

export const JobApplication = mongoose.model<IJobApplication>(
  "JobApplication",
  jobApplicationSchema,
);
