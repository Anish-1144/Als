import type { SectionVisibility } from "@/lib/page-content";

export type ConsultationType = {
  title: string;
  description: string;
  duration: string;
  icon: "phone" | "video" | "person";
};

export type ConsultationPageContent = {
  infoSection: SectionVisibility & {
    title: string;
    consultationTypes: ConsultationType[];
    benefits: string[];
    quickContact: {
      title: string;
      phone: string;
      phoneLink: string;
      email: string;
      emailLink: string;
    };
  };
  formSection: SectionVisibility & {
    title: string;
    subtitle: string;
    submitButtonText: string;
  };
};

function mergeItems(defaults: string[], raw?: string[]): string[] {
  const len = Math.max(defaults.length, raw?.length ?? 0);
  return Array.from({ length: len }, (_, i) => raw?.[i] ?? defaults[i] ?? "");
}

function mergeTypes(
  defaults: ConsultationType[],
  raw?: ConsultationType[],
): ConsultationType[] {
  const len = Math.max(defaults.length, raw?.length ?? 0);
  return Array.from({ length: len }, (_, i) => ({
    ...defaults[i],
    ...raw?.[i],
    title: raw?.[i]?.title ?? defaults[i]?.title ?? "",
    description: raw?.[i]?.description ?? defaults[i]?.description ?? "",
    duration: raw?.[i]?.duration ?? defaults[i]?.duration ?? "",
    icon: raw?.[i]?.icon ?? defaults[i]?.icon ?? "phone",
  }));
}

export const DEFAULT_CONSULTATION_CONTENT: ConsultationPageContent = {
  infoSection: {
    title: "Choose Your Consultation Type",
    consultationTypes: [
      {
        title: "Phone Consultation",
        description: "Convenient phone call at your preferred time",
        duration: "30-45 minutes",
        icon: "phone",
      },
      {
        title: "Video Consultation",
        description: "Face-to-face meeting via video call",
        duration: "45-60 minutes",
        icon: "video",
      },
      {
        title: "In-Person Meeting",
        description: "Meet at our office or your preferred location",
        duration: "60-90 minutes",
        icon: "person",
      },
    ],
    benefits: [
      "Free assessment of your financial situation",
      "Personalized loan recommendations",
      "Competitive rate comparison",
      "Pre-approval guidance",
      "Ongoing support throughout the process",
    ],
    quickContact: {
      title: "Prefer to Call?",
      phone: "03 9087 7719",
      phoneLink: "tel:0390877719",
      email: "info@alsmortgagesolutions.com.au",
      emailLink: "mailto:info@alsmortgagesolutions.com.au",
    },
  },
  formSection: {
    title: "Schedule Your Consultation",
    subtitle:
      "Choose your preferred consultation type and we'll contact you to confirm the details.",
    submitButtonText: "Book Consultation",
  },
};

export function mergeConsultationContent(
  raw?: Partial<ConsultationPageContent>,
): ConsultationPageContent {
  const d = DEFAULT_CONSULTATION_CONTENT;
  return {
    infoSection: {
      ...d.infoSection,
      ...raw?.infoSection,
      title: raw?.infoSection?.title ?? d.infoSection.title,
      consultationTypes: mergeTypes(
        d.infoSection.consultationTypes,
        raw?.infoSection?.consultationTypes,
      ),
      benefits: mergeItems(d.infoSection.benefits, raw?.infoSection?.benefits),
      quickContact: {
        ...d.infoSection.quickContact,
        ...raw?.infoSection?.quickContact,
      },
    },
    formSection: { ...d.formSection, ...raw?.formSection },
  };
}
