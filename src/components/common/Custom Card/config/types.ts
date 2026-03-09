import { StaticImageData } from "next/image";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  image: string | StaticImageData;
  tag: string;
  isHot?: boolean; // Optional property
}
