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

const UserList = () => {
  const token = getFromCookie(authKey);
  const { data, isLoading } = useGetUsersQuery({ token });
  const [deleteUser, { isLoading: deleteLoading }] = useDeleteUserMutation();

  const handleDelete = async (id?: string) => {
    const result = await deleteUser({ id, token });
    showToast(result);
  };
  return (
    <div>
      <CommonTable
        loading={isLoading || deleteLoading}
        dataLayout={tableLayout}
        headerData={tableHeader}
        itemData={data?.data}
        deleteBtn
        deleteFn={(id) => WarningToast(handleDelete, id)}
      />
    </div>
  );
};

export default UserList;
