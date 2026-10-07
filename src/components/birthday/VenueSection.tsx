import { MapPin, MessageCircle } from "lucide-react";
import { birthday as b } from "@/data/birthday";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function VenueSection() {
  const wa = `https://wa.me/${b.rsvp.whatsapp}?text=${encodeURIComponent(b.rsvp.message)}`;
  return (
    <section className="section text-center" aria-label="Venue">
      <SectionHeading eyebrow={b.venue.eyebrow} title="Venue" />
      <Reveal>
        <div className="frame mx-auto max-w-sm px-6 py-10">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-green-400 to-green-600 text-white shadow-md">
            <MapPin size={22} />
          </div>
          <p className="eyebrow !tracking-[.22em]">Restaurant</p>
          <p className="h-display mt-2 text-[1.85rem] leading-snug">{b.venue.name}</p>
          <span className="hairline mx-auto my-5 w-20" />
          <p className="eyebrow !tracking-[.22em]">Area</p>
          <p className="body-serif mx-auto mt-2 max-w-[16rem] text-muted">{b.venue.address}</p>
          <p className="mt-5 text-sm font-bold text-sky">📍 Scan / open maps for location</p>
        </div>
      </Reveal>
      <Reveal delay={0.2} className="mt-8 flex flex-col items-center gap-4">
        <a
          href={b.venue.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold btn-solid"
        >
          <MapPin size={14} /> Open in Google Maps
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-gold">
          <MessageCircle size={14} /> RSVP on WhatsApp
        </a>
      </Reveal>
    </section>
  );
}
