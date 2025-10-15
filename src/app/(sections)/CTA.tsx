'use client';

import Button from '../(components)/Button';
import Section from '../(components)/Section';

/**
 * Final CTA section with strong action-oriented copy
 * Dual buttons for different user preferences
 * Positioned before footer for maximum conversion
 */
export default function CTA() {
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
    <Section id="final-cta" background="gradient" padding="lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-600 mb-6">
          Start Automating Growth With AI Today
        </h2>

        <p className="text-lg lg:text-xl text-neutral-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Don't let another lead slip through the cracks. Let's build your
          automated growth system and turn every visitor into a qualified opportunity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            onClick={scrollToCalendar}
            className="w-full sm:w-auto"
          >
            Book a Demo
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={openWidget}
            className="w-full sm:w-auto"
          >
            Try AI Demo
          </Button>
        </div>
      </div>
    </Section>
  );
}