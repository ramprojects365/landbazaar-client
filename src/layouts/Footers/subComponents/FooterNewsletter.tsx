// Newsletter component
export default function FooterNewsletter() {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-12">
      <div className="tp-footer-widget tp-footer-col-4 mb-50">
        <div className="tp-footer-widget-content">
          <div className="tp-footer-widget-contact">
            <h3 className="tp-footer-widget-title">Newsletter</h3>
          </div>
          <p>Subscribe to our newsletter to get the latest news & updates.</p>
          <div className="tp-footer-widget-content-input">
            <form action="/">
              <input type="email" placeholder="support@propertyla.com.my" />
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M1 11L11 1"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M1 1H11V11"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
