import BrandSection from "../Brand Section/BrandSection";
import FeaturedCategoriesSection from "../Featured Categories Section/FeaturedCategoriesSection";
import HeroSection from "../Hero Section/HeroSection";
import TestimonialsSection from "../Testimonials Section/TestimonialsSection";
import TopSellersSection from "../Top Sellers Section/TopSellersSection";
import WhyChooseUsSection from "../Why Choose Us Section/WhyChooseUsSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <BrandSection />
      <FeaturedCategoriesSection />
      <TopSellersSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
    </div>
  );
}
