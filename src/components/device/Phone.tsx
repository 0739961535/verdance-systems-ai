import type { ReactNode } from "react";

/**
 * Phone - a CSS-only iPhone-style frame (original work, no third-party
 * assets). Everything inside is sized in em, so changing the frame's
 * --phone-fs scales the whole device and its contents together.
 *
 * The frame is a fixed-ratio box: whatever animates inside it can never
 * shift the page layout.
 */
export function Phone({
  children,
  clock = "21:42",
  statusTone = "light",
  size = "md",
  className,
}: {
  children: ReactNode;
  clock?: string;
  statusTone?: "light" | "hidden";
  size?: "sm" | "md";
  className?: string;
}) {
  return (
    <div className={`phone ${className ?? ""}`} data-size={size}>
      <div className="phone-screen">
        <div className="phone-island" />
        {statusTone !== "hidden" && (
          <div className="phone-status" aria-hidden>
            <span>{clock}</span>
            <span className="flex items-center gap-[0.35em]">
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg viewBox="0 0 18 12" fill="currentColor" aria-hidden>
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
      <rect x="10" y="3" width="3" height="9" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 16 12" fill="currentColor" aria-hidden>
      <path d="M8 2.2c2.4 0 4.6.9 6.3 2.5l1.2-1.3A10.9 10.9 0 0 0 8 .4 10.9 10.9 0 0 0 .5 3.4l1.2 1.3A9.1 9.1 0 0 1 8 2.2Zm0 3.6c1.4 0 2.7.5 3.7 1.4l1.2-1.3A7.3 7.3 0 0 0 8 4a7.3 7.3 0 0 0-4.9 1.9l1.2 1.3c1-.9 2.3-1.4 3.7-1.4Zm0 3.5c-.6 0-1.1.2-1.5.6L8 11.6l1.5-1.7c-.4-.4-.9-.6-1.5-.6Z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 27 12" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="23" height="11" rx="3.5" stroke="currentColor" opacity="0.4" />
      <rect x="2" y="2" width="17" height="8" rx="2" fill="currentColor" />
      <path d="M25 4v4c.8-.3 1.3-1.1 1.3-2S25.8 4.3 25 4Z" fill="currentColor" opacity="0.4" />
    </svg>
  );
}
