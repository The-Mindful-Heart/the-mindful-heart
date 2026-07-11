import { getVideoEmbedInfo } from "../utils/helpers";

export default function VideoEmbed({ url, title = "Video", className = "" }) {
  const info = getVideoEmbedInfo(url);

  if (!info) {
    return (
      <div className={`flex items-center justify-center rounded-2xl bg-slate-100 p-8 text-sm text-slate-500 ${className}`}>
        Video unavailable
      </div>
    );
  }

  const isInstagram = info.platform === "instagram";

  return (
    <div className={`video-embed rounded-2xl ${isInstagram ? "bg-white" : "bg-slate-900"} ${className}`}>
      {isInstagram ? (
        <div className="instagram-embed-scroll-wrapper" style={{ height: "580px", overflow: "hidden", position: "relative" }}>
          <div className="pointer-events-auto" style={{ height: "100%", overflow: "hidden" }}>
            <iframe
              src={info.embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="border-0"
              style={{
                width: "100%",
                height: "600px",
                pointerEvents: "auto",
                maxWidth: "400px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto"
              }}
              loading="lazy"
              scrolling="no"
            />
          </div>
        </div>
      ) : (
        <iframe
          src={info.embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="aspect-video w-full border-0"
          loading="lazy"
        />
      )}
    </div>
  );
}