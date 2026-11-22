import { useEffect, useMemo, useState } from "react";
import VideoEmbed from "./VideoEmbed";
import { getVideoEmbedInfo } from "../utils/helpers";

function buildSlides(event) {
  const slides = [];
  const poster = event?.poster ?? event?.image;
  if (poster) slides.push({ type: "image", src: poster, title: event.title });

  (event?.gallery?.images ?? []).forEach((src, i) => {
    slides.push({ type: "image", src, title: `${event.title} ${i + 1}` });
  });

  const videos = event?.gallery?.videos ?? event?.videos ?? [];
  videos.forEach((video) => {
    const thumb = video.thumbnail || getVideoEmbedInfo(video.url)?.thumbnailUrl;
    slides.push({ type: "video", url: video.url, title: video.title ?? event.title, thumbnail: thumb });
  });

  return slides;
}

export default function EventGallery({ event, autoScrollMs = 4500 }) {
  const slides = useMemo(() => buildSlides(event), [event]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, autoScrollMs);
    return () => clearInterval(timer);
  }, [slides.length, autoScrollMs]);

  if (!slides.length) {
    return (
      <div className="flex aspect-[21/9] items-center justify-center rounded-2xl bg-brand-rose/15 text-sm text-slate-500">
        No gallery media
      </div>
    );
  }

  const active = slides[activeIndex];

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
      <div className="relative aspect-[21/9] w-full bg-slate-100">
        {active.type === "video" ? (
          <VideoEmbed url={active.url} title={active.title} className="h-full rounded-none" />
        ) : (
          <img src={active.src} alt="" className="h-full w-full object-cover transition-opacity duration-500" loading="lazy" />
        )}
      </div>
      {slides.length > 1 ? (
        <div className="flex gap-2 overflow-x-auto border-t border-slate-200/60 p-3">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;
            const thumb = slide.type === "image" ? slide.src : slide.thumbnail;
            return (
              <button
                key={`${slide.type}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  isActive ? "border-brand-sky" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {thumb ? (
                  <img src={thumb} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="flex h-full w-full items-center justify-center bg-slate-800 text-xs text-white">▶</span>
                )}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}