import breadcrumbBg from "../../../public/assets/img/others/breadcrumb.jpg";
import Link from "next/link";

interface BreadcrumbAreaProps {
  title: string;
  showBackground?: boolean;
}

export default function BreadcrumbArea({
  title,
  showBackground = true,
}: BreadcrumbAreaProps) {
  const breadcrumbContent = (
    <div className="tp-breadcrumb__content">
      <h3 className="tp-breadcrumb__title">{title}</h3>
      <div className="tp-breadcrumb__list">
        <span>
          <Link href="/">Home</Link>
        </span>{" "}
        <span className="dvdr"></span> <span>{title}</span>
      </div>
    </div>
  );

  return (
    <section
      className={`tp-breadcrumb__ptb p-relative z-index-1 fix${showBackground ? "" : " tp-breadcrumb__ptb--plain"}`}
    >
      {showBackground && (
        <div
          className="tp-breadcrumb__bg"
          style={{ backgroundImage: `url(${breadcrumbBg.src})` }}
        ></div>
      )}
      <div className="container">
        {showBackground ? (
          <div className="row align-items-center">
            <div className="col-sm-12">{breadcrumbContent}</div>
          </div>
        ) : (
          <div className="row justify-content-center">
            <div className="col-lg-10">{breadcrumbContent}</div>
          </div>
        )}
      </div>
    </section>
  );
}
