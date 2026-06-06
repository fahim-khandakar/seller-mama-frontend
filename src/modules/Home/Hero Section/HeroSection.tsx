'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import jersey from '@/assets/argentina.jpg';
import { useGetSingleProductQuery } from '@/redux/features/dashboard/product';

export default function HeroSection() {
  const { data: singleData } = useGetSingleProductQuery(
    '69f24ed24049b0b4e143af58',
  );

  return (
    <section className="relative w-full bg-slate-50 overflow-hidden dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 lg:py-32 flex flex-col-reverse lg:flex-row items-center gap-10">
        {/* Left Side: Text Content */}
        <div className="flex-1 space-y-6 text-center lg:text-left z-10">
          <div className="inline-block rounded-full bg-orange-600/10 px-4 py-1.5 text-sm text-orange-600 dark:text-orange-400 font-bold mb-2 border border-orange-200 dark:border-orange-900/50">
            🔥 New Season Arrivals 2026
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Wear Your Passion. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-500">
              Own the Game.
            </span>
          </h1>
          <p className="max-w-[600px] text-lg text-slate-600 dark:text-slate-400 mx-auto lg:mx-0">
            Premium quality authentic and master copy jerseys for the ultimate
            fans. Upgrade your match-day drip with our exclusive latest
            collection.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-6">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full h-12 text-md flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white rounded-full shadow-lg shadow-orange-600/20 transition-all"
              >
                <ShoppingBag className="w-5 h-5" /> Shop Now
              </Button>
            </Link>
            {/* <Link href="/categories" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full h-12 text-md flex items-center gap-2 rounded-full border-slate-300 dark:border-slate-700 hover:text-orange-600 hover:border-orange-600 dark:hover:text-orange-400 dark:hover:border-orange-500 transition-all"
              >
                Explore Teams <ArrowRight className="w-4 h-4" />
              </Button>
            </Link> */}
          </div>

          {/* Trust Badges / Stats */}
          <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                5k+
              </span>
              <span>Happy Fans</span>
            </div>
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-700"></div>
            <div className="flex flex-col items-center lg:items-start">
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                100%
              </span>
              <span>Premium Fabric</span>
            </div>
            <div className="w-px h-8 bg-slate-300 dark:bg-slate-700 hidden sm:block"></div>
            <div className="flex-col items-center lg:items-start hidden sm:flex">
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                24h
              </span>
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Side: Image Content */}
        <div className="flex-1 relative w-full flex justify-center lg:justify-end z-10">
          {/* Decorative Glowing Background Blob - Now Orange! */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-orange-500/20 dark:bg-orange-600/20 rounded-full blur-[80px] -z-10" />

          <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl rotate-[-2deg] hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-slate-800">
            {/* Make sure to put your jersey image in the public folder */}
            <Image
              src={singleData?.data?.images[0] || jersey}
              alt="Premium Sports Jersey"
              fill
              className="object-cover bg-slate-100 dark:bg-slate-900"
              priority
            />
          </div>

          {/* Floating Price Tag/Badge for extra flair */}
          <div
            className={`absolute ${singleData?.data?.string?.length > 30 ? ' -left-2 md:-left-10' : '-left-2 md:left-32'} -bottom-6 md:bottom-0 md:-left-10 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce hover:animate-none border border-slate-100 dark:border-slate-700`}
          >
            <div className="bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 p-2 rounded-full">
              <span className="text-xl">🔥</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Trending Now
              </p>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white">
                {singleData?.data?.name ||
                  'Argentina 2026 World Cup Player Edition'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
