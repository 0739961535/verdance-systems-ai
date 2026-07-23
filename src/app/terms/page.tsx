import type { Metadata } from "next";
import { LegalLayout, LegalSection } from "@/components/layout/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service | Verdance Systems AI",
  description:
    "The terms that apply when you use the Verdance Systems AI website and services.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="July 2026">
      <LegalSection>
        <p>
          These terms apply when you use this website or work with Verdance
          Systems AI (&ldquo;Verdance&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;).
          By using the site or booking a consult, you agree to them.
        </p>
      </LegalSection>

      <LegalSection heading="What we do">
        <p>
          Verdance builds and runs AI systems — such as an AI receptionist that
          answers calls and messages, follows up with leads, and books
          appointments — for local businesses. Any project begins with a free
          consult and a written plan of exactly what we&apos;d build. Nothing is
          committed until you agree to that plan.
        </p>
      </LegalSection>

      <LegalSection heading="The free consult">
        <p>
          The consult and the plan we prepare are free and carry no obligation.
          They&apos;re there to help you decide — you&apos;re under no pressure to
          proceed.
        </p>
      </LegalSection>

      <LegalSection heading="Results">
        <p>
          We build our systems to capture more enquiries and booked jobs, and we
          work hard to make them perform. However, results depend on many factors
          specific to your business, so we can&apos;t guarantee any particular
          outcome, revenue figure, or number of bookings.
        </p>
      </LegalSection>

      <LegalSection heading="Your responsibilities">
        <p>
          To run your system, you agree to give us accurate information and the
          access we need to the tools involved (for example your phone, calendar
          or messaging accounts), and to use the system lawfully and in line with
          the terms of any third-party platforms it connects to.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          The content, branding and code of this website belong to Verdance.
          Ownership of the systems we build for you is set out in your individual
          project agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Liability">
        <p>
          The website and its content are provided &ldquo;as is.&rdquo; To the
          fullest extent permitted by law, Verdance is not liable for any
          indirect or consequential loss arising from your use of the site.
          Nothing in these terms limits liability that cannot be limited by law.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update these terms from time to time. The current version will
          always be posted on this page.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms? Email{" "}
          <a href="mailto:daniel@verdancesystemsai.com">daniel@verdancesystemsai.com</a>.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
