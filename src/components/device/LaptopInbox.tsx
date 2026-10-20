"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import type { Beat, Conversation } from "@/data/conversations";
import { BeatView } from "./screens";
import { useConversationPlayer, type RotationItem } from "./useConversationPlayer";

/**
 * LaptopInbox - the homepage "watch it work" device: a laptop (CSS only,
 * original work) showing the sample conversations as a desktop inbox.
 *
 * It tells one story at a time, slowly and in order: an enquiry arrives,
 * a short pause, the reply (with one small "Answered in" badge), the
 * customer chooses, the booking is confirmed. Then it holds and moves to
 * the next conversation in the list. Nothing floats over the chat.
 *
 * Plays after load, pauses off screen, shows the finished conversation
 * under reduced motion and without JS. On phones the list folds away and
 * the chat fills the screen.
 */

const CHANNEL: Record<string, string> = {
  Venues: "Website chat",
  "Home services": "WhatsApp",
  "Online store": "Instagram",
  Clinics: "WhatsApp",
};


function preview(c: Conversation) {
  const first = c.beats.find((b) => b.kind === "in" || b.kind === "missed");
  return first && "text" in first ? first.text : "";
}

function doneTitle(c: Conversation) {
  const card = c.beats.find((b) => b.kind === "card");
  return card && card.kind === "card" ? card.title : c.lock.title;
}

/** One badge only: on the first reply, in plain words. */
function withOneBadge(beats: Beat[]): Beat[] {
  let seen = false;
  return beats.map((b) => {
    if (b.kind !== "out") return b;
    if (seen) return { ...b, meta: undefined };
    seen = true;
    const secs = b.meta?.match(/\d+/)?.[0];
    return { ...b, meta: secs ? `Answered in ${secs} seconds` : undefined };
  });
}

/** Which story step is on screen (1 to 4), from how many beats are shown. */
function storyStep(beats: Beat[], shown: number, typing: boolean) {
  const firstOut = beats.findIndex((b) => b.kind === "out");
  const visible = beats.slice(0, shown);
  if (visible.some((b) => b.kind === "card")) return 4;
  if (firstOut >= 0 && visible.some((b, i) => i > firstOut && b.kind === "in")) return 3;
  if (firstOut >= 0 && (shown > firstOut || (typing && shown === firstOut))) return 2;
  return shown > 0 ? 1 : 0;
}

export function LaptopInbox({ rotation }: { rotation: RotationItem[] }) {
  const { idx, current, shown, typing, fading, mode, step, jump, rootRef, paused, togglePause } = useConversationPlayer(rotation, "calm");
  const { business } = current;
  const beats = useMemo(() => withOneBadge(current.beats), [current]);
  const at = storyStep(beats, shown, typing);
  const channel = CHANNEL[rotation[idx].label] ?? "WhatsApp";
  // the active pill's background slides to the chosen option
  const pillsRef = useRef<HTMLDivElement>(null);
  const pillBgRef = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    const row = pillsRef.current;
    const bg = pillBgRef.current;
    const el = row?.querySelectorAll<HTMLElement>(".hero-chip")[idx];
    if (!row || !bg || !el) return;
    bg.style.width = `${el.offsetWidth}px`;
    bg.style.transform = `translateX(${el.offsetLeft}px)`;
    row.setAttribute("data-slide", "");
  }, [idx]);

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
              </div>

              <div className="lp-body">
                {/* conversation list: each one tagged with the channel it came in on */}
                <ul className="lp-list">
                  {rotation.map((it, i) => {
                    const on = i === idx;
                    const done = on && at === 4;
                    return (
                      <li key={it.label} className="lp-row" data-on={on ? "" : undefined}>
                        <span className="wa-avatar lp-av">{it.conversation.business.initials}</span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline justify-between gap-2">
                            <span className="truncate font-semibold">{it.conversation.business.name}</span>
                            <span className="lp-time">{it.conversation.clock}</span>
                          </span>
                          <span className="lp-channel">{CHANNEL[it.label] ?? "WhatsApp"}</span>
                          {done ? (
                            <span className="lp-preview lp-done">{doneTitle(it.conversation)}</span>
                          ) : (
                            <span className="lp-preview">{preview(it.conversation)}</span>
                          )}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* chat */}
                <div className="lp-chat">
                  <div className="chat-fade lp-chat-inner" data-out={fading ? "" : undefined}>
                    <div className="lp-head">
                      <span className="wa-avatar lp-av">{business.initials}</span>
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{business.name}</span>
                        <span className="lp-status">{typing ? "typing…" : `${channel} · after hours`}</span>
                      </span>
                    </div>
                    <div className="lp-msgs">
                      <div className="wa-stack">
                        <div className="wa-chip">Today</div>
                        {beats.slice(0, shown).map((b, i) => (
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="laptop-base">
          <span className="laptop-notch" />
        </div>
      </div>

      {/* one row of controls: the sample business, and pause */}
      <figcaption className="mt-5">
        <span className="sr-only">{rotation.map((it) => it.conversation.summary).join(" ")}</span>
        <div ref={pillsRef} className="lp-pills" role="group" aria-label="Choose a sample conversation">
          <span ref={pillBgRef} aria-hidden className="lp-pill-bg" style={{ width: 0 }} />
          {rotation.map((it, i) => (
            <button key={it.label} type="button" onClick={() => jump(i)} aria-pressed={i === idx} className="hero-chip">
              {it.label}
            </button>
          ))}
          {mode === "play" && (
            <button type="button" onClick={togglePause} aria-pressed={paused} className="hero-chip lp-pause" aria-label={paused ? "Play the sample conversation" : "Pause the sample conversation"}>
              {paused ? "Play" : "Pause"}
            </button>
          )}
        </div>
      </figcaption>
    </figure>
  );
}
