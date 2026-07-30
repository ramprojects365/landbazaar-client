import { StaticImageData } from "next/image";
import { JSX } from "react";

// Interface for featured property with details such as title, address, user info, and property features.
export interface IFeaturedPropertyDT {
  id: string | number;
  title: string;
  address?: string;
  linkUrl?: string;
  image: StaticImageData | string;
  userImage?: StaticImageData | string;
  showTags?: boolean;
  isForRent?: boolean;
  isForSale?: boolean;
  isFeatured?: boolean;
  userName?: string;
  userRole?: string;
  bedrooms: string;
  bathrooms: string;
  livingArea: string;
  city?: string;
  state?: string;
  wowAnimation?: boolean;
  wowDelay?: string;
  description?: string;
  spacing?: boolean;
  price: number;
  quantity: number;
  user?: {
    id?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    profileImage?: string;
    fullName?: string | null;
    bio?: string | null;
    companyName?: string | null;
    designation?: string | null;
    experienceYears?: number | null;
    emailVerified?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
}

// Interface for neighbourhood properties, including city name, property count, and image.
export interface INeighbourhoodProperty {
  id: number;
  name: string;
  image: StaticImageData | string;
  count: number;
}

//define interface for property Props
export interface propertyProps {
  columnClass?: boolean;
  showBtn?: boolean;
  textAlign?: string;
  textStart?: string;
}
//define interface for property Props
export interface RentMetaItemProps {
  icon: JSX.Element;
  value: string;
  label: string;
}
