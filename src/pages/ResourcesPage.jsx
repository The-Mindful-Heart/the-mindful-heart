import SectionHeading from "../components/SectionHeading";
import { useSiteData } from "../context/SiteDataContext";

export default function ResourcesPage() {
  const { siteData } = useSiteData();
  const resources = siteData?.resources ?? {};

  return (
    <section className="bg-brand-rose/10 pb-16">
      <SectionHeading
        label="Resources"
        title={resources.title ?? "Resources"}
        description={resources.description ?? "We are preparing helpful resources for you. Check back soon."}
      />
      <div className="section-shell">
        <div className="soft-panel p-8 text-center text-sm leading-7 text-slate-600">
          {resources.placeholder ?? "New content will appear here soon."}
        </div>
      </div>
    </section>
  );
}