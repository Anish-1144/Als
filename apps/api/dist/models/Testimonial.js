import mongoose, { Schema } from "mongoose";
const testimonialSchema = new Schema({
    clientName: { type: String, required: true },
    clientTitle: String,
    clientImage: String,
    testimonial: { type: String, required: true },
    rating: Number,
    loanType: String,
    featured: Boolean,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const Testimonial = mongoose.model("Testimonial", testimonialSchema);
