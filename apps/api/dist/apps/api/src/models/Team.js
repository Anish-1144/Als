import mongoose, { Schema } from "mongoose";
const teamSchema = new Schema({
    name: { type: String, required: true },
    title: String,
    image: String,
    bio: String,
    experience: String,
    specialties: [Schema.Types.Mixed],
    phone: String,
    email: String,
    linkedin: String,
    showOnHomepage: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const Team = mongoose.model("Team", teamSchema);
