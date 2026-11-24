import SectionHeading from "../components/SectionHeading";
import { useSiteData } from "../context/SiteDataContext";

export default function ResourcesPage() {
  const { siteData } = useSiteData();
  const resources = siteData?.resources ?? {};
  const items = resources.items ?? [];

  return (
    <section className="bg-brand-rose/10 pb-16">
      <SectionHeading
        label="Resources"
        title={resources.title ?? "Resources"}
        description={resources.description}
      />
      <div className="section-shell">
        {items.length === 0 ? (
          <div className="soft-panel p-8 text-center text-sm leading-7 text-slate-600">
            {resources.placeholder ?? "New content will appear here soon."}
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.id ?? item.file}>
                <article className="soft-panel flex h-full flex-col p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {item.type === "pdf" ? "PDF handout" : item.type ?? "Resource"}
                  </p>
                  <h2 className="mt-2 font-heading text-xl text-slate-900">{item.title}</h2>
                  {item.summary ? <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{item.summary}</p> : null}
                  {item.file ? (
                    <div className="mt-5 flex flex-wrap gap-3">
                      <a href={item.file} target="_blank" rel="noopener noreferrer" className="cta-primary px-5 py-2.5">
                        View PDF
                      </a>
                      <a
                        href={item.file}
                        download
                        className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-sky hover:text-sky-800"
                      >
                        Download
                      </a>
                    </div>
                  ) : null}
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}