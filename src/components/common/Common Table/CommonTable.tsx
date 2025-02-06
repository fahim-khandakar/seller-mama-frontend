/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import {
  handleAllCheckboxChange,
  handleCheckboxChange,
} from "./helpers/handleCheckbox";
import { emptyData } from "@/shared/config/constants";
import { Box, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import TopOfPage from "../Top of Page/TopOfPage";
import Loading from "../Loading/Loading";
import NoData from "../No Data/NoData";
import PaginationPage from "../Pagination/PaginationPage";

interface CommonTableProps {
  headerData?: string[];
  checkedRows?: (string | number)[];
  setCheckedRows?: React.Dispatch<React.SetStateAction<(string | number)[]>>;
  receipt?: string;
  link?: string;
  checkbox?: boolean;
  productData?: boolean;
  itemData?: any[];
  dataLayout?: string[];
  btnLink?: string;
  btnValue?: string;
  deleteBtn?: boolean;
  deleteFn?: (id: string) => void;
  editPageLink?: string;
  modalFunction?: (id: string) => void;
  loading?: boolean;
  labelDeleteCondition?: boolean;
  labelEditCondition?: boolean;
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  limit?: number;
  totalItems?: number;
  pagination?: boolean;
  title?: string;
  topBtnLink?: string;
  topBtnValue?: string;
  handleFunCall?: () => void;
  funBtnValue?: string;
  isSearch?: boolean;
  labelBadgeLink?: string;
}

const CommonTable: React.FC<CommonTableProps> = ({
  headerData = [],
  checkedRows = [],
  setCheckedRows,
  link,
  checkbox = false,
  productData = false,
  itemData = [],
  dataLayout = [],

  deleteBtn = false,
  deleteFn,
  editPageLink,
  modalFunction,
  loading = false,
  labelDeleteCondition = true,
  labelEditCondition = true,
  currentPage = 1,
  setCurrentPage,
  limit = 10,
  totalItems = 0,
  pagination = false,
  title,
  topBtnLink,
  topBtnValue,
  handleFunCall,
  funBtnValue,
  isSearch,
}) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg min-h-[82vh]">
      <div className="pt-5">
        {(title || isSearch) && (
          <TopOfPage
            funBtnValue={funBtnValue}
            handleFunCall={handleFunCall}
            btnValue={topBtnValue}
            link={topBtnLink}
            pageName={title}
            isSearch={isSearch}
          />
        )}
      </div>
      <div
        className={`w-full flex flex-col items-center py-8 ${
          itemData.length && "pb-20"
        }`}
      >
        <div className="overflow-x-auto w-full">
          {loading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Loading />
            </div>
          ) : itemData.length > 0 ? (
            <table className="table-auto w-full text-center border-collapse">
              <thead className="bg-gray-100 text-gray-700 text-xs">
                <tr>
                  {checkbox && (
                    <th className="p-3">
                      <Checkbox
                        checked={checkedRows.length === itemData.length}
                        onCheckedChange={() =>
                          handleAllCheckboxChange(
                            checkedRows,
                            setCheckedRows,
                            itemData,
                            productData
                          )
                        }
                      />
                    </th>
                  )}
                  {headerData.map((title, index) =>
                    (!labelDeleteCondition && title === "Delete") ||
                    (!labelEditCondition && title === "Edit") ? null : (
                      <th key={index} className="p-3 font-semibold">
                        {title}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="text-gray-800 text-xs">
                {itemData.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    {checkbox && (
                      <td className="p-3">
                        <Checkbox
                          checked={checkedRows.includes(
                            item?._id || item?.name || item?.productId
                          )}
                          onCheckedChange={() =>
                            handleCheckboxChange(
                              item?._id || item?.name || item?.productId,
                              checkedRows,
                              setCheckedRows
                            )
                          }
                        />
                      </td>
                    )}
                    {dataLayout.map((layout, idx) => (
                      <td key={idx} className="p-3">
                        {layout.includes("item") && link ? (
                          <Link
                            className="hover:underline"
                            href={`${link}/${item?.id || item?._id}`}
                          >
                            {eval(layout)}
                          </Link>
                        ) : (
                          eval(layout) || (eval(layout) === 0 ? 0 : emptyData)
                        )}
                      </td>
                    ))}
                    {deleteBtn && deleteFn && (
                      <td className="p-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteFn(item?._id)}
                        >
                          <Trash className="text-red-500 hover:text-red-700" />
                        </Button>
                      </td>
                    )}
                    {modalFunction && (
                      <td className="p-3">
                        <Button onClick={() => modalFunction(item?._id)}>
                          <Box />
                        </Button>
                      </td>
                    )}
                    {editPageLink && (
                      <td className="p-3">
                        <Link
                          href={`${editPageLink}/${item?._id}`}
                          className="text-gray-600 hover:text-blue-500"
                        >
                          <Edit />
                        </Link>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="w-[550px] mx-auto">
              <NoData />
            </div>
          )}
        </div>
      </div>
      {pagination && setCurrentPage && (
        <div className="absolute right-5 bottom-5">
          <PaginationPage
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
            totalItems={totalItems}
          />
        </div>
      )}
    </div>
  );
};

export default CommonTable;
