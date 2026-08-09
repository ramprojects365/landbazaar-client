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
            <div className="tp-apartment-wrapper text-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
