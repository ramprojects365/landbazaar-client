import Link from "next/link";
import React from "react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

const FooterColumn: React.FC<FooterSectionProps> = ({ title, links }) => {
  return (
    <div className="tp-footer-widget mb-50">
      <h3 className="tp-footer-widget-title">{title}</h3>
      <div className="tp-footer-widget-content">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FooterColumn;
