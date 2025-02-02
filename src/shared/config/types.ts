export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
};

export type Discount = {
  amount: number;
  percentage: number;
};

export type Review = {
  id: number;
  user: string;
  content: string;
  rating: number;
  date: string;
};
