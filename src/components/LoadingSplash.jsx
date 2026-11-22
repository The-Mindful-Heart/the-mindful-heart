/** Startup loader — brain & heart “dance” (replace with a GIF via site.json → loading.gif). */

export default function LoadingSplash({ gifSrc }) {
  if (gifSrc) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-offwhite" role="status" aria-label="Loading">
        <img src={gifSrc} alt="" className="max-h-[min(42vh,280px)] w-auto object-contain px-4" />
      </div>
    );
  }

  return (
    <div className="loading-splash flex min-h-screen flex-col items-center justify-center bg-brand-offwhite px-6" role="status" aria-label="Loading">
      <div className="loading-dance-stage relative h-36 w-56 sm:h-40 sm:w-64">
        <div className="loading-dance-glow" aria-hidden />
        <svg viewBox="0 0 224 144" className="relative h-full w-full" aria-hidden>
          <g className="loading-dance-brain">
            <ellipse cx="62" cy="118" rx="18" ry="4" fill="#fbcfe8" opacity="0.5" />
            <path
              d="M38 52c0-14 10-24 24-24s24 10 24 24c0 8-2 14-6 18-4 6-10 10-18 10s-14-4-18-10c-4-4-6-10-6-18z"
              fill="#fce7f3"
              stroke="#334155"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M50 44c6-4 14-4 20 0M54 38c4-2 10-2 14 0" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <path d="M48 62c4 2 8 2 12 0" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <path d="M52 56q2 3 4 0" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="72" y1="78" x2="88" y2="88" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <line x1="40" y1="90" x2="34" y2="108" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <line x1="48" y1="92" x2="46" y2="112" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          </g>
          <g className="loading-dance-heart">
            <ellipse cx="162" cy="118" rx="18" ry="4" fill="#fbcfe8" opacity="0.5" />
            <path
              d="M162 44c-6-10-18-10-24 0-6-10-18-10-24 0 0 14 12 26 24 36 12-10 24-22 24-36z"
              fill="#fce7f3"
              stroke="#334155"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path d="M148 36v-8M176 36v-8M162 28v-6" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <path d="M154 58c4 2 8 2 12 0" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <path d="M158 52q2 3 4 0" fill="none" stroke="#334155" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="136" y1="78" x2="120" y2="88" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <line x1="172" y1="90" x2="178" y2="108" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
            <line x1="164" y1="92" x2="166" y2="112" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
          </g>
          <path
            className="loading-dance-hands"
            d="M88 88 Q112 76 120 88"
            fill="none"
            stroke="#49b9ff"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className="mt-4 font-heading text-sm tracking-wide text-slate-500">The Mindful Heart</p>
    </div>
  );
}