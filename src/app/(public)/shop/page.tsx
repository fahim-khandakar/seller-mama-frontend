import LoadingPage from '@/components/common/Loading Page/LoadingPage';
import ShopByFilterPage from '@/modules/Shop Pages/Shop by Filter/ShipByFilter';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<LoadingPage fullPage />}>
      <ShopByFilterPage />
    </Suspense>
  );
}
