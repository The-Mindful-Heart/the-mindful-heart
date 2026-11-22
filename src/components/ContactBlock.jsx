import { useSiteData } from "../context/SiteDataContext";

export default function ContactBlock() {
  const { siteData } = useSiteData();
  const contact = siteData?.contact ?? {};
  const email = siteData?.booking?.email ?? "themindfulheartchennai@gmail.com";

  if (!contact.address && !contact.phone) return null;

  return (
    <div className="soft-panel p-6 sm:p-8">
      <h2 className="font-heading text-2xl text-slate-900 sm:text-3xl">{contact.title ?? "Contact Us"}</h2>
      <div className="mt-4 space-y-3 text-base leading-8 text-slate-700">
        {contact.address ? (
          <p className="flex items-start gap-2">
            <svg className="mt-1 h-5 w-5 flex-shrink-0 text-brand-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243A8 8 0 1117.657 16.657z" />
              <circle cx="12" cy="11" r="1.5" fill="currentColor" />
            </svg>
            <span>{contact.address}</span>
          </p>
        ) : null}
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
          <a href={`mailto:${email}`} className="hover:text-sky-700">
            {email}
          </a>
        </p>
        {contact.hours ? (
          <div className="mt-4">
            <p className="flex items-start gap-2">
              <svg className="mt-1 h-5 w-5 flex-shrink-0 text-brand-sky" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>
                {contact.hours.map((hour, i) => (
                  <span key={i} className="block text-sm">
                    {hour}
                  </span>
                ))}
              </span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}