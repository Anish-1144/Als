import mongoose, { Schema } from "mongoose";
const faqSchema = new Schema({
    question: { type: String, required: true },
    answer: Schema.Types.Mixed,
    category: { type: String, required: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const Faq = mongoose.model("Faq", faqSchema);
