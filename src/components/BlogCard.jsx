import { Link } from "react-router-dom";
import { formatBlogShortDate, normalizeBlogAuthor } from "../utils/helpers";
import { getPostSlug } from "../utils/blogSlugs";

function StatIcon({ type }) {
  if (type === "views") {
    return (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    );
  }
  if (type === "comments") {
    return (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  );
}

export default function BlogCard({ post }) {
  const author = normalizeBlogAuthor(post.author);
  const stats = post.stats ?? {};
  const readLabel = post.readTimeMinutes ? `${post.readTimeMinutes} min read` : null;
  const postHref = `/blogs/${getPostSlug(post)}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition hover:border-brand-sky/40 hover:shadow-boutique">
      <Link to={postHref} className="flex flex-1 flex-col text-left">
        <div className="aspect-[16/10] w-full overflow-hidden bg-slate-100">
          {post.coverImage ? (
            <img src={post.coverImage} alt="" className="h-full w-full object-cover transition duration-300 hover:scale-[1.02]" loading="lazy" />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">No cover image</div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex min-w-0 items-center gap-2">
              {author.image ? (
                <img src={author.image} alt="" className="h-9 w-9 shrink-0 rounded-full object-cover" loading="lazy" />
              ) : (
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-rose/30 text-xs font-bold text-slate-600">
                  {author.name.slice(0, 1)}
                </span>
              )}
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900">{author.name}</p>
                <p className="text-xs text-slate-500">
                  {formatBlogShortDate(post.date)}
                  {readLabel ? ` · ${readLabel}` : null}
                </p>
              </div>
            </div>
            <span className="shrink-0 px-1 text-lg leading-none text-slate-400" aria-hidden>
              ⋮
            </span>
          </div>

          <h3 className="mt-3 font-heading text-lg leading-snug text-slate-900">{post.title}</h3>
          {post.summary ? <p className="mt-2 line-clamp-4 flex-1 text-sm leading-6 text-slate-600">{post.summary}</p> : null}
        </div>
      </Link>

      {post.stats ? (
        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5 text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <StatIcon type="views" />
              {stats.views ?? 0}
            </span>
            <span className="inline-flex items-center gap-1">
              <StatIcon type="comments" />
              {stats.comments ?? 0}
            </span>
          </div>
          <span className="inline-flex items-center gap-1">
            <StatIcon type="likes" />
            {stats.likes ?? 0}
          </span>
        </div>
      ) : null}
    </article>
  );
}