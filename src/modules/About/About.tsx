import Image from "next/image";
import { Trophy, Heart, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-6">
          More Than Just{" "}
          <span className="text-orange-500 underline decoration-orange-500/20 underline-offset-8">
            Jerseys
          </span>
        </h1>
        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          We are a team of die-hard football fans dedicated to bringing the
          stadium atmosphere right to your doorstep with premium quality kits.
        </p>
      </section>

      {/* Story Section */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800"
              alt="Our Story"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white uppercase italic">
              Our Mission
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Founded in 2025, our goal was simple: Provide the best master-copy
              jerseys in Bangladesh without any hidden quality compromises. We
              know the struggle of finding a kit that feels authentic. That’s
              why we focus on every detail—from the embroidery to the fabric
              breathability.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="space-y-2">
                <h4 className="text-3xl font-black text-orange-500">10k+</h4>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Happy Fans
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-black text-orange-500">100%</h4>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                  Quality Check
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-orange-500/30 transition-colors">
            <Trophy className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Unmatched Detail</h3>
            <p className="text-slate-500 text-sm">
              Every badge, every stitch. We ensure our jerseys look and feel
              like the real deal.
            </p>
          </div>
          <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-orange-500/30 transition-colors">
            <Heart className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Fan-Centric</h3>
            <p className="text-slate-500 text-sm">
              We don’t just sell; we connect. Our community is our biggest
              strength.
            </p>
          </div>
          <div className="p-8 rounded-3xl border border-slate-100 dark:border-slate-800 hover:border-orange-500/30 transition-colors">
            <Target className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">No-Risk Policy</h3>
            <p className="text-slate-500 text-sm">
              Our hand-to-hand check policy ensures you only pay for what you
              love.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
