import type { ReactNode } from "react";
import { WhatsAppIcon } from "@/components/sections/v4/WhatsAppIcon";

/**
 * Example conversations for the unified inbox demo.
 * Invented first names and generic businesses only. Every reply time is
 * well under 60 seconds, because that is the promise.
 */

export type Outcome = { label: "Answered" | "Booked" | "Followed up"; detail: string };

export type Channel = {
  key: string;
  label: string;
  short: string;
  /** RGB triplet for the channel mark. */
  tint: string;
  icon: ReactNode;
  from: string;
  /** Clock time the enquiry lands, HH:MM:SS. */
  at: string;
  ask: string;
  reply: string;
  /** Seconds to the first reply. Always under 60. */
  secs: number;
  outcomes: [Outcome, Outcome, Outcome];
};

const S = 18;

export const CHANNELS: Channel[] = [
  {
    key: "whatsapp", label: "WhatsApp", short: "WhatsApp", tint: "37, 211, 102",
    icon: <WhatsAppIcon className="h-[18px] w-[18px]" />,
    from: "Thandi", at: "08:14:09",
    ask: "Morning. Is Saturday still open for a fitting?",
    reply: "Morning Thandi. It is. I have 09:00 or 11:30. Which suits you?",
    secs: 4,
    outcomes: [
      { label: "Answered", detail: "Two times offered" },
      { label: "Booked", detail: "Fitting, Sat 11:30" },
      { label: "Followed up", detail: "Reminder set for Fri 17:00" },
    ],
  },
  {
    key: "calls", label: "Phone calls", short: "Calls", tint: "52, 199, 89",
    icon: (
      <svg width={S} height={S} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z" />
      </svg>
    ),
    from: "Missed call", at: "19:02:41",
    ask: "Missed call at 19:02. No voicemail left.",
    reply: "Sorry we missed your call. How can we help? Reply here and we will sort it tonight.",
    secs: 8,
    outcomes: [
      { label: "Answered", detail: "Texted back" },
      { label: "Booked", detail: "Call back, Tue 08:30" },
      { label: "Followed up", detail: "Notes passed to the team" },
    ],
  },
  {
    key: "web", label: "Website chat and forms", short: "Website", tint: "91, 143, 255",
    icon: (
      <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 8.5h18M7 6.3h.01M9.5 6.3h.01" strokeLinecap="round" />
        <path d="M7 13h7M7 16h4" strokeLinecap="round" />
      </svg>
    ),
    from: "Pieter", at: "10:41:22",
    ask: "Quote request: full kitchen refit. About 4 by 3 metres.",
    reply: "Thanks Pieter. Two quick questions so we can quote today: do you want new appliances too, and when would you like it done?",
    secs: 6,
    outcomes: [
      { label: "Answered", detail: "Quote questions sent" },
      { label: "Booked", detail: "Site visit, Thu 10:00" },
      { label: "Followed up", detail: "Quote chased Mon 09:00" },
    ],
  },
  {
    key: "instagram", label: "Instagram", short: "Instagram", tint: "221, 42, 123",
    icon: (
      <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
    from: "Lerato", at: "21:37:05",
    ask: "Do you do weekend appointments?",
    reply: "We do, Saturday 09:00 to 13:00. Shall I book you in?",
    secs: 5,
    outcomes: [
      { label: "Answered", detail: "Weekend hours shared" },
      { label: "Booked", detail: "Sat 09:30" },
      { label: "Followed up", detail: "Reminder set for Fri" },
    ],
  },
  {
    key: "facebook", label: "Facebook", short: "Facebook", tint: "24, 119, 242",
    icon: (
      <svg width={S} height={S} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3Z" />
      </svg>
    ),
    from: "Sipho", at: "13:05:50",
    ask: "Do you deliver to Durban?",
    reply: "We do, in 2 to 3 days. Shall I send you the order link?",
    secs: 3,
    outcomes: [
      { label: "Answered", detail: "Delivery times shared" },
      { label: "Booked", detail: "Order placed, Durban" },
      { label: "Followed up", detail: "Tracking sent on dispatch" },
    ],
  },
  {
    key: "email", label: "Email", short: "Email", tint: "234, 67, 53",
    icon: (
      <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="m4 7 8 6 8-6" strokeLinejoin="round" />
      </svg>
    ),
    from: "Anna", at: "06:52:18",
    ask: "Hi, do you have availability in May for 24 people?",
    reply: "Hi Anna. Two weekends are open in May: the 9th and the 23rd. Shall I hold one while you check with the group?",
    secs: 7,
    outcomes: [
      { label: "Answered", detail: "Open dates sent" },
      { label: "Booked", detail: "23 May held for 48 hours" },
      { label: "Followed up", detail: "Checked in next morning" },
    ],
  },
  {
    key: "portals", label: "Portals and listings", short: "Portals", tint: "236, 140, 28",
    icon: (
      <svg width={S} height={S} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-5H9v5H5a1 1 0 0 1-1-1v-8Z" strokeLinejoin="round" />
      </svg>
    ),
    from: "Marco", at: "17:20:33",
    ask: "Is the 3-bed in Rondebosch still available?",
    reply: "It is, Marco. Can you view it on Saturday at 11:30?",
    secs: 4,
    outcomes: [
      { label: "Answered", detail: "Availability confirmed" },
      { label: "Booked", detail: "Viewing, Sat 11:30" },
      { label: "Followed up", detail: "Reminder set for Fri" },
    ],
  },
];

/** Adds whole seconds to an HH:MM:SS clock string. */
export function addSecs(at: string, secs: number): string {
  const [h, m, s] = at.split(":").map(Number);
  const t = (h * 3600 + m * 60 + s + secs) % 86400;
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(t / 3600))}:${p(Math.floor((t % 3600) / 60))}:${p(t % 60)}`;
}
