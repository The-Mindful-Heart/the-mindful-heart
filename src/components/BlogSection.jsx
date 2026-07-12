import { useState } from "react";
import { formatEventDate } from "../utils/helpers";

function BlogViewer({ post, onClose }) {
  const isPdf = post.type === "pdf";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="soft-panel flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200/60 px-5 py-4">
          <div>
            <h3 className="font-heading text-xl text-slate-900">{post.title}</h3>
            {post.date ? (
              <p className="text-xs text-slate-500">{formatEventDate(post.date)}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
        <div className="flex-1 overflow-auto">
          {isPdf ? (
            <iframe
              src={post.file}
              title={post.title}
              className="h-[75vh] w-full border-0"
            />
          ) : (
            <iframe
              src={post.file}
              title={post.title}
              className="h-[75vh] w-full border-0"
              sandbox="allow-same-origin"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function BlogSection({ config, loading }) {
  const [activePost, setActivePost] = useState(null);
  const posts = config?.posts ?? [];

  const getGridCols = () => {
    if (posts.length === 1) return "md:grid-cols-1";
    if (posts.length === 2) return "md:grid-cols-2";
    return "md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <section id="blogs" className="bg-brand-rose/10 pb-16">
      <div className="section-shell">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl text-slate-900 sm:text-4xl">{config?.title ?? "Blogs & Resources"}</h2>
          {config?.description ? (
            <p className="mt-3 text-base leading-8 text-slate-700">{config.description}</p>
          ) : null}
        </div>

        {loading ? (
          <div className="soft-panel p-6 text-sm text-slate-600">Loading blogs...</div>
        ) : posts.length === 0 ? (
          <div className="soft-panel p-6 text-sm text-slate-600">
            No blog posts yet. Add HTML or PDF files to <code className="text-xs">public/blogs/</code> and list them in{" "}
            <code className="text-xs">public/config/blogs.json</code>.
          </div>
        ) : (
          <div className={`grid gap-4 ${getGridCols()}`}>
            {posts.map((post) => (
              <button
                key={post.id}
                type="button"
                onClick={() => setActivePost(post)}
                className="soft-panel group p-6 text-left transition hover:border-brand-sky/50 hover:shadow-boutique"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {post.type === "pdf" ? "PDF" : "Article"}
                  {post.date ? ` · ${formatEventDate(post.date)}` : ""}
                </p>
                <h3 className="mt-2 font-heading text-xl text-slate-900 group-hover:text-sky-700">{post.title}</h3>
                {post.summary ? <p className="mt-3 text-sm leading-7 text-slate-600">{post.summary}</p> : null}
                {post.author ? <p className="mt-3 text-xs text-slate-500">{post.author}</p> : null}
                <span className="mt-4 inline-block text-sm font-semibold text-sky-700">Read more →</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {activePost ? <BlogViewer post={activePost} onClose={() => setActivePost(null)} /> : null}
    </section>
  );
}