"use client";

import { useState } from "react";
import { faqItems } from "@/data/faqData";
import FaqAnswer from "./FaqAnswer";

export default function FaqList() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="tp-faq-box faq-page__list">
      <div className="accordion" id="dekholand-faq">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;
          const headingId = `faq-heading-${index}`;
          const panelId = `faq-panel-${index}`;

          return (
            <div className="accordion-item" key={item.question}>
              <h2 className="accordion-header" id={headingId}>
                <button
                  type="button"
                  className={`accordion-button ${isOpen ? "" : "collapsed"}`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {item.question}
                  <span className="accordion-btn" aria-hidden="true" />
                </button>
              </h2>
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                className={`accordion-collapse collapse ${isOpen ? "show" : ""}`}
              >
                <div className="accordion-body">
                  <FaqAnswer text={item.answer} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
