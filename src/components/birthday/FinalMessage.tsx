import { Heart } from "lucide-react";
import { birthday as b } from "@/data/birthday";
import Reveal from "@/components/ui/Reveal";
import FloralDivider from "@/components/decorations/FloralDivider";
import DecorativeParticles from "@/components/decorations/DecorativeParticles";

export default function FinalMessage() {
  return (
    <section
      className="section flex min-h-[100svh] flex-col items-center justify-center pb-32 text-center"
      aria-label="Closing message"
    >
      <DecorativeParticles count={12} />
      <Reveal>
        <FloralDivider />
      </Reveal>
      <Reveal delay={0.3} as="h2" className="h-display mt-10 text-[2.1rem] leading-snug">
        {b.final.title[0]}
        <br />
        <span className="text-sky">{b.final.title[1]}</span>
      </Reveal>
      <Reveal delay={0.6} className="mt-3">
        <Heart className="mx-auto text-rose" size={22} fill="currentColor" />
      </Reveal>
      <Reveal delay={0.8} className="body-serif mt-6 max-w-[18rem] text-muted">
        {b.final.thanks}
      </Reveal>
      <Reveal delay={1.2} className="mt-12">
        <p className="eyebrow">{b.final.signoff}</p>
        <div className="ribbon mt-4">
          <Heart size={14} fill="currentColor" className="text-rose" />
          {b.final.hosts}
          <Heart size={14} fill="currentColor" className="text-rose" />
        </div>
      </Reveal>
      <Reveal delay={1.7} className="mt-12">
        <p className="font-display text-2xl font-semibold text-primary">{b.final.closing}</p>
        <FloralDivider className="mt-6 rotate-180" />
      </Reveal>
    </section>
  );
}
