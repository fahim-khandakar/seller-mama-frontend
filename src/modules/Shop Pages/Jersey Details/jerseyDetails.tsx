"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Star,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Heart,
  Plus,
  Minus,
} from "lucide-react";
import germany from "@/assets/jersey.jpg";
import argentina from "@/assets/argentina.jpg";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const sizes = ["M", "L", "XL", "XXL"];

export default function JerseyDetails() {
  const [mainImage, setMainImage] = useState(germany);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Left: Image Gallery */}
          <div className="space-y-6">
            {/* Big Main Image */}
            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl">
              <Image
                src={mainImage} // State theke ashche
                alt="Main Product Image"
                fill
                className="object-cover transition-all duration-500 ease-in-out"
                priority
              />
              <Badge className="absolute top-6 left-6 bg-orange-600 px-4 py-1.5 text-xs font-black uppercase tracking-widest shadow-lg">
                Best Seller
              </Badge>
            </div>

            {/* Clickable Thumbnails Grid */}
            <div className="grid grid-cols-4 gap-4">
              {[germany, argentina, germany, argentina].map((img, i) => (
                <div
                  key={i}
                  onClick={() => setMainImage(img)} // Click korle boro chhobi change hobe
                  className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all duration-300 transform active:scale-90 ${
                    mainImage === img
                      ? "border-orange-500 ring-4 ring-orange-500/10 scale-95 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100 hover:border-slate-200"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase leading-tight">
                Real Madrid 24/25 <br />
                <span className="text-orange-500 font-outline-2">
                  Home Player Edition
                </span>
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="ml-2 text-sm font-bold text-slate-500">
                    (120 Reviews)
                  </span>
                </div>
                <Separator orientation="vertical" className="h-4" />
                <span className="text-green-600 font-bold text-sm tracking-wide uppercase">
                  In Stock
                </span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-slate-900 dark:text-white">
                ৳1,250
              </span>
              <span className="text-xl text-slate-400 line-through">
                ৳1,500
              </span>
              <Badge
                variant="outline"
                className="text-orange-600 border-orange-200 bg-orange-50 dark:bg-orange-950/30"
              >
                Save ৳250
              </Badge>
            </div>

            <Separator />

            {/* Size Selection */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-black uppercase tracking-widest text-sm">
                  Select Size
                </h3>
                <button className="text-xs font-bold text-orange-600 underline">
                  Size Chart
                </button>
              </div>
              <RadioGroup
                defaultValue="M"
                onValueChange={setSelectedSize}
                className="flex gap-4"
              >
                {sizes.map((size) => (
                  <div key={size}>
                    <RadioGroupItem
                      value={size}
                      id={size}
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor={size}
                      className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-bold transition-all peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-500 peer-data-[state=checked]:text-white hover:border-orange-500 cursor-pointer"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Quantity & Action */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center border-2 border-slate-200 dark:border-slate-800 rounded-2xl h-14 px-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <Button className="flex-1 h-14 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-orange-600/20 gap-3">
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-14 w-14 rounded-2xl border-slate-200"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>

            {/* Delivery Trust Badges (Important for you!) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <Truck className="w-5 h-5 text-orange-600" />
                <span className="text-[10px] font-bold uppercase leading-tight">
                  Check on
                  <br />
                  Delivery
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <ShieldCheck className="w-5 h-5 text-orange-600" />
                <span className="text-[10px] font-bold uppercase leading-tight">
                  Authentic
                  <br />
                  Master Copy
                </span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <RotateCcw className="w-5 h-5 text-orange-600" />
                <span className="text-[10px] font-bold uppercase leading-tight">
                  Instant
                  <br />
                  Return
                </span>
              </div>
            </div>

            {/* Tabs for Details */}
            <div className="pt-8">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="bg-transparent border-b rounded-none w-full justify-start gap-8 px-0 h-12">
                  <TabsTrigger
                    value="description"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-0 font-bold uppercase tracking-widest text-xs"
                  >
                    Description
                  </TabsTrigger>
                  <TabsTrigger
                    value="material"
                    className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500 rounded-none px-0 font-bold uppercase tracking-widest text-xs"
                  >
                    Material
                  </TabsTrigger>
                </TabsList>
                <TabsContent
                  value="description"
                  className="py-6 text-slate-500 text-sm leading-relaxed"
                >
                  Experience the ultimate fan gear with our 2024/25 Real Madrid
                  Player Edition kit. Designed with AEROREADY technology for
                  maximum breathability. Features premium heat-pressed badges
                  and a slim-fit athletic cut.
                </TabsContent>
                <TabsContent
                  value="material"
                  className="py-6 text-slate-500 text-sm"
                >
                  100% Recycled Polyester. Lightweight, moisture-wicking fabric.
                  Professional embroidery and heat-applied graphics.
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
