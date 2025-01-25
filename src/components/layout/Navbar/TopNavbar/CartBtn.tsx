"use client";

import { ShoppingCart } from "lucide-react";
// import { useAppSelector } from "@/lib/hooks/redux";
// import { RootState } from "@/lib/store";
import Link from "next/link";
import React from "react";

const CartBtn = () => {
  // const { cart } = useAppSelector((state: RootState) => state.carts);
  const cart = { totalQuantities: 0 };

  return (
    <Link href="/cart" className="relative mr-[14px] p-1">
      <ShoppingCart />
      {cart && cart.totalQuantities > 0 && (
        <span className="border bg-black text-white rounded-full w-3 px-1 text-xs absolute -top-3 left-1/2 -translate-x-1/2">
          {cart.totalQuantities}
        </span>
      )}
    </Link>
  );
};

export default CartBtn;
