import { Calendar, CalendarPlus, Clock, MapPin } from "lucide-react";
import { birthday as b, calendarUrl, dayMonth, weekday } from "@/data/birthday";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function EventDetails() {
  return (
    <section className="section" aria-label="Event details">
      <SectionHeading eyebrow="Save The Date" title="Birthday Party" />
      {b.events.map((e) => (
        <Reveal key={e.title} className="frame space-y-4 px-5 py-10 text-center">
          <p className="eyebrow">{weekday(e.date)}</p>
          <p className="h-display mt-1 text-[2.6rem] leading-tight">{dayMonth(e.date)}</p>
          <p className="mt-2 font-sans text-base font-semibold text-muted">{e.description}</p>

          <div className="mx-auto mt-8 max-w-sm space-y-3 text-left">
            <div className="detail-chip">
              <span className="icon-bubble icon-cal" aria-hidden>
                <Calendar size={18} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Date</p>
                <p className="font-display text-lg font-semibold text-primary">25th October</p>
              </div>
            </div>
            <div className="detail-chip">
              <span className="icon-bubble icon-clock" aria-hidden>
                <Clock size={18} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Time</p>
                <p className="font-display text-lg font-semibold text-primary">
                  5.30 PM – 8.30 PM
                </p>
              </div>
            </div>
            <div className="detail-chip">
              <span className="icon-bubble icon-pin" aria-hidden>
                <MapPin size={18} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted">Location</p>
                <p className="font-display text-lg font-semibold leading-snug text-primary">
                  {b.venue.name}, {b.venue.address}
                </p>
              </div>
            </div>
          </div>

          <a
            href={calendarUrl(b)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-8"
          >
            <CalendarPlus size={14} /> Add to Calendar
          </a>
        </Reveal>
      ))}
    </section>
  );
}
