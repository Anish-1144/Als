import mongoose, { Schema } from "mongoose";
const navigationSchema = new Schema({
    logoUrl: { type: String, default: "/logo-bgr.png" },
    logoAlt: { type: String, default: "ALS Mortgage Solutions" },
}, { timestamps: true });
export const Navigation = mongoose.model("Navigation", navigationSchema);
