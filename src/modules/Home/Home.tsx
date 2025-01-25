import {
  newArrivalsData,
  reviewsData,
  topSellingData,
} from "./config/constants";
import Brands from "./partials/Brands";
import DressStyle from "./partials/DressStyle";
import Header from "./partials/Header";
import ProductCardList from "./partials/ProductCardList/ProductCardList";
import Reviews from "./partials/Reviews";

const Home = () => {
  return (
    <div>
      <Header />
      <Brands />
      <main className="my-[50px] sm:my-[72px]">
        <ProductCardList
          title="NEW ARRIVALS"
          data={newArrivalsData}
          viewAllLink="/shop#new-arrivals"
        />
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          <hr className="h-[1px] border-t-black/10 my-10 sm:my-16" />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <ProductCardList
            title="top selling"
            data={topSellingData}
            viewAllLink="/shop#top-selling"
          />
        </div>
        <div className="mb-[50px] sm:mb-20">
          <DressStyle />
        </div>
        <Reviews data={reviewsData} />
      </main>
    </div>
  );
};

export default Home;
