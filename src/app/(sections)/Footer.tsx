import Section from '../(components)/Section';
import Container from '../(components)/Container';

/**
 * Footer component with contact information, legal links, and POPIA compliance
 * Clean, professional layout with essential business information
 * Includes phone, email, and legal compliance messaging
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-white py-12">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              Verdance Systems AI
            </h3>
            <p className="text-neutral-300 leading-relaxed">
              Intelligent automation systems that turn leads into customers
              and deliver predictable revenue growth.
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <div className="space-y-2 text-neutral-300">
              <p>
                <span className="font-medium">Cell:</span>{' '}
                <a
                  href={`tel:+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '27739961535'}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  +{process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '27 73 996 1535'}
                </a>
              </p>
              <p>
                <span className="font-medium">Email:</span>{' '}
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'verdancesystems@gmail.com'}`}
                  className="hover:text-white transition-colors duration-200"
                >
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'verdancesystems@gmail.com'}
                </a>
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Legal
            </h4>
            <div className="space-y-2">
              <a
                href="#terms"
                className="block text-neutral-300 hover:text-white transition-colors duration-200"
              >
                Terms & Conditions
              </a>
              <a
                href="#privacy"
                className="block text-neutral-300 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © {currentYear} Verdance Systems AI. All rights reserved.
            </p>

            {/* POPIA Compliance */}
            <p className="text-neutral-400 text-xs max-w-md text-center lg:text-right">
              By using our assistant, you consent to receive WhatsApp/SMS about your
              consultation (POPIA-compliant).
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}