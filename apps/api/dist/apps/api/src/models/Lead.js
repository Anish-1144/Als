import mongoose, { Schema } from "mongoose";
const leadSchema = new Schema({
    type: { type: String, enum: ["contact", "consultation"], required: true },
    name: String,
    email: { type: String, required: true },
    phone: String,
    subject: String,
    message: String,
    consultationType: String,
    preferredTime: String,
    preferredContact: String,
    payload: { type: Schema.Types.Mixed, default: {} },
    status: {
        type: String,
        enum: ["new", "read", "contacted", "closed"],
        default: "new",
    },
}, { timestamps: true });
export const Lead = mongoose.model("Lead", leadSchema);
