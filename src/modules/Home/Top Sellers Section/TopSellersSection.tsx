"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, Star } from "lucide-react";
import { products } from "./config/constants";

export default function TopSellersSection() {
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
            TOP SELLERS{" "}
            <span className="text-orange-500 text-shadow-glow">RIGHT NOW</span>
          </h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            The kits everyone is talking about. Don&apos;t miss out on the
            season&apos;s hottest drops.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden border-none shadow-none bg-transparent"
            >
              <CardContent className="p-0 relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900">
                {/* Product Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge className="bg-orange-600 hover:bg-orange-700 border-none px-3 py-1">
                    {product.tag}
                  </Badge>
                  {product.isHot && (
                    <Badge
                      variant="secondary"
                      className="bg-white/90 dark:bg-slate-800/90 text-orange-600 border-none backdrop-blur-md"
                    >
                      🔥 Hot
                    </Badge>
                  )}
                </div>

                {/* Quick Add Button (Visible on Hover) */}
                {/* Mobile-e shob shomoy show korbe, Desktop (md) e hover korle slide up hobe */}
                <div
                  className="absolute inset-x-0 bottom-4 px-4 
    md:translate-y-12 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 
    transition-all duration-300 z-30"
                >
                  <Button className="w-full bg-white text-slate-900 hover:bg-orange-500 hover:text-white font-bold rounded-xl shadow-xl border-none h-10 md:h-12">
                    <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                  </Button>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col items-start px-1 py-4 gap-1">
                {/* Rating */}
                <div className="flex items-center gap-1 text-orange-500 mb-1">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    {product.rating}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-3">
                  <span className="text-xl font-black text-slate-900 dark:text-white">
                    ৳{product.price}
                  </span>
                  <span className="text-sm text-slate-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
