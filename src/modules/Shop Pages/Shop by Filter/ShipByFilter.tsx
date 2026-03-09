"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter, ChevronDown, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CustomCard from "@/components/common/Custom Card/CustomCard";
import { products } from "@/shared/constants";

// Sample Data
const categories = ["Club Jerseys", "National Teams", "Retro", "Training"];
const leagues = ["Premier League", "La Liga", "Serie A", "Ligue 1"];

export default function ShopByFilterPage() {
  const [priceRange, setPriceRange] = useState([500, 2000]);

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest mb-4">
          Categories
        </h3>
        <div className="space-y-3">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox id={cat} />
              <label
                htmlFor={cat}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-slate-100 dark:bg-slate-800" />

      {/* Leagues */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest mb-4">
          Leagues
        </h3>
        <div className="space-y-3">
          {leagues.map((league) => (
            <div key={league} className="flex items-center space-x-2">
              <Checkbox id={league} />
              <label
                htmlFor={league}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {league}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-slate-100 dark:bg-slate-800" />

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest mb-4">
          Price Range
        </h3>
        <Slider
          defaultValue={[500, 2000]}
          max={3000}
          step={50}
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-6"
        />
        <div className="flex justify-between text-sm font-bold text-orange-600">
          <span>৳{priceRange[0]}</span>
          <span>৳{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase">
              All <span className="text-orange-500">Jerseys</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Showing {products.length} items for you
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="md:hidden flex items-center gap-2 rounded-xl"
                >
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left font-black uppercase tracking-widest">
                    Filter Kits
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>

            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2 rounded-xl border border-slate-100 dark:border-slate-800"
            >
              Sort By: Featured <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {products.map((product, index) => (
                <CustomCard product={product} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
