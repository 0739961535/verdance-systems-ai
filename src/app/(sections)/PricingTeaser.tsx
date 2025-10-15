'use client';

import Button from '../(components)/Button';
import Section from '../(components)/Section';

/**
 * Pricing teaser section without hard pricing
 * Focuses on value proposition and ROI discussion
 * Direct CTA to book a demo for pricing discussion
 */
export default function PricingTeaser() {
  // Scroll to calendar section
  const scrollToCalendar = () => {
    const element = document.getElementById('book');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="pricing" background="gray" padding="lg">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-600 mb-6">
          Build Smart, Scale Fast
        </h2>

        <p className="text-lg lg:text-xl text-neutral-700 mb-8 leading-relaxed">
          Custom systems scoped to your stack. Transparent setup + monthly optimization.
          Let's map your ROI in a 15-minute demo.
        </p>

        <Button
          variant="primary"
          size="lg"
          onClick={scrollToCalendar}
        >
          BOOK A DEMO
        </Button>
      </div>
    </Section>
  );
}