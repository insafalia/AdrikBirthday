"use client";
import { useEffect, useState } from "react";
export type CountdownState = "loading" | "future" | "today" | "past";
export function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => { setNow(Date.now()); const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  if (now === null) return { days: 0, hours: 0, minutes: 0, seconds: 0, state: "loading" as CountdownState };
  const diff = Math.max(0, target.getTime() - now), t = Math.floor(diff / 1000);
  const sameDay = new Date(now).toDateString() === target.toDateString();
  const state: CountdownState = sameDay ? "today" : diff > 0 ? "future" : "past";
  return { days: Math.floor(t / 86400), hours: Math.floor((t % 86400) / 3600), minutes: Math.floor((t % 3600) / 60), seconds: t % 60, state };
}
