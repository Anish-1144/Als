import mongoose, { Schema } from "mongoose";
const awardSchema = new Schema({
    title: { type: String, required: true },
    year: { type: Number, required: true },
    organization: String,
    description: String,
    image: String,
    category: String,
    order: { type: Number, default: 0 },
    featured: Boolean,
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const Award = mongoose.model("Award", awardSchema);
