/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { FC } from 'react';
import { CommonTableProps } from './config/types';
import { useRouter } from 'next/navigation';
import LoadingPage from '../Loading Page/LoadingPage';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  handleAllCheckboxChange,
  handleCheckboxChange,
} from './Helpers/handleCheckbox';

import {
  BadgeCheck,
  Image as LucidImage,
  DownloadCloud,
  Eye,
  Edit2,
  Trash2,
  FileText,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { emptyData } from '@/shared/constants';

const CommonTable: FC<CommonTableProps> = ({
  headerData,
  checkedRows,
  setCheckedRows,
  link,
  checkbox,
  productData,
  itemData = [],
  dataLayout,
  btnLink,
  btnValue,
  deleteBtn,
  deleteFn,
  editPageLink,
  modalFunction,
  loading,
  labelDeleteCondition = true,
  labelEditCondition = true,
  labelViewCondition = true,
  deleteBtnCondition = '',
  btnModalFunc,
}) => {
  const navigate = useRouter();

  return (
    <div
      className={`w-full flex flex-col items-center py-8 overflow-y-auto  ${
        itemData?.length && 'pb-20'
      }`}
    >
      <div className="overflow-x-auto w-full bg-componentsBackground rounded-lg">
        {loading ? (
          <LoadingPage />
        ) : itemData?.length > 0 ? (
          <Table className="w-full text-center">
            {/* Header */}
            <TableHeader className="bg-tableHeader text-muted-foreground ">
              <TableRow>
                {checkbox && (
                  <TableHead className="text-center">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 text-blue-600"
                      checked={checkedRows.length === itemData?.length}
                      onChange={() =>
                        handleAllCheckboxChange(
                          checkedRows,
                          setCheckedRows,
                          itemData,
                          productData,
                        )
                      }
                    />
                  </TableHead>
                )}
                {headerData?.map((title: string, index: number) => {
                  if (!labelDeleteCondition && title === 'Delete') return null;
                  if (!labelEditCondition && title === 'Edit') return null;
                  if (!labelViewCondition && title === 'View') return null;
                  return (
                    <TableHead
                      key={index}
                      className="text-center font-semibold"
                    >
                      {title}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>

            {/* Body */}
            <TableBody>
              {itemData.map((item: any, index: number) => (
                <TableRow
                  key={index}
                  className={`hover:bg-tableHeader transition-colors ${
                    link ? 'cursor-pointer' : ''
                  }`}
                  onClick={() => {
                    if (link) {
                      navigate.push(`${link}/${item?.userId || item?._id}`);
                    }
                  }}
                >
                  {checkbox && (
                    <TableCell>
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-600"
                        checked={checkedRows.includes(item?.id || item?._id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCheckboxChange(
                            item?.id || item?._id,
                            checkedRows,
                            setCheckedRows,
                          );
                        }}
                      />
                    </TableCell>
                  )}
                  {dataLayout.map((layout, idx) => (
                    <TableCell
                      key={idx}
                      className={`${
                        item?.status?.name === 'Open' && eval(layout) === 'Open'
                          ? 'text-destructive font-bold'
                          : ''
                      }`}
                    >
                      {layout === 'item?.profileImage' ||
                      layout === 'item?.image' ? (
                        eval(layout) ? (
                          <div className="relative rounded-md h-10 w-10">
                            <Image
                              className="h-full w-full rounded-md object-contain mx-auto"
                              src={eval(layout)}
                              alt="Photo"
                            />
                            {item?.status === '' && (
                              <div className="absolute -top-1 -right-1 bg-white rounded-full p-[2px] shadow-sm">
                                <BadgeCheck />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center relative">
                            <LucidImage />
                            {item?.status === '' && (
                              <div className="absolute -top-1 -right-1 bg-white rounded-full p-[2px] shadow-sm">
                                <BadgeCheck />
                              </div>
                            )}
                          </div>
                        )
                      ) : layout === 'item?.user?.role' ? (
                        <button
                          className={`px-2 py-1 text-xs rounded text-white 
`}
                        >
                          {item?.user?.role?.split('_')?.join(' ')}
                        </button>
                      ) : (
                        eval(layout) || (eval(layout) === 0 ? 0 : emptyData)
                      )}
                    </TableCell>
                  ))}

                  {btnLink && (
                    <TableCell>
                      <Link
                        href={`${btnLink}/${item?._id || item?.id || item?.userId}`}
                        onClick={(e) => e.stopPropagation()} // stop row click
                      >
                        <Button className="!px-2 text-[10px]  h-5">
                          {btnValue}
                        </Button>
                      </Link>
                    </TableCell>
                  )}
                  {btnModalFunc && (
                    <TableCell>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation(); // stop row click
                          btnModalFunc(item?._id || item?.id || item?.userId);
                        }}
                        size={'icon'}
                        variant={'ghost'}
                        className="text-balance"
                      >
                        <DownloadCloud className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                  {deleteBtn && (
                    <TableCell className="flex justify-center items-center my-2">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation(); // stop row click
                          deleteFn(item?._id || item?.id || item?.userId);
                        }}
                        disabled={eval(deleteBtnCondition)}
                        size={'icon'}
                        variant={'ghost'}
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}

                  {link && (
                    <TableCell>
                      <Link
                        className="text-muted-foreground hover:text-primary flex justify-center items-center"
                        href={`${link}/${item?._id || item?.id || item?.userId}`}
                        onClick={(e) => e.stopPropagation()} // stop row click
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </TableCell>
                  )}
                  {editPageLink && (
                    <TableCell>
                      <Link
                        className="text-muted-foreground hover:text-primary flex justify-center items-center my-2"
                        href={`${editPageLink}/${item?._id || item?.id || item?.userId}`}
                        onClick={(e) => e.stopPropagation()} // stop row click
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                    </TableCell>
                  )}
                  {modalFunction && (
                    <TableCell>
                      <Button
                        variant={'ghost'}
                        onClick={(e) => {
                          e.stopPropagation(); // stop row click
                          modalFunction(item?.id);
                        }}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center text-muted-foreground text-lg py-10">
            No data found
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonTable;
