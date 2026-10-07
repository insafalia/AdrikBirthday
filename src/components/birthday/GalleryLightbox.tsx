"use client";
import Image from "next/image";
import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";
type Photo = { src: string; alt: string; caption?: string };
export default function GalleryLightbox({ photos, index, onChange }: { photos: Photo[]; index: number | null; onChange: (i: number | null) => void }) {
  const open = index !== null, n = photos.length;
  useScrollLock(open);
  const go = (d: number) => index !== null && onChange((index + d + n) % n);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") onChange(null); if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  });
  const btn = "absolute z-10 grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white/90 backdrop-blur transition hover:bg-white/15";
  return (
    <AnimatePresence>
      {open && index !== null && (
        <motion.div role="dialog" aria-modal="true" aria-label="Photo viewer" className="fixed inset-0 z-[60] bg-[#1b0d10]/95 backdrop-blur-md"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} onClick={() => onChange(null)}>
          <button className={`${btn} right-4 top-4`} aria-label="Close" onClick={() => onChange(null)} autoFocus><X size={18} /></button>
          <p className="absolute left-0 top-6 w-full text-center text-xs tracking-[.3em] text-white/70" aria-live="polite">{index + 1} / {n}</p>
          <button className={`${btn} left-3 top-1/2 hidden -translate-y-1/2 sm:grid`} aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); go(-1); }}><ChevronLeft size={20} /></button>
          <button className={`${btn} right-3 top-1/2 hidden -translate-y-1/2 sm:grid`} aria-label="Next photo" onClick={(e) => { e.stopPropagation(); go(1); }}><ChevronRight size={20} /></button>
          <AnimatePresence mode="wait">
            <motion.div key={index} className="absolute inset-x-4 bottom-24 top-20 mx-auto max-w-3xl touch-pan-y" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.5}
              onDragEnd={(_, i) => { if (i.offset.x < -60) go(1); else if (i.offset.x > 60) go(-1); }} onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.35 }}>
              <Image src={photos[index].src} alt={photos[index].alt} fill sizes="100vw" className="pointer-events-none object-contain" priority />
            </motion.div>
          </AnimatePresence>
          <p className="absolute inset-x-0 bottom-8 text-center font-serif text-xl italic text-white/85">{photos[index].caption}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
