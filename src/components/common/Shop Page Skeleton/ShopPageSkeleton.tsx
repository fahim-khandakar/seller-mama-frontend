// @/components/common/Shop Skeleton/ShopFilterSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function ShopPageSkeleton() {
  // Loop chalay dummy list bananor dummy arrays
  const filterItems = Array.from({ length: 4 });
  const productCards = Array.from({ length: 6 });

  // Sidebar Filter Section er Loader
  const FilterGroupSkeleton = () => (
    <div className="space-y-3">
      {/* Filter Section Title (e.g., Categories) */}
      <Skeleton className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="space-y-3 pt-1">
        {filterItems.map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            {/* Checkbox Skeleton */}
            <Skeleton className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded" />
            {/* Label Skeleton */}
            <Skeleton className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* ================= HEADER AREA SKELETON ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="space-y-3">
            {/* Page Main Title: "All Jerseys" */}
            <Skeleton className="h-10 w-48 md:h-12 md:w-64 bg-slate-200 dark:bg-slate-800 rounded-lg" />
            {/* Results Count Text */}
            <Skeleton className="h-4 w-36 bg-slate-200 dark:bg-slate-800 rounded" />
          </div>

          {/* Mobile Filter Trigger Button Placeholder */}
          <div className="md:hidden">
            <Skeleton className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>

        {/* ================= MAIN CONTENT LAYOUT ================= */}
        <div className="flex gap-10">
          {/* DESKTOP SIDEBAR SKELETON */}
          <aside className="hidden md:block w-64 flex-shrink-0 space-y-8 pl-5">
            {/* Categories */}
            <FilterGroupSkeleton />
            <Separator className="bg-slate-100 dark:bg-slate-800" />

            {/* Sub Categories */}
            <FilterGroupSkeleton />
            <Separator className="bg-slate-100 dark:bg-slate-800" />

            {/* Types */}
            <FilterGroupSkeleton />
            <Separator className="bg-slate-100 dark:bg-slate-800" />

            {/* Price Filter Skeleton */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
              {/* Slider Track Line */}
              <Skeleton className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full my-6" />
              {/* Price Min/Max Indicators */}
              <div className="flex justify-between">
                <Skeleton className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
                <Skeleton className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          </aside>

          {/* PRODUCT GRID SKELETON */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {productCards.map((_, index) => (
                <div
                  key={index}
                  className="border-none shadow-none bg-transparent w-full"
                >
                  {/* Image Container with Exact 3/4 Aspect Ratio */}
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4">
                    <Skeleton className="h-full w-full bg-slate-200 dark:bg-slate-800" />
                  </div>
                  {/* Text/Details Placeholder */}
                  <div className="space-y-2 px-1">
                    <Skeleton className="h-5 w-5/6 bg-slate-200 dark:bg-slate-800 rounded-md" />
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-5 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
                      <Skeleton className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded-md" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
