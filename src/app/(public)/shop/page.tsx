import ShopPageSkeleton from '@/components/common/Shop Page Skeleton/ShopPageSkeleton';
import ShopByFilterPage from '@/modules/Shop Pages/Shop by Filter/ShipByFilter';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<ShopPageSkeleton />}>
      <ShopByFilterPage />
    </Suspense>
  );
}
