import mongoose, { Schema } from "mongoose";
const documentSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    link: { type: String, required: true },
    category: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const ResourceDocument = mongoose.model("Document", documentSchema);
