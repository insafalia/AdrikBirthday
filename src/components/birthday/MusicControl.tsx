"use client";
import { Music, VolumeX } from "lucide-react";

export default function MusicControl({
  playing,
  onToggle,
}: {
  playing: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 mx-auto flex w-full max-w-[480px] justify-end px-5">
      <button
        type="button"
        onClick={onToggle}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
        className="pointer-events-auto grid h-12 w-12 place-items-center rounded-full border-2 border-sky-300 bg-white/95 text-primary shadow-lg backdrop-blur transition hover:scale-105 hover:bg-sky-500 hover:text-white"
      >
        {playing ? <Music size={18} className="animate-pulse" /> : <VolumeX size={18} />}
      </button>
    </div>
  );
}
