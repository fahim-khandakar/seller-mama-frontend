/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useCreateProductMutation } from '@/redux/features/dashboard/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
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
import { useState } from 'react';
import {
  X,
  Plus,
  Package,
  Tags,
  FileText,
  Image as ImageIcon,
  Layers,
} from 'lucide-react';
import { useGetAllMainCategoriesQuery } from '@/redux/features/dashboard/mainCategory';
import { useGetAllCategoriesQuery } from '@/redux/features/dashboard/category';
import { useGetAllTypesQuery } from '@/redux/features/dashboard/type';

type DescriptionPoint = {
  value: string;
};

type ProductFormData = {
  name: string;
  category: string; // Form string e thakle product category string field er jonno
  type: string; // Final Product Model e jeta jabe
  details: string;
  description: DescriptionPoint[];
  basePrice: number;
  discountPrice?: number;
  isActive: boolean;
};

export default function ProductCreate() {
  // --- Dependency States ---
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const [imageData, setImageData] = useState<
    Array<{ file: File; preview: string }>
  >([]);
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const router = useRouter();

  // --- API Hooks ---
  const { data: mainCategories } = useGetAllMainCategoriesQuery({});
  const { data: categories } = useGetAllCategoriesQuery(
    { mainCategory: selectedMainCategory },
    { skip: !selectedMainCategory },
  );
  const { data: types } = useGetAllTypesQuery(
    { category: selectedCategory },
    { skip: !selectedCategory },
  );

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: '',
      type: '',
      details: '',
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
      formData.append('name', data.name);
      formData.append('type', data.type);
      formData.append('details', data.details);
      formData.append('basePrice', String(data.basePrice));
      formData.append('isActive', String(data.isActive));

      if (data.discountPrice !== undefined && !isNaN(data.discountPrice)) {
        formData.append('discountPrice', String(data.discountPrice));
      }

      data.description.forEach(({ value }) => {
        if (value.trim()) {
          formData.append('description', value);
        }
      });

      imageData.forEach(({ file }) => {
        formData.append('images', file);
      });

      const result = await createProduct(formData).unwrap();
      console.log('result', result);
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
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
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
                />
              </div>

              {/* Main Category Selection */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <Layers className="w-3 h-3 text-orange-600" />
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Main Category
                  </Label>
                </div>
                <Select
                  onValueChange={(val) => {
                    setSelectedMainCategory(val);
                    setSelectedCategory(''); // Reset lower levels
                    setValue('type', '');
                  }}
                >
                  <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-xl">
                    <SelectValue placeholder="Select Main Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {mainCategories?.data?.map((item: any) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Category Selection */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <Tags className="w-3 h-3 text-orange-600" />
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Category
                  </Label>
                </div>
                <Select
                  disabled={!selectedMainCategory}
                  onValueChange={(val) => {
                    setSelectedCategory(val);
                    // Amra form er 'category' field e name ta rakhbo jodi schema te string thake
                    const catName = categories?.data?.find(
                      (c: any) => c._id === val,
                    )?.name;
                    setValue('category', catName || '');
                    setValue('type', '');
                  }}
                >
                  <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-xl">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.data?.map((item: any) => (
                      <SelectItem key={item._id} value={item._id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Selection (Final Model Ref) */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <Tags className="w-3 h-3 text-orange-600" />
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Product Type
                  </Label>
                </div>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: 'Type is required' }}
                  render={({ field }) => (
                    <Select
                      disabled={!selectedCategory}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-xl">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {types?.data?.map((item: any) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type.message}</p>
                )}
              </div>

              {/* Details */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 ml-1">
                  <FileText className="w-3 h-3 text-orange-600" />
                  <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">
                    Details
                  </Label>
                </div>
                <Input
                  {...register('details', { required: 'Details is required' })}
                  placeholder="Product short details"
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
                />
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
                  <Plus className="w-4 h-4 mr-1" /> Add Point
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
                      className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
                    />
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => remove(index)}
                        className="h-12 px-3 rounded-xl"
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
                  {...register('basePrice', {
                    valueAsNumber: true,
                    required: 'Base price is required',
                  })}
                  placeholder="0.00"
                  className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">
                  Discount Price (optional)
                </Label>
                <Input
                  type="number"
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
                  Images (max 3)
                </Label>
              </div>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="h-12 px-4 bg-slate-50 dark:bg-slate-900 border-none rounded-xl font-medium"
              />
              {imageData.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {imageData.map((img, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={img.preview}
                        alt="preview"
                        className="h-24 w-full object-cover rounded-xl border-2 border-transparent group-hover:border-orange-600 transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full h-14 bg-slate-900 dark:bg-orange-600 hover:bg-orange-700 text-white font-black uppercase tracking-[0.2em] rounded-xl"
            >
              {isLoading ? 'Creating...' : 'Create Product'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
