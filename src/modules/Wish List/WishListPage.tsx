'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Trash2,
  ShoppingCart,
  Heart,
  ChevronLeft,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Assets
import germany from '@/assets/argentina.jpg';
import argentina from '@/assets/argentina.jpg';
import CustomCard from '@/components/common/Custom Card/CustomCard';
import { useGetAllProductsQuery } from '@/redux/features/dashboard/product';
import { IProduct } from '@/types/product.type';

const initialWishlist = [
  {
    id: 1,
    name: 'Germany 24/25 Home',
    price: 1250,
    image: germany,
    size: 'XL',
    stock: true,
  },
  {
    id: 2,
    name: 'Argentina Three Star Edition',
    price: 1350,
    image: argentina,
    size: 'M',
    stock: true,
  },
];

export default function WishlistPage() {
  const [items, setItems] = useState(initialWishlist);
  const { data: productsData } = useGetAllProductsQuery({ query: 'limit=4' });

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-orange-600 mb-2">
              <Heart className="w-5 h-5 fill-current" />
              <span className="text-xs font-black uppercase tracking-widest">
                My Collection
              </span>
            </div>
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">
              Wishlist
            </h1>
          </div>
          <Link href="/shop">
            <Button
              variant="outline"
              className="rounded-xl border-2 font-bold gap-2"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Shop
            </Button>
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative bg-slate-50 dark:bg-slate-900 rounded-[2rem] p-4 md:p-6 border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-6 transition-all hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none"
              >
                {/* Product Image */}
                <div className="relative h-40 w-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-md">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110 duration-500"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <h3 className="text-xl font-black uppercase tracking-tight">
                      {item.name}
                    </h3>
                    <Badge
                      variant="outline"
                      className="w-fit mx-auto md:mx-0 bg-green-50 text-green-600 border-green-200 font-bold"
                    >
                      In Stock
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-slate-500 uppercase">
                    Selected Size: {item.size}
                  </p>
                  <p className="text-2xl font-black text-orange-600">
                    ৳{item.price}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                  <Button className="flex-1 md:w-44 h-14 bg-slate-900 text-white rounded-2xl font-black uppercase text-xs gap-2 group-hover:bg-orange-600 transition-colors">
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </Button>
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant="ghost"
                    className="h-14 w-14 md:w-44 rounded-2xl border-2 border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all gap-2"
                  >
                    <Trash2 className="w-5 h-5" />
                    <span className="hidden md:inline font-bold uppercase text-xs">
                      Remove
                    </span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Heart className="w-10 h-10 text-slate-200" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-slate-500 font-medium mb-8">
              Save your favorite jerseys to buy them later!
            </p>
            <Link href="/shop">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white font-black uppercase px-10 h-14 rounded-2xl shadow-lg shadow-orange-600/20 gap-2">
                Start Shopping <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* Suggested Section */}
        {items.length > 0 && (
          <div className="mt-20">
            <Separator className="mb-10 opacity-50" />
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black uppercase tracking-tight italic">
                You might also like
              </h3>
              <Link
                href="/shop"
                className="text-xs font-black uppercase text-orange-600 hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {productsData?.data?.map((product: IProduct, index: number) => (
                <CustomCard product={product} key={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
