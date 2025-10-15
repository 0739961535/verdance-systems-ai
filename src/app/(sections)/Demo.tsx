'use client';

import Button from '../(components)/Button';
import Section from '../(components)/Section';

/**
 * Demo section with dual CTAs for widget and calendar
 * Emphasizes the value of automation and lead conversion
 * Clear call-to-action hierarchy
 */
export default function Demo() {
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
    <Section id="demo" background="white" padding="lg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-600 mb-6">
          Automate What Slows You Down
        </h2>

        <p className="text-lg lg:text-xl text-neutral-700 mb-8 max-w-3xl mx-auto leading-relaxed">
          Free your team from repetitive tasks. Our AI agents handle lead capture,
          qualification, and follow-ups — so you can focus on closing deals and
          scaling your business instead of chasing leads.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant="primary"
            size="lg"
            onClick={openWidget}
            className="w-full sm:w-auto"
          >
            Convert Every Opportunity — Instantly
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={scrollToCalendar}
            className="w-full sm:w-auto"
          >
            Build a System That Grows With You
          </Button>
        </div>
      </div>
    </Section>
  );
}