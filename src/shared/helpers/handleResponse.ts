/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';

export const handleResponse = async <T>(
  promise: Promise<T>,
): Promise<boolean> => {
  try {
    const res: any = await promise;

    const message = res?.data?.message || 'Success';
    if (res?.error?.error?.data?.success || res?.data?.success) {
      toast.success(message);
    } else {
      toast.error(message);
    }

    return true; // ✅ success হলে true
  } catch (err: any) {
    const message =
      err?.data?.message || err?.message || 'Something went wrong';

    toast.error(message);

    return false; // ❌ error হলে false
  }
};
