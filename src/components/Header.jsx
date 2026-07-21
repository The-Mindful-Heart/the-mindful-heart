import { useState, useEffect, useRef } from "react";

const SECTION_LABELS = {
  home: "Home",
  about: "About",
  goals: "Our Goals",
  services: "Services",
  team: "Team",
  videos: "Videos",
  events: "Events",
  blogs: "Blogs",
  book: "Book",
};

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="inline-block h-4 w-4 align-middle">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="inline-block h-4 w-4 align-middle">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="inline-block h-4 w-4 align-middle">
    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
  </svg>
);

export default function Header({ site }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isBookingInView, setIsBookingInView] = useState(false);
  const headerRef = useRef(null);
  const brand = site?.brand ?? {};
  const nav = site?.navigation ?? [];

  useEffect(() => {
    const sectionIds = Object.keys(SECTION_LABELS);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
              setIsBookingInView(id === "book");
            }
          });
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Set CSS variable for header height to position modals correctly
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  const currentLabel = SECTION_LABELS[activeSection] ?? "";

  // When booking is in view, header should not be sticky to avoid overlaying form modals
  const headerPositionClass = isBookingInView ? "" : "sticky top-0";

  return (
    <header ref={headerRef} className={`${headerPositionClass} z-50 border-b border-slate-200/60 bg-brand-offwhite/90 backdrop-blur`}>
      <nav className="section-shell flex items-center justify-between py-4">
        <a href="#home" className="flex items-center gap-3">
          <div className="h-14 w-14 overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 shadow-sm">
            <img
              src={brand.logo ?? "/images/logo.png"}
              alt={`${brand.name ?? "The Mindful Heart"} logo mark`}
              className="h-full w-full scale-[1.24] object-cover object-top"
            />
          </div>
          <div className="hidden sm:block">
            <p className="brand-wordmark text-4xl leading-none">
              <span className="font-medium text-slate-600">The </span>
              <span className="brand-wordmark-gradient">Mindful Heart</span>
            </p>
            {brand.tagline ? (
              <p className="mt-1 text-xs font-medium text-slate-500">{brand.tagline}</p>
            ) : null}
          </div>
        </a>

        {/* Active section indicator - visible on mobile */}
        <div className="sm:hidden text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-700">
            {currentLabel}
          </p>
        </div>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              title={item.label}
              className={`transition hover:text-sky-700 ${item.icon === "instagram" ? "inline-flex items-center justify-center rounded-full p-1 text-slate-700 hover:text-brand-rose" : ""}`}
            >
              {item.icon === "instagram" ? <InstagramIcon /> : item.icon === "linkedin" ? <LinkedInIcon /> : item.icon === "google" ? <GoogleIcon /> : item.label}
            </a>
          ))}
          <a href="#book" className="cta-primary px-4 py-2">
            Book Session
          </a>
        </div>

        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen ? (
        <div className="border-t border-slate-200/60 bg-brand-offwhite px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                title={item.label}
                className={`transition hover:text-sky-700 ${item.icon === "instagram" ? "inline-flex items-center justify-center rounded-full p-1 text-slate-700 hover:text-brand-rose" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.icon === "instagram" ? <InstagramIcon /> : item.icon === "linkedin" ? <LinkedInIcon /> : item.icon === "google" ? <GoogleIcon /> : item.label}
              </a>
            ))}
            <a href="#book" className="cta-primary mt-1 px-4 py-2 text-center" onClick={() => setMenuOpen(false)}>
              Book Session
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}