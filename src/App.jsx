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
  const contact = siteData.contact ?? {};

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-offwhite text-slate-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen text-slate-800">
      <div className="smoke-bg" aria-hidden="true">
        <div className="smoke-container">
          <div className="smoke-puff smoke-puff-1" />
          <div className="smoke-puff smoke-puff-2" />
          <div className="smoke-puff smoke-puff-3" />
          <div className="smoke-puff smoke-puff-4" />
          <div className="smoke-wisp smoke-wisp-1" />
          <div className="smoke-wisp smoke-wisp-2" />
          <div className="smoke-wisp smoke-wisp-3" />
        </div>
      </div>
      <Header site={siteData} />

      <main className="scroll-pt-24">
        <section id="home" className="-mt-24 scroll-mt-24 section-shell pt-24">
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

        <section id="about" className="scroll-mt-24 bg-brand-rose/10 py-8">
          <div className="section-shell mb-4">
            <span style={{display:'block',borderRadius:'9999px',backgroundColor:'#e0f2fe',padding:'6px 16px',fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#075985',boxShadow:'0 1px 2px 0 rgb(0 0 0 / 0.05)',textAlign:'center'}}>About</span>
          </div>
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

        <section id="goals" className="scroll-mt-24 pb-4 bg-brand-rose/10">
          <div className="section-shell mb-4">
            <span style={{display:'block',borderRadius:'9999px',backgroundColor:'#e0f2fe',padding:'6px 16px',fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#075985',boxShadow:'0 1px 2px 0 rgb(0 0 0 / 0.05)',textAlign:'center'}}>Our Goals</span>
          </div>
          <div className="section-shell">
            <div className="max-w-2xl">
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
          </div>
        </section>

        <section id="services" className="scroll-mt-24 pb-4 bg-brand-rose/10">
          <div className="section-shell mb-4">
            <span style={{display:'block',borderRadius:'9999px',backgroundColor:'#e0f2fe',padding:'6px 16px',fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#075985',boxShadow:'0 1px 2px 0 rgb(0 0 0 / 0.05)',textAlign:'center'}}>Services</span>
          </div>
          <div className="section-shell">
            <div className="max-w-2xl">
              <h2 className="font-heading text-3xl text-slate-900 sm:text-4xl">
                {servicesSection.title ?? "Our Work"}
              </h2>
              {servicesSection.description ? (
                <p className="mt-4 text-base leading-8 text-slate-700">{servicesSection.description}</p>
              ) : null}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:justify-items-center">
              {(services.data ?? []).map((service) => (
                <ServiceCard key={service} service={service} />
              ))}
            </div>
            <div className="mt-6 soft-panel p-6">
              <h3 className="font-heading text-2xl text-slate-900">{contact.title ?? "Contact Us"}</h3>
              {contact.address ? (
                <div className="mt-4 space-y-3 text-base leading-8 text-slate-700">
                  <p className="flex items-start gap-2">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-brand-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243A8 8 0 1117.657 16.657z" />
                      <circle cx="12" cy="11" r="1.5" fill="currentColor" />
                    </svg>
                    <span>{contact.address}</span>
                  </p>
                   {contact.phone ? (
                     <p className="flex items-center gap-2">
                       <svg className="h-5 w-5 flex-shrink-0 text-brand-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                       </svg>
                       <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-sky-700">
                         {contact.phoneLabel ?? "Call Us"}: {contact.phone}
                       </a>
                     </p>
                   ) : null}
                   <p className="flex items-center gap-2">
                     <svg className="h-5 w-5 flex-shrink-0 text-brand-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                     </svg>
                     <a href="mailto:themindfulheartchennai@gmail.com" className="hover:text-sky-700">
                       themindfulheartchennai@gmail.com
                     </a>
                   </p>
                   {contact.hours ? (
                     <div className="mt-4">
                       <p className="flex items-start gap-2">
                         <svg className="mt-1 h-5 w-5 flex-shrink-0 text-brand-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                         </svg>
                         <div>
                           {contact.hours.map((hour, i) => (
                             <p key={i} className="text-sm">{hour}</p>
                           ))}
                         </div>
                       </p>
                     </div>
                   ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section id="team" className="scroll-mt-24 pb-4 bg-brand-rose/10">
          <div className="section-shell mb-4">
            <span style={{display:'block',borderRadius:'9999px',backgroundColor:'#e0f2fe',padding:'6px 16px',fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#075985',boxShadow:'0 1px 2px 0 rgb(0 0 0 / 0.05)',textAlign:'center'}}>Team</span>
          </div>
          <div className="section-shell">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="font-heading text-3xl text-slate-900 sm:text-4xl">
                  {teamSection.title ?? "Meet the Team"}
                </h2>
                {teamSection.description ? (
                  <p className="mt-3 max-w-2xl text-base leading-8 text-slate-700">{teamSection.description}</p>
                ) : null}
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {(team.data ?? []).map((member) => (
                <BioCard key={member.name} member={member} />
              ))}
            </div>
          </div>
        </section>

        <VideoReel config={videos.data} />

        <EventsSection config={events.data} loading={events.loading} />

        <BlogSection config={blogs.data} loading={blogs.loading} />

        <section id="book" className="scroll-mt-24 pb-20 bg-brand-rose/10">
          <div className="section-shell mb-4">
            <span style={{display:'block',borderRadius:'9999px',backgroundColor:'#e0f2fe',padding:'6px 16px',fontSize:'12px',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',color:'#075985',boxShadow:'0 1px 2px 0 rgb(0 0 0 / 0.05)',textAlign:'center'}}>Booking</span>
          </div>
          <div className="section-shell">
            <div className="mb-8 max-w-2xl">
              <h2 className="font-heading text-3xl text-slate-900 sm:text-4xl">
                {booking.title ?? "Book an Appointment"}
              </h2>
              {booking.description ? (
                <p className="mt-4 text-base leading-8 text-slate-700">{booking.description}</p>
              ) : null}
            </div>
            <BookingForm booking={booking} />
          </div>
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