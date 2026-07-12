import { useState } from "react";

export default function BioCard({ member }) {
  const [expanded, setExpanded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <article className="soft-panel flex flex-col overflow-hidden p-0">
      {/* Profile image - cropped circle inset */}
       <div className="relative mx-auto mt-6 flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-brand-rose/20 shadow-xl shadow-slate-900/20 sm:h-36 sm:w-36">
        <img
          src={member.image}
          alt={`${member.name} portrait`}
          className="h-full w-full object-cover object-top"
          style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
          loading="lazy"
          onError={() => setImgError(true)}
          onLoad={(e) => {
            // Apply zoom crop on load to focus on upper portion (face area)
            const img = e.target;
            const rect = img.getBoundingClientRect();
            if (img.naturalHeight > img.naturalWidth) {
              // portrait image - zoom slightly and shift down to crop background
              const scale = img.naturalHeight / rect.height;
              const offset = Math.min(img.naturalWidth * 0.15, 50);
              img.style.objectPosition = `center ${offset}px`;
            }
          }}
        />
      </div>

      <div className="p-6 sm:p-7">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{member.role}</p>
        <h3 className="mt-3 text-center font-heading text-2xl text-slate-900">{member.name}</h3>
        <div className="mx-auto mt-2 h-0.5 w-12 rounded-full bg-brand-rose/40" />
        <p className="mt-3 text-center text-sm leading-relaxed text-slate-600">{member.focus}</p>

        <div className="mt-5 border-t border-slate-200 pt-5">
          <div className="space-y-3 text-sm leading-7 text-slate-700">
            {member.bio.map((paragraph, i) => (
              <p key={`${member.name}-bio-${i}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
