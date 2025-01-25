import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

type Category = {
  title: string;
  slug: string;
};

const categoriesData: Category[] = [
  {
    title: "T-shirts",
    slug: "/shop?category=t-shirts",
  },
  {
    title: "Shorts",
    slug: "/shop?category=shorts",
  },
  {
    title: "Shirts",
    slug: "/shop?category=shirts",
  },
  {
    title: "Hoodie",
    slug: "/shop?category=hoodie",
  },
  {
    title: "Jeans",
    slug: "/shop?category=jeans",
  },
];

const CategoriesSection = () => {
  return (
    <div className="flex flex-col space-y-0.5 text-black/60">
      {categoriesData.map((category, idx) => (
        <Link
          key={idx}
          href={category.slug}
          className="flex items-center justify-between py-2"
        >
          {category.title} <ArrowRight />
        </Link>
      ))}
    </div>
  );
};

export default CategoriesSection;
