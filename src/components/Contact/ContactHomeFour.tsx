import WhatsAppButton from "@/components/UI/WhatsAppButton";

const ContactHomeFour = () => {
  return (
    <section className="tp-touch-ptb pricing-contact-form-section pt-120 pb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="tp-touch-heading pricing-contact-form-section__heading text-center">
              <span className="tp-section-title-pre">Get in touch with us</span>
              <h3 className="tp-section-title">
                Looking for partnership <br /> contact us.
              </h3>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-9">
            <div className="pricing-contact-form-section__card">
              <div className="contact-whatsapp-cta contact-whatsapp-cta--pricing">
                <span className="tp-section-title-pre">Quick enquiry</span>
                <h4 className="tp-section-title">
                  Chat with PropertyLa on WhatsApp.
                </h4>
                <p>
                  Tell us what you need and our team will help you choose the right next step.
                </p>
                <WhatsAppButton
                  phoneNumber="601121149066"
                  message="Hi PropertyLa, I would like to ask about pricing and partnership options."
                  className="tp-contact-btn pricing-contact-form-section__btn"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactHomeFour;
