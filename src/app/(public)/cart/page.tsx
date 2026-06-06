import LoadingPage from '@/components/common/Loading Page/LoadingPage';
import CartPage from '@/modules/Cart List/CartListPage';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<LoadingPage fullPage />}>
      <CartPage />
    </Suspense>
  );
}
