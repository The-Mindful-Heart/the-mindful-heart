import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import ContactBlock from "../components/ContactBlock";
import Disclaimer from "../components/Disclaimer";
import { useSiteData } from "../context/SiteDataContext";

export default function HomePage() {
  const { siteData, disclaimer } = useSiteData();
  const hero = siteData?.hero ?? {};
  const quote = siteData?.quote ?? {};
  const goals = siteData?.goals ?? {};

  return (
    <>
      <section className="section-shell pb-8">
        <div className="soft-panel relative overflow-hidden p-8 sm:p-10 lg:p-14">
          {hero.backgroundImage ? (
            <img
              src={hero.backgroundImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-10"
              loading="lazy"
            />
          ) : null}
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="space-y-6">
              {hero.badge ? (
                <p className="inline-flex rounded-full bg-brand-rose/35 px-4 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-700">
                  {hero.badge}
                </p>
              ) : null}
              <h1 className="font-heading text-4xl leading-tight text-slate-900 sm:text-5xl lg:text-6xl">
                {hero.title}
                {hero.titleAccent ? <span className="block text-sky-700">{hero.titleAccent}</span> : null}
              </h1>
              {hero.description ? (
                <p className="max-w-2xl text-base leading-8 text-slate-700 sm:text-lg">{hero.description}</p>
              ) : null}
              <div className="flex flex-wrap gap-3">
                {hero.primaryCta ? (
                  <Link to={hero.primaryCta.href ?? "/book"} className="cta-primary">
                    {hero.primaryCta.label}
                  </Link>
                ) : null}
                {hero.secondaryCta ? (
                  <Link to={hero.secondaryCta.href ?? "/our-story"} className="cta-secondary">
                    {hero.secondaryCta.label}
                  </Link>
                ) : null}
              </div>
            </div>
            {quote.text ? (
              <blockquote className="rounded-2xl border border-brand-sky/30 bg-white/80 p-5">
                <p className="font-heading text-xl leading-8 text-slate-900">&ldquo;{quote.text}&rdquo;</p>
                {quote.author ? (
                  <footer className="mt-2 text-sm font-medium text-slate-600">— {quote.author}</footer>
                ) : null}
              </blockquote>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-brand-rose/10 pb-12">
        <SectionHeading label="Our Goals" title={goals.title ?? "Our Goals"} description={goals.description} />
        <div className="section-shell grid gap-4 md:grid-cols-2">
          {(goals.items ?? []).map((goal) => (
            <div key={goal} className="soft-panel flex items-start gap-3 p-5">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-mint" />
              <p className="text-sm leading-7 text-slate-700">{goal}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-shell pb-16">
        <SectionHeading label="Contact" title="Get in touch" />
        <ContactBlock />
      </section>

      <Disclaimer config={disclaimer} />
    </>
  );
}