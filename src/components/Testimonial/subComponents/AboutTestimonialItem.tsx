import StarSvg from "@/components/SVG/StarSvg";
import { ITestimonialIDT } from "@/types/testimonial-d-t";

const getInitials = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export default function AboutTestimonialItem({ name, description }: ITestimonialIDT) {
  return (
    <div className="tp-testimonial-3-item about">
      <div className="tp-testimonial-3-content d-flex align-items-center">
        <div className="tp-testimonial-3-user about-initial-avatar" aria-hidden="true">
          {getInitials(name)}
        </div>
        <div className="tp-testimonial-3-text">
          <p>{description}</p>
        </div>
      </div>
      <div className="tp-testimonial-3-bottom d-flex justify-content-between">
        <h4 className="tp-testimonial-3-title">{name}</h4>
        <div className="tp-testimonial-3-stars">
          <span>
            {[...Array(5)].map((_, index) => (
              <span key={index}>
                <StarSvg />
                {index !== 4 && "\u00A0"}
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
