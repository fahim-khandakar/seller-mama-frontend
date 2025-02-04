import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export const WarningToast = (
  handleSubmit: (id?: string) => void,
  id?: string
) => {
  toast.warn(
    ({ closeToast }) => (
      <div>
        <p>
          Are you sure? Once deleted, you will not be able to recover this file!
        </p>
        <div className="flex justify-between gap-2 mt-2">
          <Button
            onClick={() => {
              handleSubmit(id);
              closeToast();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
            size={"sm"}
          >
            Confirm
          </Button>
          <Button size={"sm"} onClick={closeToast} variant={"default"}>
            Cancel
          </Button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    }
  );
};
