import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import TeamMemberProfile from "../components/TeamMemberProfile";
import { useSiteData } from "../context/SiteDataContext";
import { findMemberBySlug } from "../utils/teamSlugs";

function memberBreadcrumbName(name) {
  if (!name) return "";
  return name.split(",")[0].split(" ")[0];
}

export default function TeamMemberPage() {
  const { slug } = useParams();
  const { team, siteData } = useSiteData();
  const member = findMemberBySlug(team, slug);
  const teamLabel = siteData?.team?.breadcrumbLabel ?? "Team";

  useEffect(() => {
    if (member?.name) {
      document.title = `${member.name} | The Mindful Heart`;
    }
    return () => {
      document.title = "The Mindful Heart";
    };
  }, [member?.name]);

  if (!member) {
    return (
      <section className="bg-brand-rose/10 py-12">
        <div className="section-shell">
          <Breadcrumbs
            backTo="/team"
            backLabel={`Back to ${teamLabel}`}
            items={[
              { label: teamLabel, to: "/team" },
              { label: "Not found" },
            ]}
          />
          <p className="text-slate-600">Team member not found.</p>
        </div>
      </section>
    );
  }

  const displayName = memberBreadcrumbName(member.name);

  return (
    <section className="bg-brand-rose/10 pb-16">
      <div className="section-shell">
      <Breadcrumbs
        backTo="/team"
        backLabel={`Back to ${teamLabel}`}
        items={[
          { label: teamLabel, to: "/team" },
          { label: displayName || member.name },
        ]}
      />
      <TeamMemberProfile member={member} />
      </div>
    </section>
  );
}