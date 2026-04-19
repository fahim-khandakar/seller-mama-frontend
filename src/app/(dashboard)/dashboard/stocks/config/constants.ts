export const headerForStock = [
  'Product Name',
  'Category',
  'Current Stock',
  'Status',
  'Last Updated',
];
export const tableLayout = [
  'item?.name',
  'item?.category',
  'item?.totalStock',
  'item?.isActive ? "Active" : "Inactive"',
  'item?.updatedAt?.slice(0,10)',
];

export const keys = ['searchTerm'];
