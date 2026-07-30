import { ITestimonialIDT } from "@/types/testimonial-d-t";
//home testimonial image - use existing team image
import userImg1 from "../../public/assets/img/team/team-details/user.png";
const userImg2 = userImg1;
const userImg3 = userImg1;

//home three testimonial image - use existing testimonial image
import image1 from "../../public/assets/img/testimonial/star_icon.png";
const image2 = image1;

export const testimonials_home: ITestimonialIDT[] = [
  {
    id: 1,
    description:
      "PropertyLa made it so easy to find my dream condo in Kuala Lumpur. I found and moved into my new place in less than two weeks.",
    image: userImg1,
    name: "Amira Dep",
    role: "Kuala Lumpur",
  },
  {
    id: 2,
    description:
      "As a first-time homebuyer, I was nervous, but PropertyLa's detailed listings and location insights helped me make an informed choice.",
    image: userImg2,
    name: "Wang Lee",
    role: "Penang",
  },
  {
    id: 3,
    description:
      "I loved how I could compare nearby condos and check amenities like swimming pool and gym easily. The site is very user-friendly.",
    image: userImg3,
    name: "Adia S",
    role: "Petaling Jaya",
  },
  {
    id: 4,
    description:
      "I listed my apartment for rent and received genuine inquiries within days. The platform's quality leads saved me so much time.",
    image: userImg2,
    name: "Siti Nur A",
    role: "Johor Bahru",
  },
];

export const testimonial_three_data: ITestimonialIDT[] = [
  {
    id: 5,
    image: image1,
    name: "Aina Rahman",
    description:
      "PropertyLa helped me compare condos around KL and shortlist places that matched my budget without wasting weekends.",
  },
  {
    id: 6,
    image: image2,
    name: "Daniel Tan",
    description:
      "The agent follow-up was clear and practical. I found a rental in Petaling Jaya that fit my commute and monthly budget.",
  },
  {
    id: 7,
    image: image1,
    name: "Nur Syafiqah",
    description:
      "As a first-time buyer, the listings and area details made it easier to understand what was realistic in Selangor.",
  },
  {
    id: 8,
    image: image2,
    name: "Kumar Raj",
    description:
      "I listed my unit and received genuine enquiries quickly. The platform felt simple, local, and easy to manage.",
  },
];

export const testimonial_data = [
  ...testimonials_home,
  ...testimonial_three_data,
];
