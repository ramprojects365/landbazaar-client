import Image from "next/image";
import starIcon from "../../../../public/assets/img/testimonial/star_icon.png";
import { ITestimonialIDT } from "@/types/testimonial-d-t";

export default function HomeTestimonialItem({  description, image, name, role }: ITestimonialIDT) {
    return (
        <div className="tp-testimonial-item">
            <div className="tp-testimonial-icon">
                <Image src={starIcon} alt="Star Icon" loading="lazy" />
            </div>
            <span>{description}</span>
            <div className="tp-testimonial-content d-flex align-items-center">
                <div className="tp-testimonial-thumb">
                    <Image src={image} alt={name} loading="lazy" />
                </div>
                <div className="tp-testimonial-des">
                    <h4 className="tp-testimonial-title">{name}</h4>
                    <p>{role}</p>
                </div>
            </div>
        </div>
    );
}
