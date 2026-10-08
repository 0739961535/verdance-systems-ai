"use client";

import type { Conversation } from "@/data/conversations";
import { BeatView, CalendarIcon } from "./screens";
import { useConversationPlayer, type RotationItem } from "./useConversationPlayer";

/**
 * LaptopInbox - the homepage hero device: a laptop (CSS only, original work)
 * showing the sample conversations as a desktop inbox. Same play-head as the
 * phones (useConversationPlayer): plays after load, pauses off screen,
 * static under reduced motion, readable without JS.
 *
 * Sized with container query units, so the whole screen scales with the
 * laptop. On phones the inbox list folds away and the chat fills the screen.
 */

const CHANNEL: Record<string, string> = {
  "Home services": "WhatsApp",
  "Online store": "Instagram",
  Venues: "Website chat",
  Clinics: "WhatsApp",
};

function preview(c: Conversation) {
  const first = c.beats.find((b) => b.kind === "in" || b.kind === "missed");
  return first && "text" in first ? first.text : "";
}

export function LaptopInbox({ rotation }: { rotation: RotationItem[] }) {
  const { idx, current, shown, typing, locked, fading, mode, step, jump, rootRef } = useConversationPlayer(rotation);
  const { business, lock } = current;

  return (
    <figure ref={rootRef} className="m-0 w-full">
      <div className="chatphone laptop" data-ssr={mode === "ssr" ? "" : undefined} aria-hidden>
        <div className="laptop-lid">
          <span className="laptop-cam" />
          <div className="laptop-screen">
            <div className="lp-app">
              {/* window bar */}
              <div className="lp-bar">
                <span className="lp-lights">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="lp-title">Inbox · all channels</span>
                <span className="lp-chip">Replies within 5 min</span>
              </div>

              <div className="lp-body">
                {/* conversation list */}
                <ul className="lp-list">
                  {rotation.map((it, i) => (
                    <li key={it.label} className="lp-row" data-on={i === idx ? "" : undefined}>
                      <span className="wa-avatar lp-av">{it.conversation.business.initials}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className="truncate font-semibold">{it.conversation.business.name}</span>
                          <span className="lp-time">{it.conversation.clock}</span>
                        </span>
                        <span className="lp-channel">{CHANNEL[it.label] ?? "WhatsApp"}</span>
                        <span className="lp-preview">{preview(it.conversation)}</span>
                      </span>
                    </li>
                  ))}
                </ul>

                {/* chat */}
                <div className="lp-chat">
                  <div className={`chat-fade lp-chat-inner`} data-out={fading ? "" : undefined}>
                    <div className="lp-head">
                      <span className="wa-avatar lp-av">{business.initials}</span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{business.name}</span>
                        <span className="lp-status">{typing ? "typing…" : `${CHANNEL[rotation[idx].label] ?? "WhatsApp"} · after hours`}</span>
                      </span>
                    </div>
                    <div className="lp-msgs">
                      <div className="wa-stack">
                        <div className="wa-chip">Today</div>
                        {current.beats.slice(0, shown).map((b, i) => (
                          <BeatView key={`${idx}-${step < 0 ? "s" : "p"}-${i}`} beat={b} animate={mode === "play"} />
                        ))}
                        {typing && (
                          <div className="wa-typing wa-enter">
                            <span />
                            <span />
                            <span />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="lp-composer">
                      <span>Reply…</span>
                    </div>
                  </div>

                  {/* owner notification */}
                  <div className="lp-toast" data-on={locked ? "" : undefined}>
                    <span className="lock-app">
                      <CalendarIcon />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-baseline justify-between gap-2" style={{ fontSize: "0.8em" }}>
                        <span className="font-semibold uppercase tracking-wide opacity-80">{lock.app}</span>
                        <span className="opacity-70">now</span>
                      </span>
                      <span className="block font-semibold">{lock.title}</span>
                      <span className="block opacity-85" style={{ fontSize: "0.92em" }}>{lock.body}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="laptop-base">
          <span className="laptop-notch" />
        </div>
      </div>

      <figcaption className="mt-6 flex flex-col items-center gap-2">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
          Sample conversation · {rotation[idx].label}
        </span>
        <span className="sr-only">{rotation.map((it) => it.conversation.summary).join(" ")}</span>
        <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label="Choose a sample conversation">
          {rotation.map((it, i) => (
            <button key={it.label} type="button" onClick={() => jump(i)} aria-pressed={i === idx} className="hero-chip">
              {it.label}
            </button>
          ))}
        </div>
      </figcaption>
    </figure>
  );
}
