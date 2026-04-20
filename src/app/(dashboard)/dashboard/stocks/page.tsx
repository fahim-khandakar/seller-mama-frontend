'use client';

import { constructQuery } from '@/shared/helpers/constructQuery';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useGetAllProductsQuery } from '@/redux/features/dashboard/product';
import ErrorShow from '@/components/common/Error Show/ErrorShow';
import HeaderWithFilter from '@/components/common/Header With Filter/HeaderWithFilter';
import CommonTable from '@/components/common/Common Table/CommonTable';
import Pagination from '@/components/common/Pagination/Pagination';
import { headerForStock, keys, tableLayout } from './config/constants';

const StockList = () => {
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
    data: productsData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetAllProductsQuery({ query });

  useEffect(() => {
    if (productsData?.data) {
      setTotalItems(productsData?.meta?.total);
      setLimit(productsData?.meta?.limit);
      setCurrentPage(productsData?.meta?.page);
    }
  }, [productsData]);

  if (isError) {
    return <ErrorShow error={error} />;
  }
  return (
    <div>
      <div className="shadow-md pt-5 px-5 rounded-md relative">
        <div>
          <HeaderWithFilter
            name="Stock Management"
            link={'stocks/update'}
            btnName="Update Stock"
            isFilter={false}
            status="category"
          />
        </div>
        <div>
          <div>
            <CommonTable
              dataLayout={tableLayout}
              headerData={headerForStock}
              itemData={productsData?.data}
              loading={isLoading || isFetching}
              editPageLink={'/dashboard/stocks'}
              link="/dashboard/stocks"
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

export default StockList;
