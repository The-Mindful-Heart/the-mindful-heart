import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import EventGallery from "../components/EventGallery";
import EventRegisterModal from "../components/EventRegisterModal";
import { useSiteData } from "../context/SiteDataContext";
import { findEventBySlug, getEventDetails, getEventRegistrationFormUrl, isEventUpcoming } from "../utils/eventSlugs";
import { formatEventDate } from "../utils/helpers";

export default function EventDetailPage() {
  const { slug } = useParams();
  const { events } = useSiteData();
  const event = findEventBySlug(events, slug);
  const eventsLabel = events?.title ? "Events" : "Events";
  const [showRegister, setShowRegister] = useState(false);

  const upcoming = event ? isEventUpcoming(event.date) : false;
  const formUrl = event ? getEventRegistrationFormUrl(event, events) : null;
  const details = event ? getEventDetails(event) : "";

  useEffect(() => {
    if (event?.title) {
      document.title = `${event.title} | The Mindful Heart`;
    }
    return () => {
      document.title = "The Mindful Heart";
    };
  }, [event?.title]);

  if (!event) {
    return (
      <section className="bg-brand-rose/10 py-12">
        <div className="section-shell">
          <Breadcrumbs
            backTo="/events"
            backLabel="Back to events"
            items={[
              { label: eventsLabel, to: "/events" },
              { label: "Not found" },
            ]}
          />
          <p className="text-slate-600">This event could not be found.</p>
          <Link to="/events" className="mt-4 inline-block text-sm font-semibold text-sky-700">
            View all events
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-brand-rose/10 pb-16">
      <div className="section-shell">
        <Breadcrumbs
          backTo="/events"
          backLabel="Back to events"
          items={[
            { label: eventsLabel, to: "/events" },
            { label: event.title },
          ]}
        />

        <EventGallery event={event} />

        <article className="soft-panel mt-6 p-6 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
            {formatEventDate(event.date)}
            {event.time ? ` · ${event.time}` : ""}
          </p>
          <h1 className="mt-2 font-heading text-3xl text-slate-900 sm:text-4xl">{event.title}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {event.mode}
            {event.location ? ` · ${event.location}` : ""}
          </p>
          {details ? (
            <div className="prose prose-slate mt-8 max-w-none text-base leading-8 text-slate-700">
              {details.split(/\n\n+/).map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          ) : null}

          {upcoming && formUrl ? (
            <div className="mt-10 flex justify-center border-t border-slate-200/60 pt-8">
              <button type="button" onClick={() => setShowRegister(true)} className="cta-primary px-8 py-3">
                Register
              </button>
            </div>
          ) : null}
        </article>
      </div>

      {showRegister && formUrl ? (
        <EventRegisterModal event={event} formUrl={formUrl} onClose={() => setShowRegister(false)} />
      ) : null}
    </section>
  );
}