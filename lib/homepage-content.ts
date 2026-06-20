/** Default homepage content — used as fallbacks when CMS fields are empty */

export type ServiceCard = {
  title: string;
  description: string;
  link: string;
  linkLabel: string;
};

export type FeatureCard = {
  title: string;
  description: string;
  icon?: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type HowItWorksStep = {
  title: string;
  description: string;
};

export type HomeCta = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

export const DEFAULT_SERVICE_CARDS: ServiceCard[] = [
  {
    title: "Buy a Home",
    description:
      "Explore tailored home loan solutions for first-time buyers, upgraders, and specialized financing options to turn your property dreams into reality.",
    link: "/home-loans",
    linkLabel: "Learn More",
  },
  {
    title: "Buy an Investment",
    description:
      "Build your property portfolio with expert investment loan solutions, equity strategies, and tax-effective structures for wealth creation.",
    link: "/investment-loans",
    linkLabel: "Learn More",
  },
  {
    title: "Refinance",
    description:
      "Save thousands with better rates, access your equity, or consolidate debt. Discover refinancing solutions tailored to your financial goals.",
    link: "/refinancing",
    linkLabel: "Learn More",
  },
];

export const DEFAULT_FEATURE_CARDS: FeatureCard[] = [
  {
    title: "Ethical Lending",
    description:
      "ALS is genuinely different – an award-winning broker with no hidden financial incentives and no questionable referral partners.",
    icon: "HiShieldCheck",
  },
  {
    title: "Diverse Lending Panel",
    description:
      "With more than 30 bank and non-bank partners on our lending panel, finding the right mortgage is simple.",
    icon: "HiTrendingUp",
  },
  {
    title: "Strategic Approach",
    description:
      "Your loan should be one that supports your ideal future – whether that's a multi-property portfolio or a stress-free retirement.",
    icon: "HiLightBulb",
  },
  {
    title: "Connect With Experts",
    description:
      "Access our network of leading property professionals to get the advice you need – no referral commissions involved.",
    icon: "HiUsers",
  },
];

export const DEFAULT_STATS: StatItem[] = [
  { value: "11+", label: "Years Experience" },
  { value: "2+", label: "Lenders" },
  { value: "300+", label: "Happy Clients" },
  { value: "10+", label: "Awards Won" },
];

export const DEFAULT_HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    title: "Consultation",
    description:
      "We begin with a comprehensive discussion about your financial goals, current situation, and property aspirations.",
  },
  {
    title: "Documentation",
    description:
      "We guide you through the document collection process, making it as simple as possible.",
  },
  {
    title: "Lender Search",
    description:
      "We search across our panel of 25+ lenders to find the best loan options for your situation.",
  },
  {
    title: "Application",
    description:
      "Once you've chosen your preferred lender, we handle the entire application process.",
  },
  {
    title: "Settlement",
    description:
      "We support you through settlement and beyond. Our relationship doesn't end when the loan settles.",
  },
];

export const DEFAULT_CTA: HomeCta = {
  title: "Ready to Start Your Property Journey?",
  subtitle:
    "Get in touch with our expert team today for a free consultation and personalized lending solution.",
  buttonText: "Get Started",
  buttonLink: "/contact",
};

export function mergeServiceCards(raw?: unknown): ServiceCard[] {
  const cards = (raw as ServiceCard[] | undefined) ?? [];
  return DEFAULT_SERVICE_CARDS.map((def, i) => ({
    ...def,
    ...(cards[i] ?? {}),
  }));
}

export function mergeFeatureCards(raw?: unknown): FeatureCard[] {
  const cards = (raw as FeatureCard[] | undefined) ?? [];
  return DEFAULT_FEATURE_CARDS.map((def, i) => ({
    ...def,
    ...(cards[i] ?? {}),
  }));
}

export function mergeStats(raw?: unknown): StatItem[] {
  const stats = (raw as StatItem[] | undefined) ?? [];
  return DEFAULT_STATS.map((def, i) => ({
    ...def,
    ...(stats[i] ?? {}),
  }));
}

export function mergeSteps(raw?: unknown): HowItWorksStep[] {
  const steps = (raw as HowItWorksStep[] | undefined) ?? [];
  return DEFAULT_HOW_IT_WORKS_STEPS.map((def, i) => ({
    ...def,
    ...(steps[i] ?? {}),
  }));
}

export function mergeCta(raw?: Partial<HomeCta>): HomeCta {
  return { ...DEFAULT_CTA, ...raw };
}
