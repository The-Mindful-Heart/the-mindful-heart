#!/usr/bin/env python3
"""Optional bulk download for media URLs (many social CDNs block bots).

Prefer saving files into public/images/ yourself, then set paths in JSON.
For placeholder posters/thumbnails: python3 scripts/generate-local-media.py
"""

from __future__ import annotations

import json
import ssl
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

# Remote URL -> path under public/ (site paths use a leading slash)
DOWNLOADS: list[tuple[str, str]] = [
    # events
    (
        "https://scontent.cdninstagram.com/v/t51.71878-15/704751835_1293094249663679_170964057753022298_n.jpg",
        "images/events/internship-program.jpg",
    ),
    (
        "https://scontent.cdninstagram.com/v/t51.82787-15/731735669_17894893827530347_4121451726628778773_n.jpg",
        "images/events/therapists-talk.jpg",
    ),
    # video reel thumbnails (match videos.json id)
    (
        "https://scontent.cdninstagram.com/v/t51.71878-15/628571685_1243191617754031_6433884723487352786_n.jpg",
        "images/videos/reel-1.jpg",
    ),
    (
        "https://scontent.cdninstagram.com/v/t51.71878-15/634252093_2071342820332028_7872276125849350238_n.jpg",
        "images/videos/reel-2.jpg",
    ),
    (
        "https://scontent.cdninstagram.com/v/t51.71878-15/640465492_932798349282139_2104694508084912774_n.jpg",
        "images/videos/reel-3.jpg",
    ),
    (
        "https://scontent.cdninstagram.com/v/t51.71878-15/651917507_1649069052756687_6594610901026384735_n.jpg",
        "images/videos/reel-4.jpg",
    ),
    (
        "https://scontent.cdninstagram.com/v/t51.71878-15/652765158_953478397242983_7355241229487254830_n.jpg",
        "images/videos/reel-5.jpg",
    ),
    (
        "https://scontent.cdninstagram.com/v/t51.71878-15/658111419_1700581754649995_1813900991664593897_n.jpg",
        "images/videos/reel-6.jpg",
    ),
    (
        "https://scontent.cdninstagram.com/v/t51.82787-15/671094201_17883546510530347_3053624266457823631_n.jpg",
        "images/videos/post-1.jpg",
    ),
    (
        "https://scontent.cdninstagram.com/v/t51.82787-15/742060276_17896902192530347_7708012584340813063_n.jpg",
        "images/videos/reel-7.jpg",
    ),
    # blog covers (from current blogs.json)
    (
        "https://images.unsplash.com/photo-1573497019940-88c28a405443?auto=format&fit=crop&w=1200&q=80",
        "images/blogs/how-to-find-the-right-therapist.jpg",
    ),
    (
        "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
        "images/blogs/understanding-anxiety.jpg",
    ),
    (
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80",
        "images/blogs/reflections-therapist-in-making.jpg",
    ),
    # hero
    (
        "https://www.simplypsychology.org/wp-content/uploads/Psychotherapy.jpg",
        "images/hero/psychotherapy.jpg",
    ),
    # past event cover (placeholder until a poster is added)
    (
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
        "images/events/me-my-vulnerable-self-and-i.jpg",
    ),
]


def fetch(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    ctx = ssl.create_default_context()
    req = urllib.request.Request(url, headers={"User-Agent": "TheMindfulHeart-media-sync/1.0"})
    with urllib.request.urlopen(req, context=ctx, timeout=60) as resp:
        data = resp.read()
    dest.write_bytes(data)
    print(f"OK  /{dest.relative_to(PUBLIC).as_posix()}  ({len(data) // 1024} KB)")


def main() -> int:
    failed = 0
    for url, rel in DOWNLOADS:
        dest = PUBLIC / rel
        try:
            fetch(url, dest)
        except Exception as exc:  # noqa: BLE001
            failed += 1
            print(f"FAIL {rel}: {exc}", file=sys.stderr)
    return 1 if failed else 0


if __name__ == "__main__":
    raise SystemExit(main())