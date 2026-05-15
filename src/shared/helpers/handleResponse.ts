/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';

export const handleResponse = async <T>(
  promise: Promise<T>,
): Promise<boolean> => {
  try {
    const res: any = await promise;

    const message = res?.message || 'Success';

    toast.success(message);

    return true; // ✅ success হলে true
  } catch (err: any) {
    console.log(err);
    const message =
      err?.data?.message || err?.message || 'Something went wrong';

    toast.error(message);

    return false; // ❌ error হলে false
  }
};
