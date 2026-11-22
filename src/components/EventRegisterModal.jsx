import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function EventRegisterModal({ event, formUrl, onClose }) {
  const [headerHeight, setHeaderHeight] = useState(76);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const height = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"), 10) || 76;
      setHeaderHeight(height);
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!formUrl) return null;

  return createPortal(
    <div
      className="fixed inset-x-0 z-[200] flex justify-center bg-slate-900/60 p-4 pb-4 backdrop-blur-sm"
      style={{ top: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)` }}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="soft-panel flex h-full w-full max-w-3xl flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200/60 px-5 py-4">
          <h3 className="font-heading text-xl text-slate-900">Register — {event?.title ?? "Event"}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          <iframe src={formUrl} title={`Register for ${event?.title ?? "event"}`} className="h-full min-h-[480px] w-full border-0" allow="fullscreen" />
        </div>
      </div>
    </div>,
    document.body,
  );
}