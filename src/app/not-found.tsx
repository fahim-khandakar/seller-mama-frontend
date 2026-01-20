"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ShoppingBag } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-white px-4">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-50 to-white"></div>

      {/* Content */}
      <div className="relative z-10 max-w-xl text-center">
        {/* 404 Number - Clean and bold */}
        <div className="mb-6">
          <h1 className="text-[140px] font-bold leading-none tracking-tight text-gray-900 md:text-[180px]">
            404
          </h1>
        </div>

        {/* Title */}
        <h2 className="mb-3 text-3xl font-semibold text-gray-900">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mb-10 text-base text-gray-600">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="bg-orange-500 text-white transition-all hover:bg-orange-600"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-gray-300 text-gray-700 transition-all hover:bg-gray-50"
          >
            <Link href="/shop" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
