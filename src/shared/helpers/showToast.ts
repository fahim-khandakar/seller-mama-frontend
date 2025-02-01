/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { removeUserInfo } from "./authServices";

export const showToast = (result: any) => {
  console.log("result", result);

  if (result?.data?.success) {
    toast.success(result.data.message);
    return true;
  } else {
    const errorStatus = result?.error?.status;
    const errorMessage =
      result?.error?.data?.message || "Unknown error occurred";

    if (errorStatus === 403 || errorStatus === 401) {
      removeUserInfo();
      toast.error(errorMessage, {
        onClose: () => {
          window.location.href = "/"; // Redirect after toast closes
        },
      });
    } else {
      toast.error(errorMessage);
      return false;
    }
  }
};
