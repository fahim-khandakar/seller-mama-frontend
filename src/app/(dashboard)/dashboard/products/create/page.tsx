/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useCreateProductMutation } from '@/redux/features/dashboard/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  X,
  Plus,
  Package,
  Tags,
  FileText,
  Image as ImageIcon,
} from 'lucide-react';

type DescriptionPoint = {
  value: string;
};

type ProductFormData = {
  name: string;
  category: string;
  description: DescriptionPoint[];
  basePrice: number;
  discountPrice?: number;
  isActive: boolean;
};

export default function ProductCreate() {
  const [imageData, setImageData] = useState<
    Array<{ file: File; preview: string }>
  >([]);
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      category: '',
      description: [{ value: '' }],
      basePrice: 0,
      isActive: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'description',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (imageData.length + files.length > 3) {
      toast.error('Maximum 3 images allowed');
      return;
    }
    const validFiles = files.filter((file) => file.type.startsWith('image/'));

    Promise.all(
      validFiles.map(
        (file) =>
          new Promise<{ file: File; preview: string }>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () =>
              resolve({ file, preview: reader.result as string });
            reader.readAsDataURL(file);
          }),
      ),
    ).then((results) => setImageData((prev) => [...prev, ...results]));
  };

  const removeImage = (index: number) =>
    setImageData((prev) => prev.filter((_, i) => i !== index));

  const onSubmit = async (data: ProductFormData) => {
    if (imageData.length === 0) {
      toast.error('At least one image is required');
      return;
    }

    try {
      const formData = new FormData();

      // Append basic fields
      formData.append('name', data.name);
      formData.append('category', data.category);
      formData.append('basePrice', String(data.basePrice));
      formData.append('isActive', String(data.isActive));

      // Append optional discount price
      if (data.discountPrice !== undefined && !isNaN(data.discountPrice)) {
        formData.append('discountPrice', String(data.discountPrice));
      }

      // Append description points (Iterative append)
      data.description.forEach(({ value }) => {
        if (value.trim()) {
          formData.append('description', value);
        }
      });

      // Append images
      imageData.forEach(({ file }) => {
        formData.append('images', file);
      });

      // PASS THE formData DIRECTLY
      // Don't use spread {...formData} or direct access
      await createProduct(formData).unwrap();

      toast.success('Product created successfully');
      router.push('/dashboard/products');
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to create product');
    }
  };

  return (
    <div className="shadow-md pt-5 rounded-md">
      <Card className="border-none">
        <CardHeader>
          <CardTitle className="text-2xl font-black uppercase tracking-tighter text-slate-900 dark:text-white">
            Create <span className="text-orange-600">Product</span>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <Tags className="w-3 h-3 text-orange-600" />
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Category
                  </Label>
                </div>
                <Input
                  {...register('category', {
                    required: 'Category is required',
                  })}
                  placeholder="Enter category"
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
                />
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description Points */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 ml-1">
                  <FileText className="w-3 h-3 text-orange-600" />
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Description Points
                  </Label>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ value: '' })}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Point
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <Input
                      {...register(`description.${index}.value` as const, {
                        required: 'Point cannot be empty',
                      })}
                      placeholder={`Point ${index + 1}`}
                      className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-orange-600/50"
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                        className="h-12 px-3 rounded-xl transition-colors"
                      >
                        <X size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">
                  Base Price
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('basePrice', {
                    valueAsNumber: true,
                    required: 'Base price is required',
                    min: { value: 1, message: 'Price must be at least 1' },
                  })}
                  placeholder="0.00"
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
                />
                {errors.basePrice && (
                  <p className="text-red-500 text-sm">
                    {errors.basePrice.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">
                  Discount Price{' '}
                  <span className="text-slate-400 normal-case font-normal">
                    (optional)
                  </span>
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  {...register('discountPrice', { valueAsNumber: true })}
                  placeholder="0.00"
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
                />
              </div>
            </div>

            {/* Is Active */}
            <Controller
              name="isActive"
              control={control}
              render={({ field }) => (
                <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                  <Checkbox
                    id="isActive"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <Label
                    htmlFor="isActive"
                    className="cursor-pointer text-[10px] font-black uppercase text-slate-500 tracking-widest"
                  >
                    Active Product
                  </Label>
                </div>
              )}
            />

            {/* Images */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 ml-1">
                <ImageIcon className="w-3 h-3 text-orange-600" />
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                  Images{' '}
                  <span className="text-slate-400 normal-case font-normal">
                    (max 3)
                  </span>
                </Label>
              </div>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium file:mr-4 file:rounded-lg file:border-0 file:bg-orange-600 file:text-white file:text-xs file:font-bold file:px-3 file:py-1"
              />

              {imageData.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {imageData.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.preview}
                        alt={`Preview ${index + 1}`}
                        className="h-24 w-full object-cover rounded-xl border-2 border-transparent group-hover:border-orange-600 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-lg transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
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
