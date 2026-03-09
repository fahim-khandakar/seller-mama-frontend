import germany from "@/assets/jersey.jpg";
import argentina from "@/assets/argentina.jpg";

export const products = [
  {
    id: 1,
    name: "Real Madrid 24/25 Home Kit",
    price: 1250,
    originalPrice: 1500,
    rating: 4.9,
    image: germany,
    tag: "Best Seller",
    isHot: true,
  },
  {
    id: 2,
    name: "Argentina 3-Star World Cup Edition",
    price: 1100,
    originalPrice: 1400,
    rating: 5.0,
    image: argentina,
    tag: "Trending",
    isHot: false,
  },
  {
    id: 3,
    name: "Manchester City Retro 2012",
    price: 950,
    originalPrice: 1200,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=500&auto=format&fit=crop",
    tag: "Retro",
    isHot: false,
  },
  {
    id: 4,
    name: "Brazil National Team Away Kit",
    price: 1050,
    originalPrice: 1350,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?q=80&w=500&auto=format&fit=crop",
    tag: "New Arrival",
    isHot: true,
  },
];
