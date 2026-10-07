"use client";
import { motion, useReducedMotion } from "framer-motion";
import { Crown } from "lucide-react";
import { birthday as b } from "@/data/birthday";
import DecorativeParticles from "@/components/decorations/DecorativeParticles";
import FloralDivider from "@/components/decorations/FloralDivider";

function OneText() {
  return (
    <p className="mt-1 flex items-baseline justify-center gap-1" aria-label="ONE!">
      <span className="one-letter one-o">O</span>
      <span className="one-letter one-n">N</span>
      <span className="one-letter one-e">E</span>
      <span className="one-letter one-bang">!</span>
    </p>
  );
}

export default function OpeningScreen({ onOpen }: { onOpen: () => void }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      role="dialog"
      aria-label="Invitation"
      className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[linear-gradient(180deg,#81D4FA_0%,#E3F2FD_45%,#C8E6C9_100%)]"
      initial={false}
      exit={{ opacity: 0, transition: { duration: 0.45 } }}
    >
      <DecorativeParticles count={14} />
      <motion.div
        className="frame relative z-10 mx-auto w-[88%] max-w-[400px] px-7 py-12 text-center shadow-[0_40px_80px_-30px_rgba(30,77,140,.4)]"
        initial={reduce ? false : { opacity: 0.92, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto mb-2 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-900 shadow-md float-bob">
          <Crown size={22} fill="currentColor" />
        </div>
        <p className="eyebrow !tracking-[0.22em]">{b.invitation.title}</p>
        <p className="mt-2 font-sans text-sm font-semibold text-muted">{b.invitation.subtitle}</p>
        <div className="my-6">
          <FloralDivider />
          <h1 className="script my-3 text-[4.2rem] leading-none text-primary">{b.person.name}</h1>
          <p className="h-display text-xl text-primary">Turns</p>
          <OneText />
          <FloralDivider className="mt-4 rotate-180" />
        </div>
        <button
          type="button"
          onClick={onOpen}
          aria-label={b.invitation.cta}
          className="btn-gold relative z-20"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-full border-2 border-sky-300 [animation:ring_2.4s_ease-out_infinite]"
          />
          {b.invitation.cta}
        </button>
      </motion.div>
    </motion.div>
  );
}
