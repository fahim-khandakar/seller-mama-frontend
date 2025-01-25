import Brands from "./partials/Brands";
import DressStyle from "./partials/DressStyle";
import Header from "./partials/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <Brands />
      <div className="mb-[50px] sm:mb-20">
        <DressStyle />
      </div>
    </div>
  );
};

export default Home;
