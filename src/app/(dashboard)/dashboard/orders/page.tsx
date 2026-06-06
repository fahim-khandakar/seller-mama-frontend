import LoadingPage from '@/components/common/Loading Page/LoadingPage';
import OrderList from '@/modules/Dashboard Pages/Order/Order List/OrderList';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<LoadingPage fullPage />}>
      <OrderList />
    </Suspense>
  );
}
