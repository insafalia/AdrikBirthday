"use client";
import { motion, useReducedMotion } from "framer-motion";
export default function Reveal({ children, delay = 0, y = 28, className = "", as = "div" }: { children: React.ReactNode; delay?: number; y?: number; className?: string; as?: "div" | "p" | "h2" | "h3" }) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  return (
    <M className={className} initial={reduce ? false : { opacity: 0, y, scale: 0.985, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }} viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: reduce ? 0 : 1.1, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</M>
  );
}
