import Nav from './(components)/Nav';
import Hero from './(sections)/Hero';
import SocialProof from './(sections)/SocialProof';
import Advantage from './(sections)/Advantage';
import Features from './(sections)/Features';
import HowItWorks from './(sections)/HowItWorks';
import Industries from './(sections)/Industries';
import ContactUs from './(sections)/ContactUs';
import PricingTeaser from './(sections)/PricingTeaser';
import Calendar from './(sections)/Calendar';
import CTA from './(sections)/CTA';
import Footer from './(sections)/Footer';

/**
 * Main page component with all sections in the specified order
 * Premium Apple-level design with smooth scrolling navigation
 * Optimized for conversion with strategic CTA placement
 */
export default function HomePage() {
  return (
    <>
      {/* Sticky Navigation */}
      <Nav />

      {/* Main Content */}
      <main>
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Social Proof / Value Cards */}
        <SocialProof />

        {/* 3. The Verdance Advantage */}
        <Advantage />

        {/* 4. Features */}
        <Features />

        {/* 5. How It Works */}
        <HowItWorks />

        {/* 6. Industries We've Helped Succeed */}
        <Industries />

        {/* 7. Contact Us Section */}
        <ContactUs />

        {/* 8. Pricing Teaser */}
        <PricingTeaser />

        {/* 9. Calendar (GHL iframe) */}
        <Calendar />

        {/* 10. Final CTA */}
        <CTA />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}