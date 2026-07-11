import Header from "./components/Header";
import BioCard from "./components/BioCard";
import ServiceCard from "./components/ServiceCard";
import VideoReel from "./components/VideoReel";
import { EventsSection } from "./components/EventsSection";
import BlogSection from "./components/BlogSection";
import BookingForm from "./components/BookingForm";
import Disclaimer from "./components/Disclaimer";
import { useSiteConfigs } from "./hooks/useSiteConfigs";

function App() {
  const { site, services, team, events, videos, blogs, disclaimer, loading } = useSiteConfigs();

  const siteData = site.data ?? {};
  const hero = siteData.hero ?? {};
  const quote = siteData.quote ?? {};
  const about = siteData.about ?? {};
  const goals = siteData.goals ?? {};
  const servicesSection = siteData.services ?? {};
  const teamSection = siteData.team ?? {};
  const booking = siteData.booking ?? {};
  const impactStats = siteData.impactStats ?? [];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-offwhite text-slate-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-offwhite text-slate-800">
      <Header site={siteData} />

      <main id="home">
        <section className="section-shell py-14 md:py-20">
          <div className="soft-panel relative overflow-hidden p-8 sm:p-10 lg:p-14">
            {hero.backgroundImage ? (
              <img
                src={hero.backgroundImage}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-20"
                loading="lazy"
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-offwhite/95 via-brand-offwhite/90 to-brand-rose/25" />
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
                    <a href={hero.primaryCta.href ?? "#book"} className="cta-primary">
                      {hero.primaryCta.label}
                    </a>
                  ) : null}
                  {hero.secondaryCta ? (
                    <a href={hero.secondaryCta.href ?? "#about"} className="cta-secondary">
                      {hero.secondaryCta.label}
                    </a>
                  ) : null}
                </div>
              </div>

              {quote.text ? (
                <div className="space-y-4">
                  <blockquote className="rounded-2xl border border-brand-sky/30 bg-white/80 p-5">
                    <p className="font-heading text-xl leading-8 text-slate-900">&ldquo;{quote.text}&rdquo;</p>
                    {quote.author ? (
                      <footer className="mt-2 text-sm font-medium text-slate-600">— {quote.author}</footer>
                    ) : null}
                  </blockquote>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section id="about" className="bg-brand-rose/10 py-16">
          <div className="section-shell grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="soft-panel p-7 sm:p-9">
              {about.label ? (
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{about.label}</p>
              ) : null}
              {about.title ? (
                <h2 className="mt-3 font-heading text-3xl text-slate-900 sm:text-4xl">{about.title}</h2>
              ) : null}
              <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">
                {(about.paragraphs ?? []).map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
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
        </section>

        <section id="goals" className="section-shell py-16">
          <div className="mb-8 max-w-2xl">
            <h2 className="font-heading text-3xl text-slate-900 sm:text-4xl">{goals.title ?? "Our Goals"}</h2>
            {goals.description ? (
              <p className="mt-3 text-base leading-8 text-slate-700">{goals.description}</p>
            ) : null}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {(goals.items ?? []).map((goal) => (
              <div key={goal} className="soft-panel flex items-start gap-3 p-5">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-mint" />
                <p className="text-sm leading-7 text-slate-700">{goal}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="bg-brand-rose/10 py-16">
          <div className="section-shell">
            <div className="mb-8 max-w-2xl">
              <h2 className="font-heading text-3xl text-slate-900 sm:text-4xl">
                {servicesSection.title ?? "Our Work"}
              </h2>
              {servicesSection.description ? (
                <p className="mt-4 text-base leading-8 text-slate-700">{servicesSection.description}</p>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {(services.data ?? []).map((service) => (
                <ServiceCard key={service} service={service} />
              ))}
            </div>
          </div>
        </section>

        <VideoReel config={videos.data} />

        <EventsSection config={events.data} loading={events.loading} />

        <BlogSection config={blogs.data} loading={blogs.loading} />

        <section id="team" className="section-shell py-16">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="font-heading text-3xl text-slate-900 sm:text-4xl">
                {teamSection.title ?? "Meet the Team"}
              </h2>
              {teamSection.description ? (
                <p className="mt-3 max-w-2xl text-base leading-8 text-slate-700">{teamSection.description}</p>
              ) : null}
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {(team.data ?? []).map((member) => (
              <BioCard key={member.name} member={member} />
            ))}
          </div>
        </section>

        <section id="book" className="section-shell pb-20">
          <div className="mb-8 max-w-2xl">
            <h2 className="font-heading text-3xl text-slate-900 sm:text-4xl">
              {booking.title ?? "Book an Appointment"}
            </h2>
            {booking.description ? (
              <p className="mt-4 text-base leading-8 text-slate-700">{booking.description}</p>
            ) : null}
            {booking.email ? (
              <a href={`mailto:${booking.email}`} className="mt-4 inline-block text-sm font-semibold text-sky-700 hover:text-sky-900">
                {booking.emailLabel ?? "Email Us"}: {booking.email}
              </a>
            ) : null}
          </div>
          <BookingForm booking={booking} />
        </section>
      </main>

      <Disclaimer config={disclaimer.data} />

      <footer className="border-t border-slate-200/60 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} {siteData.brand?.name ?? "The Mindful Heart"}. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
