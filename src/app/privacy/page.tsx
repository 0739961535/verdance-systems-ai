import Container from '../(components)/Container';
import Section from '../(components)/Section';

/**
 * Privacy Policy page with comprehensive data protection information
 * Covers GDPR, POPIA compliance and transparent data practices
 */
export default function PrivacyPolicy() {
  return (
    <>
      {/* Navigation Spacer */}
      <div className="h-20" />

      <Section background="white" padding="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-bold text-primary-600 mb-8">
              Privacy Policy
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
                  1. Information We Collect
                </h2>
                <p className="mb-4">
                  When you interact with our AI assistant or book a consultation, we may collect:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Contact information (name, email, phone number)</li>
                  <li>Business information and requirements</li>
                  <li>Communication preferences</li>
                  <li>Website usage data and analytics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="mb-4">
                  We use collected information to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Provide consultation services and respond to inquiries</li>
                  <li>Schedule and manage appointments</li>
                  <li>Send relevant business communications via WhatsApp or email</li>
                  <li>Improve our services and website functionality</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  3. Data Sharing and Third Parties
                </h2>
                <p className="mb-4">
                  We may share your information with:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li><strong>Google Calendar:</strong> For appointment scheduling</li>
                  <li><strong>BuildMyAgent.io:</strong> For AI assistant functionality</li>
                  <li><strong>Analytics providers:</strong> For website performance monitoring</li>
                  <li><strong>Communication platforms:</strong> For sending consultation confirmations</li>
                </ul>
                <p>
                  We never sell your personal information to third parties.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  4. Data Security
                </h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your
                  personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  5. Your Rights (GDPR & POPIA Compliance)
                </h2>
                <p className="mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  6. WhatsApp Communications
                </h2>
                <p>
                  By using our AI assistant, you consent to receive WhatsApp messages about your
                  consultation booking and related business communications. You can opt out at any time
                  by replying "STOP" to any message.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  7. Data Retention
                </h2>
                <p>
                  We retain your personal information only as long as necessary to provide services
                  and comply with legal obligations, typically no longer than 7 years.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  8. Contact Information
                </h2>
                <p>
                  For privacy-related inquiries, contact us at:
                </p>
                <div className="bg-neutral-50 p-6 rounded-lg mt-4">
                  <p><strong>Email:</strong> verdancesystems@gmail.com</p>
                  <p><strong>Phone:</strong> +27 73 996 1535</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-primary-600 mb-4">
                  9. Changes to This Policy
                </h2>
                <p>
                  We may update this privacy policy periodically. Changes will be posted on this page
                  with an updated revision date.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}