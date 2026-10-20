import { Reveal, SplitWords } from "@/components/primitives/Reveal";
import { EnquiryArrives } from "./EnquiryArrives";

/** 02 Demo: the enquiry arrives, is answered in seconds and booked. */
export function WatchArrives() {
  return (
    <section className="band-night chapter-pad" aria-labelledby="watch-title">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
        <Reveal variant="wipe" className="max-w-xl">
          <p className="eyebrow"><span className="chap-n">02</span> Demo</p>
          <h2 id="watch-title" className="h2 mt-4">
            <SplitWords text="Watch it work." />
          </h2>
          <p className="lead mt-6">
            A customer messages at 21:41, after you have closed. Watch the first response go out, in your tone, and the
            viewing land in the diary.
          </p>
        </Reveal>
        <EnquiryArrives />
      </div>
    </section>
  );
}
