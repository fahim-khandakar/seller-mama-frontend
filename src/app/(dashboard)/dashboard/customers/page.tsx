import LoadingPage from '@/components/common/Loading Page/LoadingPage';
import CustomerList from '@/modules/Dashboard Pages/Customer/Customer List/CustomerList';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<LoadingPage fullPage />}>
      <CustomerList />
    </Suspense>
  );
}
