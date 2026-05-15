'use client';

import CustomCard from '@/components/common/Custom Card/CustomCard';
import { useGetAllProductsQuery } from '@/redux/features/dashboard/product';
import { IProduct } from '@/types/product.type';

export default function TopSellersSection() {
  const { data: productsData } = useGetAllProductsQuery({ query: 'limit=4' });

  return (
    <section className="w-full py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="flex items-center justify-center gap-2 text-orange-500 font-bold uppercase tracking-wider text-sm">
            <span className="h-1 w-8 bg-orange-500 rounded-full" />
            Most Wanted
            <span className="h-1 w-8 bg-orange-500 rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
            TOP SALES{' '}
            <span className="text-orange-500 text-shadow-glow">RIGHT NOW</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            The kits everyone is talking about. Don&apos;t miss out on the
            season&apos;s hottest drops.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {productsData?.data?.map((product: IProduct, index: number) => (
            <CustomCard product={product} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
