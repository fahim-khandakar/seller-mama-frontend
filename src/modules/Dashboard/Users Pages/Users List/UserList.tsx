"use client";

import CommonTable from "@/components/common/Common Table/CommonTable";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "@/redux/features/users";
import { authKey } from "@/shared/config/constants";
import { getFromCookie } from "@/shared/helpers/localStorage";
import { tableHeader, tableLayout } from "./config/constants";
import { WarningToast } from "@/shared/helpers/warningSwal";
import { showToast } from "@/shared/helpers/showToast";
import { useEffect, useState } from "react";
import Modal from "@/components/common/Modal/Modal";
import UserEdit from "../User Edit/UserEdit";
import UserAddByAdmin from "../User Add by Admin/UserAddByAdmin";
import { constructQuery } from "@/shared/helpers/constructQuery";
import { useSearchParams } from "next/navigation";

const UserList = () => {
  const token = getFromCookie(authKey);
  const [id, setId] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const limit = 10;
  const [totalItems, setTotalItems] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const searchParams = useSearchParams();
  const query = constructQuery({
    searchParams,
    limit,
    page: currentPage,
  });

  const { data, isLoading, isFetching } = useGetUsersQuery({ token, query });
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  useEffect(() => {
    if (data?.success) {
      setTotalItems(data?.meta?.totalItems);
      setCurrentPage(data?.meta?.currentPage);
    }
  }, [data]);
  console.log("query", query);
  console.log("data", data);

  const handleDelete = async (id?: string) => {
    const result = await deleteUser({ id, token });
    showToast(result);
  };

  const handleEditModal = (id: string) => {
    setId(id);
    setEditModalOpen(true);
  };

  const handleAddModal = () => {
    setAddModalOpen(true);
  };

  return (
    <div>
      <CommonTable
        title="Users List"
        loading={isLoading || deleteLoading || isFetching}
        dataLayout={tableLayout}
        headerData={tableHeader}
        itemData={data?.data}
        deleteBtn
        deleteFn={(id) => WarningToast(handleDelete, id)}
        modalFunction={(id) => handleEditModal(id)}
        handleFunCall={handleAddModal}
        modalForEdit
        funBtnValue="Add User"
        pagination
        totalItems={totalItems}
        currentPage={currentPage}
        limit={limit}
        setCurrentPage={setCurrentPage}
        isSearch
      />

      {/* User Edit Modal */}
      <Modal
        isOpen={editModalOpen}
        description="Here you can edit user information."
        setIsOpen={setEditModalOpen}
        header="User Edit"
      >
        <UserEdit id={id} setIsOpen={setEditModalOpen} />
      </Modal>

      {/* User Add Modal */}
      <Modal
        isOpen={addModalOpen}
        description="Here you can add a new user."
        setIsOpen={setAddModalOpen}
        header="User Add"
      >
        <UserAddByAdmin setIsOpen={setAddModalOpen} />
      </Modal>
    </div>
  );
};

export default UserList;
