export const tableHeader = [
  "Name",
  "Email",
  "Role",
  "Verified",
  "Orders",
  "Created At",
  "Updated At",
  "DELETE",
];

export const tableLayout = [
  "item?.name",
  "item?.email",
  "item?.role",
  "item?.isVerified ? 'Yes' : 'No'",
  "item?.orders?.length",
  "new Date(item?.createdAt).toLocaleString()",
  "new Date(item?.updatedAt).toLocaleString()",
];
