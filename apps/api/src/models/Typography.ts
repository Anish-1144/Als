import mongoose, { Schema, type Document } from "mongoose";

export interface ITypography extends Document {
  fontPreset: string;
}

const typographySchema = new Schema<ITypography>(
  {
    fontPreset: { type: String, default: "classic" },
  },
  { timestamps: true },
);

export const Typography = mongoose.model<ITypography>("Typography", typographySchema);
