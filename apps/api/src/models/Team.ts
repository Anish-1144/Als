import mongoose, { Schema, type Document } from "mongoose";

export interface ITeamMember extends Document {
  name: string;
  title?: string;
  image?: string;
  bio?: string;
  experience?: string;
  specialties?: unknown[];
  phone?: string;
  email?: string;
  linkedin?: string;
  showOnHomepage?: boolean;
  order?: number;
  isActive: boolean;
}

const teamSchema = new Schema<ITeamMember>(
  {
    name: { type: String, required: true },
    title: String,
    image: String,
    bio: String,
    experience: String,
    specialties: [Schema.Types.Mixed],
    phone: String,
    email: String,
    linkedin: String,
    showOnHomepage: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const Team = mongoose.model<ITeamMember>("Team", teamSchema);
