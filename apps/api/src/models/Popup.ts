import mongoose, { Schema, type Document } from "mongoose";

export interface IPopup extends Document {
  isEnabled: boolean;
  title: string;
  message: string;
  buttonText: string;
  redirectUrl: string;
  showDelay: number;
}

const popupSchema = new Schema<IPopup>(
  {
    isEnabled: { type: Boolean, default: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    buttonText: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    showDelay: { type: Number, default: 3000 },
  },
  { timestamps: true },
);

export const Popup = mongoose.model<IPopup>("Popup", popupSchema);
