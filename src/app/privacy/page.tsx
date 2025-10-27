import Container from '../(components)/Container';
import Section from '../(components)/Section';

/**
 * Privacy Policy page - Verdance Systems AI
 * Comprehensive data protection information covering GDPR and POPIA compliance
 */
export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>
            <p className="text-lg text-primary-600 font-semibold mb-2">
              Verdance Systems AI
            </p>
            <p className="text-sm text-neutral-500 mb-12">
              Effective Date: {currentDate}
            </p>

            <div className="prose prose-lg max-w-none text-neutral-700 leading-relaxed">
              <p className="text-lg mb-8 text-neutral-600">
                At Verdance Systems AI, we take your privacy seriously. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our website, services, and AI-powered agents.
              </p>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  1. Information We Collect
                </h2>
                <p className="mb-3">
                  Verdance Systems AI collects the following types of information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Details:</strong> Name, email, phone number, business name</li>
                  <li><strong>Usage Data:</strong> IP address, browser type, device information, interaction logs</li>
                  <li><strong>Conversation Data:</strong> Data exchanged between users and AI agents for lead qualification and support</li>
                  <li><strong>Payment Information:</strong> Collected securely via Stripe (we do not store credit card information)</li>
                  <li><strong>Cookies & Tracking Technologies:</strong> Analytics, user behavior tracking, session management</li>
                </ul>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  2. How We Use Your Information
                </h2>
                <p className="mb-3">
                  We use your data to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and deliver our AI automation services</li>
                  <li>Personalize and optimize your user experience</li>
                  <li>Process payments and manage billing</li>
                  <li>Communicate service updates, support responses, and marketing materials (with your consent)</li>
                  <li>Prevent fraud, abuse, and improve security</li>
                  <li>Analyze and improve system performance and AI capabilities</li>
                </ul>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  3. Data Protection & Security
                </h2>
                <p className="mb-3">
                  We use industry-standard security measures to protect your data, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encryption of data in transit (SSL/TLS)</li>
                  <li>Secure storage on reliable cloud infrastructure</li>
                  <li>Access control and authentication protocols</li>
                  <li>Regular security audits and monitoring</li>
                </ul>
                <p className="mt-3">
                  While we take reasonable measures to protect your data, no system is 100% secure. Users are advised to use strong passwords and secure their accounts.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  4. International Data Transfers
                </h2>
                <p>
                  Your information may be transferred to and processed in countries outside your home country. These transfers comply with GDPR and POPIA requirements, ensuring appropriate safeguards are in place.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  5. Cookies and Tracking Technologies
                </h2>
                <p className="mb-3">
                  We use cookies to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Track user behavior for analytics (Google Analytics, Plausible)</li>
                  <li>Enable session management and chatbot functionality</li>
                  <li>Improve marketing targeting (only with consent)</li>
                </ul>
                <p className="mt-3">
                  You may disable cookies in your browser settings, but this may limit your access to certain features.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  6. Your Rights (GDPR & POPIA)
                </h2>
                <p className="mb-3">
                  Depending on your location, you may have the following rights:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access your personal data and request a copy</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your data (right to be forgotten)</li>
                  <li>Opt out of marketing communications</li>
                  <li>Restrict or object to data processing</li>
                  <li>Request data portability</li>
                </ul>
                <p className="mt-3">
                  To exercise any of these rights, contact us at <strong>support@verdancesystemsai.com</strong>.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  7. Policy Updates
                </h2>
                <p>
                  This Privacy Policy may be updated periodically. Significant changes will be communicated via email or through our website. Continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  8. Contact Us
                </h2>
                <p className="mb-3">
                  For questions about this Privacy Policy or to exercise your data rights, please reach out:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong className="text-primary-600">Email:</strong> support@verdancesystemsai.com</p>
                  <p><strong className="text-primary-600">Phone:</strong> +27 73 996 1535</p>
                  <p><strong className="text-primary-600">WhatsApp:</strong> +27 73 996 1535</p>
                </div>
              </section>

              <section className="mt-12 bg-gradient-to-br from-primary-50 to-turquoise-50 rounded-2xl p-8 border border-primary-200">
                <h2 className="text-2xl font-bold text-primary-600 mb-4">
                  Data Protection Commitment
                </h2>
                <p>
                  Verdance Systems AI is committed to protecting your privacy and maintaining transparent data practices. We comply with GDPR, POPIA, and other international data protection regulations to ensure your information is secure and used responsibly.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}