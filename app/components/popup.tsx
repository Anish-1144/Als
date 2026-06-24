// Copyright (C) 2025 Anuj
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

"use client";

import { useState, useEffect } from "react";
import { FaArrowRight, FaCircleCheck, FaShieldHalved, FaXmark } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import type { AssessmentField, PopupData } from "@/lib/types";

interface WebsitePopupProps {
  popupData?: PopupData;
}

const ASSESSMENT_SUBMITTED_KEY = "als_assessment_submitted";

const defaultPopupData: PopupData = {
  isEnabled: true,
  title: "Get Your Free Mortgage Assessment",
  message:
    "Discover how much you could save with our expert mortgage brokers. Free consultation available now!",
  buttonText: "Get Free Assessment",
  redirectUrl: "/contact",
  showDelay: 3000,
};

const fieldInputClass =
  "w-full rounded-xl border border-slate-600/80 bg-[#1a2332] px-4 py-3 text-sm text-white placeholder-slate-500 transition-colors focus:border-[#00a69c] focus:outline-none focus:ring-2 focus:ring-[#00a69c]/25";

const scrollPanelClass =
  "max-h-[min(70vh,520px)] overflow-y-auto overscroll-contain pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden";

function readSubmittedFlag(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ASSESSMENT_SUBMITTED_KEY) === "true";
}

function markAssessmentSubmitted() {
  localStorage.setItem(ASSESSMENT_SUBMITTED_KEY, "true");
}

export default function WebsitePopup({ popupData }: WebsitePopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [wasSubmittedOnLoad, setWasSubmittedOnLoad] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const dataToUse = popupData || defaultPopupData;
  const assessment = dataToUse.assessment;
  const assessmentEnabled = Boolean(assessment?.enabled && assessment.fields?.length);

  const visibleFields: AssessmentField[] = (assessment?.fields ?? [])
    .filter((f) => f.isVisible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  useEffect(() => {
    const submitted = readSubmittedFlag();
    setWasSubmittedOnLoad(submitted);
    setAlreadySubmitted(submitted);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated || !dataToUse.isEnabled || hasShown) return;

    const timer = setTimeout(() => {
      setIsVisible(true);
      setHasShown(true);
      if (readSubmittedFlag() && assessmentEnabled) {
        setSubmitStatus("success");
      }
    }, dataToUse.showDelay);

    return () => clearTimeout(timer);
  }, [hydrated, dataToUse.isEnabled, dataToUse.showDelay, hasShown, assessmentEnabled]);

  function handleClose() {
    setIsVisible(false);
  }

  function handlePrimary() {
    if (alreadySubmitted && assessmentEnabled) {
      setSubmitStatus("success");
      setShowForm(false);
      return;
    }
    if (assessmentEnabled) {
      setShowForm(true);
    } else {
      window.location.href = dataToUse.redirectUrl;
    }
  }

  function setValue(name: string, value: string | boolean) {
    setValues((v) => ({ ...v, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (alreadySubmitted) {
      setSubmitStatus("success");
      return;
    }

    setSubmitting(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/v1/leads/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (json.success) {
        markAssessmentSubmitted();
        setAlreadySubmitted(true);
        setSubmitStatus("success");
        setShowForm(false);
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setSubmitting(false);
    }
  }

  function renderField(field: AssessmentField) {
    const value = values[field.name];
    const label = (
      <label htmlFor={field.name} className="mb-1.5 block text-sm font-medium text-slate-200">
        {field.label}
        {field.required && <span className="text-[#00a69c]"> *</span>}
      </label>
    );

    if (field.type === "textarea") {
      return (
        <div key={field.id}>
          {label}
          <textarea
            id={field.name}
            name={field.name}
            rows={3}
            required={field.required}
            placeholder={field.placeholder}
            value={(value as string) ?? ""}
            onChange={(e) => setValue(field.name, e.target.value)}
            className={`${fieldInputClass} resize-none`}
          />
        </div>
      );
    }

    if (field.type === "select") {
      return (
        <div key={field.id}>
          {label}
          <select
            id={field.name}
            name={field.name}
            required={field.required}
            value={(value as string) ?? ""}
            onChange={(e) => setValue(field.name, e.target.value)}
            className={`${fieldInputClass} cursor-pointer`}
          >
            <option value="">Select an option</option>
            {(field.options ?? []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );
    }

    if (field.type === "checkbox") {
      return (
        <label
          key={field.id}
          htmlFor={field.name}
          className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-600/50 bg-[#1a2332]/60 px-4 py-3"
        >
          <input
            id={field.name}
            name={field.name}
            type="checkbox"
            required={field.required}
            checked={Boolean(value)}
            onChange={(e) => setValue(field.name, e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#00a69c]"
          />
          <span className="text-sm text-slate-300">
            {field.label}
            {field.required && <span className="text-[#00a69c]"> *</span>}
          </span>
        </label>
      );
    }

    return (
      <div key={field.id}>
        {label}
        <input
          id={field.name}
          name={field.name}
          type={field.type}
          required={field.required}
          placeholder={field.placeholder}
          value={(value as string) ?? ""}
          onChange={(e) => setValue(field.name, e.target.value)}
          className={fieldInputClass}
        />
      </div>
    );
  }

  function ThankYouView({ returning }: { returning?: boolean }) {
    return (
      <div className="px-1 py-2 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/30">
          <FaCircleCheck className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-white">
          {assessment?.successTitle || "Thank you!"}
        </h3>
        <p className="mb-2 leading-relaxed text-slate-400">
          {assessment?.successMessage ||
            "Your request has been received. We'll be in touch shortly."}
        </p>
        {returning && (
          <p className="mb-6 text-sm text-slate-500">
            You&apos;ve already submitted your assessment. Our team will contact you soon.
          </p>
        )}
        <button
          type="button"
          onClick={handleClose}
          className="w-full rounded-xl bg-[#00a69c] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#008f86]"
        >
          Close
        </button>
      </div>
    );
  }

  if (!dataToUse.isEnabled || !hydrated) return null;

  const showThankYouPanel = submitStatus === "success";
  const showFormPanel = showForm && assessmentEnabled && !alreadySubmitted && submitStatus !== "success";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 12 }}
            transition={{ type: "spring", duration: 0.45 }}
            className={`relative w-full rounded-2xl border border-slate-600/60 bg-gradient-to-b from-[#2d3544] to-[#252d3a] p-6 shadow-2xl sm:p-8 ${
              showFormPanel ? "max-w-lg" : "max-w-md"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#1a2332] text-slate-400 transition-colors hover:bg-[#343f52] hover:text-white"
              aria-label="Close"
            >
              <FaXmark className="h-4 w-4" />
            </button>

            {showThankYouPanel ? (
              <ThankYouView returning={wasSubmittedOnLoad} />
            ) : showFormPanel ? (
              <div>
                <div className="mb-6 border-b border-slate-600/40 pb-5 text-center">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#00a69c]">
                    Free assessment
                  </p>
                  <h3 className="text-2xl font-bold text-white">
                    {assessment?.title || "Free Assessment"}
                  </h3>
                  {assessment?.subtitle && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {assessment.subtitle}
                    </p>
                  )}
                </div>

                <div className={scrollPanelClass}>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {visibleFields.map(renderField)}

                    {submitStatus === "error" && (
                      <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-center text-sm text-red-300">
                        Something went wrong. Please try again or call us directly.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00a69c] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#008f86] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          {assessment?.submitLabel || "Submit"}
                          <FaArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>

                    <p className="flex items-center justify-center gap-1.5 text-center text-xs text-slate-500">
                      <FaShieldHalved className="h-3.5 w-3.5 shrink-0" />
                      We respect your privacy and will never share your information.
                    </p>
                  </form>
                </div>
              </div>
            ) : (
              <div className="px-1 py-2 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#00a69c]/15 ring-1 ring-[#00a69c]/25">
                  <svg
                    className="h-8 w-8 text-[#00a69c]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>

                <h3 className="mb-3 text-2xl font-bold text-white">{dataToUse.title}</h3>
                <p className="mb-8 leading-relaxed text-slate-400">{dataToUse.message}</p>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handlePrimary}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#00a69c] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#008f86]"
                  >
                    {alreadySubmitted && assessmentEnabled
                      ? "View confirmation"
                      : dataToUse.buttonText}
                    <FaArrowRight className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="w-full text-sm text-slate-500 transition-colors hover:text-slate-300"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
