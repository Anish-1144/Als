export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterData {
  companyName: string;
  description?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  };
  contact?: {
    phone?: string;
    email?: string;
  };
  socialLinks?: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
  footerLinks?: FooterLinkGroup[];
  copyrightText?: string;
  logoUrl?: string;
}

export type AssessmentFieldType =
  | "text"
  | "email"
  | "tel"
  | "number"
  | "textarea"
  | "select"
  | "checkbox";

export interface AssessmentField {
  id: string;
  name: string;
  label: string;
  type: AssessmentFieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  order: number;
  isVisible: boolean;
}

export interface AssessmentConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  fields: AssessmentField[];
}

export interface PopupData {
  isEnabled: boolean;
  title: string;
  message: string;
  buttonText: string;
  redirectUrl: string;
  showDelay: number;
  /** Optional in-popup assessment form. When enabled, the button opens this form. */
  assessment?: AssessmentConfig;
}
