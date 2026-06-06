import LoadingPage from '@/components/common/Loading Page/LoadingPage';
import AboutPage from '@/modules/About/About';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<LoadingPage fullPage />}>
      <AboutPage />
    </Suspense>
  );
}
