'use client';

import { constructQuery } from '@/shared/helpers/constructQuery';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { headerForOrder, keys, tableLayout } from './config/constants';
import { useGetAllOrdersQuery } from '@/redux/features/dashboard/order';
import ErrorShow from '@/components/common/Error Show/ErrorShow';
import HeaderWithFilter from '@/components/common/Header With Filter/HeaderWithFilter';
import CommonTable from '@/components/common/Common Table/CommonTable';
import Pagination from '@/components/common/Pagination/Pagination';

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(50);
  const searchParams = useSearchParams();
  const [id, setId] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const modalQuery = `startDate=${startDate}&endDate=${endDate}`;

  const query = constructQuery({
    searchParams,
    keys,
    page: currentPage,
    limit,
  });
  const {
    data: ordersData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetAllOrdersQuery({ query });
  console.log('orders', ordersData);
  useEffect(() => {
    if (ordersData?.data) {
      setTotalItems(ordersData?.meta?.total);
      setLimit(ordersData?.meta?.limit);
      setCurrentPage(ordersData?.meta?.page);
    }
  }, [ordersData]);

  const handleOpenModal = (id: string) => {
    setId(id);
    setIsOpen(true);
  };

  if (isError) {
    return <ErrorShow error={error} />;
  }
  return (
    <div>
      <div className="shadow-md pt-5 px-5 rounded-md relative">
        <div>
          <HeaderWithFilter
            name="Order List"
            link={'orders/create'}
            btnName="Create Order"
            isFilter={false}
            status="status"
          />
        </div>
        <div>
          <div>
            <CommonTable
              dataLayout={tableLayout}
              headerData={headerForOrder}
              itemData={ordersData?.data}
              loading={isLoading || isFetching}
              editPageLink={'/dashboard/orders'}
              link="/dashboard/orders"
            />
            <div className="absolute bottom-5  left-5 right-5">
              <Pagination
                currentPage={currentPage}
                limit={limit}
                setCurrentPage={setCurrentPage}
                totalItems={totalItems}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
