export function getPostSlug(post) {
  return post?.slug ?? post?.id ?? "";
}

export function findPostBySlug(posts, slug) {
  return (posts ?? []).find((post) => getPostSlug(post) === slug);
}