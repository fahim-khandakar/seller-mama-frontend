'use client';

import { useEffect, useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import CustomCard from '@/components/common/Custom Card/CustomCard';
import { useGetAllProductsQuery } from '@/redux/features/dashboard/product';
import { IProduct } from '@/types/product.type';
import { constructQuery } from '@/shared/helpers/constructQuery';
import { useRouter, useSearchParams } from 'next/navigation';
import ErrorShow from '@/components/common/Error Show/ErrorShow';
import { keys } from './config/constants';
import { useGetAllMainCategoriesQuery } from '@/redux/features/dashboard/mainCategory';
import { IMainCategory } from '@/types/mainCategory.type';
import { useGetAllCategoriesQuery } from '@/redux/features/dashboard/category';
import { ICategory } from '@/types/category.type';
import { useGetAllTypesQuery } from '@/redux/features/dashboard/type';
import { IType } from '@/types/type.type';
import CardSkeleton from '@/components/common/Card Skeleton/CardSkeleton';
import NoProductsFound from '@/components/common/No Product Found/NoProductFound';

export default function ShopByFilterPage() {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState([500, 2000]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(50);
  const searchParams = useSearchParams();

  const query = constructQuery({
    searchParams,
    keys,
    page: currentPage,
    limit,
  });

  const {
    data: productsData,
    isError,
    error,
    isLoading,
  } = useGetAllProductsQuery({ query });

  const { data: mainCategoriesData } = useGetAllMainCategoriesQuery({});
  const { data: categoriesData } = useGetAllCategoriesQuery({});
  const { data: typesData } = useGetAllTypesQuery({});

  useEffect(() => {
    if (productsData?.data) {
      setTotalItems(productsData?.meta?.total);
      setLimit(productsData?.meta?.limit);
      setCurrentPage(productsData?.meta?.page);
    }
  }, [productsData]);

  const handleMainCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedCategory = searchParams.get('mainCategory');

    if (selectedCategory === slug) {
      // if same checkbox clicked again → unselect
      params.delete('mainCategory');
    } else {
      // otherwise replace with new one
      params.set('mainCategory', slug);
    }

    router.push(`?${params.toString()}`);
  };

  const handleResetFilter = () => {
    setPriceRange([500, 2000]);
    setCurrentPage(1);
    router.push('?');
  };

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedCategory = searchParams.get('category');

    if (selectedCategory === slug) {
      // if same checkbox clicked again → unselect
      params.delete('category');
    } else {
      // otherwise replace with new one
      params.set('category', slug);
    }

    router.push(`?${params.toString()}`);
  };

  const handleTypeChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const selectedType = searchParams.get('type');

    if (selectedType === slug) {
      // if same checkbox clicked again → unselect
      params.delete('type');
    } else {
      // otherwise replace with new one
      params.set('type', slug);
    }

    router.push(`?${params.toString()}`);
  };

  if (isError) {
    return <ErrorShow error={error} />;
  }

  const FilterSidebar = () => (
    <div className="space-y-8 pl-5">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest mb-4">
          Categories
        </h3>
        <div className="space-y-3">
          {mainCategoriesData?.data?.map((cat: IMainCategory) => {
            const selectedCategory = searchParams.get('mainCategory');

            return (
              <div key={cat._id} className="flex items-center space-x-2">
                <Checkbox
                  id={cat.slug}
                  checked={selectedCategory === cat.slug}
                  onCheckedChange={() => handleMainCategoryChange(cat.slug)}
                  className="h-4 w-4"
                />
                <label
                  htmlFor={cat.slug}
                  className="text-sm font-medium cursor-pointer"
                >
                  {cat.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="bg-slate-100 dark:bg-slate-800" />

      {/* category */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest mb-4">
          Sub Categories
        </h3>
        <div className="space-y-3">
          {categoriesData?.data?.map((cat: ICategory) => {
            const selectedCategory = searchParams.get('category');

            return (
              <div key={cat._id} className="flex items-center space-x-2">
                <Checkbox
                  id={cat.slug}
                  checked={selectedCategory === cat.slug}
                  onCheckedChange={() => handleCategoryChange(cat.slug)}
                  className="h-4 w-4"
                />
                <label
                  htmlFor={cat.slug}
                  className="text-sm font-medium cursor-pointer"
                >
                  {cat.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {/* Types */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest mb-4">
          Types
        </h3>
        <div className="space-y-3">
          {typesData?.data?.map((type: IType) => {
            const selectedType = searchParams.get('type');

            return (
              <div key={type._id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.slug}
                  checked={selectedType === type.slug}
                  onCheckedChange={() => handleTypeChange(type.slug)}
                  className="h-4 w-4"
                />
                <label
                  htmlFor={type.slug}
                  className="text-sm font-medium cursor-pointer"
                >
                  {type.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <Separator className="bg-slate-100 dark:bg-slate-800" />

      {/* Price Filter */}
      <div>
        <h3 className="text-sm font-black uppercase tracking-widest mb-4">
          Price Range
        </h3>
        <Slider
          defaultValue={[500, 2000]}
          max={3000}
          step={50}
          value={priceRange}
          onValueChange={setPriceRange}
          className="my-6"
        />
        <div className="flex justify-between text-sm font-bold text-orange-600">
          <span>৳{priceRange[0]}</span>
          <span>৳{priceRange[1]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white uppercase">
              All <span className="text-orange-500">Jerseys</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              Showing {totalItems} items for you
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Mobile Filter Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="md:hidden flex items-center gap-2 rounded-xl"
                >
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left font-black uppercase tracking-widest">
                    Filter
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
            {/* 
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2 rounded-xl border border-slate-100 dark:border-slate-800"
            >
              Sort By: Featured <ChevronDown className="h-4 w-4" />
            </Button> */}
          </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {isLoading ? (
                [1, 2, 3, 4, 5, 6].map((n) => <CardSkeleton key={n} />)
              ) : productsData?.data?.length > 0 ? (
                productsData?.data?.map((product: IProduct, index: number) => (
                  <CustomCard product={product} key={index} />
                ))
              ) : (
                <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                  <NoProductsFound onResetFilters={handleResetFilter} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
