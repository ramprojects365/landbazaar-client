"use client";

import Link from "next/link";
import {
  getFacebookShareUrl,
  getInstagramProfileUrl,
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
  variant = "blog",
  networks,
}: SocialShareProps) {
  const activeNetworks =
    networks ??
    (variant === "property"
      ? (["facebook", "instagram", "whatsapp"] as ShareNetwork[])
      : (["facebook", "twitter", "linkedin", "whatsapp"] as ShareNetwork[]));
  const pageUrl = toCanonicalPageUrl(path);

  const handleClick = (network: ShareNetwork) => {
    if (network === "instagram") {
      openExternal(getInstagramProfileUrl());
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
          <button
            title="Visit DekhoLand on Instagram"
            onClick={() => handleClick("instagram")}
          >
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
        <Link
          className="share-instagram"
          href={getInstagramProfileUrl()}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram"></i>
          Instagram
        </Link>
      )}
    </div>
  );
}
