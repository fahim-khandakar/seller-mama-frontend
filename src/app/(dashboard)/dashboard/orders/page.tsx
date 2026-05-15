'use client';

import { constructQuery } from '@/shared/helpers/constructQuery';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { headerForOrder, keys, tableLayout } from './config/constants';
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from '@/redux/features/dashboard/order';
import ErrorShow from '@/components/common/Error Show/ErrorShow';
import HeaderWithFilter from '@/components/common/Header With Filter/HeaderWithFilter';
import CommonTable from '@/components/common/Common Table/CommonTable';
import Pagination from '@/components/common/Pagination/Pagination';
import { handleResponse } from '@/shared/helpers/handleResponse';
import { WarningSwal } from '@/shared/helpers/warningSwal';

const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(50);
  const searchParams = useSearchParams();

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
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteOrderMutation();
  useEffect(() => {
    if (ordersData?.data) {
      setTotalItems(ordersData?.meta?.total);
      setLimit(ordersData?.meta?.limit);
      setCurrentPage(ordersData?.meta?.page);
    }
  }, [ordersData]);

  const handleDelete = (id: string) => {
    const result = deleteProduct(id);
    handleResponse(result);
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
              loading={isLoading || isFetching || deleteLoading}
              editPageLink={'/dashboard/orders'}
              link="/dashboard/orders"
              deleteFn={(id: string) => WarningSwal(handleDelete, id)}
              deleteBtn
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
