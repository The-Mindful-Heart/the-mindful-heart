import { EventsSection } from "../components/EventsSection";
import { useSiteData } from "../context/SiteDataContext";

export default function EventsPage() {
  const { events, eventsLoading } = useSiteData();

  return <EventsSection config={events} loading={eventsLoading} />;
}