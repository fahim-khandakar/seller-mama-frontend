'use client';

import { constructQuery } from '@/shared/helpers/constructQuery';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from '@/redux/features/dashboard/product';
import ErrorShow from '@/components/common/Error Show/ErrorShow';
import HeaderWithFilter from '@/components/common/Header With Filter/HeaderWithFilter';
import CommonTable from '@/components/common/Common Table/CommonTable';
import Pagination from '@/components/common/Pagination/Pagination';
import { headerForProduct, keys, tableLayout } from './config/constants';
import { handleResponse } from '@/shared/helpers/handleResponse';
import { WarningSwal } from '@/shared/helpers/warningSwal';

const ProductList = () => {
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

  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();

  const handleDelete = (id: string) => {
    const result = deleteProduct(id);
    handleResponse(result);
  };
  console.log('Products Data:', productsData);
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
            name="Product List"
            link={'products/create'}
            btnName="Create Product"
            isFilter={false}
            status="category"
          />
        </div>
        <div>
          <div>
            <CommonTable
              dataLayout={tableLayout}
              headerData={headerForProduct}
              itemData={productsData?.data}
              loading={isLoading || isFetching || deleteLoading}
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

export default ProductList;
