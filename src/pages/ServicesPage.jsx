import SectionHeading from "../components/SectionHeading";
import ServiceCard from "../components/ServiceCard";
import FaqSection from "../components/FaqSection";
import { useSiteData } from "../context/SiteDataContext";

export default function ServicesPage() {
  const { siteData, services, faq } = useSiteData();
  const servicesSection = siteData?.services ?? {};

  return (
    <section className="bg-brand-rose/10 pb-16">
      <SectionHeading
        label="Services"
        title={servicesSection.title ?? "Our Work"}
        description={servicesSection.description}
      />
      <div className="section-shell grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:justify-items-center">
        {(services ?? []).map((service) => (
          <ServiceCard key={service.title ?? service} service={service} />
        ))}
      </div>
      <FaqSection data={faq} />
    </section>
  );
}