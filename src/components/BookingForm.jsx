export default function BookingForm({ booking }) {
  if (!booking?.formUrl) {
    return (
      <div className="soft-panel p-6 text-sm text-slate-600">
        Add your Google Form embed URL in <code className="text-xs">public/config/site.json</code> under{" "}
        <code className="text-xs">booking.formUrl</code>.
      </div>
    );
  }

  return (
    <div className="soft-panel overflow-hidden p-0">
      <iframe
        src={booking.formUrl}
        title="Appointment booking form"
        width="100%"
        height={booking.formHeight ?? 900}
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        className="w-full border-0"
      >
        Loading appointment form…
      </iframe>
    </div>
  );
}
