import { Link } from "react-router-dom";
import { getMemberSlug } from "../utils/teamSlugs";

export default function BioCard({ member }) {
  const slug = getMemberSlug(member);

  return (
    <Link
      to={`/team/${slug}`}
      className="soft-panel flex flex-col items-center p-6 transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
      aria-label={`View profile of ${member.name}`}
    >
      <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-brand-rose/20 shadow-xl shadow-slate-900/20 sm:h-36 sm:w-36">
        <img
          src={member.image}
          alt={`${member.name} portrait`}
          className="h-full w-full object-cover object-top"
          loading="lazy"
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="font-heading text-xl text-slate-900 sm:text-2xl">{member.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{member.role}</p>
      </div>
    </Link>
  );
}