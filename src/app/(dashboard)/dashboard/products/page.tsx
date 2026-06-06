import LoadingPage from '@/components/common/Loading Page/LoadingPage';
import ProductList from '@/modules/Dashboard Pages/Product/Product List/ProductList';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<LoadingPage fullPage />}>
      <ProductList />
    </Suspense>
  );
}
