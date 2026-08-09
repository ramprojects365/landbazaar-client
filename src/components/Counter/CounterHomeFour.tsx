import { ICounterDT } from "@/types/custom-interface";
import AnimatedCounter from "./AnimatedCounter";

// Define the counter data
export const CounterData: ICounterDT[] = [
  {
    title: "Total area sq",
    count: 20,
    unit: "M",
    description: (
      <>
        <p>
          Land buyers already have <br /> used Dekho Land
        </p>
      </>
    ),
  },
  {
    title: "We are already listing lands & plots",
    count: 95,
    unit: "%",
    description: (
      <>
        <p>
          Client support and their <br /> satisfaction
        </p>
      </>
    ),
  },
  {
    title: "Customers across India",
    count: 5,
    unit: "k+",
    description: (
      <>
        <p>
          Monthly campaign <br /> with orders
        </p>
      </>
    ),
  },
];

export default function CounterHomeFour() {
  return (
    <section className="tp-counter-4-ptb p-relative z-index-1 pt-130 pb-130">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="tp-counter-4-heading text-center mb-50">
              <span className="tp-section-title-pre">
                WHY CHOOSE Dekho Land
              </span>
              <h4 className="tp-section-title">
                Trusted land marketplace <br />
                for happy buyers &amp; sellers
              </h4>
              <p>
                Online land marketplace to buy, sell, and lease residential
                plots, agricultural land, farm land, and commercial land. Used by{" "}
                <br />
                buyers across India to find plots. Browse lands in Hyderabad,
                Telangana, Visakhapatnam and beyond.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div
              className="tp-counter-4-item-box d-flex wow fadeInUp"
              data-wow-duration="1s"
              data-wow-delay=".3s"
            >
              {/* Mapping over CounterData to render each counter item */}
              {CounterData.map((item, index) => (
                <div className="tp-counter-4-item text-center" key={index}>
                  <h4 className="tp-counter-4-title">
                    <AnimatedCounter min={0} max={item.count} />
                    {item.unit}
                  </h4>
                  {item.description}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
