"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COMPANY_WHATSAPP_HREF } from "@/config/constants";
import { requireAuth } from "@/utils/auth";
import "./home-post-property-cta.css";

const WHATSAPP_LIST_HREF = `${COMPANY_WHATSAPP_HREF}?text=${encodeURIComponent(
  "Hi Dekho Land, I would like to list my property.",
)}`;

export default function HomePostPropertyCta() {
  const handlePostPropertyClick = () => {
    if (requireAuth("/dashboard/add-new-property")) {
      window.location.href = "/dashboard/add-new-property";
    }
  };

  return (
    <section className="home-post-property-cta" aria-labelledby="home-post-property-title">
      <div className="container">
        <div className="home-post-property-cta__card">
          <div className="home-post-property-cta__copy">
            <h2 id="home-post-property-title">
              Sell or lease faster at the right price!
            </h2>
            <p>Your perfect buyer is waiting, list your property now.</p>
            <div className="home-post-property-cta__actions">
              <button
                type="button"
                className="home-post-property-cta__button"
                onClick={handlePostPropertyClick}
              >
                Post Property, It&apos;s FREE!
              </button>
              <Link
                href={WHATSAPP_LIST_HREF}
                className="home-post-property-cta__whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                Post via WhatsApp
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="home-post-property-cta__media">
            <Image
              src="/assets/img/home/post-property-cta.png"
              alt="List your land or plot on DekhoLand from your phone"
              width={640}
              height={800}
              sizes="(max-width: 767px) 240px, 320px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
