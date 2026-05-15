/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import Modal from '@/components/common/Modal/Modal';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  useGetSingleOrderQuery,
  useUpdateOrderStatusMutation,
} from '@/redux/features/dashboard/order';

const ORDER_STATUSES = [
  'PENDING',
  'CONFIRMED',
  'IN_PROGRESS',
  'SHIPPED',
  'DELIVERED',
  'CANCELLED',
];

export default function OrderStatusChange({
  isOpen,
  setIsOpen,
  id,
}: {
  id?: string;
  setIsOpen?: any;
  isOpen: boolean;
}) {
  const { data: singleOrder, isLoading: singleLoading } =
    useGetSingleOrderQuery(id as string, { skip: !id });

  const [orderUpdate, { isLoading }] = useUpdateOrderStatusMutation();

  const [selectedStatus, setSelectedStatus] = useState<string>('');

  useEffect(() => {
    if (singleOrder?.data?.status) {
      setSelectedStatus(singleOrder.data.status);
    }
  }, [singleOrder]);

  const handleUpdateStatus = async () => {
    if (!id || !selectedStatus) return;

    try {
      await orderUpdate({
        orderId: id,
        status: selectedStatus,
      }).unwrap();

      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      loading={singleLoading}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      header={`Change status of Order's ${singleOrder?.data?.customerName}`}
      description={`Current Status: ${singleOrder?.data?.status || ''}`}
    >
      <div className="space-y-4">
        <Select
          value={selectedStatus}
          onValueChange={(value) => setSelectedStatus(value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent>
            {ORDER_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status.replaceAll('_', ' ')}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6">
        <Button
          onClick={handleUpdateStatus}
          disabled={!selectedStatus || isLoading}
          className="w-full"
        >
          {isLoading ? 'Updating...' : 'Update Status'}
        </Button>
      </div>
    </Modal>
  );
}
