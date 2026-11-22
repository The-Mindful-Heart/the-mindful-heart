import { Link } from "react-router-dom";
import { formatEventDate } from "../utils/helpers";
import { getEventPoster, getEventSlug, getEventSummary, isEventUpcoming } from "../utils/eventSlugs";

export default function EventTile({ event, onRegister }) {
  const slug = getEventSlug(event);
  const poster = getEventPoster(event);
  const summary = getEventSummary(event);
  const upcoming = isEventUpcoming(event.date);

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      <div className="grid min-h-[280px] md:grid-cols-2">
        <div className="relative min-h-[220px] bg-brand-rose/10 md:min-h-[280px]">
          {poster ? (
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center text-sm text-slate-500 md:min-h-[280px]">Event poster</div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center border-t border-slate-200/60 p-8 text-center md:border-l md:border-t-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {formatEventDate(event.date)}
            {event.time ? ` · ${event.time}` : ""}
          </p>
          <h3 className="mt-3 font-heading text-2xl text-slate-900 sm:text-3xl">{event.title}</h3>
          {summary ? <p className="mt-4 max-w-md text-sm leading-7 text-slate-600">{summary}</p> : null}
          <p className="mt-2 text-xs text-slate-500">
            {event.mode}
            {event.location ? ` · ${event.location}` : ""}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to={`/events/${slug}`} className="cta-primary px-6 py-2.5">
              More details
            </Link>
            {upcoming && onRegister ? (
              <button type="button" onClick={() => onRegister(event)} className="rounded-full border border-slate-900 bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                Register here
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}