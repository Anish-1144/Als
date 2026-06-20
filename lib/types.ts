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

export interface PopupData {
  isEnabled: boolean;
  title: string;
  message: string;
  buttonText: string;
  redirectUrl: string;
  showDelay: number;
}
