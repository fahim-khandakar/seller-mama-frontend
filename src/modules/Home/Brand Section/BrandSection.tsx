"use client";

import Image from "next/image";
import { brands } from "./config/constants";
import Marquee from "react-fast-marquee";

export default function BrandSection() {
  return (
    <section className="w-full bg-white dark:bg-slate-950 py-12 border-b border-slate-100 dark:border-slate-900 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="flex items-center justify-center gap-3 mb-10 text-center">
          <div className="hidden sm:block h-[1px] w-12 bg-orange-500/30" />
          <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            Official <span className="text-orange-500">Authentic</span> Gear
          </p>
          <div className="hidden sm:block h-[1px] w-12 bg-orange-500/30" />
        </div>

        {/* Marquee Container */}
        <div className="relative group">
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            className="flex items-center"
          >
            {/* Note: React Fast Marquee handles the doubling automatically internally, 
                but we manually keep a good number of items for smooth flow. */}
            {brands.map((brand, index) => (
              <div
                key={index}
                className="mx-8 md:mx-12 flex items-center justify-center"
              >
                <div
                  className={`relative h-10 md:h-${brand.size} w-28 md:w-36 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500 ease-in-out cursor-pointer`}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="(max-width: 768px) 100px, 150px"
                    className="object-contain dark:invert pointer-events-none"
                  />
                </div>
              </div>
            ))}
          </Marquee>

          {/* Gradient Fades for Premium Look */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
