import { formatEventDate } from "../utils/helpers";
import VideoEmbed from "./VideoEmbed";

function EventMeta({ event }) {
  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
        {formatEventDate(event.date)}
        {event.time ? ` · ${event.time}` : ""}
      </p>
      <h3 className="mt-2 font-heading text-2xl text-slate-900">{event.title ?? "Untitled Event"}</h3>
      <p className="mt-2 text-sm text-slate-600">
        {event.mode ?? "Online/In-person"}
        {event.location ? ` · ${event.location}` : ""}
      </p>
      {event.description ? <p className="mt-4 text-sm leading-7 text-slate-700">{event.description}</p> : null}
    </>
  );
}

function EventCta({ event }) {
  if (!event.ctaLabel || !event.ctaUrl) return null;

  const isInternal = event.ctaUrl.startsWith("#");

  if (isInternal) {
    return (
      <a href={event.ctaUrl} className="cta-primary mt-5 inline-flex px-5 py-2.5">
        {event.ctaLabel}
      </a>
    );
  }

  return (
    <a href={event.ctaUrl} target="_blank" rel="noreferrer" className="cta-primary mt-5 inline-flex px-5 py-2.5">
      {event.ctaLabel}
    </a>
  );
}

function FeaturedTemplate({ event }) {
  return (
    <article className="soft-panel overflow-hidden p-0 md:col-span-2">
      {event.image ? (
        <div className="relative h-56 w-full overflow-hidden sm:h-64">
          <img src={event.image} alt="" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
        </div>
      ) : null}
      <div className="p-6 sm:p-8">
        <EventMeta event={event} />
        {event.videos?.length ? (
          <div className="mt-5 space-y-4">
            {event.videos.map((video) => (
              <div key={video.url}>
                {video.title ? <p className="mb-2 text-sm font-medium text-slate-600">{video.title}</p> : null}
                <VideoEmbed url={video.url} title={video.title ?? event.title} />
              </div>
            ))}
          </div>
        ) : null}
        <EventCta event={event} />
      </div>
    </article>
  );
}

function MediaTemplate({ event }) {
  return (
    <article className="soft-panel overflow-hidden p-0">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[220px] bg-brand-rose/15">
          {event.videos?.[0] ? (
            <VideoEmbed url={event.videos[0].url} title={event.videos[0].title ?? event.title} className="h-full rounded-none" />
          ) : event.image ? (
            <img src={event.image} alt="" className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="flex h-full min-h-[220px] items-center justify-center text-sm text-slate-500">No media</div>
          )}
        </div>
        <div className="p-6">
          <EventMeta event={event} />
          <EventCta event={event} />
        </div>
      </div>
    </article>
  );
}

function CompactTemplate({ event }) {
  return (
    <article className="soft-panel p-6">
      <EventMeta event={event} />
      {event.videos?.length ? (
        <div className="mt-4">
          <VideoEmbed url={event.videos[0].url} title={event.videos[0].title ?? event.title} />
        </div>
      ) : null}
      <EventCta event={event} />
    </article>
  );
}

export default function EventCard({ event }) {
  const template = event.template ?? "compact";

  if (template === "featured") return <FeaturedTemplate event={event} />;
  if (template === "media") return <MediaTemplate event={event} />;
  return <CompactTemplate event={event} />;
}

export function EventsSection({ config, loading }) {
  const ongoing = config?.ongoing ?? [];
  const completed = config?.completed ?? [];

  return (
    <section id="events" className="scroll-mt-24 pb-4">
      <div className="section-shell mb-4">
        <span style={{display:'inline-block',borderRadius:'9999px',backgroundColor:'#e0f2fe',padding:'6px 16px',fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#075985',boxShadow:'0 1px 2px 0 rgb(0 0 0 / 0.05)'}}>Events</span>
      </div>
      <div className="section-shell">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl text-slate-900 sm:text-4xl">{config?.title ?? "Events & Workshops"}</h2>
          {config?.description ? (
            <p className="mt-3 text-base leading-8 text-slate-700">{config.description}</p>
          ) : null}
        </div>

        {loading ? (
          <div className="soft-panel p-6 text-sm text-slate-600">Loading events...</div>
        ) : (
          <div className="space-y-12">
            {ongoing.length > 0 ? (
              <div>
                <h3 className="mb-5 font-heading text-xl text-slate-800">{config?.ongoingLabel ?? "Upcoming"}</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  {ongoing.map((event) => (
                    <EventCard key={event.id ?? event.title} event={event} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="soft-panel p-6 text-sm text-slate-600">No upcoming events at the moment. Check back soon.</div>
            )}

            {completed.length > 0 ? (
              <div>
                <h3 className="mb-5 font-heading text-xl text-slate-800">{config?.completedLabel ?? "Past Events"}</h3>
                <div className="grid gap-5 md:grid-cols-2">
                  {completed.map((event) => (
                    <EventCard key={event.id ?? event.title} event={event} />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}