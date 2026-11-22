import { useState } from "react";
import SectionHeading from "./SectionHeading";
import EventTile from "./EventTile";
import EventRegisterModal from "./EventRegisterModal";
import { getEventRegistrationFormUrl, getEventsList, partitionEventsByDate } from "../utils/eventSlugs";

export function EventsSection({ config, loading }) {
  const [tab, setTab] = useState("upcoming");
  const [registerEvent, setRegisterEvent] = useState(null);

  const { upcoming, past } = partitionEventsByDate(getEventsList(config));
  const list = tab === "upcoming" ? upcoming : past;
  const formUrl = registerEvent ? getEventRegistrationFormUrl(registerEvent, config) : null;

  const upcomingLabel = config?.ongoingLabel ?? "Upcoming";
  const pastLabel = config?.completedLabel ?? "Past";

  return (
    <section className="bg-brand-rose/10 pb-16">
      <SectionHeading
        label="Events"
        title={config?.title ?? "Events & Workshops"}
        description={config?.description}
      />
      <div className="section-shell">
        {loading ? (
          <div className="soft-panel p-6 text-sm text-slate-600">Loading events...</div>
        ) : (
          <>
            <div className="mb-8 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setTab("upcoming")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  tab === "upcoming" ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {upcomingLabel}
                {upcoming.length ? ` (${upcoming.length})` : ""}
              </button>
              <button
                type="button"
                onClick={() => setTab("past")}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  tab === "past" ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                {pastLabel}
                {past.length ? ` (${past.length})` : ""}
              </button>
            </div>

            {list.length === 0 ? (
              <div className="soft-panel p-8 text-center text-sm text-slate-600">
                {tab === "upcoming" ? "No upcoming events at the moment. Check back soon." : "No past events to show yet."}
              </div>
            ) : (
              <div className="space-y-6">
                {list.map((event) => (
                  <EventTile
                    key={event.id ?? event.slug ?? event.title}
                    event={event}
                    onRegister={tab === "upcoming" ? setRegisterEvent : null}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {registerEvent && formUrl ? (
        <EventRegisterModal event={registerEvent} formUrl={formUrl} onClose={() => setRegisterEvent(null)} />
      ) : null}
    </section>
  );
}