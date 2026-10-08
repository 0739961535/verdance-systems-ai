"use client";

import { useMemo } from "react";
import type { Conversation } from "@/data/conversations";
import { useConversationPlayer, type RotationItem } from "./useConversationPlayer";
import { Phone } from "./Phone";
import { ChatView, LockView } from "./screens";

/**
 * ChatPhone - a phone playing sample WhatsApp-style conversations on a
 * gentle loop: message in, typing, reply, booking card, the owner's lock
 * screen, then a crossfade. Pass one `conversation` (niche pages) or a
 * `rotation` (homepage), which plays each in turn with chips to jump.
 *
 * Performance and resilience:
 * - The server renders the first finished conversation, so it reads without
 *   JS. While JS loads, CSS keeps those bubbles transparent (with a timed
 *   fallback that shows them if the script never runs).
 * - Playback waits for window load plus an idle slot, so it never competes
 *   with the headline (the LCP element).
 * - It pauses while off screen or in a background tab.
 * - Reduced motion: one finished conversation, static (chips still switch).
 * - The animated device is aria-hidden; screen readers get a transcript.
 */

export function ChatPhone({
  conversation,
  rotation,
  size = "md",
  label = "Sample conversation",
  className,
}: {
  conversation?: Conversation;
  rotation?: RotationItem[];
  size?: "sm" | "md";
  label?: string;
  className?: string;
}) {
  const items: RotationItem[] = useMemo(
    () => rotation ?? (conversation ? [{ label, conversation }] : []),
    [rotation, conversation, label],
  );
  const { idx, current, shown, typing, locked, fading, mode, step, jump, rootRef } = useConversationPlayer(items);

  const { business, lock } = current;
  const multi = items.length > 1;

  return (
    <figure ref={rootRef} className={`m-0 flex flex-col items-center ${className ?? ""}`}>
      <div className="chatphone" data-ssr={mode === "ssr" ? "" : undefined} aria-hidden>
        <Phone clock={locked ? lock.clock : current.clock} size={size}>
          <div className="chat-fade absolute inset-0" data-out={fading ? "" : undefined}>
            <ChatView
              business={business}
              beats={current.beats.slice(0, shown)}
              typing={typing}
              animate={mode === "play"}
              keyPrefix={`${idx}-${step < 0 ? "s" : "p"}`}
            >
              <LockView
                on={locked}
                clock={lock.clock}
                date={lock.date}
                notes={[{ app: lock.app, title: lock.title, body: lock.body }]}
              />
            </ChatView>
          </div>
        </Phone>
      </div>

      <figcaption className="mt-5 flex flex-col items-center gap-2">
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
          {multi ? `Sample conversation · ${items[idx].label}` : label}
        </span>
        <span className="sr-only">
          {items.map((it) => it.conversation.summary).join(" ")}
        </span>
        {multi && (
          <div className="flex max-w-[22rem] flex-wrap justify-center gap-1.5" role="group" aria-label="Choose a sample conversation">
            {items.map((it, i) => (
              <button
                key={it.label}
                type="button"
                onClick={() => jump(i)}
                aria-pressed={i === idx}
                className="hero-chip"
              >
                {it.label}
              </button>
            ))}
          </div>
        )}
      </figcaption>
    </figure>
  );
}
