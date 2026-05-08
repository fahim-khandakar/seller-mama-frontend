/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

import { districts } from './config/constants';
import { useAppSelector } from '@/redux/hook';
import { ICartItem } from '@/types/product.type';
import { useApplyCouponMutation } from '@/redux/features/dashboard/coupon';
import { toast } from 'sonner';
import { useCreateOrderMutation } from '@/redux/features/dashboard/order';

// ── Zod schema ──
const createOrderValidation = z.object({
  customerName: z.string().min(1, 'Full name is required'),
  customerEmail: z.string().email('Invalid email address'),
  customerPhone: z.string().min(1, 'Mobile number is required'),
  district: z.string().min(1, 'District is required'),
  customerAddress: z.string().min(1, 'Full address is required'),
  paymentMethod: z.enum(['BKASH', 'NAGAD']),
  transactionId: z.string().min(1, 'Transaction ID is required'),
});

type OrderFormData = z.infer<typeof createOrderValidation>;

const paymentMethods = [
  { value: 'BKASH', label: 'bKash', number: '01581039359' },
  { value: 'NAGAD', label: 'Nagad', number: '01581039359' },
] as const;

export default function CustomerOrderPage() {
  const cart = useAppSelector((state) => state.cart.cart);
  const [isInsideDhaka, setIsInsideDhaka] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [isHaveDiscount, setIsHaveDiscount] = useState({
    discount: 0,
    finalAmount: 0,
  });
  const [mounted, setMounted] = useState(false);

  const [applyCoupon] = useApplyCouponMutation();
  const [createOrder] = useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormData>({
    resolver: zodResolver(createOrderValidation) as any,
    defaultValues: {
      district: 'Dhaka',
      paymentMethod: 'BKASH',
    },
  });

  const selectedPayment = watch('paymentMethod');
  const watchedDistrict = watch('district');

  // ── Check if ANY cart item has customization ──
  const isCustomized = cart.some(
    (item: ICartItem) =>
      item.customizedName?.trim() || item.customizedNumber?.trim(),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setIsInsideDhaka(watchedDistrict === 'Dhaka');
  }, [watchedDistrict]);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const delivery = isInsideDhaka ? 80 : 140;
  const discountedSubtotal = isHaveDiscount.finalAmount || subtotal;
  const total = discountedSubtotal + delivery;

  // ── Advance logic ──
  // Customized → 50% of total | Not customized → delivery charge only
  const advanceAmount = isCustomized ? Math.ceil(total * 0.5) : delivery;
  const advanceLabel = isCustomized
    ? `50% Advance — ৳${advanceAmount}`
    : `Delivery Advance — ৳${advanceAmount}`;

  const selectedMethod = paymentMethods.find(
    (m) => m.value === selectedPayment,
  );

  const handleApplyCoupon = async () => {
    const result = await applyCoupon({
      code: coupon,
      orderAmount: subtotal,
    }).unwrap();
    if (result.success) {
      setIsHaveDiscount({
        discount: result?.data?.discount,
        finalAmount: result?.data?.finalAmount,
      });
      toast.success(result?.message);
    } else {
      toast.error(result?.message);
    }
  };

  const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
    try {
      const orderPayload = {
        items: cart.map((item: ICartItem) => ({
          product: item.id,
          quantity: item.quantity,
          sellPrice: item.price,
          nameAndNumber:
            [item.customizedName, item.customizedNumber]
              .filter(Boolean)
              .join(' / ') || undefined,
        })),
        totalAmount: subtotal,
        discountAmount: isHaveDiscount.discount,
        finalAmount: total,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        customerAddress: `${data.district}, ${data.customerAddress}`,
        transactionId: data.transactionId,
        paymentMethod: data.paymentMethod,
        coupon: coupon || '',
        advanceAmount,
      };

      const result = await createOrder(orderPayload).unwrap();
      if (result.success) {
        toast.success('Order placed successfully!');
      }
    } catch {
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* ─── Left: Customer Form ─── */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-black uppercase mb-6 tracking-tight">
                  Shipping Details
                </h2>
                <div className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <Input
                      {...register('customerName')}
                      placeholder="Full Name"
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                    />
                    {errors.customerName && (
                      <p className="text-xs text-red-500 font-bold mt-1 ml-1">
                        {errors.customerName.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Input
                      {...register('customerEmail')}
                      placeholder="Email"
                      type="email"
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                    />
                    {errors.customerEmail && (
                      <p className="text-xs text-red-500 font-bold mt-1 ml-1">
                        {errors.customerEmail.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Input
                      {...register('customerPhone')}
                      placeholder="Mobile Number"
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                    />
                    {errors.customerPhone && (
                      <p className="text-xs text-red-500 font-bold mt-1 ml-1">
                        {errors.customerPhone.message}
                      </p>
                    )}
                  </div>

                  {/* District */}
                  <select
                    {...register('district')}
                    className="flex h-12 w-full rounded-xl bg-slate-50 border-none px-3 py-2 text-sm font-bold focus:ring-2 focus:ring-orange-500"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>

                  {/* Address */}
                  <div>
                    <Input
                      {...register('customerAddress')}
                      placeholder="Full Address (Area, Road, House)"
                      className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                    />
                    {errors.customerAddress && (
                      <p className="text-xs text-red-500 font-bold mt-1 ml-1">
                        {errors.customerAddress.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* ─── Payment Method ─── */}
              <div>
                <h3 className="font-black uppercase text-sm mb-3">
                  Payment Method
                </h3>

                {/* bKash / Nagad toggle */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedPayment === method.value;
                    return (
                      <button
                        key={method.value}
                        type="button"
                        onClick={() =>
                          setValue('paymentMethod', method.value, {
                            shouldValidate: true,
                          })
                        }
                        className={`h-12 rounded-xl text-xs font-black uppercase tracking-tight transition-all border-2 ${
                          isSelected
                            ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md scale-[1.02]'
                            : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        {method.label}
                      </button>
                    );
                  })}
                </div>

                {/* Send-to info + advance notice */}
                <div className="mb-4 px-4 py-3 rounded-xl bg-orange-50 border border-orange-100 space-y-1">
                  <p className="text-[11px] font-black text-orange-700 uppercase tracking-wide">
                    📱 {selectedMethod?.label} Number:{' '}
                    <span className="font-black">{selectedMethod?.number}</span>
                  </p>
                  <p className="text-[11px] font-bold text-orange-500 normal-case tracking-normal">
                    {isCustomized
                      ? `⚠️ Customized order — send 50% advance (৳${advanceAmount}) before we process.`
                      : `✅ Send delivery charge advance (৳${advanceAmount}) and share your Transaction ID.`}
                  </p>
                </div>

                {/* Transaction ID */}
                <div>
                  <Label className="text-[10px] font-black uppercase text-slate-400 ml-1 mb-2 block tracking-widest">
                    {selectedPayment} Transaction ID
                  </Label>
                  <Input
                    {...register('transactionId')}
                    placeholder={`Enter your ${selectedPayment === 'BKASH' ? 'bKash' : 'Nagad'} Transaction ID`}
                    className="h-12 rounded-xl bg-slate-50 border-none font-bold"
                  />
                  {errors.transactionId && (
                    <p className="text-xs text-red-500 font-bold mt-1 ml-1">
                      {errors.transactionId.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ─── Right: Order Summary ─── */}
            <div className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] h-fit lg:sticky lg:top-28 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-8">
              <h2 className="text-xl font-black uppercase tracking-tight">
                Order Summary
              </h2>

              {/* Cart Items */}
              <div className="space-y-4">
                {cart?.map((item: ICartItem, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="relative h-20 w-16 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0">
                      <Image
                        src={item?.image}
                        alt="Jersey"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center gap-0.5">
                      <h4 className="font-black text-sm uppercase">
                        {item?.name}
                      </h4>
                      <p className="text-xs font-bold text-slate-400">
                        Size: {item?.size} | Qty: {item?.quantity}
                      </p>
                      {/* Show customization if present */}
                      {(item.customizedName || item.customizedNumber) && (
                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-wide">
                          ✏️{' '}
                          {[item.customizedName, item.customizedNumber]
                            .filter(Boolean)
                            .join(' / ')}
                        </p>
                      )}
                      <p className="text-orange-600 font-black">
                        ৳{item?.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="opacity-50" />

              {/* Cost Breakdown */}
              <div className="space-y-3 font-bold text-sm uppercase tracking-tight">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-900 dark:text-white">
                    ৳{discountedSubtotal}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>
                    Delivery ({isInsideDhaka ? 'Inside Dhaka' : 'Outside Dhaka'}
                    )
                  </span>
                  <span className="text-slate-900 dark:text-white">
                    ৳{delivery}
                  </span>
                </div>
                {isHaveDiscount.discount > 0 && (
                  <div className="flex justify-between text-slate-500">
                    <span>Coupon Discount</span>
                    <span className="text-green-600">
                      -৳{isHaveDiscount.discount}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-black pt-4 border-t border-dashed border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white">
                  <span>Total Amount</span>
                  <span className="text-orange-600">৳{total}</span>
                </div>

                {/* Advance highlight */}
                <div className="flex justify-between text-sm font-black bg-orange-50 dark:bg-orange-950/30 px-3 py-2.5 rounded-xl border border-orange-200 dark:border-orange-900">
                  <span className="text-orange-700 dark:text-orange-400 normal-case font-black text-[11px]">
                    {advanceLabel}
                  </span>
                  <span className="text-orange-600">
                    {isCustomized ? '(50% of total)' : '(delivery only)'}
                  </span>
                </div>
              </div>

              {/* Coupon */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
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
                    type="button"
                    onClick={handleApplyCoupon}
                    variant="outline"
                    disabled={!coupon}
                    className="border-2 border-slate-900 dark:border-slate-700 font-black px-6 h-12 rounded-xl"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {/* Confirm */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-[0.15em] rounded-2xl shadow-xl shadow-orange-600/20 text-md transition-transform active:scale-95 disabled:opacity-60"
                >
                  {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
                </Button>
                <p className="text-[10px] text-center text-slate-400 font-bold uppercase mt-4 tracking-tighter">
                  Clicking confirm will place your order instantly
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
