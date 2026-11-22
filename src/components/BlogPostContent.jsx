export default function BlogPostContent({ post }) {
  const isPdf = post?.type === "pdf";

  if (!post?.file) {
    return <p className="p-6 text-sm text-slate-600">No content file configured for this post.</p>;
  }

  return (
    <div className="soft-panel overflow-hidden">
      {isPdf ? (
        <iframe src={post.file} title={post.title} className="min-h-[70vh] w-full border-0" />
      ) : (
        <iframe
          src={post.file}
          title={post.title}
          className="min-h-[70vh] w-full border-0"
          sandbox="allow-same-origin allow-top-navigation allow-scripts"
        />
      )}
    </div>
  );
}