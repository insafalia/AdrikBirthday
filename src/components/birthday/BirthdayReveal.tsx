"use client";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { birthday as b } from "@/data/birthday";
import Reveal from "@/components/ui/Reveal";

export default function BirthdayReveal() {
  const ref = useRef<HTMLElement>(null),
    reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [50, -50]);
  const scale = useTransform(scrollYProgress, [0.1, 0.5], reduce ? [1, 1] : [0.85, 1]);
  return (
    <section ref={ref} className="section text-center" aria-label="Birthday reveal">
      <Reveal>
        <p className="eyebrow">{b.reveal.lead}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <h2 className="script mt-3 text-[4.5rem] leading-none text-primary">{b.person.name}</h2>
      </Reveal>
      <motion.div style={{ y }} className="relative mx-auto mt-10 w-[82%]">
        <div className="photo arch aspect-[3/4]">
          <Image
            src={b.person.photo}
            alt={b.person.photoAlt}
            fill
            priority
            sizes="(max-width:480px) 82vw, 380px"
            className="object-cover object-top"
          />
        </div>
        <motion.span
          style={{ scale }}
          aria-label={`${b.person.age}`}
          className="outline-num absolute -bottom-12 -right-4 text-[9rem] drop-shadow-[0_0_24px_rgba(255,255,255,.95)]"
        >
          {b.person.age}
        </motion.span>
      </motion.div>
      <Reveal delay={0.2} className="mt-24 font-display text-2xl font-semibold text-primary">
        {b.reveal.caption}
      </Reveal>
    </section>
  );
}
