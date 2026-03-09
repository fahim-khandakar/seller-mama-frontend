"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "./config/constants";

export default function FeaturedCategoriesSection() {
  return (
    <section className="w-full bg-slate-50 dark:bg-slate-900/50 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              EXPLORE OUR{" "}
              <span className="text-orange-500 underline decoration-orange-500/30 underline-offset-8">
                COLLECTIONS
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md">
              Find the perfect kit for your next match or casual street style.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-orange-600 font-bold flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All Categories <ArrowUpRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 lg:gap-6 h-auto md:h-[600px]">
          {categories.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className={`group relative overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 ${cat.className}`}
            >
              {/* Overlay for Text Contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent z-10 transition-opacity group-hover:opacity-80" />

              {/* Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-20 w-full flex justify-between items-end">
                <div className="space-y-1">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white">
                    {cat.title}
                  </h3>
                  <p className="text-slate-300 text-sm font-medium">
                    {cat.description}
                  </p>
                </div>

                {/* Floating Orange Arrow Button */}
                <div className="h-12 w-12 bg-orange-500 rounded-full flex items-center justify-center text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-orange-500/30">
                  <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>

              {/* Subtle Orange Glow Border on Hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/50 rounded-3xl transition-colors z-30 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
