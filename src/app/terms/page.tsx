import Container from '../(components)/Container';
import Section from '../(components)/Section';

/**
 * Terms of Service page with comprehensive service terms
 * Covers service provision, user responsibilities, and legal protections
 */
export default function TermsOfService() {
  return (
    <>
      {/* Navigation Spacer */}
      <div className="h-20" />

      <Section background="white" padding="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary-600 mb-8">
              Terms &amp; Conditions
            </h1>

            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="text-sm text-neutral-500 mb-8">
                Last Updated: {new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  1. Acceptance of Terms
                </h2>
                <p>
                  By accessing and using Verdance Systems AI services, you accept and agree to be bound
                  by the terms and provisions of this agreement. These terms apply to all visitors,
                  users, and others who access or use the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  2. Description of Service
                </h2>
                <p className="mb-4">
                  Verdance Systems AI provides:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>AI automation consulting services</li>
                  <li>Website design and development</li>
                  <li>Business process optimization</li>
                  <li>Lead generation system implementation</li>
                  <li>Technical support and maintenance</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  3. User Responsibilities
                </h2>
                <p className="mb-4">
                  You agree to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Provide accurate and complete information during consultations</li>
                  <li>Use our services in compliance with applicable laws</li>
                  <li>Not interfere with or disrupt the service</li>
                  <li>Respect intellectual property rights</li>
                  <li>Maintain confidentiality of any proprietary information shared</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  4. Service Availability
                </h2>
                <p>
                  While we strive to maintain continuous service availability, we do not guarantee
                  uninterrupted access. Services may be temporarily unavailable due to maintenance,
                  updates, or technical issues beyond our control.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibent text-primary-600 mb-4">
                  5. Consultation and Booking Terms
                </h2>
                <p className="mb-4">
                  For consultation services:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Initial consultations are provided free of charge</li>
                  <li>Booking confirmations will be sent via email or WhatsApp</li>
                  <li>Cancellations should be made at least 24 hours in advance</li>
                  <li>No-shows may result in booking restrictions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  6. Intellectual Property
                </h2>
                <p>
                  All content, features, and functionality of our service, including but not limited to
                  text, graphics, logos, and software, are owned by Verdance Systems AI and protected
                  by international copyright, trademark, and other intellectual property laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  7. Limitation of Liability
                </h2>
                <p>
                  Verdance Systems AI shall not be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including without limitation, loss of profits,
                  data, use, goodwill, or other intangible losses resulting from your use of the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  8. Privacy and Data Protection
                </h2>
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs
                  your use of the service, to understand our practices regarding the collection and use
                  of your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  9. Communication Consent
                </h2>
                <p>
                  By using our AI assistant or booking services, you consent to receive communications
                  from us via email, WhatsApp, or other electronic means regarding your consultation,
                  service updates, and relevant business information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  10. Governing Law
                </h2>
                <p>
                  These terms shall be governed and construed in accordance with the laws of South Africa,
                  without regard to its conflict of law provisions. Any disputes shall be resolved in
                  the courts of South Africa.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  11. Changes to Terms
                </h2>
                <p>
                  We reserve the right to modify or replace these terms at any time. If a revision is
                  material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  12. Contact Information
                </h2>
                <p>
                  If you have any questions about these Terms & Conditions, please contact us:
                </p>
                <div className="bg-neutral-50 p-6 rounded-lg mt-4">
                  <p><strong>Email:</strong> verdancesystems@gmail.com</p>
                  <p><strong>Phone:</strong> +27 73 996 1535</p>
                  <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM SAST</p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}