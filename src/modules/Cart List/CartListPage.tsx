'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Trash2,
  Plus,
  Minus,
  ChevronLeft,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Assets
import { ICartItem } from '@/types/product.type';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  removeFromCart,
  updateQuantity,
} from '@/redux/features/slice/cart/cartSlice';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);

  const handleUpdateQuantity = (cartKey: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    dispatch(updateQuantity({ cartKey, quantity: newQuantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20 font-sans">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <Link
            href="/shop"
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-black uppercase tracking-tighter italic">
            Shopping Cart
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Cart Items (7 Columns) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Item Card */}
            {cart?.map((cart: ICartItem, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800"
              >
                <div className="relative h-28 w-24 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200">
                  <Image
                    src={cart?.image ? cart.image : ''}
                    alt="Jersey"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h3 className="font-black uppercase text-sm md:text-md tracking-tight">
                    {cart.name}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Size: {cart?.size}
                  </p>
                  {cart?.customizedName && cart?.customizedNumber && (
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Customization: {cart?.customizedName}{' '}
                      {cart?.customizedNumber}
                    </p>
                  )}
                  <p className="text-orange-600 font-black text-lg">
                    ৳{cart?.price}
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => {
                        handleUpdateQuantity(cart.cartKey, cart?.quantity - 1);
                      }}
                      className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-black text-sm w-4 text-center">
                      {cart?.quantity}
                    </span>
                    <button
                      onClick={() => {
                        handleUpdateQuantity(cart.cartKey, cart?.quantity + 1);
                      }}
                      className="h-8 w-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-200 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleRemove(cart.cartKey)}
                  className="p-3 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-xs font-black uppercase text-slate-400 hover:text-orange-600 transition-all ml-2 mt-4"
            >
              <ShoppingBag className="w-4 h-4" /> Continue Shopping
            </Link>
          </div>

          {/* Right: Summary (5 Columns) */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 dark:bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl sticky top-28">
              <h2 className="text-xl font-black uppercase mb-6 italic tracking-tight">
                Summary
              </h2>

              <div className="space-y-4 font-bold text-sm uppercase tracking-widest opacity-80">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>৳{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-[10px]">Calculated at Checkout</span>
                </div>
              </div>

              <Separator className="my-6 bg-white/10" />

              <div className="flex justify-between text-2xl font-black uppercase italic tracking-tighter mb-8">
                <span>Total</span>
                <span className="text-orange-500">৳{total.toFixed(2)}</span>
              </div>

              <Link href="/checkout">
                <Button className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-orange-600/20 text-md group">
                  Go to Checkout{' '}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
