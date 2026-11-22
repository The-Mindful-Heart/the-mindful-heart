export function slugifyName(name) {
  return name
    .toLowerCase()
    .replace(/\./g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getMemberSlug(member) {
  return member?.slug ?? slugifyName(member?.name ?? "");
}

export function findMemberBySlug(members, slug) {
  return (members ?? []).find((m) => getMemberSlug(m) === slug);
}