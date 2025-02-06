import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  header: string;
  description?: string; // Optional description
}

const Modal = ({
  setIsOpen,
  isOpen,
  children,
  header,
  description,
}: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="fixed inset-0 flex items-center justify-center z-50">
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto z-10 relative">
          <div className="flex justify-between items-center mb-1">
            <DialogTitle className="text-xl font-semibold">
              {header}
            </DialogTitle>
            <button
              className="cursor-pointer text-gray-500 hover:text-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>
          {description && (
            <DialogDescription className="text-sm text-gray-500 mb-4">
              {description}
            </DialogDescription>
          )}
          <div className="overflow-y-auto max-h-[80vh]">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
