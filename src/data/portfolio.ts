/**
 * /portfolio: the real builds, anonymised. `name` is null on purpose: a
 * client's real name goes in only after their written OK, and the page then
 * shows it in place of `label`. No numbers until the same OK.
 */

export type CaseImage = { src: string; width: number; height: number; alt: string };

export type PortfolioCase = {
  id: string;
  /** Real client name, only after written OK. Null keeps it private. */
  name: string | null;
  /** The public label used while `name` is null. */
  label: string;
  status: "Live" | "In build" | "Starting soon";
  tags: string[];
  outcome: string;
  built: string;
  steps: { title: string; body: string }[];
  does: string[];
  tools: string[];
  depth: { href: string; label: string };
  /** Wide screen (laptop frame) and tall screen (phone frame). Paths without extension; AVIF and WebP both exist. */
  wide: CaseImage;
  tall: CaseImage;
  /** Show a drawn stand-in instead of the screenshots (no client OK to show the real page yet). */
  drawn?: boolean;
  caption: string;
  /**
   * Proof line: "<n> conversations handled". Rendered only when it is a number;
   * null renders nothing at all.
   */
  conversationsHandled?: number | null;
};

export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: "ecom",
    name: null,
    label: "A South African e-commerce brand",
    status: "Live",
    tags: ["Assistant", "Automation"],
    outcome: "Customer questions answered across all their channels: WhatsApp, Facebook, Instagram, email and web chat, 24/7.",
    built:
      "An assistant that answers customers on WhatsApp, Facebook, Instagram, email and web chat in the brand's voice, one inbox for every channel, website forms that go straight into the inbox and pipeline, and a live results page the owner can open any time.",
    steps: [
      { title: "A customer writes in", body: "On WhatsApp, website chat, email, Instagram, Facebook or TikTok. All of it lands in one inbox." },
      { title: "The assistant replies", body: "On every channel within 60 seconds, day, night and weekends, in the brand's voice." },
      { title: "It answers the common questions", body: "Products, delivery and the business, from the brand's own information. Order lookups are the next phase, built and tested." },
      { title: "A person takes over when it matters", body: "Problems and big orders go to a named person with the details already collected." },
      { title: "The owner sees it all", body: "A results page and a monthly report show what was answered and what was handed over." },
    ],
    does: [
      "After-hours and weekend questions no longer wait for Monday.",
      "The team spends its time on the conversations that need a person.",
      "Every channel in one place, counted.",
    ],
    tools: ["WhatsApp", "Website chat", "Email", "Instagram", "Facebook", "TikTok", "Online store"],
    depth: { href: "/services/conversation-ai", label: "How message replies work" },
    wide: {
      src: "/work/portfolio/ecom-desktop",
      width: 1280,
      height: 800,
      alt: "The brand's live results page: what runs today, after-hours conversations, hours saved and the monthly report, with the name and every number hidden",
    },
    tall: {
      src: "/work/portfolio/ecom-phone",
      width: 480,
      height: 960,
      alt: "The same results page on a phone, with the name and every number hidden",
    },
    // TODO(Daniel): the real screenshots stay off until Peter gives written OK. They were removed from public/ in this commit; restore them from git history, then set drawn to false.
    drawn: true,
    caption: "Drawn from their results page. Names and numbers hidden.",
    // TODO(Daniel): number only after the client's written OK. Until then it stays null and nothing shows.
    conversationsHandled: null as number | null,
  },
  {
    id: "studio",
    name: null,
    label: "A luxury home design and build studio",
    status: "Live",
    tags: ["Website", "Enquiry flow"],
    outcome: "A premium website that turns visitors into project briefs, ready to quote.",
    built:
      "A fast, quiet website that lets the houses do the talking, and a project brief form that asks the questions the studio needs before a first meeting.",
    steps: [
      { title: "A visitor finds the studio", body: "From Google, a referral or social. The site loads fast on a phone and reads well." },
      { title: "They browse the work", body: "Each house gets its own page with the photographs up front and the details beside them." },
      { title: "They send a brief", body: "Plot, project type, timeline and budget range, in a few taps. Or they tap WhatsApp." },
      { title: "The studio gets a ready brief", body: "It lands in the inbox and the customer records, with a reply sent within 60 seconds." },
      { title: "The first call is about the house", body: "Not about the basics. The brief is already there." },
    ],
    does: [
      "Enquiries arrive with the details needed to quote.",
      "Fewer back-and-forth emails before a first meeting.",
      "A site the owner is proud to send people to.",
    ],
    tools: ["Website", "Project brief form", "WhatsApp", "Email", "Customer records"],
    depth: { href: "/services/websites-build", label: "How a website build works" },
    wide: {
      src: "/work/portfolio/studio-1280",
      width: 1280,
      height: 800,
      alt: "A project page from the studio's website: a modern house at dusk with four interior and pool photographs, the name hidden",
    },
    tall: {
      src: "/work/portfolio/studio-phone",
      width: 480,
      height: 960,
      alt: "The studio's home page on a phone: luxury custom home design and construction, with WhatsApp and portfolio buttons",
    },
    caption: "The live site. The studio's name, logo, people and places are hidden.",
  },
  {
    id: "training",
    name: null,
    label: "A training institute",
    // TODO(Daniel): switch to "In build" when the deposit lands.
    status: "Starting soon",
    tags: ["Website", "Bookings", "Follow-up"],
    outcome: "Learners find a course, apply from their phone and hear back on WhatsApp.",
    built:
      "A premium website with the full course catalogue, an online application that works on any phone, and follow-ups that keep each applicant moving. A WhatsApp assistant follows once bookings prove their value.",
    steps: [
      { title: "A learner searches for a course", body: "By name or by area, with the next intake shown up front." },
      { title: "They apply on their phone", body: "Course, contact details and documents, in about five minutes. No printing, no trip to the office." },
      { title: "The institute gets a complete application", body: "In one place, with nothing missing." },
      { title: "Follow-ups go out", body: "Reminders for missing documents and a note when the application is reviewed." },
      { title: "Next: WhatsApp", body: "Answers to course questions on WhatsApp, added as the institute grows." },
    ],
    does: [
      "Applications arrive complete.",
      "Learners far from the office can apply.",
      "Staff stop chasing paperwork by hand.",
    ],
    tools: ["Website", "Online applications", "Email", "WhatsApp (next phase)"],
    depth: { href: "/services/websites-build", label: "How a website build works" },
    wide: {
      src: "/work/portfolio/training-courses",
      width: 1024,
      height: 640,
      alt: "The institute's course catalogue: course cards for hospitality qualifications with a next intake badge, the name hidden",
    },
    tall: {
      src: "/work/portfolio/training-apply",
      width: 480,
      height: 920,
      alt: "The online application on a phone, step one of four: course and contact details, labelled as an example form",
    },
    caption: "From the design for their build. The institute's name, logo and people are left out.",
  },
];

/** The proof line for a case, or null when there is no approved number yet (then nothing renders). */
export function conversationsProof(n: number | null | undefined): string | null {
  return typeof n === "number" && Number.isFinite(n) ? `${n.toLocaleString("en-GB")} conversations handled` : null;
}
