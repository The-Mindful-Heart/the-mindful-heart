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

### Booking form

Replace `booking.formUrl` in `site.json` with your Google Form embed URL:

```
https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true
```

### Blogs

1. Add HTML or PDF files to `public/blogs/`
2. Register each file in `public/config/blogs.json`:

```json
{
  "id": "my-post",
  "title": "Post Title",
  "summary": "Short description",
  "date": "2026-06-01",
  "author": "Author Name",
  "file": "/blogs/my-post.html",
  "type": "html"
}
```

Use `"type": "pdf"` for PDF files.

### Videos

Add entries to `public/config/videos.json`. Supported platforms: YouTube, Vimeo, Instagram (posts/reels), Dailymotion, Facebook, and direct embed URLs.

### Events

Events are split into `ongoing` and `completed` arrays in `public/config/events.json`. Each event supports three display templates:

- `"featured"` — full-width card with image and video embeds
- `"media"` — side-by-side image/video and text
- `"compact"` — text-focused card

```json
{
  "id": "event-01",
  "title": "Workshop Title",
  "date": "2026-06-15",
  "time": "6:00 PM IST",
  "mode": "Online",
  "location": "Zoom",
  "description": "...",
  "template": "featured",
  "image": "/images/events/workshop.jpg",
  "videos": [{ "title": "Preview", "url": "https://youtube.com/..." }],
  "ctaLabel": "Register Now",
  "ctaUrl": "#book"
}
```

### Emergency disclaimer

Edit `public/config/disclaimer.json` to update the non-emergency notice and helpline numbers for India and Tamil Nadu.

## Deployment

The site is static-output friendly and optimized for deployment on Cloudflare Pages.
