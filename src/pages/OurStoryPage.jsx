import SectionHeading from "../components/SectionHeading";
import { useSiteData } from "../context/SiteDataContext";

export default function OurStoryPage() {
  const { siteData } = useSiteData();
  const about = siteData?.about ?? {};
  const ourStory = siteData?.ourStory ?? {};
  const impactStats = siteData?.impactStats ?? [];

  return (
    <section className="bg-brand-rose/10 pb-16">
      <SectionHeading label="Our Story" title={about.title} />
      <div className="section-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="soft-panel p-7 sm:p-9">
          {about.label ? (
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{about.label}</p>
          ) : null}
          <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
            {(about.paragraphs ?? []).map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          {about.brochure?.file ? (
            <div className="mt-8 border-t border-slate-200/60 pt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Download</p>
              <p className="mt-2 font-heading text-lg text-slate-900">{about.brochure.title ?? "Brochure"}</p>
              {about.brochure.summary ? (
                <p className="mt-2 text-sm leading-7 text-slate-600">{about.brochure.summary}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href={about.brochure.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cta-primary px-5 py-2.5"
                >
                  View PDF
                </a>
                <a
                  href={about.brochure.file}
                  download
                  className="rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-brand-sky hover:text-sky-800"
                >
                  Download
                </a>
              </div>
            </div>
          ) : null}
        </div>
        <div className="space-y-4">
          {impactStats.map((stat) => (
            <article key={stat.label} className="soft-panel p-5">
              <p className="font-heading text-2xl text-slate-900">{stat.value}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">{stat.label}</p>
            </article>
          ))}
        </div>
      </div>

      {(ourStory.paragraphs ?? []).length > 0 ? (
        <div className="section-shell mt-10">
          <h2 className="font-heading text-2xl text-slate-900 sm:text-3xl">{ourStory.title ?? "Our Story"}</h2>
          <div className="soft-panel mt-6 space-y-4 p-7 text-base leading-8 text-slate-700 sm:p-9">
            {ourStory.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}