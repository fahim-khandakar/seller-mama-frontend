// @/components/common/JerseySkeleton/JerseyDetailsSkeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function JerseyDetailsPageSkeleton() {
  const thumbnailItems = Array.from({ length: 4 });
  const sizes = Array.from({ length: 5 });
  const trustBadges = Array.from({ length: 3 });

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* ================= LEFT SIDE: IMAGE GALLERY SKELETON ================= */}
          <div className="space-y-6">
            {/* Big Main Image Area matching aspect-[3/4] */}
            <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl">
              <Skeleton className="h-full w-full bg-slate-200 dark:bg-slate-800" />
            </div>

            {/* Clickable Thumbnails Grid Placeholder */}
            <div className="grid grid-cols-4 gap-4">
              {thumbnailItems.map((_, i) => (
                <div
                  key={i}
                  className="relative aspect-square rounded-2xl overflow-hidden"
                >
                  <Skeleton className="h-full w-full bg-slate-200 dark:bg-slate-800" />
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT SIDE: PRODUCT INFO SKELETON ================= */}
          <div className="flex flex-col space-y-6">
            {/* Title & Ratings Header */}
            <div className="space-y-4">
              {/* Main Jersey Title Text */}
              <Skeleton className="h-10 w-5/6 md:h-12 bg-slate-200 dark:bg-slate-800 rounded-lg" />
              {/* Category Subtitle */}
              <Skeleton className="h-8 w-1/2 bg-slate-200 dark:bg-slate-800 rounded-lg" />

              <div className="flex items-center gap-4 pt-1">
                {/* Simulated Star Elements Block */}
                <Skeleton className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                <Separator orientation="vertical" className="h-4" />
                {/* Stock status tag */}
                <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>

            {/* Price Line Group */}
            <div className="flex items-baseline gap-4">
              {/* Main Price */}
              <Skeleton className="h-10 w-24 bg-slate-200 dark:bg-slate-800 rounded-md" />
              {/* Strikethrough Base Price */}
              <Skeleton className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded-md" />
              {/* Save Discount Badge */}
              <Skeleton className="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded-full" />
            </div>

            <Separator />

            {/* Size Selection Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
                <Skeleton className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
              {/* 5 Box Grid Size Block */}
              <div className="flex gap-4">
                {sizes.map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-xl"
                  />
                ))}
              </div>
            </div>

            {/* Customization Block Container */}
            <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl space-y-2">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4 bg-slate-200 dark:bg-slate-800 rounded" />
                <Skeleton className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>

            {/* Quantity Action Counter & Cart Button Row */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {/* Plus/Minus quantity container */}
              <Skeleton className="h-14 w-full sm:w-32 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              {/* Main Add To Cart Action button */}
              <Skeleton className="flex-1 h-14 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
            </div>

            {/* Delivery Trust Badges Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {trustBadges.map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                >
                  <Skeleton className="h-5 w-5 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-14 bg-slate-200 dark:bg-slate-800 rounded" />
                    <Skeleton className="h-3 w-10 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                </div>
              ))}
            </div>

            {/* Tabs details headers line placeholder */}
            <div className="pt-8 space-y-4">
              <div className="flex gap-8 border-b pb-2">
                <Skeleton className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
                <Skeleton className="h-4 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
              {/* Details Lines paragraphs simulation */}
              <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
                <Skeleton className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
                <Skeleton className="h-4 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
