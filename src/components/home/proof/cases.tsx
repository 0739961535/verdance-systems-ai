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
import { BriefForm, Flow, Frame, HandoverChip, Item, Msg, Pipeline, Report } from "./panels";

/* ---------- South African e-commerce brand ---------- */

const ECOM_TABS: ProofTab[] = [
  {
    id: "chat",
    label: "Chat",
    icon: MessageCircle,
    panel: (
      <Frame icon={MessageCircle} title="Store assistant" sub="Website chat · replies in under a minute" stagger={0.9}>
        <Msg side="in">Hi, do you deliver to Durban? How long does it take?</Msg>
        <Msg side="out">We do. Durban is 2 to 3 working days, and orders placed before 12:00 go out the same day.</Msg>
        <Msg side="in">Can I collect instead?</Msg>
        <Msg side="out">Yes, collection is free from the warehouse, weekdays 08:00 to 16:00.</Msg>
        <Msg side="in">My last order arrived damaged.</Msg>
        <HandoverChip>Handed to the team, a person replies next</HandoverChip>
      </Frame>
    ),
  },
  {
    id: "pipeline",
    label: "Pipeline",
    icon: Columns3,
    panel: (
      <Frame icon={Columns3} title="Enquiry pipeline" sub="Every conversation has a stage" stagger={0.08}>
        <Pipeline
          columns={[
            { stage: "New", count: 2, cards: [
              { name: "Thabo", note: "Delivery times to Cape Town", tag: "WA" },
              { name: "Anna", note: "Asked about sizes", tag: "Email" },
            ] },
            { stage: "Answered", count: 7, cards: [
              { name: "James", note: "Delivery times to Durban", tag: "Chat" },
              { name: "Zanele", note: "Return label sent", tag: "WA" },
            ] },
            { stage: "Won", count: 11, cards: [
              { name: "Sipho", note: "Reordered, thanked the team", tag: "WA" },
              { name: "Megan", note: "Paid for a gift set", tag: "Chat" },
            ] },
          ]}
          mover={{ name: "Lerato", tag: "Email", notes: ["Bulk order for an event", "Replied in under a minute", "Order placed"] }}
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
            { icon: Search, title: "Answers from the store", note: "Products, delivery and collection" },
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
      <Frame icon={MessageCircle} title="Studio assistant" sub="Website chat · replies in under a minute" stagger={0.9}>
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
          columns={[
            { stage: "New brief", count: 1, cards: [
              { name: "David", note: "Extension, plans drawn", tag: "Form" },
              { name: "Anna", note: "Renovation in Constantia", tag: "Chat" },
            ] },
            { stage: "Qualified", count: 2, cards: [
              { name: "James", note: "Renovation, plans approved", tag: "Chat" },
              { name: "Thandi", note: "Coastal plot, design first", tag: "Form" },
            ] },
            { stage: "Booked", count: 1, cards: [
              { name: "Bongani", note: "Site meeting Tuesday 14:00" },
              { name: "Lindiwe", note: "Design call, proposal next" },
            ] },
          ]}
          mover={{ name: "Naledi", tag: "Form", notes: ["New build, four bedrooms", "Plot, budget and timeline in", "Site meeting Thursday 10:00"] }}
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
