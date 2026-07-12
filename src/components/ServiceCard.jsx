import { scrollToBooking } from "../utils/helpers";

export default function ServiceCard({ service }) {
  const title = service?.title ?? service;
  const description = service?.description ?? "";
  const link = service?.link ?? null;

  const handleClick = () => {
    if (link) {
      const target = document.querySelector(link);
      target?.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollToBooking();
    }
  };

    return (
    <button
      type="button"
      onClick={handleClick}
      className="service-card soft-panel group relative flex w-full min-h-[100px] flex-col p-5 text-left text-sm font-medium text-slate-800 transition hover:border-brand-sky/50 hover:shadow-boutique"
    >
      <span className="relative z-10 transition group-hover:opacity-0">{title}</span>
      {description ? (
        <span className="service-card-hover absolute inset-0 flex items-center justify-center rounded-3xl bg-brand-sky/90 p-6 text-sm font-semibold text-slate-900 opacity-0 transition group-hover:opacity-100">
          {link ? "View events" : description}
        </span>
      ) : (
        <span className="service-card-hover absolute inset-0 flex items-center justify-center rounded-3xl bg-brand-sky/90 text-sm font-semibold text-slate-900 opacity-0 transition group-hover:opacity-100">
          {link ? "View events" : "Book an appointment"}
        </span>
      )}
    </button>
  );
}
