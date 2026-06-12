// @/components/ui/product-card-skeleton.tsx
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function CardSkeleton() {
  return (
    <Card className="border-none shadow-none bg-transparent w-full">
      {/* Product Image Skeleton matching aspect-[3/4] */}
      <CardContent className="p-0 relative aspect-[3/4] rounded-2xl overflow-hidden">
        <Skeleton className="h-full w-full bg-slate-200 dark:bg-slate-800" />
      </CardContent>

      {/* Card Footer Content Skeleton */}
      <CardFooter className="flex flex-col items-start px-1 py-4 gap-2">
        {/* Title Skeleton (matches the bold name & category text) */}
        <Skeleton className="h-6 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800" />

        {/* Price Skeleton */}
        <div className="flex items-center gap-3 w-full">
          {/* Main Price */}
          <Skeleton className="h-6 w-16 rounded-md bg-slate-200 dark:bg-slate-800" />
          {/* Discount Price (Optional/Simulated) */}
          <Skeleton className="h-4 w-12 rounded-md bg-slate-200 dark:bg-slate-800" />
        </div>
      </CardFooter>
    </Card>
  );
}
