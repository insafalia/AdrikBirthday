"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { birthday as b } from "@/data/birthday";
import { useScrollLock } from "@/hooks/useScrollLock";
import OpeningScreen from "@/components/birthday/OpeningScreen";
import MusicControl from "@/components/birthday/MusicControl";
import WelcomeSection from "@/components/birthday/WelcomeSection";
import BirthdayReveal from "@/components/birthday/BirthdayReveal";
import ScratchReveal from "@/components/birthday/ScratchReveal";
import Countdown from "@/components/birthday/Countdown";
import MemoriesSection from "@/components/birthday/MemoriesSection";
import Gallery from "@/components/birthday/Gallery";
import EventDetails from "@/components/birthday/EventDetails";
import VenueSection from "@/components/birthday/VenueSection";
import FinalMessage from "@/components/birthday/FinalMessage";
import DecorativeParticles from "@/components/decorations/DecorativeParticles";

export default function Page() {
  const [opened, setOpened] = useState(false), [playing, setPlaying] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  useScrollLock(!opened);

  const open = () => {
    if (opened) return; // prevent multiple opens
    setOpened(true);
    const a = audio.current;
    if (a) { a.volume = 0.6; a.play().then(() => setPlaying(true)).catch(() => setPlaying(false)); }
  };
  const toggle = () => {
    const a = audio.current; if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {}); else { a.pause(); setPlaying(false); }
  };

  return (
    <main className="shell">
      <audio ref={audio} src={b.music} loop preload="auto" />
      <AnimatePresence>{!opened && <OpeningScreen key="open" onOpen={open} />}</AnimatePresence>
      {opened && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <DecorativeParticles fixed count={12} />
          <MusicControl playing={playing} onToggle={toggle} />
          <WelcomeSection /><BirthdayReveal /><ScratchReveal /><Countdown />
          <MemoriesSection />{b.gallery.enabled && <Gallery />}<EventDetails /><VenueSection /><FinalMessage />
        </motion.div>
      )}
    </main>
  );
}
