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
      "LandWay made it easy to find an agricultural plot near Hyderabad. Clear listings and local area insights helped me decide quickly.",
    image: userImg1,
    name: "Ravi Kumar",
    role: "Hyderabad",
  },
  {
    id: 2,
    description:
      "As a first-time land buyer, I was careful about documents. LandWay's plot details and location filters helped me shortlist safely.",
    image: userImg2,
    name: "Ananya Reddy",
    role: "Warangal",
  },
  {
    id: 3,
    description:
      "I could compare nearby open plots for road access, facing, and approvals in one place. The site is simple and practical for land search.",
    image: userImg3,
    name: "Suresh Naidu",
    role: "Vijayawada",
  },
  {
    id: 4,
    description:
      "I listed my farm land for sale and received genuine enquiries within days. Quality leads saved me a lot of follow-up time.",
    image: userImg2,
    name: "Lakshmi Devi",
    role: "Visakhapatnam",
  },
];

export const testimonial_three_data: ITestimonialIDT[] = [
  {
    id: 5,
    image: image1,
    name: "Karthik Rao",
    description:
      "LandWay helped me compare plots around Hyderabad and shortlist options that matched my budget without wasting weekends.",
  },
  {
    id: 6,
    image: image2,
    name: "Meena Iyer",
    description:
      "Seller follow-up was clear and practical. I found a residential plot near Visakhapatnam that fit my investment plan.",
  },
  {
    id: 7,
    image: image1,
    name: "Praveen Goud",
    description:
      "As a first-time buyer, the listings and corridor details made it easier to understand what was realistic in Telangana.",
  },
  {
    id: 8,
    image: image2,
    name: "Deepa Sharma",
    description:
      "I listed my commercial plot and received genuine enquiries quickly. The platform felt simple, local, and easy to manage.",
  },
];

export const testimonial_data = [
  ...testimonials_home,
  ...testimonial_three_data,
];
