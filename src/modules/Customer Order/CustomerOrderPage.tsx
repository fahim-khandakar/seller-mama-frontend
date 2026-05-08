'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { districts } from './config/constants';
import { useAppSelector } from '@/redux/hook';
import { ICartItem } from '@/types/product.type';
import { useApplyCouponMutation } from '@/redux/features/dashboard/coupon';
import { toast } from 'sonner';

export default function CustomerOrderPage() {
  const cart = useAppSelector((state) => state.cart.cart);
  const [district, setDistrict] = useState('Dhaka');
  const [isInsideDhaka, setIsInsideDhaka] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [isHaveDiscount, setIsHaveDiscount] = useState({
    discount: 0,
    finalAmount: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [applyCoupon] = useApplyCouponMutation();
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const delivery = isInsideDhaka ? 80 : 140;
  const total = subtotal + delivery;

  const handleApplyCoupon = async () => {
    const fullData = {
      code: coupon,
      orderAmount: subtotal,
    };
    const result = await applyCoupon(fullData).unwrap();
    console.log('result', result);
    if (result.success) {
      setIsHaveDiscount({
        discount: result?.data?.discount,
        finalAmount: result?.data?.finalAmount,
      });
      toast.success(result?.message);
    } else {
      toast.success(result?.message);
    }
  };

  // Auto-sync Delivery Charge with District
  useEffect(() => {
    if (district === 'Dhaka') {
      setIsInsideDhaka(true);
    } else {
      setIsInsideDhaka(false);
    }
  }, [district]);

  if (!mounted) return null;
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Customer Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black uppercase mb-6 tracking-tight">
                Shipping Details
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <Input
                    placeholder="Full Name"
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                  <Input
                    placeholder="Email"
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                  <Input
                    placeholder="Mobile Number"
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />

                  {/* District Select */}
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="flex h-12 w-full rounded-xl bg-slate-50 border-none px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-orange-500"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  <Input
                    placeholder="Full Address (Area, Road, House)"
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                  <Input
                    placeholder="Bkash/Nagad TransactionID"
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Simple Payment Info */}
            <div>
              <h3 className="font-black uppercase text-sm mb-3">
                Payment Method
              </h3>
              <div className="p-4 border-2 border-orange-500 rounded-xl bg-orange-50/50 flex justify-between items-center">
                <span className="font-bold text-sm text-orange-700">
                  Cash on Delivery
                </span>
                <span className="text-[10px] font-black uppercase bg-orange-200 px-2 py-1 rounded text-orange-700">
                  Default
                </span>
              </div>
              <p className="mt-4 text-xs font-bold text-slate-400">
                bKash payment coming soon...
              </p>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] h-fit lg:sticky lg:top-28 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-8">
            {/* Header & Product Section */}
            {cart?.map((item: ICartItem, index: number) => (
              <div key={index}>
                <h2 className="text-xl font-black uppercase mb-6 tracking-tight">
                  Order Summary
                </h2>
                <div className="flex gap-4">
                  <div className="relative h-20 w-16 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                    <Image
                      src={item?.image}
                      alt="Jersey"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="font-black text-sm uppercase">
                      {item?.name}
                    </h4>
                    <p className="text-xs font-bold text-slate-400">
                      Size: {item?.size} | Qty: {item?.quantity}
                    </p>
                    <p className="text-orange-600 font-black">৳{item?.price}</p>
                  </div>
                </div>
              </div>
            ))}

            <Separator className="opacity-50" />

            {/* Cost Calculation */}
            <div className="space-y-3 font-bold text-sm uppercase tracking-tight">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-900 dark:text-white">
                  ৳
                  {isHaveDiscount?.finalAmount
                    ? isHaveDiscount?.finalAmount
                    : subtotal}
                </span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>
                  Delivery ({isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka'})
                </span>
                <span className="text-slate-900 dark:text-white">
                  ৳{delivery}
                </span>
              </div>
              {isHaveDiscount?.discount > 0 && (
                <div className="flex justify-between text-slate-500">
                  <span>Discount by coupon</span>
                  <span className="text-slate-900 dark:text-white">
                    ৳{isHaveDiscount?.discount}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-lg font-black pt-4 border-t border-dashed border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white mt-2">
                <span>Total Amount</span>
                <span className="text-orange-600">৳{total}</span>
              </div>
            </div>

            {/* Coupon Section - Separated with extra space */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-3 block tracking-widest">
                Have a coupon?
              </Label>
              <div className="flex gap-2">
                <Input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter Code"
                  className="bg-white dark:bg-slate-800 border-none font-bold h-12 rounded-xl shadow-sm"
                />
                <Button
                  onClick={handleApplyCoupon}
                  variant="outline"
                  disabled={!coupon}
                  className="border-2 border-slate-900 dark:border-slate-700 font-black px-6 h-12 rounded-xl transition-all"
                >
                  Apply
                </Button>
              </div>
            </div>

            {/* Confirm Button Section - Pushed down with flex-grow if needed */}
            <div className="pt-4">
              <Button className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-[0.15em] rounded-2xl shadow-xl shadow-orange-600/20 text-md transition-transform active:scale-95">
                Confirm Order
              </Button>
              <p className="text-[10px] text-center text-slate-400 font-bold uppercase mt-4 tracking-tighter">
                Clicking confirm will place your order instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
