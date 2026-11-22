#!/usr/bin/env python3
"""Crop team portraits for card avatars (top-weighted square)."""
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    raise SystemExit("Install Pillow: pip install Pillow")

TEAM_DIR = Path(__file__).resolve().parents[1] / "public" / "images" / "team"
SIZE = 1024
TOP_BIAS = 0.12  # shift crop upward (0 = top, 0.5 = center)


def crop_top_square(img: Image.Image, size: int) -> Image.Image:
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = max(0, int((h - side) * TOP_BIAS))
    top = min(top, h - side)
    cropped = img.crop((left, top, left + side, top + side))
    return cropped.resize((size, size), Image.Resampling.LANCZOS)


def main():
    for path in sorted(TEAM_DIR.glob("*.png")):
        backup = path.with_suffix(".source.png")
        if not backup.exists():
            path.rename(backup)
            src = backup
        else:
            src = backup
        with Image.open(src) as img:
            if img.mode != "RGB":
                img = img.convert("RGB")
            out = crop_top_square(img, SIZE)
            out.save(path, format="PNG", optimize=True)
        print(f"Wrote {path.name} from {src.name}")


if __name__ == "__main__":
    main()