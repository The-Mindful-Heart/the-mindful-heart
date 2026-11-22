import { useMemo, useState } from "react";
import SectionHeading from "./SectionHeading";
import BlogCard from "./BlogCard";

function splitCategories(categories, maxPrimaryTabs = 5) {
  const list = categories ?? [];
  const primary = [];
  const more = [];

  list.forEach((cat, index) => {
    if (cat.inMoreMenu || (cat.id !== "all" && index >= maxPrimaryTabs)) {
      more.push(cat);
    } else {
      primary.push(cat);
    }
  });

  return { primary, more };
}

export default function BlogSection({ config, loading }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const posts = config?.posts ?? [];
  const categories = config?.categories ?? [{ id: "all", label: "All Posts" }];
  const nav = config?.navigation ?? { showSearch: true, maxPrimaryTabs: 5 };
  const { primary, more } = splitCategories(categories, nav.maxPrimaryTabs ?? 5);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      const haystack = [post.title, post.summary, typeof post.author === "string" ? post.author : post.author?.name]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [posts, activeCategory, searchQuery]);

  const selectCategory = (id) => {
    setActiveCategory(id);
    setMoreOpen(false);
  };

  return (
    <section className="bg-brand-rose/10 pb-16">
      <SectionHeading label="Blogs" title={config?.title ?? "Blogs & Resources"} description={config?.description} />
      <div className="section-shell">
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-200/70 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm" aria-label="Blog categories">
            {primary.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => selectCategory(cat.id)}
                className={`border-b-2 pb-1 transition ${
                  activeCategory === cat.id
                    ? "border-sky-600 font-semibold text-sky-900"
                    : "border-transparent text-slate-600 hover:text-sky-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
            {more.length > 0 ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMoreOpen((open) => !open)}
                  className={`border-b-2 pb-1 transition ${
                    more.some((c) => c.id === activeCategory)
                      ? "border-sky-600 font-semibold text-sky-900"
                      : "border-transparent text-slate-600 hover:text-sky-800"
                  }`}
                >
                  More {moreOpen ? "▴" : "▾"}
                </button>
                {moreOpen ? (
                  <div className="absolute left-0 top-full z-20 mt-2 min-w-[12rem] rounded-xl border border-slate-200 bg-white py-2 shadow-lg">
                    {more.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => selectCategory(cat.id)}
                        className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-sky-50"
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}
          </nav>

          {nav.showSearch !== false ? (
            <label className="relative block w-full sm:max-w-xs">
              <span className="sr-only">Search posts</span>
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posts"
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/30"
              />
              <svg
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z" />
              </svg>
            </label>
          ) : null}
        </div>

        {loading ? (
          <div className="soft-panel p-6 text-sm text-slate-600">Loading blogs...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="soft-panel p-6 text-sm text-slate-600">No posts match this filter yet.</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}