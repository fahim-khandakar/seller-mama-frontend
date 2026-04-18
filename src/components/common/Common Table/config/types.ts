/* eslint-disable @typescript-eslint/no-explicit-any */
export type CommonTableProps = {
  headerData: string[];
  itemData: any;
  dataLayout: string[];
  link?: string;
  checkbox?: boolean;
  productData?: boolean;
  checkedRows?: any;
  setCheckedRows?: any;
  btnLink?: string;
  btnValue?: string;
  deleteBtn?: boolean;
  deleteFn?: any;
  editPageLink?: string;
  modalFunction?: any;
  loading?: boolean;
  labelDeleteCondition?: boolean;
  labelEditCondition?: boolean;
  deleteBtnCondition?: string;
  labelViewCondition?: boolean;
  btnModalFunc?: any;
};
