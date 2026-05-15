import { FC } from 'react';
import { modalType } from './config/types';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Modal: FC<modalType> = ({
  setIsOpen,
  isOpen,
  children,
  header = 'Modal Title',
  bgColor = 'background',
  size,
  loading = false,
  description = 'Modal Description',
  className = 'p-5',
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className={`bg-${bgColor} ${size} ${className}`}>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <DialogHeader>
              <VisuallyHidden>
                <DialogTitle className="text-lg font-semibold">
                  {header || 'Dialog Title'}
                </DialogTitle>
              </VisuallyHidden>
              <VisuallyHidden>
                <DialogDescription className="text-sm text-gray-500">
                  {description || 'Dialog Description'}
                </DialogDescription>
              </VisuallyHidden>
            </DialogHeader>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div>
            <DialogHeader className="px-5 pt-5 border-b-2 pb-2">
              <DialogTitle className="text-lg font-semibold">
                {header || 'Dialog Title'}
              </DialogTitle>
              <DialogDescription className="text-xs font-medium text-gray-500">
                {description || 'Dialog Description'}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 overflow-y-auto">{children}</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
