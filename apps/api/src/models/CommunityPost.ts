import mongoose, { Schema, type Document } from "mongoose";

export interface ICommunityPost extends Document {
  title: string;
  image: string;
  description?: unknown;
  date?: string;
  location?: string;
  category?: string;
  order?: number;
  isActive: boolean;
}

const communityPostSchema = new Schema<ICommunityPost>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: Schema.Types.Mixed,
    date: String,
    location: String,
    category: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const CommunityPost = mongoose.model<ICommunityPost>(
  "CommunityPost",
  communityPostSchema,
);
