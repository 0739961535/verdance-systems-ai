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
    <LegalLayout title="Privacy Policy" updated="October 2026">
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
            <strong>Facebook and Instagram lead forms.</strong> If you fill in one
            of our forms on Facebook or Instagram, Meta passes us your name, business
            name, contact details and your answers, together with your consent to be
            contacted.
          </li>
          <li>
            <strong>Public business details.</strong> When we email a business about
            our services, we use business contact details it publishes itself, such
            as on its own website.
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
          <li>
            To prepare your free Operations Map and contact you about it and about
            our services by email, WhatsApp and SMS. We only phone you if you book or
            ask for a call. Reply STOP or &ldquo;no&rdquo; at any time and we stop.
          </li>
        </ul>
        <p>We do not sell your information, and we don&apos;t send spam.</p>
      </LegalSection>

      <LegalSection heading="Who we share it with">
        <p>
          We only share your information with the trusted service providers we
          use to run our business (for example, our CRM, booking and messaging
          tools, hosting and the AI tools we build with), and only so we can respond
          to and serve you. Some of these providers process information outside
          South Africa, including in the European Union and the United States; we
          use them under data processing agreements that protect your information.
          We may also disclose information if required by law.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <p>
          We keep your information only as long as needed to respond to you,
          deliver our services, and meet any legal obligations - after which we
          delete or anonymise it. Audit and map answers are deleted after 24
          months. If you ask us to stop contacting you, we keep only your contact
          detail on a do-not-contact list, so that we never contact you again.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          You can ask us to access, correct or delete the information we hold
          about you, or to stop contacting you, at any time. Email{" "}
          <a href="mailto:daniel@verdancesystemsai.com">daniel@verdancesystemsai.com</a>{" "}
          and we&apos;ll take care of it. If you are not happy with how we handled
          your information, you may complain to the Information Regulator (South
          Africa) at inforegulator.org.za or, in the United Kingdom, to the ICO.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          We use only the cookies needed for the site to function and to
          understand basic, anonymous usage. We don&apos;t use them to build
          advertising profiles, and we don&apos;t use an advertising pixel on this
          site.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Our Information Officer is Daniel Bouwer. Questions about this policy or
          your information? Email{" "}
          <a href="mailto:daniel@verdancesystemsai.com">daniel@verdancesystemsai.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
