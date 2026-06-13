'use client';

import { Truck, ShieldCheck, RefreshCw, Trophy } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Trophy className="w-8 h-8" />,
    title: 'Premium Quality',
    description:
      'High-grade authentic fabrics and master copy precision. Feel the match-day comfort.',
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: 'Fastest Delivery',
    description:
      'Get your kit within 24-48 hours inside Dhaka. Reliable nationwide shipping.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: 'Check Before Pay',
    description:
      'You can check the jersey quality and size while the delivery man is present.',
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: 'Instant Return',
    description:
      'Not satisfied? Hand it back to the delivery man instantly. No questions asked.',
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="w-full py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Why Shop With <span className="text-orange-500">Us?</span>
          </h2>
          <div className="h-1.5 w-20 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-orange-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/10"
            >
              {/* Icon Container with Orange Glow */}
              <div className="mb-6 p-4 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-lg shadow-orange-500/20">
                {feature.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Call-to-Action Banner */}
        <div className="mt-16 p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-r from-orange-600 to-amber-500 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl shadow-orange-600/20">
          <div className="text-center md:text-left">
            <h4 className="text-2xl md:text-4xl font-black text-white leading-tight">
              READY TO JOIN THE SQUAD?
            </h4>
            {/* <p className="text-orange-50/90 font-medium mt-2">
              Use code{' '}
              <span className="bg-white/20 px-3 py-1 rounded-lg border border-white/40 font-bold text-white">
                MAMA10
              </span>{' '}
              for 10% off your first order!
            </p> */}
          </div>
          <Link href="/shop">
            <button className="whitespace-nowrap px-10 py-5 bg-white text-orange-600 font-black uppercase tracking-wider rounded-2xl hover:bg-slate-100 transition-all transform hover:-translate-y-1 shadow-2xl">
              Shop Collection
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
