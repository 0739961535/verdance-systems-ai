import type { ReactNode } from "react";

/**
 * A MacBook-style laptop drawn in CSS: thin black bezel with an aluminium rim,
 * a camera notch, a 16:10 display and an aluminium base with a thumb scoop,
 * a soft highlight and a floor shadow. Every size is in cqw of the frame, so
 * it scales as one piece at any width with no layout shift. The screen is
 * itself a size container: content inside can size its type in cqw too.
 */
export function LaptopFrame({ children, label }: { children: ReactNode; label: string }) {
  return (
    <figure className="ltf" aria-label={label}>
      <style>{CSS}</style>
      <div className="ltf-lid">
        <span className="ltf-notch" aria-hidden>
          <i />
        </span>
        <div className="ltf-screen">{children}</div>
      </div>
      <div className="ltf-base" aria-hidden>
        <span className="ltf-scoop" />
      </div>
      <span className="ltf-shadow" aria-hidden />
    </figure>
  );
}

const CSS = `
.ltf { position: relative; margin: 0; container-type: inline-size; width: 100%; }
.ltf-lid { position: relative; width: 88%; margin: 0 auto; padding: 1.15cqw 1.15cqw 1.9cqw;
  border-radius: 2.6cqw 2.6cqw 0.5cqw 0.5cqw; background: #0B0C10;
  box-shadow: 0 0 0 0.22cqw #9EA4AF, 0 0 0 0.32cqw #5B616C, inset 0 0 0 1px rgba(255,255,255,0.05),
    0 4cqw 9cqw -3cqw rgba(77,124,255,0.35); }
.ltf-notch { position: absolute; z-index: 3; top: 1.1cqw; left: 50%; width: 10cqw; height: 1.55cqw; transform: translateX(-50%);
  background: #0B0C10; border-radius: 0 0 0.9cqw 0.9cqw; display: grid; place-items: center; }
.ltf-notch i { width: 0.55cqw; height: 0.55cqw; border-radius: 50%; background: radial-gradient(circle at 35% 35%, #4D5D8A, #10162A 60%); box-shadow: 0 0 0 0.12cqw #161A24; }
.ltf-screen { position: relative; container-type: inline-size; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 1.1cqw 1.1cqw 0.2cqw 0.2cqw; background: #060B1A; }
.ltf-screen::after { content: ""; position: absolute; inset: 0; z-index: 4; pointer-events: none;
  background: linear-gradient(118deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 28%, transparent 42%); }
.ltf-base { position: relative; z-index: 1; height: 1.9cqw; margin-top: -0.1cqw;
  border-radius: 0.3cqw 0.3cqw 2.2cqw 2.2cqw / 0.3cqw 0.3cqw 1.4cqw 1.4cqw;
  background: linear-gradient(180deg, #F3F4F7 0%, #D3D6DD 30%, #AEB3BC 72%, #7E838D 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.95), inset 0 -1px 0 rgba(0,0,0,0.25); }
.ltf-base::before { content: ""; position: absolute; left: 6%; right: 6%; top: 0; height: 0.45cqw; border-radius: 0 0 50% 50%;
  background: radial-gradient(ellipse at 50% 0%, rgba(143,176,255,0.45), transparent 70%); }
.ltf-scoop { position: absolute; top: 0; left: 50%; width: 13%; height: 0.75cqw; transform: translateX(-50%);
  border-radius: 0 0 1cqw 1cqw; background: linear-gradient(180deg, #8C919B, #C4C8CF); box-shadow: inset 0 1px 2px rgba(0,0,0,0.35); }
.ltf-shadow { position: absolute; left: 4%; right: 4%; bottom: -2.4cqw; height: 3cqw; z-index: 0; pointer-events: none;
  background: radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.7), rgba(0,0,0,0.25) 45%, transparent 72%); filter: blur(0.6cqw); }
`;
