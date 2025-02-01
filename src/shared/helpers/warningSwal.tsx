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
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              handleSubmit(id);
              closeToast(); // Close toast after confirmation
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Confirm
          </button>
          <button
            onClick={closeToast}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false, // Keep open until user interacts
      closeOnClick: false,
      closeButton: false, // Hide default close button
      draggable: false,
    }
  );
};
