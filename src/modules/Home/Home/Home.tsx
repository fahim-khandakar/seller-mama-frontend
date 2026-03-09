import BrandSection from "../Brand Section/BrandSection";
import FeaturedCategoriesSection from "../Featured Categories Section/FeaturedCategoriesSection";
import HeroSection from "../Hero Section/HeroSection";
import TopSellersSection from "../Top Sellers Section/TopSellersSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BrandSection />
      <FeaturedCategoriesSection />
      <TopSellersSection />
    </div>
  );
}
