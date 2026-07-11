import { scrollToBooking } from "../utils/helpers";

export default function ServiceCard({ service }) {
  return (
    <button
      type="button"
      onClick={scrollToBooking}
      className="service-card soft-panel group relative w-full p-5 text-left text-sm font-medium text-slate-800 transition hover:border-brand-sky/50 hover:shadow-boutique"
    >
      <span className="relative z-10">{service}</span>
      <span className="service-card-hover absolute inset-0 flex items-center justify-center rounded-3xl bg-brand-sky/90 text-sm font-semibold text-slate-900 opacity-0 transition group-hover:opacity-100">
        Book an appointment
      </span>
    </button>
  );
}
