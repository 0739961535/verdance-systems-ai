import { FOUNDER_VIDEO } from "@/data/proof";

/** "The person on the call": Daniel's short intro clip. Renders nothing until recorded. */
export function FounderVideo({ className = "" }: { className?: string }) {
  const v = FOUNDER_VIDEO;
  if (!v) return null;
  return (
    <figure className={`m-0 ${className}`}>
      <div className="overflow-hidden rounded-[20px] bg-[#060B1A]" style={{ aspectRatio: "16 / 9" }}>
        <video controls preload="none" playsInline poster={v.poster} className="h-full w-full object-cover" aria-label="Daniel Bouwer, the person on your call, in 45 seconds">
          {v.webm ? <source src={v.webm} type="video/webm" /> : null}
          <source src={v.mp4} type="video/mp4" />
          {v.captions ? <track kind="captions" src={v.captions} srcLang="en" label="English" default /> : null}
        </video>
      </div>
      <figcaption className="museum mt-3">The person on the call, in 45 seconds.</figcaption>
    </figure>
  );
}
