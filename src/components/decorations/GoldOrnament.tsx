/** Playful eyebrow with stars either side */
export default function GoldOrnament({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-2.5 text-sky">
      <span className="hairline w-7" />
      <span aria-hidden className="text-amber-400">★</span>
      {children && (
        <span className="eyebrow !tracking-[.2em] !text-sky">{children}</span>
      )}
      {children && <span aria-hidden className="text-amber-400">★</span>}
      <span className="hairline w-7" />
    </div>
  );
}
