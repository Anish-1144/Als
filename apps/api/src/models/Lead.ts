import mongoose, { Schema, type Document } from "mongoose";

export type LeadType = "contact" | "consultation";
export type LeadStatus = "new" | "read" | "contacted" | "closed";

export interface ILead extends Document {
  type: LeadType;
  name?: string;
  email: string;
  phone?: string;
  subject?: string;
  message?: string;
  consultationType?: string;
  preferredTime?: string;
  preferredContact?: string;
  payload: Record<string, unknown>;
  status: LeadStatus;
}

const leadSchema = new Schema<ILead>(
  {
    type: { type: String, enum: ["contact", "consultation"], required: true },
    name: String,
    email: { type: String, required: true },
    phone: String,
    subject: String,
    message: String,
    consultationType: String,
    preferredTime: String,
    preferredContact: String,
    payload: { type: Schema.Types.Mixed, default: {} },
    status: {
      type: String,
      enum: ["new", "read", "contacted", "closed"],
      default: "new",
    },
  },
  { timestamps: true },
);

export const Lead = mongoose.model<ILead>("Lead", leadSchema);
