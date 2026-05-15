/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useParams } from 'next/navigation';
import { useGetSingleOrderQuery } from '@/redux/features/dashboard/order'; // Hooks path check korish
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Package,
  User,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  UserCheck,
} from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleOrderQuery(id as string);
  const order = data?.data;

  if (isLoading) return <OrderDetailsSkeleton />;

  if (!order)
    return <div className="text-center p-20 font-bold">Order not found!</div>;
  console.log('ordre', order);
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">
            Order <span className="text-orange-600">Details</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm">
            ID: #{order._id.slice(-8).toUpperCase()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-full border-2 font-bold uppercase tracking-wider"
          >
            {order.status}
          </Badge>
          <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {format(new Date(order.createdAt), 'dd MMM yyyy, p')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Items & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card className="border-none shadow-sm bg-slate-50/50">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                <Package className="w-4 h-4 text-orange-600" /> Purchased Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-slate-100"
                >
                  <div className="relative h-28 w-24 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-200">
                    <Image
                      src={
                        item?.product?.images ? item?.product?.images[0] : ''
                      }
                      alt="Jersey"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-sm uppercase">
                      {item.product?.name || 'Product Deleted'}
                    </h4>
                    <p className="text-xs font-bold text-slate-400">
                      Qty: {item.quantity} × ৳{item.sellPrice}
                    </p>
                    {item.nameAndNumber && (
                      <p className="text-[10px] font-black text-orange-500 uppercase mt-1">
                        ✏️ {item.nameAndNumber}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-black text-orange-600">
                      ৳{item.quantity * item.sellPrice}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="border-none shadow-sm bg-slate-50/50">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-orange-600" /> Payment &
                Logistics
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                  <span className="text-xs font-bold uppercase text-slate-400">
                    Method
                  </span>
                  <span className="font-black text-sm text-slate-900">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100">
                  <span className="text-xs font-bold uppercase text-slate-400">
                    TRX ID
                  </span>
                  <span className="font-mono font-bold text-sm text-orange-600">
                    {order.transactionId}
                  </span>
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex flex-col justify-center text-center">
                <p className="text-[10px] font-black uppercase text-orange-400">
                  Advance Paid
                </p>
                <p className="text-2xl font-black text-orange-600">
                  ৳{order.paidAmount || 0}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Summary & Customer */}
        <div className="space-y-6">
          {/* Customer Info */}
          <Card className="border-none shadow-sm bg-slate-50/50">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase">
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-slate-400 mt-1" />
                <div>
                  <p className="font-black text-sm uppercase">
                    {order.customerName}
                  </p>
                  <p className="text-xs font-bold text-slate-500">
                    {order.customerEmail || 'No Email'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400" />
                <p className="font-bold text-sm">{order.customerPhone}</p>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <MapPin className="w-4 h-4 text-slate-400 mt-1" />
                <p className="text-xs font-bold leading-relaxed">
                  {order.customerAddress}
                </p>
              </div>

              {/* Sold By Info - Jeta tui manual order er somoy add korsili */}
              {order.soldBy && (
                <div className="mt-4 pt-4 border-t border-dashed border-slate-200">
                  <div className="flex items-center gap-2 text-blue-600">
                    <UserCheck className="w-4 h-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest">
                      Order Handled By
                    </p>
                  </div>
                  <p className="text-xs font-black mt-1 ml-6 uppercase">
                    {typeof order.soldBy === 'object'
                      ? order.soldBy.name
                      : 'Staff Member'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card className="border-none shadow-xl bg-slate-900 text-white rounded-[2rem]">
            <CardHeader>
              <CardTitle className="text-xs uppercase tracking-[0.2em] opacity-60 text-center">
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="opacity-60">Subtotal</span>
                <span className="font-bold">৳{order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm text-green-400">
                <span className="opacity-60 font-bold">Discount</span>
                <span className="font-bold">-৳{order.discountAmount}</span>
              </div>
              <Separator className="bg-slate-800" />
              <div className="flex justify-between items-end pt-2">
                <span className="text-xs font-black uppercase text-orange-500 tracking-wider">
                  Final Amount
                </span>
                <span className="text-3xl font-black text-orange-500 italic">
                  ৳{order.finalAmount}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* <Button className="w-full h-12 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-black uppercase tracking-tighter shadow-lg">
            Print Invoice
          </Button> */}
        </div>
      </div>
    </div>
  );
}

function OrderDetailsSkeleton() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <Skeleton className="h-12 w-[300px] rounded-xl" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-[300px] w-full rounded-2xl" />
          <Skeleton className="h-[200px] w-full rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full rounded-2xl" />
          <Skeleton className="h-[150px] w-full rounded-[2rem]" />
        </div>
      </div>
    </div>
  );
}
