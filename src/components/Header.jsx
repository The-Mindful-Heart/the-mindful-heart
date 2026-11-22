import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const ROUTE_LABELS = {
  "/": "Home",
  "/our-story": "Our Story",
  "/services": "Services",
  "/team": "Team",
  "/resources": "Resources",
  "/events": "Events",
  "/blogs": "Blogs",
  "/book": "Book",
};

export default function Header({ site }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const location = useLocation();
  const brand = site?.brand ?? {};
  const nav = (site?.navigation ?? []).filter((item) => !item.footerOnly);

  let pathname = location.pathname;
  if (pathname.startsWith("/team/")) pathname = "/team";
  else if (pathname.startsWith("/blogs/")) pathname = "/blogs";
  else if (pathname.startsWith("/events/")) pathname = "/events";
  const currentLabel = ROUTE_LABELS[pathname] ?? "Home";

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        document.documentElement.style.setProperty("--header-height", `${headerRef.current.offsetHeight}px`);
      }
    };
    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-sky-700 ${isActive ? "text-sky-800 font-semibold" : ""}`;

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-slate-200/60 bg-brand-offwhite/90 backdrop-blur">
      <nav className="section-shell flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-3">
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
            {brand.tagline ? <p className="mt-1 text-xs font-medium text-slate-500">{brand.tagline}</p> : null}
          </div>
        </Link>

        <div className="sm:hidden text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-sky-700">
            {location.pathname.startsWith("/team/")
              ? "Psychologist"
              : location.pathname.startsWith("/blogs/")
                ? "Blog"
                : location.pathname.startsWith("/events/")
                  ? "Event"
                  : currentLabel}
          </p>
        </div>

        <div className="hidden items-center gap-6 text-sm font-medium md:flex">
          {nav.map((item) => (
            <NavLink key={item.href} to={item.href} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
          <Link to="/book" className="cta-primary px-4 py-2">
            Book Session
          </Link>
        </div>

        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen ? (
        <div className="border-t border-slate-200/60 bg-brand-offwhite px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm font-medium">
            {nav.map((item) => (
              <NavLink key={item.href} to={item.href} className={navLinkClass} onClick={() => setMenuOpen(false)}>
                {item.label}
              </NavLink>
            ))}
            <Link to="/book" className="cta-primary mt-1 px-4 py-2 text-center" onClick={() => setMenuOpen(false)}>
              Book Session
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}