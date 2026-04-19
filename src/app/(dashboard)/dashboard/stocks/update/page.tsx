/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm, Controller } from 'react-hook-form';
import {
  useUpdateProductStockMutation,
  useGetAllProductsQuery,
} from '@/redux/features/dashboard/product';
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
import { Package, Plus, Minus, DollarSign, Calendar } from 'lucide-react';

type FormData = {
  productId: string;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
  operation: 'add' | 'remove';
};

export default function StockUpdate() {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      operation: 'add',
      purchaseDate: new Date().toISOString().split('T')[0],
    },
  });

  const [updateStock, { isLoading }] = useUpdateProductStockMutation();
  const router = useRouter();
  const { data: productsData } = useGetAllProductsQuery({});

  const selectedProductId = watch('productId');
  const operation = watch('operation');

  const selectedProduct = productsData?.data?.find(
    (p: any) => p._id === selectedProductId,
  );

  const onSubmit = async (data: FormData) => {
    try {
      const stockData = {
        quantity: operation === 'add' ? data.quantity : -data.quantity,
        purchasePrice: data.purchasePrice,
        purchaseDate: new Date(data.purchaseDate),
      };

      await updateStock({ productId: data.productId, stockData }).unwrap();
      toast.success(
        `Stock ${operation === 'add' ? 'added' : 'removed'} successfully!`,
      );
      router.push('/dashboard/stocks');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update stock');
    }
  };

  return (
    <div className="shadow-md pt-5 px-5 rounded-md">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            Update <span className="text-orange-600">Stock</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Product Selection */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Package className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Select Product
                </Label>
              </div>
              <Controller
                name="productId"
                control={control}
                rules={{ required: 'Please select a product' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-xl">
                      <SelectValue placeholder="Choose a product" />
                    </SelectTrigger>
                    <SelectContent>
                      {productsData?.data?.map((product: any) => (
                        <SelectItem key={product._id} value={product._id}>
                          {product.name} (Current Stock: {product.totalStock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.productId && (
                <p className="text-red-500 text-sm">
                  {errors.productId.message}
                </p>
              )}
            </div>

            {/* Operation Type */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Package className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Operation
                </Label>
              </div>
              <Controller
                name="operation"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4 text-green-600" />
                          Add Stock
                        </div>
                      </SelectItem>
                      <SelectItem value="remove">
                        <div className="flex items-center gap-2">
                          <Minus className="w-4 h-4 text-red-600" />
                          Remove Stock
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Package className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Quantity
                </Label>
              </div>
              <Input
                type="number"
                min="1"
                {...register('quantity', {
                  required: 'Quantity is required',
                  valueAsNumber: true,
                  min: { value: 1, message: 'Quantity must be at least 1' },
                })}
                placeholder="Enter quantity"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Purchase Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <DollarSign className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Purchase Price (per unit)
                </Label>
              </div>
              <Input
                type="number"
                step="0.01"
                {...register('purchasePrice', {
                  required: 'Purchase price is required',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Price cannot be negative' },
                })}
                placeholder="Enter purchase price"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
              {errors.purchasePrice && (
                <p className="text-red-500 text-sm">
                  {errors.purchasePrice.message}
                </p>
              )}
            </div>

            {/* Purchase Date */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Calendar className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Purchase Date
                </Label>
              </div>
              <Input
                type="date"
                {...register('purchaseDate', {
                  required: 'Purchase date is required',
                })}
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
              {errors.purchaseDate && (
                <p className="text-red-500 text-sm">
                  {errors.purchaseDate.message}
                </p>
              )}
            </div>

            {/* Current Stock Info */}
            {selectedProduct && (
              <Card className="bg-blue-50 dark:bg-blue-900/20">
                <CardContent className="pt-4">
                  <div className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Current Stock:</strong> {selectedProduct.totalStock}{' '}
                    units
                  </div>
                  <div className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                    <strong>After {operation}:</strong>{' '}
                    {operation === 'add'
                      ? selectedProduct.totalStock + (watch('quantity') || 0)
                      : Math.max(
                          0,
                          selectedProduct.totalStock - (watch('quantity') || 0),
                        )}{' '}
                    units
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-slate-900 dark:bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-orange-600/20 transition-all active:scale-95"
            >
              {isLoading ? 'Updating...' : `Update Stock`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
