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
import WhatsAppButton from "@/components/WhatsAppButton";

export default function HomePage() {

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
        <BookingCtaSection />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
