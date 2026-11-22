export function getEventSlug(event) {
  return event?.slug ?? event?.id ?? "";
}

export function getEventsList(config) {
  if (Array.isArray(config?.events) && config.events.length > 0) {
    return config.events;
  }
  return [...(config?.ongoing ?? []), ...(config?.completed ?? [])];
}

export function findEventBySlug(config, slug) {
  return getEventsList(config).find((event) => getEventSlug(event) === slug);
}

export function isEventUpcoming(dateString) {
  if (!dateString) return true;
  const eventDate = new Date(dateString);
  if (Number.isNaN(eventDate.getTime())) return true;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  return eventDate >= today;
}

export function partitionEventsByDate(events) {
  const upcoming = [];
  const past = [];
  (events ?? []).forEach((event) => {
    if (isEventUpcoming(event.date)) upcoming.push(event);
    else past.push(event);
  });
  upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
  past.sort((a, b) => new Date(b.date) - new Date(a.date));
  return { upcoming, past };
}

export function getEventPoster(event) {
  return event?.poster ?? event?.image ?? "";
}

export function getEventSummary(event) {
  if (event?.summary) return event.summary;
  const text = event?.description ?? "";
  if (text.length <= 220) return text;
  return `${text.slice(0, 217).trim()}…`;
}

export function getEventDetails(event) {
  return event?.details ?? event?.description ?? "";
}

function embedFormUrl(url) {
  if (!url) return null;
  if (url.includes("embedded=true")) return url;
  if (url.includes("/viewform")) {
    return url.includes("?") ? `${url}&embedded=true` : `${url}?embedded=true`;
  }
  return url;
}

export function getEventRegistrationFormUrl(event, config) {
  return embedFormUrl(event?.registrationFormUrl ?? config?.defaultRegistrationFormUrl ?? null);
}