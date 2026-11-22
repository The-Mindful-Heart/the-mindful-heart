#!/usr/bin/env python3
"""Generate JPEG posters/thumbnails when remote CDN downloads are unavailable."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

# slug -> (title line, accent rgb)
POSTERS = {
    "images/events/internship-program.jpg": ("Internship Program", (73, 185, 255)),
    "images/events/therapists-talk.jpg": ("Therapists Talk", (87, 231, 165)),
}

VIDEO_THUMBS = [
    ("images/videos/reel-1.jpg", "Therapy Reflection"),
    ("images/videos/reel-2.jpg", "Mental Health Insight"),
    ("images/videos/reel-3.jpg", "Healing Perspectives"),
    ("images/videos/reel-4.jpg", "Emotional Wellness"),
    ("images/videos/reel-5.jpg", "Self-Care Tips"),
    ("images/videos/reel-6.jpg", "Mindful Living"),
    ("images/videos/post-1.jpg", "Community"),
    ("images/videos/reel-7.jpg", "Growth Journey"),
]


def _font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for name in (
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ):
        path = Path(name)
        if path.exists():
            try:
                return ImageFont.truetype(str(path), size=size)
            except OSError:
                continue
    return ImageFont.load_default()


def gradient_poster(title: str, accent: tuple[int, int, int], size=(1200, 900)) -> Image.Image:
    img = Image.new("RGB", size, (248, 250, 252))
    draw = ImageDraw.Draw(img)
    for y in range(size[1]):
        t = y / size[1]
        r = int(248 * (1 - t) + accent[0] * t * 0.35)
        g = int(250 * (1 - t) + accent[1] * t * 0.35)
        b = int(252 * (1 - t) + accent[2] * t * 0.35)
        draw.line([(0, y), (size[0], y)], fill=(r, g, b))
    font = _font(56)
    bbox = draw.textbbox((0, 0), title, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size[0] - tw) / 2, (size[1] - th) / 2), title, fill=(30, 41, 59), font=font)
    sub = _font(28)
    subtext = "The Mindful Heart"
    sb = draw.textbbox((0, 0), subtext, font=sub)
    sw = sb[2] - sb[0]
    draw.text(((size[0] - sw) / 2, (size[1] + th) / 2 + 12), subtext, fill=(100, 116, 139), font=sub)
    return img


def video_thumb(title: str, size=(640, 360)) -> Image.Image:
    img = Image.new("RGB", size, (241, 245, 249))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([24, 24, size[0] - 24, size[1] - 24], radius=20, fill=(255, 255, 255), outline=(203, 213, 225))
    font = _font(32)
    words = title.split()
    lines = []
    line = []
    for word in words:
        test = " ".join(line + [word])
        if draw.textlength(test, font=font) > size[0] - 80:
            lines.append(" ".join(line))
            line = [word]
        else:
            line.append(word)
    if line:
        lines.append(" ".join(line))
    y = size[1] / 2 - (len(lines) * 20)
    for text in lines:
        tw = draw.textlength(text, font=font)
        draw.text(((size[0] - tw) / 2, y), text, fill=(30, 41, 59), font=font)
        y += 40
    return img


def save(img: Image.Image, rel: str) -> None:
    dest = PUBLIC / rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=88, optimize=True)
    print(f"Wrote /{rel}")


def main() -> None:
    for rel, (title, accent) in POSTERS.items():
        save(gradient_poster(title, accent), rel)
    for rel, title in VIDEO_THUMBS:
        save(video_thumb(title), rel)
    blog_src = PUBLIC / "images/blogs/understanding-anxiety.jpg"
    blog_dest = PUBLIC / "images/blogs/how-to-find-the-right-therapist.jpg"
    if blog_src.exists() and not blog_dest.exists():
        Image.open(blog_src).save(blog_dest, "JPEG", quality=88)
        print(f"Wrote /{blog_dest.relative_to(PUBLIC).as_posix()} (copy)")


if __name__ == "__main__":
    main()