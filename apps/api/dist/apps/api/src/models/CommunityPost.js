import mongoose, { Schema } from "mongoose";
const communityPostSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: Schema.Types.Mixed,
    date: String,
    location: String,
    category: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
}, { timestamps: true });
export const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);
