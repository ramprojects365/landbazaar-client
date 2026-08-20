"use client";

import Link from "next/link";
import { toast } from "sonner";
import {
  getFacebookShareUrl,
  getLinkedInShareUrl,
  getTwitterShareUrl,
  getWhatsAppShareUrl,
  toCanonicalPageUrl,
} from "@/utils/sharePage";

export type ShareNetwork =
  | "facebook"
  | "instagram"
  | "whatsapp"
  | "twitter"
  | "linkedin";

type SocialShareProps = {
  path: string;
  title?: string;
  text?: string;
  variant?: "property" | "blog";
  networks?: ShareNetwork[];
};

const openExternal = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export default function SocialShare({
  path,
  title = "",
  text = "",
  variant = "blog",
  networks,
}: SocialShareProps) {
  const activeNetworks =
    networks ??
    (variant === "property"
      ? (["facebook", "instagram", "whatsapp"] as ShareNetwork[])
      : (["facebook", "twitter", "linkedin", "whatsapp"] as ShareNetwork[]));
  const pageUrl = toCanonicalPageUrl(path);
  const shareBody = [title, text].filter(Boolean).join("\n\n");
  const shareText = [shareBody, pageUrl].filter(Boolean).join("\n\n");

  const shareOnInstagram = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || "DekhoLand",
          text: shareBody || undefined,
          url: pageUrl,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("Share text copied.");
      openExternal("https://www.instagram.com/");
      toast.message("Paste the copied title, description, and link into Instagram.");
    } catch {
      toast.error("Could not copy share text.");
    }
  };

  const handleClick = (network: ShareNetwork) => {
    if (network === "instagram") {
      void shareOnInstagram();
      return;
    }

    const urls: Record<Exclude<ShareNetwork, "instagram">, string> = {
      facebook: getFacebookShareUrl(pageUrl),
      whatsapp: getWhatsAppShareUrl(pageUrl),
      twitter: getTwitterShareUrl(pageUrl, title),
      linkedin: getLinkedInShareUrl(pageUrl),
    };

    openExternal(urls[network]);
  };

  if (variant === "property") {
    return (
      <div className="tp-property-details-icon-box mb-3">
        {activeNetworks.includes("facebook") && (
          <button title="Share on Facebook" onClick={() => handleClick("facebook")}>
            <span>
              <i
                className="fa-brands fa-facebook-f"
                style={{ color: "#1877F2", fontSize: "25px" }}
              ></i>
            </span>
          </button>
        )}
        {activeNetworks.includes("instagram") && (
          <button title="Share on Instagram" onClick={() => handleClick("instagram")}>
            <span>
              <i
                className="fa-brands fa-instagram"
                style={{
                  display: "inline-block",
                  background:
                    "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: "25px",
                }}
              ></i>
            </span>
          </button>
        )}
        {activeNetworks.includes("whatsapp") && (
          <button title="Share on WhatsApp" onClick={() => handleClick("whatsapp")}>
            <span>
              <i
                className="fa-brands fa-whatsapp"
                style={{ color: "#25D366", fontSize: "25px" }}
              ></i>
            </span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="tp-blog-details-share">
      <span>Share:</span>
      {activeNetworks.includes("facebook") && (
        <Link
          className="share-facebook"
          href={getFacebookShareUrl(pageUrl)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-f"></i>
          Facebook
        </Link>
      )}
      {activeNetworks.includes("twitter") && (
        <Link
          className="share-twitter"
          href={getTwitterShareUrl(pageUrl, title)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter"></i>
          Twitter
        </Link>
      )}
      {activeNetworks.includes("linkedin") && (
        <Link
          className="share-linkedin"
          href={getLinkedInShareUrl(pageUrl)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-linkedin-in"></i>
          LinkedIn
        </Link>
      )}
      {activeNetworks.includes("whatsapp") && (
        <Link
          className="share-whatsapp"
          href={getWhatsAppShareUrl(pageUrl)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-whatsapp"></i>
          WhatsApp
        </Link>
      )}
      {activeNetworks.includes("instagram") && (
        <button type="button" className="share-instagram" onClick={() => handleClick("instagram")}>
          <i className="fab fa-instagram"></i>
          Instagram
        </button>
      )}
    </div>
  );
}
