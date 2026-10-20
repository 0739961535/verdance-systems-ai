"use client";

import {
  BarChart3,
  Bell,
  CalendarCheck,
  ClipboardList,
  Columns3,
  MessageCircle,
  Search,
  Tag,
  UserRound,
  Workflow,
  Zap,
} from "lucide-react";
import { ProofTabs, type ProofTab } from "./ProofTabs";
import { BriefForm, Flow, Frame, HandoverChip, Item, Msg, OrderCard, Pipeline, Report } from "./panels";

/* ---------- South African e-commerce brand ---------- */

const ECOM_TABS: ProofTab[] = [
  {
    id: "chat",
    label: "Chat",
    icon: MessageCircle,
    panel: (
      <Frame icon={MessageCircle} title="Store assistant" sub="Website chat · replies in under a minute">
        <Msg side="in">Hi, where&apos;s my order? It&apos;s #10482.</Msg>
        <Msg side="out">Hi James, I&apos;ve found it. It&apos;s with the courier now:</Msg>
        <OrderCard />
        <Msg side="in">Can I change the delivery address?</Msg>
        <HandoverChip>Handed to the team, a person replies next</HandoverChip>
      </Frame>
    ),
  },
  {
    id: "pipeline",
    label: "Pipeline",
    icon: Columns3,
    panel: (
      <Frame icon={Columns3} title="Enquiry pipeline" sub="Every conversation has a stage">
        <Pipeline
          lanes={[
            { stage: "New enquiry", count: 3, name: "Lerato", note: "Bulk order for an event", tag: "Email" },
            { stage: "Answered", count: 8, name: "James", note: "Delivery times to Durban", tag: "Chat" },
            { stage: "Order question", count: 5, name: "Thabo", note: "Order #10517 tracking", tag: "WhatsApp" },
            { stage: "Follow-up", count: 2, name: "Anna", note: "Left a cart, asked about sizes", tag: "Email" },
            { stage: "Won / Closed", count: 12, name: "Sipho", note: "Reordered, thanked the team", tag: "WhatsApp" },
          ]}
        />
      </Frame>
    ),
  },
  {
    id: "automations",
    label: "Automations",
    icon: Workflow,
    panel: (
      <Frame icon={Workflow} title="Automations" sub="What happens when a message lands" stagger={0.09}>
        <Flow
          steps={[
            { icon: Zap, title: "New WhatsApp message", note: "Also website chat and email", trigger: true },
            { icon: MessageCircle, title: "Assistant replies in under a minute", note: "In the brand's own voice" },
            { icon: Search, title: "Order lookup", note: "Status and tracking from the store" },
            { icon: Tag, title: "Tag + pipeline stage", note: "Order question, follow-up or won" },
            { icon: UserRound, title: "Hand to team if needed", note: "Returns, changes, anything unusual" },
          ]}
        />
      </Frame>
    ),
  },
  {
    id: "report",
    label: "Report",
    icon: BarChart3,
    panel: (
      <Frame icon={BarChart3} title="Monthly report" sub="Sent at the start of each month">
        <Report />
      </Frame>
    ),
  },
];

/* ---------- South African luxury home design and build studio ---------- */

const STUDIO_TABS: ProofTab[] = [
  {
    id: "chat",
    label: "Chat",
    icon: MessageCircle,
    panel: (
      <Frame icon={MessageCircle} title="Studio assistant" sub="Website chat · replies in under a minute">
        <Msg side="in">Hi, we&apos;d like to build a custom home. How does it start?</Msg>
        <Msg side="out">Lovely. Three quick questions so the team can prepare.</Msg>
        <Item className="flex justify-end">
          <ul className="pv-inner grid w-[86%] gap-1.5 rounded-[14px] p-3 text-[0.76rem]">
            {[
              ["Where is the plot?", "Western Cape"],
              ["Budget range?", "Shared"],
              ["When to start?", "Within 12 months"],
            ].map(([q, a]) => (
              <li key={q} className="flex items-center justify-between gap-2">
                <span className="pv-muted truncate">{q}</span>
                <span className="shrink-0 font-semibold text-[#C9D6FF]">{a}</span>
              </li>
            ))}
          </ul>
        </Item>
        <Item className="flex justify-end">
          <div className="pv-out flex w-[86%] items-center gap-2.5 rounded-[14px] rounded-tr-[4px] px-3 py-2.5">
            <CalendarCheck size={18} className="shrink-0 text-[#DCE6FF]" aria-hidden />
            <span className="min-w-0 text-[0.8rem] leading-tight">
              <span className="block font-semibold">Site meeting booked</span>
              <span className="block text-white/70">Thursday 10:00, at the plot</span>
            </span>
          </div>
        </Item>
        <HandoverChip>The team takes it from here</HandoverChip>
      </Frame>
    ),
  },
  {
    id: "pipeline",
    label: "Pipeline",
    icon: Columns3,
    panel: (
      <Frame icon={Columns3} title="Project pipeline" sub="From first brief to signed">
        <Pipeline
          lanes={[
            { stage: "New brief", count: 2, name: "Naledi", note: "New build, four bedrooms", tag: "Form" },
            { stage: "Qualified", count: 3, name: "James", note: "Renovation, plans approved", tag: "Chat" },
            { stage: "Site meeting", count: 1, name: "Lerato", note: "Thursday 10:00 at the plot", tag: "Booked" },
            { stage: "Proposal", count: 2, name: "David", note: "Proposal sent, call next week", tag: "Email" },
            { stage: "Signed", count: 1, name: "Anna", note: "Design stage started", tag: "Won" },
          ]}
        />
      </Frame>
    ),
  },
  {
    id: "automations",
    label: "Automations",
    icon: Workflow,
    panel: (
      <Frame icon={Workflow} title="Automations" sub="What happens when a brief comes in" stagger={0.09}>
        <Flow
          steps={[
            { icon: ClipboardList, title: "Brief form submitted", note: "From the website, day or night", trigger: true },
            { icon: Zap, title: "Instant reply", note: "In under a minute, in the studio's voice" },
            { icon: MessageCircle, title: "Qualifying questions", note: "Plot, budget and timeline" },
            { icon: Columns3, title: "Pipeline stage", note: "New brief to qualified to site meeting" },
            { icon: Bell, title: "Reminder before the meeting", note: "The day before, to both sides" },
          ]}
        />
      </Frame>
    ),
  },
  {
    id: "brief",
    label: "Brief form",
    icon: ClipboardList,
    panel: (
      <Frame icon={ClipboardList} title="Project brief" sub="On the studio's new website">
        <BriefForm />
      </Frame>
    ),
  },
];

export function EcomVisuals() {
  return <ProofTabs label="What we built for the e-commerce brand" tabs={ECOM_TABS} />;
}

export function StudioVisuals() {
  return <ProofTabs label="What we built for the design and build studio" tabs={STUDIO_TABS} />;
}
