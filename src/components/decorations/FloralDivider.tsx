/** Playful star + balloon divider for kids theme */
export default function FloralDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 40"
      className={`mx-auto h-9 w-60 ${className}`}
      fill="none"
    >
      <line
        x1="8"
        y1="20"
        x2="78"
        y2="20"
        stroke="url(#kidGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line
        x1="162"
        y1="20"
        x2="232"
        y2="20"
        stroke="url(#kidGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* balloons */}
      <ellipse cx="96" cy="16" rx="7" ry="9" fill="#42A5F5" />
      <ellipse cx="112" cy="12" rx="7" ry="9" fill="#FFCA28" />
      <ellipse cx="128" cy="16" rx="7" ry="9" fill="#66BB6A" />
      <path d="M96 25 Q96 32 94 36" stroke="#8D6E63" strokeWidth="1" />
      <path d="M112 21 Q112 30 112 36" stroke="#8D6E63" strokeWidth="1" />
      <path d="M128 25 Q128 32 130 36" stroke="#8D6E63" strokeWidth="1" />
      {/* star */}
      <path
        d="M144 14 L146.2 19.5 L152 20 L147.8 23.5 L149.2 29 L144 26 L138.8 29 L140.2 23.5 L136 20 L141.8 19.5 Z"
        fill="#FF8A65"
      />
      <defs>
        <linearGradient id="kidGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#42A5F5" />
          <stop offset="50%" stopColor="#FFCA28" />
          <stop offset="100%" stopColor="#EF5350" />
        </linearGradient>
      </defs>
    </svg>
  );
}
