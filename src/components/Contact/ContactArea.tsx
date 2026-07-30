
import ContactInfoList from "./subComponents/ContactInfoList";
import WhatsAppButton from "@/components/UI/WhatsAppButton";

export default function ContactArea({btnClass}:{btnClass?:string}) {
    return (
        <section className="tp-contact-area pb-120 pt-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 wow fadeInUp" data-wow-duration="1s" data-wow-delay=".3s">
                        <div className="tp-contact-heading mb-50">
                            <h4 className="tp-section-title">Get free <br />
                                consultation</h4>
                            <p>Feel free to ask something we are here</p>
                        </div>
                        <ContactInfoList/>
                    </div>
                    <div className="col-lg-7">
                        <div className="tp-contact-box wow fadeInUp" data-wow-duration="1s" data-wow-delay=".5s">
                            <div className="contact-whatsapp-cta">
                                <span className="tp-section-title-pre">Quick enquiry</span>
                                <h4 className="tp-section-title">
                                    Prefer a faster reply? Chat with us on WhatsApp.
                                </h4>
                                <p>
                                    Share what you are looking for and our team will guide you to the right property options.
                                </p>
                                <WhatsAppButton
                                    phoneNumber="601121149066"
                                    message="Hi PropertyLa, I would like help with my property search."
                                    className={btnClass}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
