'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';

// Assets
import germany from '@/assets/jersey.jpg';

// Bangladesh Districts
const districts = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
  'Gazipur',
  'Narayanganj',
  'Cumilla',
  'Bogura', // ... bakigulao add kora jabe
].sort();

export default function CustomerOrderPage() {
  const [district, setDistrict] = useState('Dhaka');
  const [isInsideDhaka, setIsInsideDhaka] = useState(true);
  const [showCustom, setShowCustom] = useState(false);

  // Auto-sync Delivery Charge with District
  useEffect(() => {
    if (district === 'Dhaka') {
      setIsInsideDhaka(true);
    } else {
      setIsInsideDhaka(false);
    }
  }, [district]);

  const subtotal = 1250;
  const delivery = isInsideDhaka ? 60 : 120;
  const total = subtotal + delivery + (showCustom ? 100 : 0);

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
                </div>
              </div>
            </div>

            {/* Customization */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl">
              <div className="flex items-center gap-3 mb-4">
                <Checkbox
                  id="cust"
                  onCheckedChange={(val) => setShowCustom(val as boolean)}
                />
                <Label
                  htmlFor="cust"
                  className="font-black uppercase text-xs cursor-pointer"
                >
                  Add Name & Number (+৳250)
                </Label>
              </div>
              {showCustom && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in duration-300">
                  <Input
                    placeholder="NAME (e.g. MESSI)"
                    className="bg-white border-none font-black uppercase"
                  />
                  <Input
                    placeholder="NUMBER (e.g. 10)"
                    className="bg-white border-none font-black"
                  />
                </div>
              )}
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
            <div>
              <h2 className="text-xl font-black uppercase mb-6 tracking-tight">
                Order Summary
              </h2>
              <div className="flex gap-4">
                <div className="relative h-20 w-16 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                  <Image
                    src={germany}
                    alt="Jersey"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-black text-sm uppercase">
                    Germany 24/25 Home
                  </h4>
                  <p className="text-xs font-bold text-slate-400">
                    Size: XL | Qty: 1
                  </p>
                  <p className="text-orange-600 font-black">৳1,250</p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            {/* Cost Calculation */}
            <div className="space-y-3 font-bold text-sm uppercase tracking-tight">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="text-slate-900 dark:text-white">
                  ৳{subtotal}
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
              {showCustom && (
                <div className="flex justify-between text-green-600 animate-in fade-in">
                  <span>Customization</span>
                  <span>৳100</span>
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
                  placeholder="Enter Code"
                  className="bg-white dark:bg-slate-800 border-none font-bold h-12 rounded-xl shadow-sm"
                />
                <Button
                  variant="outline"
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
