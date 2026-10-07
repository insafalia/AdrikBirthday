import { birthday as b } from "@/data/birthday";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import FloralDivider from "@/components/decorations/FloralDivider";

export default function MemoriesSection() {
  return (
    <section className="section" aria-label="Memories">
      <SectionHeading eyebrow="Little Moments · Big Joys" title="First Year Story" />
      <ol className="space-y-12">
        {b.story.map((s, i) => {
          const right = i % 2 === 1;
          const colors = ["text-sky", "text-sage", "text-amber-400", "text-rose"];
          return (
            <li key={s.title} className={`relative ${right ? "text-right" : "text-left"}`}>
              <Reveal y={36}>
                <span
                  aria-hidden
                  className={`outline-num block text-[5.5rem] ${colors[i % colors.length]} ${
                    right ? "pr-1" : "pl-1"
                  }`}
                  style={{ WebkitTextStrokeColor: "currentColor" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`frame -mt-4 w-[88%] px-5 py-5 ${right ? "ml-auto" : ""}`}>
                  <p className="eyebrow">{s.year}</p>
                  <h3 className="h-display mt-1.5 text-[1.65rem]">{s.title}</h3>
                  <p className="body-serif mt-2 text-[1.05rem] text-muted">{s.description}</p>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
      <Reveal className="mt-14">
        <FloralDivider />
      </Reveal>
    </section>
  );
}
