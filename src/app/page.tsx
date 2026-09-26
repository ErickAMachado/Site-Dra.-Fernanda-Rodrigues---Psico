import AboutSection from "@/components/AboutSection";
import AssessmentSection from "@/components/AssessmentSection";
import ApproachSection from "@/components/ApproachSection";
import AutismSection from "@/components/AutismSection";
import BookingCtaSection from "@/components/BookingCtaSection";
import ContactSection from "@/components/ContactSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import SiteHeader from "@/components/SiteHeader";
import TestimonialsSection from "@/components/TestimonialsSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getTestimonials } from "@/lib/content";

export default async function HomePage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <AssessmentSection />
        <AboutSection />
        <ServicesSection />
        <ApproachSection />
        <AutismSection />
        <TestimonialsSection testimonials={testimonials} />
        <BookingCtaSection />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
