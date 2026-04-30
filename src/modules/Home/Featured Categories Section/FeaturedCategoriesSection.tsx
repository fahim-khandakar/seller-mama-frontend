/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories } from './config/constants';

export default function FeaturedCategoriesSection() {
  return (
    <section className="w-full bg-slate-50 dark:bg-slate-950 py-12 md:py-24">
      <div className="container mx-auto px-4 ">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6 text-center md:text-left">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 dark:text-white leading-[0.8] uppercase">
              Explore Our <br />
              <span className="text-orange-500 italic underline decoration-orange-500/10 underline-offset-8">
                Collections
              </span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto md:mx-0 text-xs md:text-sm font-bold uppercase tracking-widest">
              Premium quality jerseys for every fan and player.
            </p>
          </div>
          <Link
            href="/shop"
            className="group/link inline-flex  gap-2 bg-orange-600 px-8 py-4 rounded-full text-white font-black uppercase text-[10px] tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-orange-500/20 "
          >
            All Categories{' '}
            <ArrowUpRight className="w-4 h-4 group-hover/link:rotate-45 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid - Pure Responsive Logic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {/* Card 1: Big One (Full width on Mobile, Half on Tablet, Half on Desktop) */}
          <div className="md:col-span-2 md:row-span-2 h-[400px] md:h-[600px] lg:h-[700px]">
            <CategoryCard cat={categories[0]} />
          </div>

          {/* Card 2: Horizontal (Full width on Mobile, Half on Tablet, Half on Desktop) */}
          <div className="md:col-span-2 h-[300px] md:h-[290px] lg:h-[338px]">
            <CategoryCard cat={categories[1]} />
          </div>

          {/* Card 3: Small Square */}
          <div className="md:col-span-1 h-[300px] md:h-[290px] lg:h-[338px]">
            <CategoryCard cat={categories[2]} />
          </div>

          {/* Card 4: Small Square */}
          <div className="md:col-span-1 h-[300px] md:h-[290px] lg:h-[338px]">
            <CategoryCard cat={categories[3]} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat }: { cat: any }) {
  if (!cat) return null;

  return (
    <Link
      href={cat.href}
      className="group relative flex h-full w-full overflow-hidden rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-500 hover:shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity" />

      <Image
        src={cat.image}
        alt={cat.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute bottom-0 left-0 p-8 md:p-10 z-20 w-full flex justify-between items-end">
        <div className="space-y-1">
          <h3 className="text-2xl md:text-3xl lg:text-5xl font-black text-white italic uppercase leading-none tracking-tighter drop-shadow-2xl">
            {cat.title}
          </h3>
          <p className="text-orange-400 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mt-2">
            {cat.description}
          </p>
        </div>

        <div className="hidden sm:flex h-12 w-12 bg-white rounded-2xl items-center justify-center text-slate-900 -rotate-45 group-hover:rotate-0 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>
    </Link>
  );
}
