import GoldOrnament from "@/components/decorations/GoldOrnament";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="mb-12 text-center">
      <Reveal>
        <GoldOrnament>{eyebrow}</GoldOrnament>
      </Reveal>
      <Reveal delay={0.15} as="h2" className="h-display mt-5 text-[2.35rem]">
        {title}
      </Reveal>
      {subtitle && (
        <Reveal delay={0.3} className="mt-3 font-sans text-base font-semibold text-muted">
          {subtitle}
        </Reveal>
      )}
    </header>
  );
}
