"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ConicBorder } from "@/components/primitives/ConicBorder";
import { MagneticButton } from "@/components/primitives/MagneticButton";

// ─────────────────────────────────────────────────────────────────
// QUESTION CONFIG — single source of truth for the 8-step flow
// ─────────────────────────────────────────────────────────────────

type FieldKey =
  | "firstName"
  | "businessName"
  | "industry"
  | "leadVolume"
  | "pains"
  | "urgency"
  | "email"
  | "phone"
  | "notes";

type StepBase = {
  key: FieldKey;
  question: string;
  emphasis?: string; // word inside the question to wrap with italic-accent
  hint?: string;
  required?: boolean;
};

type TextStep = StepBase & {
  kind: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  inputMode?: "text" | "email" | "tel";
};

type RadioStep = StepBase & {
  kind: "radio";
  options: string[];
};

type MultiStep = StepBase & {
  kind: "multi";
  options: string[];
  maxSelect?: number;
};

type Step = TextStep | RadioStep | MultiStep;

const STEPS: Step[] = [
  {
    key: "firstName",
    kind: "text",
    question: "What's your first name?",
    emphasis: "name",
    placeholder: "First name",
    inputMode: "text",
    required: true,
  },
  {
    key: "businessName",
    kind: "text",
    question: "What's your business called?",
    emphasis: "called",
    placeholder: "Business name",
    inputMode: "text",
    required: true,
  },
  {
    key: "industry",
    kind: "radio",
    question: "What kind of business is it?",
    emphasis: "kind",
    options: [
      "Medical / dental / wellness",
      "Legal / professional services",
      "Real estate / property",
      "Beauty / aesthetics",
      "Fitness / gyms",
      "Home services / trades",
      "Automotive",
      "Hospitality / restaurants",
      "Other",
    ],
    required: true,
  },
  {
    key: "leadVolume",
    kind: "radio",
    question: "How many enquiries do you get a month?",
    emphasis: "enquiries",
    options: ["Under 50", "50–150", "150–400", "400–1,000", "1,000+"],
    required: true,
  },
  {
    key: "pains",
    kind: "multi",
    question: "What's the biggest leak in your current setup?",
    emphasis: "leak",
    hint: "Pick up to 3.",
    options: [
      "Missed calls",
      "Slow follow-up",
      "Old leads going cold",
      "No reviews coming in",
      "Bookings taking too long",
      "Too much manual work",
      "No clear pipeline",
      "Other",
    ],
    maxSelect: 3,
    required: true,
  },
  {
    key: "urgency",
    kind: "radio",
    question: "How urgent is this?",
    emphasis: "urgent",
    options: [
      "Yesterday — I'm losing money now",
      "Within the next month",
      "Next 1–3 months",
      "Just researching for now",
    ],
    required: true,
  },
  {
    key: "email",
    kind: "email",
    question: "What's the best email to reach you on?",
    emphasis: "email",
    placeholder: "you@yourbusiness.com",
    inputMode: "email",
    required: true,
  },
  {
    key: "phone",
    kind: "tel",
    question: "And a mobile number?",
    emphasis: "mobile",
    placeholder: "+27 ..",
    inputMode: "tel",
    required: true,
  },
  // Bonus optional notes — shown as a separate final question
  {
    key: "notes",
    kind: "textarea",
    question: "Anything else we should know?",
    emphasis: "else",
    hint: "Optional — totally fine to skip.",
    placeholder: "Optional",
    inputMode: "text",
    required: false,
  },
];

const TOTAL = STEPS.length;
const CORE_TOTAL = 8; // count for the headline progress ("step N of 8")

type FormState = {
  firstName: string;
  businessName: string;
  industry: string;
  leadVolume: string;
  pains: string[];
  urgency: string;
  email: string;
  phone: string;
  notes: string;
};

const INITIAL: FormState = {
  firstName: "",
  businessName: "",
  industry: "",
  leadVolume: "",
  pains: [],
  urgency: "",
  email: "",
  phone: "",
  notes: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-().]{6,}$/;

// ─────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────

type Status = "form" | "submitting" | "success" | "error";

export function VSLApplyForm({ bookingUrl }: { bookingUrl: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(INITIAL);
  const [status, setStatus] = useState<Status>("form");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [direction, setDirection] = useState<1 | -1>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = STEPS[step];
  const progress = ((step + 1) / TOTAL) * 100;

  // ── Validation for current step ───────────────────────────────
  const valueForKey = (k: FieldKey) => data[k];
  const isFilled = (s: Step): boolean => {
    const v = valueForKey(s.key);
    if (Array.isArray(v)) return v.length > 0;
    if (!s.required) return true;
    if (s.kind === "email") return EMAIL_RE.test(String(v).trim());
    if (s.kind === "tel") return PHONE_RE.test(String(v).trim());
    return String(v).trim().length > 0;
  };
  const canContinue = isFilled(current);
  const isLast = step === TOTAL - 1;

  // ── Step navigation ───────────────────────────────────────────
  const goNext = () => {
    if (!canContinue) return;
    if (isLast) {
      submit();
      return;
    }
    setDirection(1);
    setStep((s) => Math.min(TOTAL - 1, s + 1));
  };
  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  // ── Auto-advance for radio fields ─────────────────────────────
  const setRadio = (key: FieldKey, value: string) => {
    setData((d) => ({ ...d, [key]: value }));
    // auto-advance shortly after selection
    window.setTimeout(() => {
      setDirection(1);
      setStep((s) => Math.min(TOTAL - 1, s + 1));
    }, 380);
  };

  const toggleMulti = (key: FieldKey, value: string, max?: number) => {
    setData((d) => {
      const arr = (d[key] as string[]) || [];
      if (arr.includes(value)) {
        return { ...d, [key]: arr.filter((v) => v !== value) };
      }
      if (max && arr.length >= max) return d;
      return { ...d, [key]: [...arr, value] };
    });
  };

  // ── Keyboard handling ─────────────────────────────────────────
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (status !== "form") return;
    if (e.key === "Enter" && current.kind !== "textarea") {
      // For text/email/tel inputs Enter advances
      e.preventDefault();
      goNext();
    } else if (e.key === "Escape") {
      // bounce back a step on Escape
      if (step > 0) goBack();
    }
  };

  // ── Focus management — autofocus the first input on every step ─
  useEffect(() => {
    if (status !== "form") return;
    const el = containerRef.current?.querySelector<HTMLElement>(
      "input, textarea, [data-radio-option='0'], [data-multi-option='0']"
    );
    el?.focus({ preventScroll: true });
  }, [step, status]);

  // ── Submit handler ────────────────────────────────────────────
  const submit = async () => {
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/vsl-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) {
        throw new Error(json?.error || "Could not submit application.");
      }
      setStatus("success");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(msg);
      setStatus("error");
    }
  };

  // ── Render ────────────────────────────────────────────────────
  return (
    <ConicBorder
      glow="#4F8DFF"
      duration={11}
      inset={1}
      radius={24}
      surface="var(--color-bg-glass)"
      border="rgba(var(--accent-rgb), 0.18)"
      halo
    >
      <div
        className="relative overflow-hidden"
        style={{ minHeight: 620 }}
        ref={containerRef}
        onKeyDown={onKeyDown}
        tabIndex={-1}
      >
        {/* progress rail */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: "var(--color-hairline)" }}
        />
        <motion.div
          aria-hidden
          className="absolute top-0 left-0 h-px"
          initial={false}
          animate={{ width: status === "success" ? "100%" : `${progress}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              "linear-gradient(90deg, rgba(var(--accent-rgb),0.55), rgba(var(--accent-rgb),1), rgba(var(--accent-rgb),0.55))",
            boxShadow: "0 0 12px rgba(var(--accent-rgb),0.55)",
          }}
        />

        {/* step counter */}
        {status === "form" && (
          <div className="absolute top-5 right-6 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
            {current.key === "notes" ? (
              <>
                <span className="text-[color:var(--color-accent)]">Bonus</span> · Optional
              </>
            ) : (
              <>
                Step <span className="text-[color:var(--color-ink)]">{step + 1}</span> of {CORE_TOTAL}
              </>
            )}
          </div>
        )}

        {/* form area */}
        <div className="px-6 md:px-12 lg:px-16 pt-20 pb-24 md:pt-24 md:pb-28">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            {status === "form" && (
              <motion.div
                key={`step-${step}`}
                custom={direction}
                variants={reduce ? FADE_VARIANTS : SLIDE_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                style={{ willChange: "transform, opacity" }}
              >
                <QuestionView
                  step={current}
                  index={step}
                  value={valueForKey(current.key)}
                  onText={(v) => setData((d) => ({ ...d, [current.key]: v }))}
                  onRadio={(v) => setRadio(current.key, v)}
                  onMulti={(v) => toggleMulti(current.key, v, (current as MultiStep).maxSelect)}
                />
              </motion.div>
            )}

            {status === "submitting" && (
              <motion.div
                key="submitting"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <div className="relative h-10 w-10">
                  <span
                    className="absolute inset-0 rounded-full border-2 animate-spin"
                    style={{
                      borderColor:
                        "rgba(var(--accent-rgb),0.25) rgba(var(--accent-rgb),0.25) rgba(var(--accent-rgb),1) rgba(var(--accent-rgb),0.25)",
                    }}
                  />
                </div>
                <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                  Sending to Daniel
                </p>
                <h3 className="mt-4 font-display text-2xl md:text-3xl text-[color:var(--color-ink)]">
                  Locking your application in...
                </h3>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center max-w-xl mx-auto py-12"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[#FCA5A5]">
                  Couldn&apos;t send it
                </span>
                <h3 className="mt-4 font-display text-3xl md:text-4xl text-[color:var(--color-ink)] leading-tight">
                  Something tripped on our end.
                </h3>
                <p className="mt-4 text-[color:var(--color-ink-soft)]">
                  {errorMsg ||
                    "We couldn't save your application. You can try again, or message Daniel directly on WhatsApp."}
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setStatus("form");
                      setErrorMsg("");
                    }}
                    className="btn btn-outline"
                  >
                    Try again
                  </button>
                  <a
                    href="https://wa.me/27739961535?text=Hi%20Daniel%2C%20my%20application%20on%20your%20site%20didn%27t%20send.%20Can%20we%20chat%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    WhatsApp Daniel instead
                  </a>
                </div>
              </motion.div>
            )}

            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <SuccessState data={data} bookingUrl={bookingUrl} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* bottom controls — back / continue */}
        {status === "form" && (
          <div
            className="absolute inset-x-0 bottom-0 px-6 md:px-12 lg:px-16 py-5 flex items-center justify-between border-t"
            style={{ borderColor: "var(--color-hairline)" }}
          >
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-[color:var(--color-ink-soft)] hover:text-[color:var(--color-ink)] transition-colors disabled:opacity-0 disabled:pointer-events-none"
            >
              <span aria-hidden>←</span> Back
            </button>

            {/* Hide Continue for radio fields (auto-advance); show for text/multi/last */}
            {current.kind !== "radio" && (
              <button
                type="button"
                onClick={goNext}
                disabled={!canContinue}
                className={`btn ${
                  canContinue ? "btn-accent" : "btn-ghost"
                } text-sm`}
                style={!canContinue ? { opacity: 0.5, cursor: "not-allowed" } : undefined}
              >
                {isLast ? "Send my application" : "Continue"}
                <Arrow />
              </button>
            )}
            {current.kind === "radio" && (
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
                Pick one — auto-advances
              </span>
            )}
          </div>
        )}
      </div>
    </ConicBorder>
  );
}

// ─────────────────────────────────────────────────────────────────
// Per-question renderer
// ─────────────────────────────────────────────────────────────────

function QuestionView({
  step,
  index,
  value,
  onText,
  onRadio,
  onMulti,
}: {
  step: Step;
  index: number;
  value: string | string[];
  onText: (v: string) => void;
  onRadio: (v: string) => void;
  onMulti: (v: string) => void;
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
        {step.key === "notes"
          ? "Bonus · Optional"
          : `${String(index + 1).padStart(2, "0")} · Question`}
      </div>
      <h3
        className="font-display text-[color:var(--color-ink)] leading-[1.08]"
        style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
      >
        {renderQuestionWithEmphasis(step.question, step.emphasis)}
      </h3>
      {step.hint && (
        <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">
          {step.hint}
        </p>
      )}

      <div className="mt-8 md:mt-10">
        {(step.kind === "text" || step.kind === "email" || step.kind === "tel") && (
          <TextInput
            step={step as TextStep}
            value={String(value || "")}
            onChange={onText}
          />
        )}

        {step.kind === "textarea" && (
          <TextArea
            step={step as TextStep}
            value={String(value || "")}
            onChange={onText}
          />
        )}

        {step.kind === "radio" && (
          <RadioGroup
            options={(step as RadioStep).options}
            value={String(value || "")}
            onSelect={onRadio}
          />
        )}

        {step.kind === "multi" && (
          <MultiSelect
            options={(step as MultiStep).options}
            values={(value as string[]) || []}
            onToggle={onMulti}
            max={(step as MultiStep).maxSelect}
          />
        )}
      </div>
    </div>
  );
}

function renderQuestionWithEmphasis(text: string, emphasis?: string) {
  if (!emphasis) return text;
  const i = text.toLowerCase().indexOf(emphasis.toLowerCase());
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="italic-accent">{text.slice(i, i + emphasis.length)}</span>
      {text.slice(i + emphasis.length)}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────
// Inputs
// ─────────────────────────────────────────────────────────────────

function TextInput({
  step,
  value,
  onChange,
}: {
  step: TextStep;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <input
        type={step.kind === "email" ? "email" : step.kind === "tel" ? "tel" : "text"}
        inputMode={step.inputMode}
        placeholder={step.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={
          step.key === "email"
            ? "email"
            : step.key === "phone"
              ? "tel"
              : step.key === "firstName"
                ? "given-name"
                : step.key === "businessName"
                  ? "organization"
                  : "off"
        }
        className="w-full bg-transparent border-b py-3 text-2xl md:text-3xl text-[color:var(--color-ink)] font-display outline-none transition-colors"
        style={{
          borderColor: "var(--color-hairline-2)",
          letterSpacing: "-0.025em",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-hairline-2)")
        }
      />
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
        Press <span className="text-[color:var(--color-ink)]">Enter</span> to continue
      </p>
    </div>
  );
}

function TextArea({
  step,
  value,
  onChange,
}: {
  step: TextStep;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative">
      <textarea
        placeholder={step.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full bg-transparent border rounded-2xl p-4 text-lg text-[color:var(--color-ink)] outline-none transition-colors resize-none"
        style={{
          borderColor: "var(--color-hairline-2)",
          background: "rgba(var(--hairline-rgb),0.02)",
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
        onBlur={(e) =>
          (e.currentTarget.style.borderColor = "var(--color-hairline-2)")
        }
      />
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
        Press <span className="text-[color:var(--color-ink)]">Continue</span> when done — or skip
      </p>
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onSelect,
}: {
  options: string[];
  value: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {options.map((opt, i) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            data-radio-option={i}
            onClick={() => onSelect(opt)}
            className="group relative text-left rounded-2xl border px-4 py-3.5 transition-all outline-none"
            style={{
              borderColor: selected
                ? "var(--color-accent)"
                : "var(--color-hairline-2)",
              background: selected
                ? "rgba(var(--accent-rgb),0.08)"
                : "rgba(var(--hairline-rgb),0.015)",
            }}
          >
            <span className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[10px]"
                style={{
                  borderColor: selected
                    ? "var(--color-accent)"
                    : "var(--color-hairline-3)",
                  color: selected ? "var(--color-accent)" : "var(--color-ink-muted)",
                  background: selected ? "rgba(var(--accent-rgb),0.12)" : "transparent",
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span
                className="font-medium"
                style={{ color: selected ? "var(--color-accent)" : "var(--color-ink)" }}
              >
                {opt}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function MultiSelect({
  options,
  values,
  onToggle,
  max,
}: {
  options: string[];
  values: string[];
  onToggle: (v: string) => void;
  max?: number;
}) {
  const atCap = max ? values.length >= max : false;
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {options.map((opt, i) => {
          const selected = values.includes(opt);
          const disabled = !selected && atCap;
          return (
            <button
              key={opt}
              type="button"
              data-multi-option={i}
              onClick={() => onToggle(opt)}
              disabled={disabled}
              className="group relative text-left rounded-2xl border px-4 py-3.5 transition-all outline-none disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                borderColor: selected
                  ? "var(--color-accent)"
                  : "var(--color-hairline-2)",
                background: selected
                  ? "rgba(var(--accent-rgb),0.08)"
                  : "rgba(var(--hairline-rgb),0.015)",
              }}
            >
              <span className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border"
                  style={{
                    borderColor: selected
                      ? "var(--color-accent)"
                      : "var(--color-hairline-3)",
                    background: selected ? "var(--color-accent)" : "transparent",
                    color: "var(--color-on-accent)",
                  }}
                >
                  {selected ? "✓" : ""}
                </span>
                <span
                  className="font-medium"
                  style={{ color: selected ? "var(--color-accent)" : "var(--color-ink)" }}
                >
                  {opt}
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {max && (
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-ink-muted)]">
          {values.length} / {max} selected
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Success state
// ─────────────────────────────────────────────────────────────────

function SuccessState({
  data,
  bookingUrl,
}: {
  data: FormState;
  bookingUrl: string;
}) {
  // Prefill the GHL booking widget — most LeadConnector widgets accept query params
  const prefilled = useMemo(() => {
    try {
      const u = new URL(bookingUrl);
      if (data.firstName) u.searchParams.set("first_name", data.firstName);
      if (data.email) u.searchParams.set("email", data.email);
      if (data.phone) u.searchParams.set("phone", data.phone);
      return u.toString();
    } catch {
      return bookingUrl;
    }
  }, [bookingUrl, data.firstName, data.email, data.phone]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
        Received · Now pick a time
      </div>
      <h3
        className="font-display text-[color:var(--color-ink)] leading-[1.06]"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", letterSpacing: "-0.03em" }}
      >
        <span className="italic-accent">{data.firstName || "You"}</span>, you&apos;re
        in. Let&apos;s get on a call.
      </h3>
      <p className="mt-5 text-lg text-[color:var(--color-ink-soft)] max-w-2xl leading-relaxed">
        Daniel will run through what we&apos;d build on your business in 30 minutes.
        Pick a time below — confirmation lands in your inbox + WhatsApp.
      </p>

      <div
        className="mt-10 overflow-hidden rounded-2xl border"
        style={{
          borderColor: "var(--color-hairline-2)",
          background: "var(--color-bg-2)",
        }}
      >
        <iframe
          src={prefilled}
          title="Book a call with Daniel"
          scrolling="no"
          style={{
            width: "100%",
            border: "none",
            minHeight: 720,
            background: "var(--color-bg-2)",
          }}
        />
      </div>

      <div
        className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border p-5"
        style={{
          borderColor: "var(--color-hairline)",
          background: "rgba(var(--hairline-rgb),0.015)",
        }}
      >
        <p className="text-[color:var(--color-ink-soft)] text-sm">
          Prefer WhatsApp? Daniel&apos;s reachable on{" "}
          <span className="text-[color:var(--color-ink)]">+27 73 996 1535</span>
        </p>
        <MagneticButton
          href="https://wa.me/27739961535?text=Hi%20Daniel%2C%20I%20just%20applied%20on%20your%20site."
          variant="accent"
          newTab
        >
          Open WhatsApp
          <Arrow />
        </MagneticButton>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Variants + tiny SVG arrow
// ─────────────────────────────────────────────────────────────────

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
};

const FADE_VARIANTS = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
