"use client";
import { useEffect, useState } from "react";

type P = {
  l: number;
  s: number;
  d: number;
  delay: number;
  k: number;
  sway: number;
  dx: number;
  dy: number;
  r: number;
};

/** Kids confetti: balloons, stars & colorful bits */
export default function DecorativeParticles({
  count = 14,
  variant = "fall",
  fixed = false,
}: {
  count?: number;
  variant?: "fall" | "burst";
  fixed?: boolean;
}) {
  const [items, setItems] = useState<P[]>([]);
  useEffect(() => {
    setItems(
      Array.from({ length: count }, () => ({
        l: Math.random() * 100,
        s: 6 + Math.random() * 10,
        d: 12 + Math.random() * 14,
        delay: -Math.random() * 20,
        k: Math.floor(Math.random() * 5),
        sway: (Math.random() - 0.5) * 120,
        dx: (Math.random() - 0.5) * 360,
        dy: -60 - Math.random() * 280,
        r: Math.random() * 720 - 360,
      })),
    );
  }, [count]);
  const cls = fixed
    ? "fixed inset-y-0 left-1/2 w-full max-w-[480px] -translate-x-1/2 z-0"
    : "absolute inset-0";
  const fallKinds = ["petal", "dust", "petal sage", "petal", "dust"];
  return (
    <div aria-hidden className={`particles pointer-events-none overflow-hidden ${cls}`}>
      {items.map((p, i) =>
        variant === "fall" ? (
          <span
            key={i}
            className={`particle ${fallKinds[p.k]}`}
            style={{
              left: `${p.l}%`,
              width: p.s,
              height: p.k === 1 || p.k === 4 ? p.s / 2.2 : p.s * 1.25,
              animationDuration: `${p.d}s`,
              animationDelay: `${p.delay}s`,
              ["--sway" as string]: `${p.sway}px`,
              background:
                p.k === 0
                  ? "var(--color-rose)"
                  : p.k === 1
                    ? "var(--color-accent)"
                    : p.k === 2
                      ? "var(--color-sage)"
                      : p.k === 3
                        ? "var(--color-sky)"
                        : "var(--color-lilac, #CE93D8)",
            }}
          />
        ) : (
          <span
            key={i}
            className={`confetti c${p.k % 5}`}
            style={{
              left: "50%",
              top: "55%",
              width: p.s * 0.65,
              height: p.s * 1.15,
              ["--dx" as string]: `${p.dx}px`,
              ["--dy" as string]: `${p.dy}px`,
              ["--r" as string]: `${p.r}deg`,
              animationDelay: `${i * 12}ms`,
            }}
          />
        ),
      )}
    </div>
  );
}
