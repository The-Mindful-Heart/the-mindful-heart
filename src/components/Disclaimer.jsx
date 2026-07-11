export default function Disclaimer({ config }) {
  if (!config?.message) return null;

  return (
    <section id="disclaimer" className="border-t border-amber-200/60 bg-amber-50/80 py-12">
      <div className="section-shell">
        <div className="soft-panel border-amber-200/60 bg-white/90 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 text-xl" aria-hidden="true">
              ⚠
            </span>
            <div className="flex-1">
              <h2 className="font-heading text-xl text-slate-900">{config.title ?? "Important Notice"}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-700">{config.message}</p>

              {config.emergencyContacts?.length ? (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-slate-600">
                    Emergency Mental Health Contacts
                  </h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {config.emergencyContacts.map((contact) => (
                      <div
                        key={`${contact.name}-${contact.number}`}
                        className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-amber-800/70">
                          {contact.region}
                        </p>
                        <p className="mt-1 font-medium text-slate-900">{contact.name}</p>
                        <a
                          href={`tel:${contact.number.replace(/[^\d+]/g, "")}`}
                          className="mt-1 block text-lg font-semibold text-sky-700 hover:text-sky-900"
                        >
                          {contact.number}
                        </a>
                        {contact.description ? (
                          <p className="mt-1 text-xs leading-5 text-slate-600">{contact.description}</p>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
