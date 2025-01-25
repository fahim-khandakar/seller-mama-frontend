import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const TopBanner = () => {
  return (
    <div className="bg-black text-white text-center py-2 px-2 sm:px-4 xl:px-0">
      <div className="relative max-w-7xl mx-auto">
        <p className="text-xs sm:text-sm">
          Sign up and get 20% off to your first order.{" "}
          <Link href="#" className="underline font-medium">
            Sign Up Now
          </Link>
        </p>
        <Button
          variant="ghost"
          className="text-white hover:bg-transparent absolute right-0 top-1/2 -translate-y-1/2 w-fit h-fit p-1 hidden sm:flex"
          size="icon"
          type="button"
          aria-label="close banner"
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
