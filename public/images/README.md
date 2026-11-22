# Site images

Use **paths from the site root** in JSON (e.g. `/images/events/my-workshop.jpg`).

| Folder | Purpose |
|--------|---------|
| `events/` | Event posters and optional gallery stills |
| `videos/` | Thumbnails for the video reel (playback stays YouTube / Vimeo / Instagram URLs) |
| `blogs/` | Blog post cover images |
| `team/` | Team portraits (`*.source.png` = originals before crop) |
| `hero/` | Hero / section backgrounds |

PDFs go in `public/pdfs/` and are linked as `/pdfs/filename.pdf`.

**Event posters:** `internship-program.jpg` and `therapists-talk.jpg` are branded placeholders until you drop in real JPEG/PNG exports (keep the same filenames).

**Video reel thumbs:** replace files in `videos/` or re-run:

```bash
python3 scripts/generate-local-media.py
```

After adding new binaries, point `public/config/*.json` at the matching `/images/...` or `/pdfs/...` path.