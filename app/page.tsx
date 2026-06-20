import HeroSection from "./components/HeroSection";
import LendingSolutionsSection from "./components/LendingSolutionsSection";
import WhyChooseUsSection from "./components/WhyChooseUsSection";
import PropertyShowcaseSection from "./components/PropertyShowcaseSection";
import ContactCTASection from "./components/ContactCTASection";
import TestimonialsSection from "./components/TestimonialsSection";
import { getHomepageData, getTestimonialsData } from "@/lib/api-server";
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
  };
  const services = homeData.services as {
    sectionTitle?: string;
    sectionSubtitle?: string;
  };

  return (
    <>
      <HeroSection hero={hero} />
      <LendingSolutionsSection services={services} />
      {homeData.whyChooseUs && (
        <WhyChooseUsSection whyChooseUs={homeData.whyChooseUs} />
      )}
      {homeData.propertyShowcase && (
        <PropertyShowcaseSection
          propertyShowcase={homeData.propertyShowcase}
        />
      )}
      <TestimonialsSection testimonials={testimonials} />
      <ContactCTASection cta={homeData.cta as Partial<HomeCta> | undefined} />
    </>
  );
}
