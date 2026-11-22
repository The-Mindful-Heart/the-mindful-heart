import BioCard from "../components/BioCard";
import SectionHeading from "../components/SectionHeading";
import { useSiteData } from "../context/SiteDataContext";

export default function TeamPage() {
  const { siteData, team } = useSiteData();
  const teamSection = siteData?.team ?? {};

  return (
    <section className="bg-brand-rose/10 pb-16">
      <SectionHeading
        label="Team"
        title={teamSection.title ?? "Meet the Team"}
        description={teamSection.description}
      />
      <div className="section-shell grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {(team ?? []).map((member) => (
          <BioCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}