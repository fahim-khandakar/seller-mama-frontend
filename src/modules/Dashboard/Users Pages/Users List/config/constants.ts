export const tableHeader = [
  "Name",
  "Email",
  "Role",
  "Verified",
  "Orders",
  "Created At",
  "Updated At",
  "DELETE",
  "EDIT",
];

export const tableLayout = [
  "item?.name",
  "item?.email",
  "item?.role",
  "item?.isVerified ? 'Yes' : 'No'",
  "item?.orders?.length",
  "item?.createdAt",
  "item?.updatedAt",
];
