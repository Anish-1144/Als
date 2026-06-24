import mongoose, { Schema, type Document } from "mongoose";

export interface IAssessmentField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
  options?: string[];
  order: number;
  isVisible: boolean;
}

export interface IAssessmentConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  fields: IAssessmentField[];
}

export interface IPopup extends Document {
  isEnabled: boolean;
  title: string;
  message: string;
  buttonText: string;
  redirectUrl: string;
  showDelay: number;
  assessment?: IAssessmentConfig;
}

const assessmentFieldSchema = new Schema<IAssessmentField>(
  {
    id: String,
    name: String,
    label: String,
    type: { type: String, default: "text" },
    required: { type: Boolean, default: false },
    placeholder: String,
    options: { type: [String], default: undefined },
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true },
  },
  { _id: false },
);

const assessmentSchema = new Schema<IAssessmentConfig>(
  {
    enabled: { type: Boolean, default: false },
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    submitLabel: { type: String, default: "Submit" },
    successTitle: { type: String, default: "Thank you!" },
    successMessage: { type: String, default: "" },
    fields: { type: [assessmentFieldSchema], default: [] },
  },
  { _id: false },
);

const popupSchema = new Schema<IPopup>(
  {
    isEnabled: { type: Boolean, default: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    buttonText: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    showDelay: { type: Number, default: 3000 },
    assessment: { type: assessmentSchema, default: undefined },
  },
  { timestamps: true },
);

export const Popup = mongoose.model<IPopup>("Popup", popupSchema);
