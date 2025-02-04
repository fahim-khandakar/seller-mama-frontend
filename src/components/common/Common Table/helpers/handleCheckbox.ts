/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleCheckboxChange = (
  index: string | number,
  checkedRows: (string | number)[],
  setCheckedRows?: React.Dispatch<React.SetStateAction<(string | number)[]>>
) => {
  if (checkedRows.includes(index)) {
    setCheckedRows?.(checkedRows.filter((item) => item !== index));
  } else {
    setCheckedRows?.([...checkedRows, index]);
  }
};

export const handleAllCheckboxChange = (
  checkedRows?: (string | number)[],
  setCheckedRows?: React.Dispatch<React.SetStateAction<(string | number)[]>>,
  items?: {
    id?: string | number;
    name?: string;
    productId?: string | number;
  }[],
  productData?: boolean
) => {
  if (checkedRows?.length === items?.length) {
    setCheckedRows?.([]);
  } else {
    const allIds = !productData
      ? items
          ?.map((item: any) => item.id ?? item.name ?? item.productId)
          .filter((id): id is string | number => id !== undefined)
      : items
          ?.map((item) => item.id ?? item.name)
          .filter((id): id is string | number => id !== undefined);

    if ((allIds ?? []).length > 0) {
      if (allIds) {
        setCheckedRows?.(allIds);
      }
    }
  }
};
