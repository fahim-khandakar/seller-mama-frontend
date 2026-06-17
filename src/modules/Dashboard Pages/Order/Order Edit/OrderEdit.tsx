/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {
  useCreateOrderMutation,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} from '@/redux/features/dashboard/order';
import { useGetAllProductsQuery } from '@/redux/features/dashboard/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { Plus, Minus, ReceiptText, User, CreditCard } from 'lucide-react';
import { districts, sizes } from '@/shared/constants';
import { useGetMeQuery } from '@/redux/features/dashboard/user';
import { useEffect, useState } from 'react';
import { useApplyCouponMutation } from '@/redux/features/dashboard/coupon';

type OrderItem = {
  product: string;
  quantity: number;
  sellPrice: number;
  customizedName?: string;
  customizedNumber?: string;
  productSize?: string;
};

type FormData = {
  items: OrderItem[];
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerEmail: string;
  district: string;
  paymentMethod: 'BKASH' | 'NAGAD';
  transactionId: string;
  soldBy: string;
  note?: string;
};

export default function OrderEdit() {
  const { id } = useParams();
  const router = useRouter();
  const [isHaveDiscount, setIsHaveDiscount] = useState({
    discount: 0,
    finalAmount: 0,
  });
  const [coupon, setCoupon] = useState('');

  const [updateOrder, { isLoading }] = useUpdateOrderMutation();
  const { data: singleData } = useGetSingleOrderQuery(id as string, {
    skip: !id,
  });
  const [applyCoupon] = useApplyCouponMutation();

  const { data: productsData } = useGetAllProductsQuery({ query: '' });
  const { data: singleUser } = useGetMeQuery({});

  useEffect(() => {
    if (singleData?.data) {
      const order = singleData.data;
      setValue('customerName', order.customerName);
      setValue('customerPhone', order.customerPhone);
      setValue('customerEmail', order.customerEmail);
      setValue('customerAddress', order.customerAddress);
      setValue('district', order.address?.split(',')[0] || 'Dhaka');
      setValue('paymentMethod', order.paymentMethod);
      setValue('transactionId', order.transactionId);
      setValue('note', order?.note);
      setValue(
        'items',
        order.items.map((item: any) => ({
          product: item.product?._id || '',
          quantity: item.quantity,
          sellPrice: item?.nameAndNumber
            ? item.sellPrice - 250
            : item.sellPrice,
          customizedName: item?.nameAndNumber?.split(' ')[0] || '',
          customizedNumber: item?.nameAndNumber?.split(' ')[2] || '',
          productSize: item?.productSize,
        })),
      );
    }
  }, [singleData, productsData]);

  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: {},
  } = useForm<FormData>({
    defaultValues: {
      items: [
        {
          product: '',
          quantity: 1,
          sellPrice: 0,
          customizedName: '',
          customizedNumber: '',
          productSize: 'M',
        },
      ],
      district: 'Dhaka',
      paymentMethod: 'BKASH',
      soldBy: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const watchedItems = watch('items') || [];
  const watchedDistrict = watch('district');

  // ── Logic from Form 1 ──
  const deliveryCharge = watchedDistrict === 'Dhaka' ? 70 : 130;

  const subtotal = watchedItems.reduce(
    (sum, item) =>
      sum +
      (item.sellPrice +
        (item?.customizedName && item?.customizedNumber ? 250 : 0) || 0) *
        (item.quantity || 0),
    0,
  );
  const discountedSubtotal = isHaveDiscount.finalAmount || subtotal;
  const total = discountedSubtotal + deliveryCharge;

  // Check if any item is customized for advance logic
  const isCustomized = watchedItems.some(
    (item) => item.customizedName?.trim() || item.customizedNumber?.trim(),
  );

  const advanceAmount = isCustomized ? Math.ceil(total * 0.5) : deliveryCharge;

  const handleProductChange = (value: string, index: number) => {
    const selectedProduct = productsData?.data?.find(
      (p: any) => p._id === value,
    );
    setValue(`items.${index}.product`, value);
    setValue(
      `items.${index}.sellPrice`,
      selectedProduct?.discountPrice
        ? selectedProduct?.discountPrice
        : selectedProduct?.basePrice || 0,
    );
  };

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

  const onSubmit = async (data: FormData) => {
    if (!data.items.length || !data.items[0].product) {
      return toast.error('Please add at least one valid product');
    }

    try {
      const payload = {
        ...data,
        customerAddress: `${data.district}, ${data.customerAddress}`,
        deliveryCharge,
        coupon: coupon,
        discountAmount: isHaveDiscount.discount,
        totalAmount: subtotal + deliveryCharge, // consistent with your backend schema
        finalAmount: total,
        paidAmount: advanceAmount,
        soldBy: singleUser?.data?._id,
        note: data?.note,
        items: data.items.map((item) => ({
          ...item,
          sellPrice:
            item?.sellPrice +
            (item?.customizedName && item?.customizedNumber ? 250 : 0),
          nameAndNumber:
            [item.customizedName, item.customizedNumber]
              .filter(Boolean)
              .join(' / ') || undefined,
        })),
      };

      await updateOrder({ orderId: id, data: payload }).unwrap();
      toast.success('Order updated successfully!');
      router.push('/dashboard/orders');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create order');
    }
  };

  return (
    <div className="p-6 max-w-full mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-black uppercase tracking-tighter italic">
            Create <span className="text-orange-600">New Order</span>
          </h2>
          <div className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full font-bold text-sm">
            Advance Due: ৳{advanceAmount}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Customer & Payment */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm bg-slate-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                  <User className="w-4 h-4 text-orange-600" /> Customer
                  Information
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase ml-1">
                    Customer Name
                  </Label>
                  <Input
                    {...register('customerName', { required: true })}
                    placeholder="Full Name"
                    className="bg-white border-none h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase ml-1">
                    Phone Number
                  </Label>
                  <Input
                    {...register('customerPhone', { required: true })}
                    placeholder="017xxxxxxxx"
                    className="bg-white border-none h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase ml-1">
                    Email
                  </Label>
                  <Input
                    {...register('customerEmail')}
                    placeholder="example@gmail.com"
                    className="bg-white border-none h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase ml-1">
                    District
                  </Label>
                  <Controller
                    name="district"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-white border-none h-11 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                {/* <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase ml-1">
                    Sold By (Seller Name)
                  </Label>
                  <Input
                    {...register('soldBy', { required: true })}
                    placeholder="Who sold this?"
                    className="bg-white border-none h-11 rounded-xl shadow-sm ring-1 ring-orange-100"
                  />
                </div> */}
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-xs font-bold uppercase ml-1">
                    Full Address
                  </Label>
                  <Input
                    {...register('customerAddress', { required: true })}
                    placeholder="Area, Road, House No."
                    className="bg-white border-none h-11 rounded-xl"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label className="text-xs font-bold uppercase ml-1">
                    Note
                  </Label>
                  <Input
                    {...register('note')}
                    placeholder="Area, Road, House No."
                    className="bg-white border-none h-11 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Product Selection */}
            <Card className="border-none shadow-sm bg-slate-50/50">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                  <ReceiptText className="w-4 h-4 text-orange-600" /> Items
                </CardTitle>
                <Button
                  type="button"
                  onClick={() =>
                    append({ product: '', quantity: 1, sellPrice: 0 })
                  }
                  size="sm"
                  className="bg-slate-900 rounded-lg"
                >
                  <Plus className="w-4 h-4 mr-1" /> Add Product
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="p-4 bg-white rounded-2xl shadow-sm space-y-4 border border-slate-100"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                      <div className="md:col-span-5 space-y-2">
                        <Label className="text-[10px] uppercase font-black text-slate-400">
                          Product
                        </Label>
                        <Controller
                          name={`items.${index}.product`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={(val) =>
                                handleProductChange(val, index)
                              }
                              value={field.value}
                            >
                              <SelectTrigger className="border-none bg-slate-50 h-10 rounded-lg">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                {productsData?.data?.map((p: any) => (
                                  <SelectItem key={p._id} value={p._id}>
                                    {p.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                        <Label className="text-[10px] uppercase font-black text-slate-400">
                          Qty
                        </Label>
                        <Input
                          type="number"
                          {...register(`items.${index}.quantity`, {
                            valueAsNumber: true,
                          })}
                          className="border-none bg-slate-50 h-10"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <Label className="text-[10px] uppercase font-black text-slate-400">
                          Size
                        </Label>
                        <Controller
                          {...register(`items.${index}.productSize`)}
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="border-none bg-slate-50 h-10">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {sizes.map((d) => (
                                  <SelectItem key={d} value={d}>
                                    {d}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </div>

                      <div className="md:col-span-3 space-y-2">
                        <Label className="text-[10px] uppercase font-black text-slate-400">
                          Price
                        </Label>
                        <Input
                          type="number"
                          {...register(`items.${index}.sellPrice`, {
                            valueAsNumber: true,
                          })}
                          className="border-none bg-slate-50 h-10 font-bold"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => remove(index)}
                          className="text-red-500 hover:bg-red-50 w-full h-10 rounded-lg"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {/* Customization logic from Form 1 */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed">
                      <Input
                        {...register(`items.${index}.customizedName`)}
                        placeholder="Custom Name"
                        className="h-8 text-xs bg-orange-50/50 border-none italic"
                      />
                      <Input
                        {...register(`items.${index}.customizedNumber`)}
                        placeholder="Custom Number"
                        className="h-8 text-xs bg-orange-50/50 border-none italic"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Side: Summary & Payment */}
          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-slate-900 text-white rounded-[2rem] overflow-hidden">
              <CardHeader>
                <CardTitle className="text-center text-xs uppercase tracking-[0.2em] opacity-60">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Subtotal</span>
                  <span className="font-bold">৳{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">
                    Delivery ({watchedDistrict})
                  </span>
                  <span className="font-bold">৳{deliveryCharge}</span>
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
                      className="bg-slate-800 border-none font-bold h-10 rounded-xl shadow-sm"
                    />
                    <Button
                      type="button"
                      onClick={handleApplyCoupon}
                      variant="secondary"
                      disabled={!coupon}
                      className="border-2  px-6 h-10 rounded-xl"
                    >
                      Apply
                    </Button>
                  </div>
                </div>

                <Separator className="bg-slate-800" />
                <div className="flex justify-between items-end pt-2">
                  <span className="text-xs uppercase font-black text-orange-500">
                    Final Total
                  </span>
                  <span className="text-3xl font-black text-orange-500">
                    ৳{total}
                  </span>
                </div>
                <div className="bg-orange-500/10 p-3 rounded-xl border border-orange-500/20 text-center">
                  <p className="text-[10px] uppercase font-black text-orange-400">
                    Collect Advance
                  </p>
                  <p className="text-xl font-black text-orange-500">
                    ৳{advanceAmount}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-slate-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-orange-600" /> Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 gap-2">
                      {['BKASH', 'NAGAD'].map((m) => (
                        <Button
                          key={m}
                          type="button"
                          variant={field.value === m ? 'default' : 'outline'}
                          onClick={() => field.onChange(m)}
                          className={`h-10 rounded-xl font-black text-xs ${field.value === m ? 'bg-orange-600' : 'bg-white border-none'}`}
                        >
                          {m}
                        </Button>
                      ))}
                    </div>
                  )}
                />
                <div className="space-y-2">
                  <Label className="text-[10px] font-black uppercase opacity-60">
                    Transaction ID
                  </Label>
                  <Input
                    {...register('transactionId', { required: true })}
                    className="bg-white border-none h-11 rounded-xl shadow-inner"
                    placeholder="TRX-XXXXXX"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-14 bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-600/20"
                >
                  {isLoading ? 'Creating...' : 'Confirm Order'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
