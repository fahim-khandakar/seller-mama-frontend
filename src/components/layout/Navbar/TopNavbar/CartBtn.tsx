"use client";

import { ShoppingCart } from "lucide-react";
// import { useAppSelector } from "@/lib/hooks/redux";
// import { RootState } from "@/lib/store";
import Link from "next/link";
import React from "react";

const CartBtn = () => {
  // const { cart } = useAppSelector((state: RootState) => state.carts);
  const cart = { totalQuantities: 3 };

  return (
    <Link href="/cart" className="relative mr-[14px]">
      <ShoppingCart />
      {cart && cart.totalQuantities > 0 && (
        <span className=" bg-black text-white rounded-full  px-1 text-xs absolute -top-3 left-1/2 translate-x-1/2">
          {cart.totalQuantities}
        </span>
      )}
    </Link>
  );
};

export default CartBtn;
