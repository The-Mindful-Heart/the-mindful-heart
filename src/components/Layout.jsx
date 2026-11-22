import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import { useSiteData } from "../context/SiteDataContext";

export default function Layout() {
  const { siteData } = useSiteData();

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
      <ScrollToTop />
      <Header site={siteData} />
      <main className="layout-main">
        <Outlet />
      </main>
      <Footer site={siteData} />
    </div>
  );
}