import { Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/Seller_Mama_Logo bg remove.png";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 relative overflow-hidden px-4 sm:px-6 md:px-10 py-6 sm:py-10">
      {/* Orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-[10%] left-[25%] w-[250px] sm:w-[400px] md:w-[500px] h-[250px] sm:h-[400px] md:h-[500px] bg-gradient-to-r from-emerald-600/30 to-teal-600/30 rounded-full mix-blend-screen filter blur-[120px] animate-float" />
        <div className="absolute top-[15%] right-[20%] w-[300px] sm:w-[450px] md:w-[600px] h-[300px] sm:h-[450px] md:h-[600px] bg-gradient-to-r from-blue-600/25 to-cyan-500/25 rounded-full mix-blend-screen filter blur-[120px] animate-float-delayed" />
        <div className="absolute bottom-[10%] left-[30%] w-[280px] sm:w-[450px] md:w-[550px] h-[280px] sm:h-[450px] md:h-[550px] bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full mix-blend-screen filter blur-[120px] animate-float" />
      </div>

      {/* Grid */}
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

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-neutral-950" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl space-y-4 sm:space-y-6 md:space-y-8">
        {/* Logo + Contact */}
        <div className="space-y-2 sm:space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-gradient-to-br from-white to-neutral-200 text-neutral-900 shadow-2xl shadow-white/10">
            <Image
              src={logo}
              alt="Logo"
              className="w-10 sm:w-16 h-10 sm:h-16"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Seller Mama
          </h1>
          <div className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
            <p>
              <span className="font-semibold text-neutral-300">
                Contact No:
              </span>{" "}
              +880 1581039359
            </p>
            <p>
              <span className="font-semibold text-neutral-300">Email:</span>{" "}
              sellermamabd@gmail.com
            </p>
          </div>
        </div>

        {/* Main Text */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold">
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
          <p className="text-sm sm:text-lg md:text-xl text-neutral-400 max-w-md sm:max-w-3xl mx-auto font-light leading-relaxed">
            We&apos;re building something remarkable.
            <br />
            <span className="text-neutral-500">
              A premium ecommerce experience like no other.
            </span>
          </p>
        </div>

        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mt-4 sm:mt-6 hover:bg-white/10 transition-all duration-300 group">
          <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-orange-400" />
          <span className="text-xs sm:text-sm text-neutral-300 font-medium tracking-wide">
            Under Construction
          </span>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse [animation-delay:0.2s]" />
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse [animation-delay:0.4s]" />
          </div>
        </div>

        {/* CTA */}
        <Link
          href="https://fahim-khandakar.web.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white text-neutral-900 font-semibold text-sm sm:text-lg hover:bg-neutral-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-white/20 group">
            Notify Me
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
}
