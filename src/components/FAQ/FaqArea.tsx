import { faqTabItemsTwo } from "@/data/faqData";

export default function FaqArea() {
  const generalTab = faqTabItemsTwo[0];

  return (
    <section className="tp-faq-inner-ptb pt-70 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center mb-60">
            <h4 className="tp-section-title">Frequently Asked Questions</h4>
          </div>
          <div className="col-lg-12">
            <div className="tp-faq-inner-content">
              <div className="tp-faq-inner-item">
                <div className="tp-faq-box">
                  <div
                    className="accordion accordion-flush"
                    id={`accordion-${generalTab.id}`}
                  >
                    {generalTab.content.map((faq, faqIndex) => (
                      <div key={faq.id} className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className={`accordion-button ${faqIndex === 1 ? "" : "collapsed"}`}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${faq.id}`}
                            aria-expanded={faqIndex === 1 ? "true" : "false"}
                            aria-controls={`collapse-${faq.id}`}
                          >
                            {faq.question}
                            <span className="accordion-btn"></span>
                          </button>
                        </h2>
                        <div
                          id={`collapse-${faq.id}`}
                          className={`accordion-collapse collapse ${faqIndex === 1 ? "show" : ""}`}
                          data-bs-parent={`#accordion-${generalTab.id}`}
                        >
                          <div className="accordion-body">{faq.answer}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
