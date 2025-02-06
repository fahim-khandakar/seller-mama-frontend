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

const UserList = () => {
  const token = getFromCookie(authKey);
  const [id, setId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useGetUsersQuery({ token });

  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleDelete = async (id?: string) => {
    const result = await deleteUser({ id, token });
    showToast(result);
  };

  const handleModal = (id: string) => {
    setId(id);
    setIsOpen(true);
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
        modalFunction={(id) => handleModal(id)}
      />
      <Modal
        isOpen={isOpen}
        description="Here you can edit user information."
        setIsOpen={setIsOpen}
        header="User Edit"
      >
        <UserEdit id={id} setIsOpen={setIsOpen} />
      </Modal>
    </div>
  );
};

export default UserList;
