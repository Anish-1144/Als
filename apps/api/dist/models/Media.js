import mongoose, { Schema } from "mongoose";
const mediaSchema = new Schema({
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    url: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    alt: String,
}, { timestamps: true });
export const Media = mongoose.model("Media", mediaSchema);
