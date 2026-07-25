import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | Verdance Systems AI",
  description:
    "How Verdance Systems AI collects, uses and protects the information you share with us.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="July 2026">
      <LegalSection>
        <p>
          This policy explains what information Verdance Systems AI
          (&ldquo;Verdance&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects
          when you use this website or contact us, how we use it, and the choices
          you have. We keep it plain and we keep it minimal.
        </p>
      </LegalSection>

      <LegalSection heading="What we collect">
        <ul>
          <li>
            <strong>Details you give us.</strong> When you book a consult, submit
            a form, message us on WhatsApp, or email us, we collect the
            information you provide - typically your name, business name, contact
            details and what you&apos;re looking for.
          </li>
          <li>
            <strong>Basic usage data.</strong> Like most websites, our hosting
            may record standard technical information (such as your device type
            and pages viewed) to keep the site secure and working.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How we use it">
        <ul>
          <li>To respond to your enquiry and run your free consult.</li>
          <li>To prepare and deliver the systems and services you ask us to.</li>
          <li>To keep you updated about your project, with your consent.</li>
        </ul>
        <p>We do not sell your information, and we don&apos;t send spam.</p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          We only share your information with the trusted service providers we
          use to run our business (for example, our CRM, booking and messaging
          tools), and only so we can respond to and serve you. We may also
          disclose information if required by law.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We keep your information only as long as needed to respond to you,
          deliver our services, and meet any legal obligations - after which we
          delete or anonymise it.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can ask us to access, correct or delete the information we hold
          about you, or to stop contacting you, at any time. Email{" "}
          <a href="mailto:daniel@verdancesystemsai.com">daniel@verdancesystemsai.com</a>{" "}
          and we&apos;ll take care of it.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          We use only the cookies needed for the site to function and to
          understand basic, anonymous usage. We don&apos;t use them to build
          advertising profiles.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:daniel@verdancesystemsai.com">daniel@verdancesystemsai.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
