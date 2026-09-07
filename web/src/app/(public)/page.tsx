import { Hero } from "@/components/sections/hero";
import { QuickBook } from "@/components/sections/quick-book";
import { SpaServices } from "@/components/sections/spa-services";
import { SuitesPreview } from "@/components/sections/suites-preview";
import { DiningPreview } from "@/components/sections/dining-preview";
import { Testimonial } from "@/components/sections/testimonial";
import { Newsletter } from "@/components/sections/newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickBook />
      <SpaServices />
      <SuitesPreview />
      <DiningPreview />
      <Testimonial />
      <Newsletter />
    </>
  );
}
