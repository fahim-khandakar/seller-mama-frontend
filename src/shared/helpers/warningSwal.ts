/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'sonner';

export const WarningSwal = (handleSubmit: any, id?: string) => {
  toast.warning('Are you sure you want to delete this file?', {
    description:
      'Once deleted, you will not be able to recover this imaginary file!',
    action: {
      label: 'Delete',
      onClick: () => handleSubmit(id),
    },
    cancel: {
      label: 'Cancel',
      onClick: () => {},
    },
    duration: 5000,
  });
};
