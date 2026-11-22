import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import BlogPostContent from "../components/BlogPostContent";
import { useSiteData } from "../context/SiteDataContext";
import { findPostBySlug } from "../utils/blogSlugs";
import { formatBlogShortDate, formatEventDate, normalizeBlogAuthor } from "../utils/helpers";

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { blogs } = useSiteData();
  const posts = blogs?.posts ?? [];
  const post = findPostBySlug(posts, slug);
  const blogsLabel = blogs?.breadcrumbLabel ?? "Blogs";
  const author = normalizeBlogAuthor(post?.author);

  useEffect(() => {
    if (post?.title) {
      document.title = `${post.title} | The Mindful Heart`;
    }
    return () => {
      document.title = "The Mindful Heart";
    };
  }, [post?.title]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === "close-blog") {
        setTimeout(() => navigate("/book"), 100);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]);

  if (!post) {
    return (
      <section className="bg-brand-rose/10 py-12">
        <div className="section-shell">
          <Breadcrumbs
            backTo="/blogs"
            backLabel={`Back to ${blogsLabel}`}
            items={[
              { label: blogsLabel, to: "/blogs" },
              { label: "Not found" },
            ]}
          />
          <p className="text-slate-600">This blog post could not be found.</p>
          <Link to="/blogs" className="mt-4 inline-block text-sm font-semibold text-sky-700">
            View all posts
          </Link>
        </div>
      </section>
    );
  }

  const readLabel = post.readTimeMinutes ? `${post.readTimeMinutes} min read` : null;

  return (
    <section className="bg-brand-rose/10 pb-16">
      <div className="section-shell">
        <Breadcrumbs
          backTo="/blogs"
          backLabel={`Back to ${blogsLabel}`}
          items={[
            { label: blogsLabel, to: "/blogs" },
            { label: post.title },
          ]}
        />

        <header className="soft-panel mb-6 overflow-hidden p-0">
          {post.coverImage ? (
            <img src={post.coverImage} alt="" className="aspect-[21/9] w-full object-cover" loading="lazy" />
          ) : null}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              {author.image ? (
                <img src={author.image} alt="" className="h-10 w-10 rounded-full object-cover" />
              ) : null}
              <span>
                {author.name ? <span className="font-medium text-slate-800">{author.name}</span> : null}
                {post.date ? (
                  <span className="text-slate-500">
                    {author.name ? " · " : ""}
                    {formatBlogShortDate(post.date)} ({formatEventDate(post.date)})
                  </span>
                ) : null}
                {readLabel ? <span className="text-slate-500"> · {readLabel}</span> : null}
              </span>
            </div>
            <h1 className="mt-4 font-heading text-2xl text-slate-900 sm:text-3xl md:text-4xl">{post.title}</h1>
            {post.summary ? <p className="mt-3 max-w-3xl text-base leading-8 text-slate-700">{post.summary}</p> : null}
          </div>
        </header>

        <BlogPostContent post={post} />
      </div>
    </section>
  );
}