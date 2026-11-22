import BlogSection from "../components/BlogSection";
import { useSiteData } from "../context/SiteDataContext";

export default function BlogsPage() {
  const { blogs, blogsLoading } = useSiteData();

  return <BlogSection config={blogs} loading={blogsLoading} />;
}