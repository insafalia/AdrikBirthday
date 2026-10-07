"use client";
import Image from "next/image";
import { useState } from "react";
import { birthday as b } from "@/data/birthday";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import GalleryLightbox from "./GalleryLightbox";

/* Playful kids rhythm: soft rounds & bubbles */
const LAYOUT = [
  "w-[80%] aspect-[4/5] arch",
  "w-[58%] ml-auto aspect-[1/1] rounded-[2rem]",
  "w-full aspect-[4/3] rounded-[1.5rem]",
  "w-[66%] aspect-[3/4] rounded-[2rem_2rem_3rem_1rem]",
  "w-[72%] ml-auto aspect-[1/1] rounded-full",
  "w-[88%] aspect-[10/7] rounded-[1.75rem]",
];

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);
  const { photos } = b.gallery;
  return (
    <section className="section" aria-label="Photo gallery">
      <SectionHeading eyebrow={b.gallery.eyebrow} title={b.gallery.title} />
      <div className="space-y-12">
        {photos.map((p, i) => {
          const cls = LAYOUT[i % LAYOUT.length],
            right = cls.includes("ml-auto");
          return (
            <Reveal key={p.src} y={40}>
              <figure className={`${cls.match(/w-\S+/)![0]} ${right ? "ml-auto" : ""}`}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`Open photo: ${p.alt}`}
                  className={`photo group block w-full ${cls.replace(/w-\S+|ml-auto/g, "")}`}
                >
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width:480px) 85vw, 400px"
                    loading={i < 2 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-[1600ms] group-hover:scale-105"
                  />
                </button>
                {p.caption && (
                  <figcaption
                    className={`mt-3 font-sans text-base font-bold text-muted ${
                      right ? "text-right" : ""
                    }`}
                  >
                    {p.caption}
                  </figcaption>
                )}
              </figure>
            </Reveal>
          );
        })}
      </div>
      <GalleryLightbox photos={photos} index={open} onChange={setOpen} />
    </section>
  );
}
