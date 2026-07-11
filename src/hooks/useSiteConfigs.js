import { useEffect, useState } from "react";

export function useConfig(path, fallback = null) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        const payload = await response.json();
        if (mounted) {
          setData(payload);
          setError("");
        }
      } catch (err) {
        if (mounted) {
          setData(fallback);
          setError(err.message);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [path]);

  return { data, loading, error };
}

export function useSiteConfigs() {
  const site = useConfig("/config/site.json", {});
  const services = useConfig("/config/services.json", []);
  const team = useConfig("/config/team.json", []);
  const events = useConfig("/config/events.json", { ongoing: [], completed: [] });
  const videos = useConfig("/config/videos.json", { videos: [] });
  const blogs = useConfig("/config/blogs.json", { posts: [] });
  const disclaimer = useConfig("/config/disclaimer.json", {});

  const loading =
    site.loading ||
    services.loading ||
    team.loading ||
    events.loading ||
    videos.loading ||
    blogs.loading ||
    disclaimer.loading;

  return { site, services, team, events, videos, blogs, disclaimer, loading };
}
