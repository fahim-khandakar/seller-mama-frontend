"use client";

import LinkNext from "next/link";
import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  return (
    <div className="container mx-auto min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-6 pt-32 pb-20">
      <div className="w-full max-w-[420px] space-y-12">
        {/* Top Branding/Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-3xl rotate-12 mb-4 shadow-xl shadow-orange-600/20">
            <ShieldCheck className="w-8 h-8 text-white -rotate-12" />
          </div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">
            Create <span className="text-orange-600">Account</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            Join the elite football community
          </p>
        </div>

        {/* Simplified Form */}
        <form className="space-y-6">
          {/* Full Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 ml-1">
              <User className="w-3 h-3 text-orange-600" />
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                Full Name
              </label>
            </div>
            <Input
              placeholder="RAHAT BIN"
              className="h-14 px-6 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl font-bold uppercase placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-orange-600/50 transition-all shadow-sm"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 ml-1">
              <Mail className="w-3 h-3 text-orange-600" />
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                Email Address
              </label>
            </div>
            <Input
              type="email"
              placeholder="PLAYER@JERSEY.COM"
              className="h-14 px-6 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl font-bold uppercase placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-orange-600/50 transition-all shadow-sm"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 ml-1">
              <Lock className="w-3 h-3 text-orange-600" />
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                Password
              </label>
            </div>
            <Input
              type="password"
              placeholder="••••••••"
              className="h-14 px-6 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl font-bold focus-visible:ring-2 focus-visible:ring-orange-600/50 transition-all shadow-sm"
            />
          </div>

          <Button className="w-full h-16 bg-slate-900 dark:bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-orange-600/20 group transition-all active:scale-95">
            Sign Up Now{" "}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>

        {/* Bottom Navigation */}
        <div className="pt-8 text-center border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-loose">
            Already a member? <br />
            <LinkNext
              href="/signin"
              className="inline-block mt-2 text-slate-900 dark:text-white border-b-2 border-orange-600 pb-0.5 hover:text-orange-600 transition-colors"
            >
              Sign In to Your Account
            </LinkNext>
          </p>
        </div>
      </div>
    </div>
  );
}
