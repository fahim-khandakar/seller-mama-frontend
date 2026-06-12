/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';

export const handleResponse = (result: any): boolean => {
  const message =
    result?.data?.message || result?.error?.data?.message || 'Success';
  if (
    result?.error?.error?.data?.success ||
    result?.error?.data?.success ||
    result?.data?.success
  ) {
    toast.success(message);
    return true;
  } else {
    toast.error(message);
    return false;
  }
};
