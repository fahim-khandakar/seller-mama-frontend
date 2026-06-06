import LoadingPage from '@/components/common/Loading Page/LoadingPage';
import UserList from '@/modules/Dashboard Pages/User/User List/UserList';
import { Suspense } from 'react';

export default function page() {
  return (
    <Suspense fallback={<LoadingPage fullPage />}>
      <UserList />
    </Suspense>
  );
}
