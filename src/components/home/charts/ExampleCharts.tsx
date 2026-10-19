import { Reveal, SplitWords } from "@/components/primitives/Reveal";
import { FunnelIsland, HoursIsland, RaceIsland } from "./ChartIslands";
import s from "./charts.module.css";

/**
 * Three example charts: reply time (Before vs With AI), enquiries answered
 * by hour (after-hours cover) and a month's pipeline. Every card says
 * "Example"; the only real figure is the 60-second promise.
 */
function Card({
  kicker,
  title,
  foot,
  area,
  className,
  children,
}: {
  kicker: string;
  title: string;
  foot: string;
  area: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal variant="scale" className={className}>
      <div className={`${s.card} h-full`} data-spotlight="">
        <div className={s.head}>
          <div>
            <p className={s.kicker}>{kicker}</p>
            <h3 className={s.title}>{title}</h3>
          </div>
          <span className={s.badge}>Example</span>
        </div>
        <div className={`${s.area} ${area}`}>{children}</div>
        <p className={s.foot}>{foot}</p>
      </div>
    </Reveal>
  );
}

export function ExampleChartsSection() {
  return (
    <section
      id="charts"
      className="section-pad bg-canvas-2"
      aria-labelledby="charts-title"
      style={{ borderTop: "1px solid var(--hairline)" }}
    >
      <div className="container-wide">
        <Reveal
          variant="wipe"
          className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end"
        >
          <div className="max-w-3xl">
            <p className="eyebrow">What changes · example numbers</p>
            <h2 id="charts-title" className="h2 mt-5">
              <SplitWords text="Seconds, not hours." />{" "}
              <span className="italic-accent">
                <SplitWords text="Day and night." start={3} />
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-[1.0625rem] leading-[1.6] text-[color:var(--color-ink-soft)]">
            One example business, before and after. The figures are
            illustrative. The reply inside 60 seconds is our promise.
          </p>
        </Reveal>

        <div className={`${s.grid} mt-10 md:mt-14`}>
          <Card
            className={s.race}
            area={s.raceArea}
            kicker="Reply time"
            title="The same enquiry, two replies."
            foot="Example enquiry. With us, every reply goes out within 60 seconds, day or night."
          >
            <RaceIsland />
          </Card>
          <Card
            className={s.funnel}
            area={s.funnelArea}
            kicker="Pipeline"
            title="Nothing falls out at the top."
            foot="Example month. Every enquiry is answered, so the rest of the pipeline gets more to work with."
          >
            <FunnelIsland />
          </Card>
          <Card
            className={s.hours}
            area={s.hoursArea}
            kicker="Enquiries by hour"
            title="Evenings are when people ask. Now someone answers."
            foot="Example day. Before: answered within the hour only while the office is open. With AI: every hour."
          >
            <HoursIsland />
          </Card>
        </div>
      </div>
    </section>
  );
}
