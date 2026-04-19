export const headerForProduct = [
  'Name',
  'Category',
  'Base Price',
  'Stock',
  'Status',
  'Created Date',
];
export const tableLayout = [
  'item?.name',
  'item?.category',
  'item?.basePrice',
  'item?.totalStock',
  'item?.isActive ? "Active" : "Inactive"',
  'item?.createdAt?.slice(0,10)',
];

export const keys = ['searchTerm'];
