"use client";

import { motion, useReducedMotion } from "framer-motion";

type PanelVariant = "chat" | "voice" | "metric" | "calendar" | "widget";

interface FloatingUIPanelProps {
  variant: PanelVariant;
  className?: string;
  style?: React.CSSProperties;
  floatOffset?: number;
  floatDuration?: number;
  floatDelay?: number;
}

function ChatPanel() {
  return (
    <div className="flex flex-col gap-2 min-w-[200px]">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 rounded-full bg-[#00D4C8] animate-[glow-pulse_2s_ease-in-out_infinite]" />
        <span className="text-[0.65rem] font-semibold tracking-wide text-[#8A9AB0] uppercase">WhatsApp AI</span>
      </div>
      <div className="flex gap-2 items-end">
        <div className="w-6 h-6 rounded-full bg-[rgba(30,143,255,0.2)] flex items-center justify-center shrink-0">
          <span className="text-[0.5rem] text-[#1E8FFF] font-bold">C</span>
        </div>
        <div className="bg-[rgba(var(--hairline-rgb),0.06)] rounded-lg rounded-bl-sm px-3 py-2 max-w-[140px]">
          <p className="text-[0.7rem] text-[#E8EDF5]">Hi, I need a quote please</p>
        </div>
      </div>
      <div className="flex gap-2 items-end justify-end">
        <div className="bg-gradient-to-r from-[rgba(30,143,255,0.2)] to-[rgba(0,212,200,0.15)] rounded-lg rounded-br-sm px-3 py-2 max-w-[160px]">
          <p className="text-[0.7rem] text-[#E8EDF5]">Got it — let me pull that up for you</p>
        </div>
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#1E8FFF] to-[#00D4C8] flex items-center justify-center shrink-0">
          <span className="text-[0.5rem] text-[color:var(--color-ink)] font-bold">V</span>
        </div>
      </div>
      <div className="flex gap-2 items-end">
        <div className="w-6 h-6 rounded-full bg-[rgba(30,143,255,0.2)] flex items-center justify-center shrink-0">
          <span className="text-[0.5rem] text-[#1E8FFF] font-bold">C</span>
        </div>
        <div className="bg-[rgba(0,212,200,0.08)] border border-[rgba(0,212,200,0.2)] rounded-lg rounded-bl-sm px-3 py-2">
          <p className="text-[0.7rem] text-[#00D4C8] font-medium">✓ Booking confirmed for tomorrow 10am</p>
        </div>
      </div>
    </div>
  );
}

function VoicePanel() {
  const bars = [0.3, 0.7, 0.5, 1, 0.4, 0.8, 0.6, 0.9, 0.45, 0.75];
  return (
    <div className="flex flex-col gap-3 min-w-[170px]">
      <div className="flex items-center justify-between">
        <span className="text-[0.65rem] font-semibold tracking-wide text-[#8A9AB0] uppercase">Voice AI</span>
        <span className="flex items-center gap-1.5 text-[0.65rem] text-[#00D4C8] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00D4C8] animate-[glow-pulse_1.5s_ease-in-out_infinite]" />
          Active
        </span>
      </div>
      <div className="flex items-end gap-1 h-10">
        {bars.map((h, i) => (
          <div
            key={i}
            className="w-1.5 rounded-full bg-gradient-to-t from-[#1E8FFF] to-[#00D4C8]"
            style={{
              height: `${h * 100}%`,
              animation: `waveform ${0.6 + i * 0.1}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>
      <p className="text-[0.65rem] text-[#8A9AB0]">Handling <span className="text-[#E8EDF5] font-semibold">3 calls</span> right now</p>
    </div>
  );
}

function MetricPanel() {
  return (
    <div className="flex flex-col gap-2 min-w-[160px]">
      <p className="text-[0.65rem] font-semibold tracking-wide text-[#8A9AB0] uppercase">This Week</p>
      <div className="flex items-baseline gap-2">
        <span className="font-display font-bold text-[2rem] leading-none text-[#E8EDF5]">47</span>
        <span className="text-[#8A9AB0] text-sm">leads captured</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[0.7rem] font-semibold text-[#00D4C8] bg-[rgba(0,212,200,0.12)] border border-[rgba(0,212,200,0.2)] rounded-full px-2 py-0.5">
          +23% vs last week
        </span>
      </div>
      <div className="mt-1 h-1 rounded-full bg-[rgba(var(--hairline-rgb),0.06)] overflow-hidden">
        <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-[#1E8FFF] to-[#00D4C8]" />
      </div>
    </div>
  );
}

function CalendarPanel() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const slots = [null, null, true, null, true, null, null, null, true, null, null, null, null, null];
  return (
    <div className="flex flex-col gap-2.5 min-w-[160px]">
      <div className="flex items-center justify-between">
        <span className="text-[0.65rem] font-semibold tracking-wide text-[#8A9AB0] uppercase">Smart Scheduler</span>
        <span className="text-[0.65rem] text-[#1E8FFF]">April</span>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div key={i} className="text-center text-[0.55rem] text-[#3D5270] font-medium pb-1">{d}</div>
        ))}
        {slots.map((booked, i) => (
          <div
            key={i}
            className={`aspect-square rounded text-[0.6rem] flex items-center justify-center font-medium transition-colors ${
              booked
                ? "bg-gradient-to-br from-[#1E8FFF] to-[#00D4C8] text-[color:var(--color-ink)]"
                : "text-[#8A9AB0] hover:bg-[rgba(var(--hairline-rgb),0.05)]"
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <p className="text-[0.65rem] text-[#8A9AB0]">
        <span className="text-[#E8EDF5] font-semibold">2 appointments</span> booked today
      </p>
    </div>
  );
}

function WidgetPanel() {
  return (
    <div className="flex flex-col gap-2 min-w-[180px]">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1E8FFF] to-[#00D4C8] flex items-center justify-center">
          <span className="text-[color:var(--color-ink)] text-[0.6rem] font-bold">V</span>
        </div>
        <div>
          <p className="text-[0.65rem] font-semibold text-[#E8EDF5]">Verdance Assistant</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4C8]" />
            <span className="text-[0.55rem] text-[#8A9AB0]">Online</span>
          </div>
        </div>
      </div>
      <div className="bg-[rgba(30,143,255,0.08)] border border-[rgba(30,143,255,0.15)] rounded-xl rounded-tl-sm p-2.5">
        <p className="text-[0.7rem] text-[#E8EDF5]">Hi there! How can I help you today? 👋</p>
      </div>
      <div className="flex items-center gap-1.5 px-2">
        <div className="flex gap-0.5">
          {[0.2, 0.5, 0.8].map((d, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#1E8FFF]"
              style={{ animation: `typing-dot 1.2s ease-in-out infinite`, animationDelay: `${d}s` }}
            />
          ))}
        </div>
        <span className="text-[0.6rem] text-[#3D5270]">typing...</span>
      </div>
    </div>
  );
}

const panelContent: Record<PanelVariant, React.ReactNode> = {
  chat: <ChatPanel />,
  voice: <VoicePanel />,
  metric: <MetricPanel />,
  calendar: <CalendarPanel />,
  widget: <WidgetPanel />,
};

export function FloatingUIPanel({ variant, className = "", style, floatOffset = 8, floatDuration = 4, floatDelay = 0 }: FloatingUIPanelProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`rounded-2xl backdrop-blur-xl bg-[rgba(7,20,40,0.85)] border border-[rgba(30,143,255,0.18)] shadow-[0_8px_32px_rgba(0,0,0,0.5),0_1px_0_rgba(var(--hairline-rgb),0.06)_inset] p-4 ${className}`}
      style={style}
      animate={reducedMotion ? undefined : { y: [0, -floatOffset, 0] }}
      transition={reducedMotion ? undefined : { duration: floatDuration, ease: "easeInOut", repeat: Infinity, delay: floatDelay }}
    >
      {panelContent[variant]}
    </motion.div>
  );
}
