'use client';

import Button from '../(components)/Button';
import Section from '../(components)/Section';

/**
 * Hero section with main value proposition and dual CTAs
 * Features gradient background and responsive typography
 * Includes demo widget launcher and calendar scroll functionality
 */
export default function Hero() {
  // Scroll to calendar section
  const scrollToCalendar = () => {
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open BuildMyAgent widget
  const openWidget = () => {
    if (typeof window !== 'undefined' && (window as any).VERDANCE_WIDGET) {
      (window as any).VERDANCE_WIDGET.open();
    }
  };

  return (
    <Section
      id="hero"
      background="gradient"
      padding="lg"
      className="pt-20 lg:pt-28"
    >
      <div className="text-center max-w-4xl mx-auto">
        {/* Main Headline */}
        <h1 className="text-hero-mobile lg:text-hero-desktop font-bold text-primary-600 mb-6 animate-fade-in-up">
          Automate Growth With AI
        </h1>

        {/* Subheadline */}
        <p className="text-lg lg:text-xl text-neutral-700 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up">
          We build intelligent systems and websites that turn leads into customers,
          reduce manual work, and deliver predictable revenue growth.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-fade-in-up">
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToCalendar}
            className="w-full sm:w-auto"
          >
            BOOK FREE DEMO
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={openWidget}
            className="w-full sm:w-auto"
          >
            AI DEMO
          </Button>
        </div>

        {/* Small Note */}
        <p className="text-sm text-neutral-600 max-w-md mx-auto animate-fade-in">
          Try the chat — it captures your details and offers times automatically.
        </p>
      </div>
    </Section>
  );
}