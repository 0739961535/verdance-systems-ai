/**
 * The Operations Team showcase: capabilities, depth levels and the sample
 * command centre. Shared by the home page section and
 * /services/ai-operations-system.
 *
 * Truth rule: a tile is only shown as available when src/data/services.ts or
 * src/data/aiTeam.ts already states it as part of what we build today.
 * Anything else is marked "On request" (see `onRequest`). Every number in the
 * command centre is sample data and is labelled "Sample" on screen.
 */

import type { LucideIcon } from "lucide-react";
import { BookOpen, Bot, MessageSquareText, Phone, Plug, ShieldCheck, Sunrise, Workflow } from "lucide-react";
import { AI_TEAM_PATH } from "@/data/aiTeam";

export type Capability = {
  icon: LucideIcon;
  title: string;
  body: string;
  href: string;
  /** Not stated as live elsewhere on the site yet: shown with an "On request" tag. */
  onRequest?: boolean;
};

export const OPS_CAPABILITIES: Capability[] = [
  {
    icon: Bot,
    title: "An agent for every job",
    body: "One answers, one follows up, one does the admin, one reports. They pass work to each other.",
    href: AI_TEAM_PATH,
  },
  {
    icon: Plug,
    title: "Connected to your tools",
    body: "Integrates with your CRM, WhatsApp, email, calendar, store and accounting. Anything with an API (a way for software to connect) can be added.",
    href: "/services/custom-builds",
  },
  {
    icon: ShieldCheck,
    title: "Approvals and handover",
    body: "You choose what goes out on its own. Anything important waits for you, and a person takes over when it matters.",
    href: AI_TEAM_PATH,
  },
  {
    icon: Sunrise,
    title: "Morning brief and weekly report",
    body: "A short brief each morning and a report each week: response times, outcomes, and what needs you.",
    href: "/services/analytics-compliance",
  },
  {
    icon: MessageSquareText,
    title: "Ask your business",
    body: "Ask in plain words. The answer comes from your own store, inbox and diary.",
    href: "/services#ask-title",
  },
  {
    icon: BookOpen,
    title: "Knows your business",
    body: "Your prices, rules and tone, so every reply sounds like you and follows your policies.",
    href: "/services/conversation-ai",
  },
  {
    icon: Workflow,
    title: "Custom agents for your workflow",
    body: "The jobs only your business has, built as their own agent and connected to the rest.",
    href: "/services/custom-builds",
  },
  {
    // Voice has a service page but no depth page and nothing in aiTeam.ts
    // says it is part of the team today, so it is offered on request.
    icon: Phone,
    title: "Answers calls and books",
    body: "Picks up when you cannot, answers common questions and books the caller into your diary.",
    href: "/services/voice-ai",
    onRequest: true,
  },
];

export const OPS_DEPTH_LEVELS = [
  { word: "Answer", body: "Every enquiry answered within 60 seconds, day, night and weekends." },
  { word: "Follow up", body: "Open quotes and quiet enquiries get a timed follow-up, and it stops the moment they reply." },
  { word: "Run the admin", body: "Bookings, notes, invoices and reminders done and kept up to date." },
  { word: "Report", body: "A morning brief and a plain report, with one thing to improve." },
  { word: "A full Operations Team", body: "Answering, follow-up, admin and reporting working together, with you approving what matters." },
] as const;

/* ── Sample command centre (illustration only) ─────────────── */

export type SampleAgent = { name: string; start: number; tasks: string[] };

export const SAMPLE_AGENTS: SampleAgent[] = [
  { name: "Answers", start: 38, tasks: ["Replied to a WhatsApp about delivery", "Sent menus for a March wedding", "Answered a stock question by email"] },
  { name: "Follow-ups", start: 14, tasks: ["Day 3 check-in on a kitchen quote", "Nudged a quiet group booking", "Stopped: the customer replied"] },
  { name: "Admin", start: 22, tasks: ["Filed a booking in the diary", "Updated a customer record", "Drafted an invoice reminder"] },
  { name: "Reports", start: 3, tasks: ["Built this morning's brief", "Updated the week so far", "Flagged a slow reply on Sunday"] },
  { name: "Research", start: 6, tasks: ["Checked a supplier's new terms", "Compared last month's enquiries", "Found three past customers to rebook"] },
];

export const SAMPLE_BRIEF = [
  { n: "12", t: "enquiries answered overnight" },
  { n: "3", t: "quotes due a follow-up today" },
  { n: "2", t: "replies waiting for your approval" },
];

export const SAMPLE_APPROVALS = [
  { app: "WhatsApp", title: "New wedding enquiry", draft: "The 14th is open. Shall I hold it while you come to see the venue?" },
  { app: "Email", title: "Supplier price change", draft: "Thanks for letting us know. Can we keep last year's rate until June?" },
];

export const SAMPLE_ASK = {
  q: "How many enquiries came in after hours this week?",
  a: "23 of 61 came in after 18:00 or at the weekend. Every one was answered in under a minute. Saturday was the busiest.",
  bars: [
    { d: "Mon", v: 2 },
    { d: "Tue", v: 3 },
    { d: "Wed", v: 2 },
    { d: "Thu", v: 4 },
    { d: "Fri", v: 3 },
    { d: "Sat", v: 6 },
    { d: "Sun", v: 3 },
  ],
};
