import { Dispatch, SetStateAction } from 'react';

export type PaginationProps = {
  currentPage?: number;
  totalItems?: number;
  limit?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
};
