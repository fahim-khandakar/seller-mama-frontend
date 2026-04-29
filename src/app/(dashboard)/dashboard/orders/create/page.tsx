/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useCreateOrderMutation } from '@/redux/features/dashboard/order';
import { useGetAllProductsQuery } from '@/redux/features/dashboard/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { User, Phone, MapPin, Plus, Minus } from 'lucide-react';

type OrderItem = {
  product: string;
  quantity: number;
  sellPrice: number;
  stockEntry: string;
  purchasePrice: number;
};

type FormData = {
  items: OrderItem[];
  discountAmount: number;
  customerName: string;
  customerPhone?: string;
  customerAddress?: string;
};

export default function OrderCreate() {
  const {
    control,
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      items: [],
      discountAmount: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const router = useRouter();

  const { data: productsData } = useGetAllProductsQuery({ query: '' });
  console.log('products', productsData);
  const watchedItems = watch('items');
  const discountAmount = watch('discountAmount');

  const totalAmount = watchedItems.reduce(
    (sum, item) => sum + item.sellPrice * item.quantity,
    0,
  );
  const finalAmount = totalAmount - discountAmount;

  const addItem = () => {
    append({
      product: '',
      quantity: 1,
      sellPrice: 0,
      stockEntry: '',
      purchasePrice: 0,
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      const orderData = {
        ...data,
        totalAmount,
        finalAmount,
      };
      await createOrder(orderData).unwrap();
      toast.success('Order created successfully!');
      router.push('/dashboard/orders');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create order');
    }
  };

  return (
    <div className="shadow-md pt-5  rounded-md ">
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            Create <span className="text-orange-600">Order</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <User className="w-3 h-3 text-orange-600" />
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Customer Name
                  </Label>
                </div>
                <Input
                  {...register('customerName', {
                    required: 'Customer name is required',
                  })}
                  placeholder="Enter customer name"
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
                />
                {errors.customerName && (
                  <p className="text-red-500 text-sm">
                    {errors.customerName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <Phone className="w-3 h-3 text-orange-600" />
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Phone
                  </Label>
                </div>
                <Input
                  {...register('customerPhone')}
                  placeholder="Enter phone number"
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <MapPin className="w-3 h-3 text-orange-600" />
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Address
                  </Label>
                </div>
                <Input
                  {...register('customerAddress')}
                  placeholder="Enter address"
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
                />
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Order Items</h3>
                <Button
                  type="button"
                  onClick={addItem}
                  variant="outline"
                  size="sm"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        Product
                      </Label>
                      <Controller
                        name={`items.${index}.product`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-xl">
                              <SelectValue placeholder="Select product" />
                            </SelectTrigger>
                            <SelectContent>
                              {productsData?.data?.map(
                                (product: { _id: string; name: string }) => (
                                  <SelectItem
                                    key={product._id}
                                    value={product._id}
                                  >
                                    {product.name}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        Quantity
                      </Label>
                      <Input
                        type="number"
                        {...register(`items.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                        placeholder="Qty"
                        className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                        Sell Price
                      </Label>
                      <Input
                        type="number"
                        step="0.01"
                        {...register(`items.${index}.sellPrice`, {
                          valueAsNumber: true,
                        })}
                        placeholder="Price"
                        className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant="destructive"
                        size="sm"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Totals */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Total Amount
                </Label>
                <Input
                  value={`$${totalAmount.toFixed(2)}`}
                  readOnly
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Discount Amount
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('discountAmount', { valueAsNumber: true })}
                  placeholder="0.00"
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Final Amount
                </Label>
                <Input
                  value={`$${finalAmount.toFixed(2)}`}
                  readOnly
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium  text-green-600"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-slate-900 dark:bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-orange-600/20 transition-all active:scale-95"
            >
              {isLoading ? 'Creating...' : 'Create Order'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
