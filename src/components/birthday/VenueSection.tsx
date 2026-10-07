import Image from "next/image";
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
        <div className="frame relative mx-auto min-h-[340px] max-w-sm overflow-hidden !border-amber-200/50 !bg-transparent">
          <Image
            src={b.venue.photo}
            alt={`${b.venue.name} outdoor venue at night`}
            fill
            sizes="(max-width:480px) 90vw, 380px"
            className="object-cover object-center"
            priority={false}
          />
          {/* Dark overlay keeps white/cream text readable over bright tent lights */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/75"
          />
          <div className="relative z-10 flex min-h-[340px] flex-col items-center justify-center px-6 py-10 text-white">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-amber-400/95 text-amber-950 shadow-md shadow-black/30">
              <MapPin size={22} />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
              Restaurant
            </p>
            <p className="mt-2 font-display text-[1.85rem] font-semibold leading-snug text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {b.venue.name}
            </p>
            <span className="mx-auto my-5 block h-[2px] w-20 rounded-full bg-gradient-to-r from-transparent via-amber-300 to-transparent" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-amber-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
              Area
            </p>
            <p className="mx-auto mt-2 max-w-[16rem] font-sans text-lg font-semibold text-white/95 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {b.venue.address}
            </p>
            <p className="mt-5 text-sm font-bold text-amber-100 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
              📍 Scan / open maps for location
            </p>
          </div>
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
        {b.rsvp.enabled && (
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-gold">
            <MessageCircle size={14} /> RSVP on WhatsApp
          </a>
        )}
      </Reveal>
    </section>
  );
}
