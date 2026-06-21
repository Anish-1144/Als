import mongoose, { Schema } from "mongoose";
const typographySchema = new Schema({
    fontPreset: { type: String, default: "classic" },
}, { timestamps: true });
export const Typography = mongoose.model("Typography", typographySchema);
