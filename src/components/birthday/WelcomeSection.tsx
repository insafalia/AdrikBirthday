import { Crown } from "lucide-react";
import { birthday as b } from "@/data/birthday";
import Reveal from "@/components/ui/Reveal";
import GoldOrnament from "@/components/decorations/GoldOrnament";
import FloralDivider from "@/components/decorations/FloralDivider";

export default function WelcomeSection() {
  const [l1, l2] = b.welcome.lines;
  return (
    <section
      className="section flex min-h-[100svh] flex-col items-center justify-center text-center"
      aria-labelledby="welcome"
    >
      <Reveal>
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 text-amber-900 shadow-lg float-bob">
          <Crown size={26} fill="currentColor" />
        </div>
      </Reveal>
      <Reveal>
        <GoldOrnament>{b.welcome.eyebrow}</GoldOrnament>
      </Reveal>
      <Reveal delay={0.35} className="mt-8 font-sans text-lg font-semibold text-muted">
        {l1}
      </Reveal>
      <Reveal delay={0.7} className="body-serif mt-4 max-w-[20rem] text-primary">
        {l2}
      </Reveal>
      <Reveal delay={1.1} className="mt-12">
        <FloralDivider />
      </Reveal>
      <Reveal delay={1.4}>
        <h2 id="welcome" className="script gold-text mt-5 text-[5.5rem] leading-none">
          {b.person.name}
        </h2>
      </Reveal>
      <Reveal delay={1.7} className="mt-3">
        <p className="h-display text-xl">Turns</p>
        <p className="mt-1 flex items-baseline justify-center gap-1" aria-label="ONE!">
          <span className="one-letter one-o">O</span>
          <span className="one-letter one-n">N</span>
          <span className="one-letter one-e">E</span>
          <span className="one-letter one-bang">!</span>
        </p>
      </Reveal>
    </section>
  );
}
