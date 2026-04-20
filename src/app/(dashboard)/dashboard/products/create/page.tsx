/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm, Controller } from 'react-hook-form';
import { useCreateProductMutation } from '@/redux/features/dashboard/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Package, DollarSign, Tag, FileText } from 'lucide-react';

type FormData = {
  name: string;
  description: string;
  category: string;
  basePrice: number;
  discountPrice?: number;
  isActive: boolean;
  quantity: number;
  purchasePrice: number;
  purchaseDate: string;
};

export default function ProductCreate() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      isActive: true,
      quantity: 1,
      purchasePrice: 0,
      purchaseDate: new Date().toISOString().slice(0, 10),
    },
  });
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    try {
      await createProduct({
        name: data.name,
        description: data.description,
        category: data.category,
        basePrice: data.basePrice,
        discountPrice: data.discountPrice,
        isActive: data.isActive,
        stock: [
          {
            quantity: data.quantity,
            purchasePrice: data.purchasePrice,
            purchaseDate: data.purchaseDate,
          },
        ],
      }).unwrap();
      toast.success('Product created successfully!');
      router.push('/dashboard/products');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div className="shadow-md pt-5  rounded-md">
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            Create <span className="text-orange-600">Product</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Package className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Product Name
                </Label>
              </div>
              <Input
                {...register('name', { required: 'Name is required' })}
                placeholder="Enter product name"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <FileText className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Description
                </Label>
              </div>
              <Input
                {...register('description')}
                placeholder="Enter product description"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <Tag className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Category
                </Label>
              </div>
              <Input
                {...register('category', { required: 'Category is required' })}
                placeholder="Enter category"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Base Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <DollarSign className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Base Price
                </Label>
              </div>
              <Input
                type="number"
                step="0.01"
                {...register('basePrice', {
                  required: 'Base price is required',
                  valueAsNumber: true,
                })}
                placeholder="Enter base price"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
              {errors.basePrice && (
                <p className="text-red-500 text-sm">
                  {errors.basePrice.message}
                </p>
              )}
            </div>

            {/* Discount Price */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 ml-1">
                <DollarSign className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Discount Price (Optional)
                </Label>
              </div>
              <Input
                type="number"
                step="0.01"
                {...register('discountPrice', { valueAsNumber: true })}
                placeholder="Enter discount price"
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
              />
            </div>

            {/* Is Active */}
            <div className="flex items-center space-x-2">
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="isActive"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <Label
                htmlFor="isActive"
                className="text-[10px] font-black uppercase text-slate-500 tracking-widest"
              >
                Active
              </Label>
            </div>

            {/* Stock Entry */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <DollarSign className="w-3 h-3 text-orange-600" />
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Purchase Price
                  </Label>
                </div>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('purchasePrice', {
                    required: 'Purchase price is required',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Must be positive' },
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

              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <DollarSign className="w-3 h-3 text-orange-600" />
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
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 bg-slate-900 dark:bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-[0.2em] rounded-xl shadow-xl shadow-orange-600/20 transition-all active:scale-95"
            >
              {isLoading ? 'Creating...' : 'Create Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
