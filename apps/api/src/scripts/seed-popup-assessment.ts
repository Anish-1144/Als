import mongoose from "mongoose";
import { connectDb } from "../db/connect.js";
import { Popup } from "../models/Popup.js";

/**
 * Adds the default in-popup assessment form config to the existing Popup
 * singleton so the public popup opens a (admin-editable) lead form.
 */
const ASSESSMENT = {
  enabled: true,
  title: "Free Mortgage Assessment",
  subtitle:
    "Tell us a bit about yourself and one of our expert brokers will get back to you with a personalised assessment.",
  submitLabel: "Get My Free Assessment",
  successTitle: "Thank you!",
  successMessage:
    "Your assessment request has been received. One of our mortgage experts will be in touch shortly.",
  fields: [
    { id: "name", name: "name", label: "Full Name", type: "text", required: true, placeholder: "John Smith", order: 0, isVisible: true },
    { id: "email", name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com", order: 1, isVisible: true },
    { id: "phone", name: "phone", label: "Phone Number", type: "tel", required: true, placeholder: "04XX XXX XXX", order: 2, isVisible: true },
    { id: "loanType", name: "loanType", label: "What are you looking for?", type: "select", required: true, options: ["Home Loan", "Refinancing", "Investment Loan", "Commercial Loan", "SMSF Loan", "Car Financing"], order: 3, isVisible: true },
    { id: "message", name: "message", label: "Anything else we should know?", type: "textarea", required: false, placeholder: "Your message (optional)", order: 4, isVisible: true },
  ],
};

async function main() {
  await connectDb();
  const existing = await Popup.findOne().sort({ updatedAt: -1 });
  if (!existing) {
    await Popup.create({
      isEnabled: true,
      title: "Get Your Free Mortgage Assessment",
      message:
        "Discover how much you could save with our expert mortgage brokers. Free consultation available now!",
      buttonText: "Get Free Assessment",
      redirectUrl: "/contact",
      showDelay: 3000,
      assessment: ASSESSMENT,
    });
    console.log("Created popup with assessment config.");
  } else {
    existing.set("assessment", ASSESSMENT);
    await existing.save();
    console.log("Updated popup with assessment config.");
  }
  await mongoose.disconnect();
  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
