'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, SendHorizontal } from 'lucide-react';

export default function NewsletterSection() {
  return (
    <section className="w-full py-12 px-4">
      <div className="container mx-auto">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 dark:bg-orange-600 px-6 py-12 md:px-16 md:py-16 text-center shadow-2xl">
          {/* Decorative Elements - Orange Glows */}
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-orange-500/20 blur-[80px]" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-orange-500/20 blur-[80px]" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="bg-orange-500 p-4 rounded-2xl shadow-lg shadow-orange-500/40 rotate-12">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight uppercase">
                Join the{' '}
                <span className="text-orange-500 dark:text-slate-900">
                  Squad
                </span>
              </h2>
              <p className="text-slate-300 dark:text-orange-50 text-lg font-medium">
                Subscribe to get early access to new kit drops and exclusive
                fan-only discounts.
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row items-center gap-3 pt-4"
            >
              <div className="relative w-full">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-14 w-full rounded-2xl border-none bg-white/10 dark:bg-orange-700/50 text-white placeholder:text-slate-400 dark:placeholder:text-orange-200 focus-visible:ring-2 focus-visible:ring-orange-500 outline-none pl-6 text-md"
                />
              </div>
              <div
                className="cursor-not-allowed"
                title="Currently in development, will be available soon!"
              >
                <Button
                  disabled
                  size="lg"
                  className="h-14 w-full sm:w-auto px-8 rounded-2xl bg-orange-500 dark:bg-white text-white dark:text-orange-600 font-bold text-md hover:bg-orange-600 dark:hover:bg-slate-100 transition-all flex items-center gap-2 group shadow-xl"
                >
                  Subscribe Now
                  <SendHorizontal className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </form>

            <p className="text-xs text-slate-500 dark:text-orange-100/60 pt-2">
              No spam, just pure football vibes. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
