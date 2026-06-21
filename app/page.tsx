import HeroSection from "./components/HeroSection";
import LendingSolutionsSection from "./components/LendingSolutionsSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import PropertyShowcaseSection from "./components/PropertyShowcaseSection";
import ContactCTASection from "./components/ContactCTASection";
import TestimonialsSection from "./components/TestimonialsSection";
import { getHomepageData, getTestimonialsData } from "@/lib/api-server";
import { isSectionVisible } from "@/lib/page-content";
import type { HomeCta } from "@/lib/homepage-content";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [homeData, testimonials] = await Promise.all([
    getHomepageData(),
    getTestimonialsData(),
  ]);

  const hero = homeData.hero as {
    title?: string;
    titleHighlight?: string;
    subtitle?: string;
    imageUrl?: string;
    imageAlt?: string;
    isVisible?: boolean;
  };
  const services = homeData.services as {
    sectionTitle?: string;
    sectionSubtitle?: string;
    isVisible?: boolean;
  };
  const whyChooseUs = homeData.whyChooseUs as { isVisible?: boolean } | undefined;
  const propertyShowcase = homeData.propertyShowcase as { isVisible?: boolean } | undefined;
  const testimonialsSection = (homeData as Record<string, unknown>).testimonials as
    | { isVisible?: boolean }
    | undefined;
  const cta = homeData.cta as Partial<HomeCta> | undefined;

  return (
    <>
      {isSectionVisible(hero) && <HeroSection hero={hero} />}
      {isSectionVisible(services) && <LendingSolutionsSection services={services} />}
      {whyChooseUs && isSectionVisible(whyChooseUs) && (
        <WhyChooseUsSection whyChooseUs={homeData.whyChooseUs} />
      )}
      {propertyShowcase && isSectionVisible(propertyShowcase) && (
        <PropertyShowcaseSection propertyShowcase={homeData.propertyShowcase} />
      )}
      {isSectionVisible(testimonialsSection) && (
        <TestimonialsSection testimonials={testimonials} />
      )}
      {isSectionVisible(cta) && <ContactCTASection cta={cta} />}
    </>
  );
}
