export default function TeamMemberProfile({ member }) {
  if (!member) return null;

  return (
    <div className="soft-panel p-6 sm:p-8">
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="relative mx-auto flex-shrink-0 md:mx-0">
          <div className="h-48 w-48 overflow-hidden rounded-full border-4 border-white bg-brand-rose/20 shadow-xl shadow-slate-900/20 sm:h-56 sm:w-56">
            <img
              src={member.image}
              alt={`${member.name} portrait`}
              className="h-full w-full object-cover object-top"
              loading="lazy"
            />
          </div>
        </div>
        <div className="flex-1 md:pt-2">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{member.role}</p>
          <h1 className="mt-2 font-heading text-2xl text-slate-900 sm:text-3xl">{member.name}</h1>
          <div className="mt-2 h-0.5 w-12 rounded-full bg-brand-rose/40" />
          <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">{member.focus}</p>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-700">
            {member.bio.map((paragraph, i) => (
              <p key={`${member.name}-bio-${i}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}