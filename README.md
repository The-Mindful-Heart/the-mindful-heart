# The Mindful Heart

SPA website for a boutique clinical psychology and psychotherapy practice.

## Stack

- Vite
- React
- Tailwind CSS

## Run locally

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build for production: `npm run build`

## Editing content

All site content is driven by JSON config files in `public/config/`. Edit these files to update the site without touching React code.

| File | What it controls |
|------|------------------|
| `public/config/site.json` | Hero, quote, about, goals, booking form URL, navigation |
| `public/config/services.json` | List of services (clickable → booking form) |
| `public/config/team.json` | Team member bios and photos |
| `public/config/videos.json` | Video reel (YouTube, Vimeo, Instagram, etc.) |
| `public/config/events.json` | Ongoing & completed events/workshops |
| `public/config/blogs.json` | Blog post manifest |
| `public/config/disclaimer.json` | Emergency disclaimer and helpline contacts |

### Images, PDFs, and video (media policy)

| Kind | Where it lives | Config field |
|------|----------------|--------------|
| **Images** (posters, covers, team, hero) | `public/images/…` | Paths like `/images/events/workshop.jpg` |
| **PDFs** | `public/pdfs/` or `public/blogs/` | `file`: `/pdfs/handout.pdf`, `type`: `pdf` |
| **Blog HTML** | `public/blogs/` | `file`: `/blogs/post.html`, `type`: `html` |
| **Video playback** | YouTube, Vimeo, Instagram, etc. | `url` in `videos.json` or `events[].videos[]` |
| **Video list thumbnails** | `public/images/videos/` | `thumbnail` on each video entry |

Use **site-relative paths** (`/images/...`, `/pdfs/...`) in JSON—not Instagram CDN or Google Drive image links.

Folder guide: see `public/images/README.md`.

**Helpers**

- `python3 scripts/generate-local-media.py` — (re)build placeholder event posters and reel thumbnails.
- `python3 scripts/sync-config-media.py` — optional URL list for bulk download (Instagram CDN often blocks automated fetch; save posters from your phone/desktop into `public/images/events/` instead).

Replace generated internship/therapists posters with real artwork: same filename, update nothing in JSON.

### Startup loading animation

Default GIF: `public/images/logo-animation.gif`, configured in `site.json` → `loading.gif` and `durationMs`.

Replace the file or change the path after generating a new loop (e.g. in Grok Imagine).

### Booking form

Replace `booking.formUrl` in `site.json` with your Google Form embed URL:

```
https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
```

### Blogs

Edit `public/config/blogs.json` for page copy, categories, navigation, and posts. Add HTML under `public/blogs/` or PDFs under `public/pdfs/` (or `public/blogs/`), then set `file` to paths like `/blogs/post.html` or `/pdfs/guide.pdf`.

**Page fields:** `title`, `description`, `navigation.showSearch`, `navigation.maxPrimaryTabs`

**Categories:** `id`, `label`, optional `inMoreMenu` (appears under “More”)

**Each post:**

| Field | Purpose |
|-------|---------|
| `id` | URL slug (`/blogs/your-id`) |
| `slug` | Optional override for URL (defaults to `id`) |
| `title`, `summary` | Card title and excerpt |
| `date` | ISO date (`YYYY-MM-DD`) |
| `readTimeMinutes` | Shown as “N min read” |
| `category` | Must match a category `id` (not `all`) |
| `coverImage` | Card hero image URL or path |
| `author.name`, `author.image` | Byline row (or `"author": "Name"` string) |
| `file`, `type` | `html` or `pdf` — opened in the reader modal |
| `stats.views`, `stats.comments`, `stats.likes` | Optional footer counts |

```json
{
  "title": "Blogs & Resources",
  "categories": [
    { "id": "all", "label": "All Posts" },
    { "id": "therapy-101", "label": "Therapy 101" }
  ],
  "posts": [
    {
      "id": "my-post",
      "title": "Post Title",
      "summary": "Short excerpt",
      "date": "2026-06-01",
      "readTimeMinutes": 5,
      "category": "therapy-101",
      "coverImage": "/images/blog-cover.jpg",
      "author": { "name": "Author Name", "image": "/images/team/author.png" },
      "file": "/blogs/my-post.html",
      "type": "html",
      "stats": { "views": 0, "comments": 0, "likes": 0 }
    }
  ]
}
```

### Videos

Add entries to `public/config/videos.json`. **`url`** is the embed link (YouTube, Vimeo, Instagram reels/posts, Dailymotion, Facebook). Put a still **`thumbnail`** in `public/images/videos/` and reference `/images/videos/reel-1.jpg` (do not hotlink social CDN images).

### Events

Store events in `ongoing` and `completed` arrays (or a single top-level `events` array) in `public/config/events.json`. The `/events` page tabs (**Upcoming** / **Past**) are derived from each event’s `date` (today and later = upcoming).

Each event can include:

- `slug` — URL path under `/events/:slug` (falls back to `id`)
- `poster` or `image` — tile and gallery poster
- `summary` — short copy on the list tile (falls back to trimmed `description`)
- `description` or `details` — full write-up on the detail page
- `registrationFormUrl` — Google Form for the register overlay (falls back to `defaultRegistrationFormUrl` on the config root)
- `videos` and optional `gallery.images` — auto-rotating gallery on the detail page

```json
{
  "defaultRegistrationFormUrl": "https://docs.google.com/forms/d/e/.../viewform?embedded=true",
  "ongoing": [
    {
      "id": "event-01",
      "slug": "workshop-title",
      "title": "Workshop Title",
      "date": "2026-06-15",
      "summary": "Short blurb for the list tile.",
      "description": "Full event write-up.",
      "image": "/images/events/workshop.jpg",
      "registrationFormUrl": "https://docs.google.com/forms/d/e/.../viewform?embedded=true",
      "videos": [{ "title": "Preview", "url": "https://www.instagram.com/reel/..." }]
    }
  ]
}
```

### Emergency disclaimer

Edit `public/config/disclaimer.json` to update the non-emergency notice and helpline numbers for India and Tamil Nadu.

## Deployment

The site is a static Vite build. **Production (themindfulheart.in) is on Vercel** — `vercel.json` rewrites all routes to `index.html` for client-side routing. `public/_redirects` is for Cloudflare Pages if you deploy there instead.

## Routes

| Path | Page |
|------|------|
| `/` | Home — hero, goals, contact, disclaimer |
| `/our-story` | About + Our Story |
| `/services` | Services + FAQ |
| `/team` | Team directory |
| `/team/:slug` | Shareable psychologist profile |
| `/resources` | Resources (placeholder) |
| `/events` | Upcoming and past events (tabbed list) |
| `/events/:slug` | Event detail (gallery, write-up, register) |
| `/blogs` | Blog index |
| `/blogs/:slug` | Shareable post (`id` or optional `slug` in config) |
| `/book` | Appointment booking form |

SPA hosting must serve `index.html` for all paths (`vercel.json` on Vercel, `public/_redirects` on Cloudflare Pages).

Team profile URLs use `slug` from `public/config/team.json` (e.g. `/team/kalaivani-kumar`).

Footer social links are configured in `site.json` → `footer.social`.
