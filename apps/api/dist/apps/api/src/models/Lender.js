import mongoose, { Schema } from "mongoose";
const lenderSchema = new Schema({
    name: { type: String, required: true },
    logo: { type: String, required: true },
    description: String,
    website: String,
    category: String,
    order: { type: Number, default: 0 },
    featured: Boolean,
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const Lender = mongoose.model("Lender", lenderSchema);
