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
          Real estate users already have <br /> used our Property La
        </p>
      </>
    ),
  },
  {
    title: "We are already sold apartments",
    count: 95,
    unit: "%",
    description: (
      <>
        <p>
          Clients supports and their <br /> satisfactions
        </p>
      </>
    ),
  },
  {
    title: "Customers have all over world",
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
                WHY CHOOSE Property La
              </span>
              <h4 className="tp-section-title">
                Trusted real estate company <br />
                by the happy users
              </h4>
              <p>
                Online property marketplace to buy, sell, and rent residential
                and comme rcial properties. Used by <br />
                millions of renters to find property. Browse millions of
                properties in your city save your.
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
