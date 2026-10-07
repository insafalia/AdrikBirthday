"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { birthday as b, dayMonth, formatTime } from "@/data/birthday";
import SectionHeading from "@/components/ui/SectionHeading";
import DecorativeParticles from "@/components/decorations/DecorativeParticles";

const BRUSH = 52,
  THRESHOLD = 0.5,
  MAX_SPARKS = 160;
const SPARK_COLORS = ["#FFD54F", "#FF8A65", "#4FC3F7", "#81C784", "#CE93D8", "#FFFFFF"];

type Spark = { x: number; y: number; vx: number; vy: number; life: number; max: number; size: number; color: string; star: boolean; spin: number };

function drawStar(x: CanvasRenderingContext2D, r: number) {
  x.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = (i * Math.PI) / 5 - Math.PI / 2,
      rr = i % 2 ? r * 0.45 : r;
    x.lineTo(Math.cos(a) * rr, Math.sin(a) * rr);
  }
  x.closePath();
  x.fill();
}

export default function ScratchReveal() {
  const canvas = useRef<HTMLCanvasElement>(null),
    fx = useRef<HTMLCanvasElement>(null),
    wrap = useRef<HTMLDivElement>(null);
  const drawing = useRef(false),
    done = useRef(false),
    last = useRef<{ x: number; y: number } | null>(null),
    moves = useRef(0),
    sparks = useRef<Spark[]>([]),
    raf = useRef(0),
    reduced = useRef(false);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return () => cancelAnimationFrame(raf.current);
  }, []);

  // Sparkle trail that bursts out from the finger while scratching
  const animate = useCallback(() => {
    const c = fx.current,
      w = wrap.current;
    if (!c || !w) return;
    const { width, height } = w.getBoundingClientRect(),
      dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (c.width !== Math.round(width * dpr)) {
      c.width = Math.round(width * dpr);
      c.height = Math.round(height * dpr);
    }
    const x = c.getContext("2d")!;
    x.setTransform(dpr, 0, 0, dpr, 0, 0);
    x.clearRect(0, 0, width, height);
    sparks.current = sparks.current.filter((s) => s.life < s.max);
    for (const s of sparks.current) {
      s.life++;
      s.vy += 0.12;
      s.vx *= 0.98;
      s.x += s.vx;
      s.y += s.vy;
      const k = 1 - s.life / s.max;
      x.save();
      x.globalAlpha = k;
      x.fillStyle = s.color;
      x.translate(s.x, s.y);
      x.rotate(s.life * s.spin);
      if (s.star) drawStar(x, s.size * (0.6 + k * 0.4));
      else {
        x.beginPath();
        x.arc(0, 0, s.size * 0.5 * k + 0.5, 0, Math.PI * 2);
        x.fill();
      }
      x.restore();
    }
    raf.current = sparks.current.length ? requestAnimationFrame(animate) : 0;
  }, []);

  const spawn = (p: { x: number; y: number }, n: number) => {
    if (reduced.current) return;
    for (let i = 0; i < n && sparks.current.length < MAX_SPARKS; i++) {
      const a = Math.random() * Math.PI * 2,
        v = 1 + Math.random() * 3;
      sparks.current.push({
        x: p.x,
        y: p.y,
        vx: Math.cos(a) * v,
        vy: Math.sin(a) * v - 1.5,
        life: 0,
        max: 28 + Math.random() * 24,
        size: 4 + Math.random() * 6,
        color: SPARK_COLORS[(Math.random() * SPARK_COLORS.length) | 0],
        star: Math.random() < 0.45,
        spin: (Math.random() - 0.5) * 0.3,
      });
    }
    if (!raf.current) raf.current = requestAnimationFrame(animate);
  };

  const paint = useCallback(() => {
    const c = canvas.current,
      w = wrap.current;
    if (!c || !w || done.current) return;
    const { width, height } = w.getBoundingClientRect(),
      dpr = Math.min(window.devicePixelRatio || 1, 3);
    c.width = width * dpr;
    c.height = height * dpr;
    const x = c.getContext("2d")!;
    x.scale(dpr, dpr);

    // Kids rainbow scratch foil
    const g = x.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#42A5F5");
    g.addColorStop(0.22, "#66BB6A");
    g.addColorStop(0.45, "#FFCA28");
    g.addColorStop(0.68, "#FF8A65");
    g.addColorStop(0.85, "#CE93D8");
    g.addColorStop(1, "#64B5F6");
    x.fillStyle = g;
    x.fillRect(0, 0, width, height);

    // playful polka dots
    x.fillStyle = "rgba(255,255,255,0.28)";
    for (let i = 0; i < 40; i++) {
      const px = (i * 53) % width;
      const py = (i * 37 + 20) % height;
      x.beginPath();
      x.arc(px, py, 4 + (i % 3), 0, Math.PI * 2);
      x.fill();
    }

    // diagonal shimmer lines
    x.strokeStyle = "rgba(255,255,255,0.2)";
    x.lineWidth = 2;
    for (let i = -height; i < width; i += 18) {
      x.beginPath();
      x.moveTo(i, 0);
      x.lineTo(i + height, height);
      x.stroke();
    }

    // cover label
    x.fillStyle = "rgba(255,255,255,0.95)";
    x.textAlign = "center";
    x.font = "700 28px Fredoka, Nunito, sans-serif";
    x.fillText("🎂", width / 2, height / 2 - 22);
    x.font = "800 15px Nunito, sans-serif";
    x.fillStyle = "rgba(30,77,140,0.9)";
    x.fillText(b.scratch.cover.toUpperCase().split("").join(" "), width / 2, height / 2 + 14);
    x.font = "600 12px Nunito, sans-serif";
    x.fillStyle = "rgba(30,77,140,0.7)";
    x.fillText("Swipe to reveal!", width / 2, height / 2 + 36);
  }, []);

  useEffect(() => {
    paint();
    const ro = new ResizeObserver(paint);
    if (wrap.current) ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [paint]);

  const check = () => {
    const c = canvas.current!,
      d = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
    let clear = 0,
      total = 0;
    for (let i = 3; i < d.length; i += 64) {
      total++;
      if (d[i] < 128) clear++;
    }
    if (!done.current) setProgress(Math.min(1, clear / total / THRESHOLD));
    if (clear / total > THRESHOLD && !done.current) {
      done.current = true;
      setRevealed(true);
    }
  };
  const pos = (e: React.PointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const scratch = (e: React.PointerEvent) => {
    if (!drawing.current || done.current) return;
    const p = pos(e),
      x = canvas.current!.getContext("2d")!,
      l = last.current ?? p;
    x.globalCompositeOperation = "destination-out";
    x.lineWidth = BRUSH;
    x.lineCap = x.lineJoin = "round";
    x.beginPath();
    x.moveTo(l.x, l.y);
    x.lineTo(p.x + 0.01, p.y);
    x.stroke();
    last.current = p;
    spawn(p, 2);
    if (++moves.current % 6 === 0) check();
  };

  return (
    <section className="section" aria-labelledby="scratch-h">
      <SectionHeading
        eyebrow={b.scratch.eyebrow}
        title="Scratch & Reveal"
        subtitle={b.scratch.hint}
      />
      <div
        ref={wrap}
        className="frame relative mx-auto h-72 w-full select-none overflow-hidden !rounded-[2rem]"
        id="scratch-h"
      >
        <div className="absolute inset-0 grid place-items-center px-6 text-center">
          <motion.div
            initial={false}
            animate={
              revealed
                ? { opacity: 1, scale: 1, y: 0 }
                : { opacity: 0, scale: 0.9, y: 10 }
            }
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky">
              You&apos;re invited!
            </p>
            <p className="h-display mt-2 text-3xl">
              {b.person.name}&apos;s 1st Birthday
            </p>
            <div className="mt-1 flex items-baseline justify-center gap-0.5" aria-hidden>
              <span className="one-letter one-o !text-4xl">O</span>
              <span className="one-letter one-n !text-4xl">N</span>
              <span className="one-letter one-e !text-4xl">E</span>
              <span className="one-letter one-bang !text-4xl">!</span>
            </div>
            <span className="hairline mx-auto my-4 w-28" />
            <p className="font-display text-xl font-semibold text-primary">
              {dayMonth(b.date)}
            </p>
            <p className="mt-1 font-sans text-base font-semibold text-muted">
              {formatTime(b.time)} – {formatTime(b.endTime)}
            </p>
            <p className="mt-2 font-sans text-sm font-medium text-sage">
              {b.venue.name}
            </p>
          </motion.div>
        </div>
        <canvas
          ref={canvas}
          aria-label="Scratch surface. Drag to reveal the surprise."
          role="img"
          className={`absolute inset-0 h-full w-full cursor-crosshair touch-none transition-opacity duration-[1400ms] ${
            revealed ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
          style={{ touchAction: "none" }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drawing.current = true;
            last.current = null;
            scratch(e);
            spawn(pos(e), 8);
          }}
          onPointerMove={scratch}
          onPointerUp={() => {
            drawing.current = false;
            last.current = null;
            check();
          }}
          onPointerCancel={() => {
            drawing.current = false;
            last.current = null;
          }}
        />
        <canvas ref={fx} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />
        {revealed && <DecorativeParticles variant="burst" count={40} />}
      </div>
      {!revealed && (
        <>
          <div
            className="mx-auto mt-5 h-2.5 w-48 overflow-hidden rounded-full bg-[#E3F2FD]"
            role="progressbar"
            aria-label="Scratch progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#42A5F5] via-[#FFCA28] to-[#FF8A65] transition-[width] duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="mt-3 text-center font-sans text-base font-semibold italic text-muted">
            {b.scratch.after}
          </p>
        </>
      )}
    </section>
  );
}
