import apartmentBg from "../../../public/assets/img/apartment/apartment-bg.png";

export default function HomeApartmentArea() {
  return (
    <section
      className="tp-appartment-area pt-180 pb-180 include-bg"
      style={{ backgroundImage: `url(${apartmentBg.src})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-apartment-wrapper text-center">
              {/* <h3 className="tp-section-title">Join With Us To</h3> */}
              {/* <Link className="tp-btn" href="/search">
                <span className="btn-wrap">
                  <b className="text-1">Discover Malaysia</b>
                  <b className="text-2">Discover Malaysia</b>
                </span>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
