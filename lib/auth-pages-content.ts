export type RegistrationFieldType =
  | "text"
  | "email"
  | "tel"
  | "password"
  | "textarea"
  | "select"
  | "checkbox";

export type RegistrationField = {
  id: string;
  name: string;
  label: string;
  type: RegistrationFieldType;
  required: boolean;
  placeholder?: string;
  options?: string[];
  order: number;
  isVisible: boolean;
};

export type SignInConfig = {
  heroTitle: string;
  heroSubtitle: string;
  submitLabel: string;
  footerText: string;
  registerLinkText: string;
};

export type RegistrationConfig = {
  heroTitle: string;
  heroSubtitle: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
  signInLinkText: string;
  fields: RegistrationField[];
};

export type AuthPagesConfig = {
  signIn: SignInConfig;
  registration: RegistrationConfig;
};

/** Loose input shape accepted by the merge helpers (DB/admin data may be partial). */
export type AuthPagesConfigInput = {
  signIn?: Partial<SignInConfig>;
  registration?: Partial<Omit<RegistrationConfig, "fields">> & {
    fields?: Partial<RegistrationField>[];
  };
} | null;

export const DEFAULT_REGISTRATION_FIELDS: RegistrationField[] = [
  { id: "firstName", name: "firstName", label: "First Name", type: "text", required: true, placeholder: "John", order: 0, isVisible: true },
  { id: "lastName", name: "lastName", label: "Last Name", type: "text", required: true, placeholder: "Smith", order: 1, isVisible: true },
  { id: "email", name: "email", label: "Email Address", type: "email", required: true, placeholder: "you@example.com", order: 2, isVisible: true },
  { id: "phone", name: "phone", label: "Phone Number", type: "tel", required: false, placeholder: "04XX XXX XXX", order: 3, isVisible: true },
  { id: "password", name: "password", label: "Password", type: "password", required: true, placeholder: "Create a password", order: 4, isVisible: true },
];

export const DEFAULT_AUTH_PAGES_CONFIG: AuthPagesConfig = {
  signIn: {
    heroTitle: "Sign In",
    heroSubtitle: "Access your ALS Mortgage Solutions account",
    submitLabel: "Sign In",
    footerText: "Don't have an account?",
    registerLinkText: "Create an account",
  },
  registration: {
    heroTitle: "Create Account",
    heroSubtitle: "Register to access exclusive resources and personalised mortgage tools",
    submitLabel: "Create Account",
    successTitle: "Welcome aboard!",
    successMessage:
      "Your account has been created successfully. You can now sign in with your email and password.",
    signInLinkText: "Already have an account? Sign in",
    fields: DEFAULT_REGISTRATION_FIELDS,
  },
};

function mergeFields(
  defaults: RegistrationField[],
  raw?: Partial<RegistrationField>[],
): RegistrationField[] {
  if (!raw || raw.length === 0) return defaults;
  return [...raw]
    .filter((f) => f.isVisible !== false)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .map((f, i) => ({
      id: f.id || `field-${i}`,
      name: f.name || `field_${i}`,
      label: f.label || "",
      type: (f.type as RegistrationFieldType) || "text",
      required: f.required ?? false,
      placeholder: f.placeholder,
      options: f.options,
      order: f.order ?? i,
      isVisible: f.isVisible !== false,
    }));
}

/** Public-site merge: hides invisible fields and sorts by order. */
export function mergeAuthPagesConfig(raw?: AuthPagesConfigInput): AuthPagesConfig {
  const d = DEFAULT_AUTH_PAGES_CONFIG;
  return {
    signIn: { ...d.signIn, ...raw?.signIn },
    registration: {
      ...d.registration,
      ...raw?.registration,
      fields: mergeFields(d.registration.fields, raw?.registration?.fields),
    },
  };
}

/** Admin merge: keeps all fields (including hidden) so they can be edited. */
export function mergeAuthPagesConfigAdmin(raw?: AuthPagesConfigInput): AuthPagesConfig {
  const d = DEFAULT_AUTH_PAGES_CONFIG;
  const rawFields = raw?.registration?.fields;
  const fields =
    rawFields && rawFields.length > 0
      ? ([...rawFields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)) as RegistrationField[])
      : d.registration.fields;
  return {
    signIn: { ...d.signIn, ...raw?.signIn },
    registration: {
      ...d.registration,
      ...raw?.registration,
      fields,
    },
  };
}

export function visibleRegistrationFields(config: AuthPagesConfig): RegistrationField[] {
  return config.registration.fields
    .filter((f) => f.isVisible)
    .sort((a, b) => a.order - b.order);
}
