import Link from "next/link";
import { popularSeoLinks } from "@/data/footerLinks";

type PopularSeoLinksProps = {
  title?: string;
  headingLevel?: "h2" | "h3";
  compact?: boolean;
};

export default function PopularSeoLinks({
  title,
  headingLevel = "h2",
  compact = false,
}: PopularSeoLinksProps) {
  const Heading = headingLevel;

  return (
    <section
      className="popular-seo-links"
      style={{ padding: compact ? "8px 0 24px" : "40px 0 60px" }}
    >
      <div className={compact ? undefined : "container"}>
        {title ? (
          <Heading
            className="tp-section-title"
            style={{
              fontSize: compact ? "16px" : "28px",
              marginBottom: compact ? "12px" : "20px",
            }}
          >
            {title}
          </Heading>
        ) : null}
        <ul className={`popular-seo-links__list${compact ? " popular-seo-links__list--compact" : ""}`}>
          {popularSeoLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
