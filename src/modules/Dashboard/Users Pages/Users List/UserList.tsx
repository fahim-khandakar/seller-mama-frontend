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
import { useState } from "react";
import Modal from "@/components/common/Modal/Modal";
import UserEdit from "../User Edit/UserEdit";
import UserAddByAdmin from "../User Add by Admin/UserAddByAdmin";

const UserList = () => {
  const token = getFromCookie(authKey);
  const [id, setId] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { data, isLoading } = useGetUsersQuery({ token });
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

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
        loading={isLoading || deleteLoading}
        dataLayout={tableLayout}
        headerData={tableHeader}
        itemData={data?.data}
        deleteBtn
        deleteFn={(id) => WarningToast(handleDelete, id)}
        modalFunction={(id) => handleEditModal(id)}
        handleFunCall={handleAddModal}
        funBtnValue="Add User"
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
