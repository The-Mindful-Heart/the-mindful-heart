const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]{11})/,
  /youtube\.com\/watch\?.*v=([\w-]{11})/
];

const VIMEO_PATTERN = /vimeo\.com\/(?:video\/)?(\d+)/;
const INSTAGRAM_PATTERN = /instagram\.com\/(?:p|reel|tv)\/([\w-]+)/;
const DAILYMOTION_PATTERN = /dailymotion\.com\/video\/([\w-]+)/;
const FACEBOOK_PATTERN = /facebook\.com\/.*\/videos\/(\d+)/;

let instagramCache = {};

export async function fetchInstagramMeta(url) {
  if (instagramCache[url]) return instagramCache[url];
  try {
    const oembedUrl = `https://api.instagram.com/oembed?url=${encodeURIComponent(url)}&format=json`;
    const res = await fetch(oembedUrl);
    const data = await res.json();
    if (data) {
      instagramCache[url] = data;
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

export function getVideoEmbedInfo(url) {
  if (!url) return null;

  for (const pattern of YOUTUBE_PATTERNS) {
    const match = url.match(pattern);
    if (match) {
      return {
        platform: "youtube",
        embedUrl: `https://www.youtube.com/embed/${match[1]}`,
        thumbnailUrl: `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`
      };
    }
  }

  const vimeoMatch = url.match(VIMEO_PATTERN);
  if (vimeoMatch) {
    return {
      platform: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      thumbnailUrl: ""
    };
  }

  const instagramMatch = url.match(INSTAGRAM_PATTERN);
  if (instagramMatch) {
    const shortcode = instagramMatch[1];
    return {
      platform: "instagram",
      embedUrl: `https://www.instagram.com/p/${shortcode}/embed`,
      thumbnailUrl: ""
    };
  }

  const dailymotionMatch = url.match(DAILYMOTION_PATTERN);
  if (dailymotionMatch) {
    return {
      platform: "dailymotion",
      embedUrl: `https://www.dailymotion.com/embed/video/${dailymotionMatch[1]}`,
      thumbnailUrl: ""
    };
  }

  const facebookMatch = url.match(FACEBOOK_PATTERN);
  if (facebookMatch) {
    return {
      platform: "facebook",
      embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false`,
      thumbnailUrl: ""
    };
  }

  if (url.includes("/embed") || url.includes("player.")) {
    return { platform: "generic", embedUrl: url, thumbnailUrl: "" };
  }

  return null;
}

export function formatEventDate(dateString) {
  if (!dateString) return "Date to be announced";
  const parsed = new Date(dateString);
  if (Number.isNaN(parsed.getTime())) return dateString;
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

export function scrollToBooking() {
  document.getElementById("book")?.scrollIntoView({ behavior: "smooth" });
}
