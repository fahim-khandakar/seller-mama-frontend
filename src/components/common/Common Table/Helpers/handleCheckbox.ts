/* eslint-disable @typescript-eslint/no-explicit-any */
export const handleCheckboxChange = (
  index: string,
  checkedRows: string[],
  setCheckedRows: any,
) => {
  if (checkedRows && checkedRows?.includes(index)) {
    setCheckedRows(checkedRows.filter((item) => item !== index));
  } else {
    setCheckedRows([...checkedRows, index]);
  }
};
export const handleAllCheckboxChange = (
  checkedRows: string[],
  setCheckedRows: any,
  items: any,
  productData: any,
) => {
  if (checkedRows.length === items?.length) {
    setCheckedRows([]);
  } else {
    const allIds = !productData
      ? items
          ?.map((item: any) => item?.id || item?._id)
          .filter((id: string) => id !== undefined) || []
      : items
          ?.map(
            (item: any) =>
              item?.repair[item?.repair?.length - 1]?.id || item?._id,
          )
          .filter((id: string) => id !== undefined) || [];
    if (allIds.length > 0) {
      setCheckedRows(allIds as string[]);
    }
  }
};
