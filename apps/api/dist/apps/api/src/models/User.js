import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
        type: String,
        enum: ["super_admin", "editor", "hr", "viewer"],
        default: "editor",
    },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const User = mongoose.model("User", userSchema);
