import { Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/Seller_Mama_Logo bg remove.png";

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-emerald-600/30 to-teal-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-float" />
        <div className="absolute top-40 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/25 to-cyan-500/25 rounded-full mix-blend-screen filter blur-[120px] animate-float-delayed" />
        <div className="absolute bottom-20 left-1/3 w-[550px] h-[550px] bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full mix-blend-screen filter blur-[120px] animate-float" />
      </div>

      {/* Animated grid pattern */}
      <div
        className="absolute inset-0 animate-grid-flow"
        style={{
          backgroundImage: `
               linear-gradient(to right, rgba(255, 255, 255, 0.12) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 1px, transparent 1px)
             `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-neutral-950" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-4xl text-center space-y-12">
          {/* Logo */}
          <div className="animate-fade-in opacity-0 [animation-delay:0.1s] [animation-fill-mode:forwards]">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-white to-neutral-200 text-neutral-900  shadow-2xl shadow-white/10">
              <Image src={logo} alt="Logo" />
            </div>
            <h1 className="text-3xl font-bold">Seller Mama</h1>
          </div>

          {/* Main content */}
          <div className="space-y-8">
            <div className="animate-fade-in-up opacity-0 [animation-delay:0.2s] [animation-fill-mode:forwards]">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
                <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
                  Something
                </span>
                <br />
                <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-300 bg-clip-text text-transparent">
                  extraordinary
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                  is coming
                </span>
              </h1>
            </div>

            <div className="animate-fade-in-up opacity-0 [animation-delay:0.4s] [animation-fill-mode:forwards]">
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto font-light leading-relaxed">
                We&apos;re building something remarkable.
                <br />
                <span className="text-neutral-500">
                  A premium ecommerce experience like no other.
                </span>
              </p>
            </div>
          </div>

          {/* Status badge */}
          <div className="animate-fade-in opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mt-8 hover:bg-white/10 transition-all duration-300 group">
              <Sparkles className="w-5 h-5 text-orange-400" />
              <span className="text-sm text-neutral-300 font-medium tracking-wide">
                Under Construction
              </span>
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse [animation-delay:0.4s]" />
              </div>
            </div>
          </div>

          {/* Optional CTA - can be enabled later */}
          <div className="animate-fade-in cursor-pointer opacity-0 [animation-delay:0.8s] [animation-fill-mode:forwards]">
            <Link
              href={"https://fahim-khandakar.web.app/"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold text-lg hover:bg-neutral-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 group">
                Notify Me
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
