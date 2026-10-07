"use client";
import { birthday as b, toDate } from "@/data/birthday";
import { useCountdown } from "@/hooks/useCountdown";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const c = useCountdown(toDate(b.date, b.time));
  const units = [
    ["Days", c.days],
    ["Hours", c.hours],
    ["Minutes", c.minutes],
    ["Seconds", c.seconds],
  ] as const;
  return (
    <section className="section text-center" aria-labelledby="cd">
      <SectionHeading eyebrow={b.countdown.eyebrow} title={b.countdown.title} />
      {c.state === "past" ? (
        <Reveal>
          <p className="h-display text-3xl">{b.countdown.past}</p>
        </Reveal>
      ) : (
        <>
          {c.state === "today" && (
            <Reveal>
              <p className="script gold-text mb-8 text-5xl">{b.countdown.today}</p>
            </Reveal>
          )}
          <Reveal delay={0.2}>
            <div
              id="cd"
              role="timer"
              aria-live="off"
              className="frame flex items-start justify-center px-2 py-6"
            >
              {units.map(([label, v], i) => (
                <div
                  key={label}
                  className={`w-[25%] px-1 ${i ? "border-l-2 border-dashed border-sky/40" : ""}`}
                >
                  <div
                    className="h-display text-[2.5rem] tabular-nums text-primary"
                    suppressHydrationWarning
                  >
                    {c.state === "loading" ? "--" : pad(v)}
                  </div>
                  <div className="eyebrow mt-2 !tracking-[.14em] !text-[10px]">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </>
      )}
    </section>
  );
}
