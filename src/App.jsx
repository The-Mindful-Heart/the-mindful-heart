import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import OurStoryPage from "./pages/OurStoryPage";
import ServicesPage from "./pages/ServicesPage";
import TeamPage from "./pages/TeamPage";
import TeamMemberPage from "./pages/TeamMemberPage";
import ResourcesPage from "./pages/ResourcesPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import BlogsPage from "./pages/BlogsPage";
import BlogPostPage from "./pages/BlogPostPage";
import BookPage from "./pages/BookPage";
import LoadingSplash from "./components/LoadingSplash";
import { SiteDataProvider } from "./context/SiteDataContext";
import { useSiteConfigs } from "./hooks/useSiteConfigs";

function App() {
  const configs = useSiteConfigs();
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(true);
  const loadingConfig = configs.site.data?.loading ?? {};
  const loadingGif = loadingConfig.gif ?? "/images/brain-heart-orbit.gif";
  const loadingDuration = loadingConfig.durationMs ?? 2000;

  useEffect(() => {
    if (configs.loading) return undefined;
    const timer = setTimeout(() => setShowLoadingAnimation(false), loadingDuration);
    return () => clearTimeout(timer);
  }, [configs.loading, loadingDuration]);

  if (configs.loading || showLoadingAnimation) {
    return <LoadingSplash gifSrc={loadingGif} />;
  }

  const siteData = configs.site.data ?? {};

  const contextValue = {
    siteData,
    services: configs.services.data ?? [],
    team: configs.team.data ?? [],
    events: configs.events.data ?? { ongoing: [], completed: [] },
    eventsLoading: configs.events.loading,
    blogs: configs.blogs.data ?? { posts: [] },
    blogsLoading: configs.blogs.loading,
    disclaimer: configs.disclaimer.data ?? {},
    faq: configs.faq.data ?? { categories: [] },
  };

  return (
    <SiteDataProvider value={contextValue}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/our-story" element={<OurStoryPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/team/:slug" element={<TeamMemberPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/events/:slug" element={<EventDetailPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/blogs/:slug" element={<BlogPostPage />} />
            <Route path="/book" element={<BookPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SiteDataProvider>
  );
}

export default App;