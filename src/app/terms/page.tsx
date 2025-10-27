import Container from '../(components)/Container';
import Section from '../(components)/Section';

/**
 * Terms of Service page - Verdance Systems AI
 * Comprehensive service terms covering billing, intellectual property, and legal protections
 */
export default function TermsOfService() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      {/* Navigation Spacer */}
      <div className="h-20" />

      <Section background="white" padding="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl lg:text-5xl font-bold text-gradient mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-primary-600 font-semibold mb-2">
              Verdance Systems AI
            </p>
            <p className="text-sm text-neutral-500 mb-12">
              Effective Date: {currentDate}
            </p>

            <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed">
              <p className="text-lg mb-8 text-neutral-600">
                Welcome to Verdance Systems AI. These Terms of Service govern your access to and use of our websites, software, and AI automation services.
              </p>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  1. Services
                </h2>
                <p>
                  Verdance Systems AI provides AI-powered website development, automation agents, CRM integrations, and ongoing support systems for business clients. All projects are custom-built and optimized for performance.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  2. Billing and Payments
                </h2>
                <p className="mb-3">
                  Projects are billed as either once-off setups or on monthly subscription plans depending on the system package.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Payments are processed through Stripe or other approved payment gateways.</li>
                  <li>Automatic renewals apply to monthly subscriptions.</li>
                  <li>Verdance Systems AI reserves the right to pause services for failed or delayed payments.</li>
                  <li>All purchases are <strong>non-refundable</strong> after project initiation.</li>
                </ul>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  3. Project Scope
                </h2>
                <p>
                  Each project follows an agreed blueprint outlining deliverables and features. Any additional work outside the original scope will be quoted separately.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  4. Client Responsibilities
                </h2>
                <p>
                  Clients must provide all necessary information, content, and access credentials to complete the setup and integration of their systems.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  5. Intellectual Property
                </h2>
                <p className="mb-3">
                  All AI systems, automations, and websites created by Verdance Systems AI remain the property of Verdance Systems AI until full payment is received.
                </p>
                <p>
                  Clients are granted a non-exclusive, perpetual license to use their final systems once payment is complete.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  6. Legal Use
                </h2>
                <p>
                  Our services must be used only for lawful business purposes. You may not use Verdance Systems AI platforms for spam, illegal activity, or unauthorized data collection.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  7. Support and Maintenance
                </h2>
                <p>
                  Ongoing support, updates, and changes are included in active subscription plans. Support may be paused if subscriptions lapse.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  8. Liability
                </h2>
                <p className="mb-3">
                  Verdance Systems AI is not liable for indirect, incidental, or consequential damages, or for business interruptions caused by third-party integrations.
                </p>
                <p>
                  Our total liability shall not exceed the amount paid for the service in the 12 months preceding the event.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  9. Termination
                </h2>
                <p>
                  Verdance Systems AI may terminate or suspend services if the client breaches these Terms or engages in unlawful use of the systems.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  10. Governing Law &amp; Arbitration
                </h2>
                <p>
                  These Terms are governed by international commercial law. Any disputes will be resolved through binding international arbitration.
                </p>
              </section>

              <section className="mt-12 bg-gradient-to-br from-primary-50 to-turquoise-50 rounded-2xl p-8 border border-primary-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  Contact Information
                </h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2">
                  <p><strong className="text-primary-600">Email:</strong> support@verdancesystemsai.com</p>
                  <p><strong className="text-primary-600">Phone:</strong> +27 73 996 1535</p>
                  <p><strong className="text-primary-600">WhatsApp:</strong> +27 73 996 1535</p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
