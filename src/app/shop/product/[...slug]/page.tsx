import Header from "@/components/common/Header";
import {
  newArrivalsData,
  relatedProductData,
  topSellingData,
} from "@/modules/Home/config/constants";
import ProductCardList from "@/modules/Home/partials/ProductCardList/ProductCardList";
import BreadcrumbProduct from "@/modules/Shop/partials/product-page/BreadcrumbProduct";
import Tabs from "@/modules/Shop/partials/product-page/Tabs";
import { Product } from "@/shared/config/constants";
import { notFound } from "next/navigation";

const data: Product[] = [
  ...newArrivalsData,
  ...topSellingData,
  ...relatedProductData,
];

export default function ProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const productData = data.find(
    (product) => product.id === Number(params.slug[0])
  );

  if (!productData?.title) {
    notFound();
  }

  return (
    <main>
      <div className="max-w-7xl mx-auto px-4 xl:px-0">
        <hr className="h-[1px] border-t-black/10 mb-5 sm:mb-6" />
        <BreadcrumbProduct title={productData?.title ?? "product"} />
        <section className="mb-11">
          <Header data={productData} />
        </section>
        <Tabs />
      </div>
      <div className="mb-[50px] sm:mb-20">
        <ProductCardList
          title="You might also like"
          data={relatedProductData}
        />
      </div>
    </main>
  );
}
