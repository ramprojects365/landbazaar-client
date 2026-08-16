import { StaticImageData } from "next/image";

export interface IBlogDT {
  id: number;
  image: StaticImageData;
  category: string;
  readTime?: string;
  title: string;
  slug?: string;
  authorImage?: StaticImageData;
  authorName?: string;
  authorRole?: string;
  delay: string;
  date?: string,
  month?: string;
  description?: string
}