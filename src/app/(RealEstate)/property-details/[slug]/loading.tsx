export default function PropertyDetailsLoading() {
  return (
    <main>
      <section className="tp-property-details-area pb-130">
        <div className="container tp-property-details-box">
          <div
            className="placeholder-glow mb-4"
            style={{ paddingTop: "28px" }}
          >
            <span className="placeholder col-4" />
          </div>
          <div className="row">
            <div className="col-lg-8">
              <span className="placeholder col-8 mb-3 d-block" />
              <span className="placeholder col-6 mb-4 d-block" />
            </div>
            <div className="col-lg-4 text-lg-end">
              <span className="placeholder col-4 mb-3 d-block ms-lg-auto" />
            </div>
          </div>
        </div>
        <div className="container">
          <div
            className="placeholder-glow rounded-3"
            style={{ height: "420px", background: "#f0f0f0" }}
          />
        </div>
      </section>
      <section className="tp-property-details-ptb pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="placeholder-glow mb-4">
                <span className="placeholder col-3 mb-3 d-block" />
                <span className="placeholder col-12 mb-2 d-block" />
                <span className="placeholder col-11 mb-2 d-block" />
                <span className="placeholder col-10 d-block" />
              </div>
            </div>
            <div className="col-lg-4">
              <div
                className="placeholder-glow rounded-3"
                style={{ height: "280px", background: "#f0f0f0" }}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
