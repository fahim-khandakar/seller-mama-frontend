/* eslint-disable @typescript-eslint/no-explicit-any */
export type HeaderWithFilterProps = {
  name: string;
  link?: string;
  btnName?: string;
  btnValues?: { label: string; value: string }[];
  isFilter?: boolean;
  isSearch?: boolean;
  status?: string;
  func?: any;
  funcBtnValue?: string;
  funcSecond?: any;
  funcBtnValueSecond?: string;
  filterOptions?: { label: string; value: any }[];
};
