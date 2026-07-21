import { useState, useEffect } from "react";
import { scrollToBooking } from "../utils/helpers";

function ServiceFormModal({ service, onClose }) {
  const [headerHeight, setHeaderHeight] = useState(80);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const height = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
      setHeaderHeight(height);
    };
    
    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  return (
    <div 
      className="fixed inset-x-0 z-[9999] flex justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fade-in"
      style={{ top: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)` }}
    >
      <div className="soft-panel flex h-full w-full max-w-3xl flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200/60 px-5 py-4">
          <h3 className="font-heading text-xl text-slate-900">{service.title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <iframe
            src={service.formUrl}
            title={service.title}
            className="h-full w-full border-0"
            allow="fullscreen"
          >
            Loading form...
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default function ServiceCard({ service }) {
  const [showForm, setShowForm] = useState(false);
  const title = service?.title ?? service;
  const description = service?.description ?? "";
  const link = service?.link ?? null;
  const formUrl = service?.formUrl ?? null;

  const handleClick = () => {
    if (formUrl) {
      setShowForm(true);
    } else if (link) {
      const target = document.querySelector(link);
      target?.scrollIntoView({ behavior: "smooth" });
    } else {
      scrollToBooking();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="service-card soft-panel group relative flex w-full min-h-[120px] flex-col items-center justify-center p-5 text-center text-sm font-medium text-slate-800 transition hover:border-brand-sky/50 hover:shadow-boutique"
      >
        <span className="relative z-10 transition group-hover:opacity-0">{title}</span>
        <span className="service-card-hover absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-3xl bg-brand-sky/90 p-5 text-center opacity-0 transition group-hover:opacity-100">
          {description ? (
            <span className="text-sm leading-6 text-slate-900">{description}</span>
          ) : null}
          <span className="inline-block rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-800 shadow-sm">
            {formUrl ? "Click to fill enquiry form →" : link ? "View events →" : "Book an appointment →"}
          </span>
        </span>
      </button>

      {showForm && formUrl ? (
        <ServiceFormModal service={service} onClose={() => setShowForm(false)} />
      ) : null}
    </>
  );
}