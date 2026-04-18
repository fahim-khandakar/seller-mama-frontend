'use client';

import { constructQuery } from '@/shared/helpers/constructQuery';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { headerForUser, keys, tableLayout } from './config/constants';
import { useGetAllUsersQuery } from '@/redux/features/dashboard/user';
import ErrorShow from '@/components/common/Error Show/ErrorShow';
import HeaderWithFilter from '@/components/common/Header With Filter/HeaderWithFilter';
import CommonTable from '@/components/common/Common Table/CommonTable';
import Pagination from '@/components/common/Pagination/Pagination';

const UserList = () => {
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
    data: usersData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useGetAllUsersQuery({ query });

  useEffect(() => {
    if (usersData?.data) {
      setTotalItems(usersData?.meta?.total);
      setLimit(usersData?.meta?.limit);
      setCurrentPage(usersData?.meta?.page);
    }
  }, [usersData]);

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
            name="User List"
            link={'/users/user-create'}
            btnName="Create User"
            isFilter={false}
            status="role"
          />
        </div>
        <div>
          <div>
            <CommonTable
              dataLayout={tableLayout}
              headerData={headerForUser}
              itemData={usersData?.data}
              loading={isLoading || isFetching}
              //   editPageLink={'/users/user-edit'}
              //   link="/users/user-details"
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

export default UserList;
