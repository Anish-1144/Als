import mongoose, { Schema, type Document } from "mongoose";

export interface INavigation extends Document {
  logoUrl: string;
  logoAlt?: string;
}

const navigationSchema = new Schema<INavigation>(
  {
    logoUrl: { type: String, default: "/logo-bgr.png" },
    logoAlt: { type: String, default: "ALS Mortgage Solutions" },
  },
  { timestamps: true },
);

export const Navigation = mongoose.model<INavigation>("Navigation", navigationSchema);
