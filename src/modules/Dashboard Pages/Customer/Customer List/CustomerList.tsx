'use client';

import { constructQuery } from '@/shared/helpers/constructQuery';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { headerForCustomer, keys, tableLayout } from './config/constants';
import { useGetAllCustomersQuery } from '@/redux/features/dashboard/user';
import ErrorShow from '@/components/common/Error Show/ErrorShow';
import HeaderWithFilter from '@/components/common/Header With Filter/HeaderWithFilter';
import CommonTable from '@/components/common/Common Table/CommonTable';
import Pagination from '@/components/common/Pagination/Pagination';

const CustomerList = () => {
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
    data: customersData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetAllCustomersQuery({ query });
  console.log('customers', customersData);
  useEffect(() => {
    if (customersData?.data) {
      setTotalItems(customersData?.meta?.total);
      setLimit(customersData?.meta?.limit);
      setCurrentPage(customersData?.meta?.page);
    }
  }, [customersData]);

  if (isError) {
    return <ErrorShow error={error} />;
  }
  return (
    <div>
      <div className="shadow-md pt-5 px-5 rounded-md relative">
        <div>
          <HeaderWithFilter
            name="Customer List"
            link={'customers/create'}
            btnName="Create Customer"
            isFilter={false}
            status="role"
          />
        </div>
        <div>
          <div>
            <CommonTable
              dataLayout={tableLayout}
              headerData={headerForCustomer}
              itemData={customersData?.data}
              loading={isLoading || isFetching}
              //   editPageLink={'/customers/customer-edit'}
              //   link="/customers/customer-details"
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

export default CustomerList;
