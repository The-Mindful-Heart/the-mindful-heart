import { useState, useEffect } from "react";
import VideoEmbed from "./VideoEmbed";
import { getVideoEmbedInfo, fetchInstagramMeta } from "../utils/helpers";

export default function VideoReel({ config }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [metaData, setMetaData] = useState({});
  const videos = config?.videos ?? [];

  useEffect(() => {
    // Fetch metadata (title & thumbnail) for Instagram videos
    videos.forEach(async (video) => {
      const embed = getVideoEmbedInfo(video.url);
      if (embed?.platform === "instagram" && !metaData[video.url]) {
        const data = await fetchInstagramMeta(video.url);
        if (data) {
          setMetaData((prev) => ({
            ...prev,
            [video.url]: { title: data.title || "", thumbnail: data.thumbnail_url || "" }
          }));
        }
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!videos.length) return null;

  const activeVideo = videos[activeIndex];

  return (
    <section id="videos" className="bg-brand-rose/10 pt-0 pb-4">
      <div className="section-shell">
        <div className="max-w-2xl">
          <span className="section-label">Videos</span>
          <h2 className="font-heading text-3xl text-slate-900 sm:text-4xl">{config.title}</h2>
          {config.description ? (
            <p className="mt-3 text-base leading-8 text-slate-700">{config.description}</p>
          ) : null}
        </div>

        <div className="lg:flex lg:gap-6">
          {/* Main video player */}
          <div className="soft-panel overflow-hidden p-0 lg:min-w-0 lg:flex-1">
            <div className="p-3 sm:p-4">
              <VideoEmbed url={activeVideo.url} title={activeVideo.title} />
            </div>
          </div>

          {/* Side video list with thumbnails */}
          <div className="soft-panel mt-4 overflow-hidden p-0 lg:mt-0 lg:w-72 lg:shrink-0 xl:w-80">
            <div className="px-3 pb-1 pt-3 sm:px-4 sm:pt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
                All Videos
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto px-3 pb-3 sm:px-4 sm:pb-4 lg:max-h-[520px] lg:flex-col lg:overflow-y-auto">
              {videos.map((video, index) => {
                const embed = getVideoEmbedInfo(video.url);
                const isActive = index === activeIndex;
                const autoMeta = metaData[video.url];
                const thumb = video.thumbnail || autoMeta?.thumbnail || embed?.thumbnailUrl;
                const displayTitle = autoMeta?.title || video.title;

                return (
                  <button
                    key={video.id ?? video.url}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`group flex shrink-0 items-center gap-3 rounded-xl border-2 p-2 text-left transition ${
                      isActive
                        ? "border-brand-sky bg-white shadow-boutique"
                        : "border-transparent bg-white/60 hover:border-slate-200"
                    }`}
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-800">
                      {thumb ? (
                        <img
                          src={thumb}
                          alt=""
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900">
                          <span className="text-lg text-white/80">▶</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-slate-900/20 transition group-hover:bg-slate-900/5" />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-xs text-slate-900 shadow-sm">
                          ▶
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium leading-tight text-slate-800">
                        {displayTitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}