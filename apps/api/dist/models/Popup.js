import mongoose, { Schema } from "mongoose";
const popupSchema = new Schema({
    isEnabled: { type: Boolean, default: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    buttonText: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    showDelay: { type: Number, default: 3000 },
}, { timestamps: true });
export const Popup = mongoose.model("Popup", popupSchema);
