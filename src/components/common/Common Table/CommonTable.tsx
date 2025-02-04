/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useCallback } from "react";
import Link from "next/link";

interface CustomTableProps {
  data: any[];
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  onView?: (id: string | number) => void;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
  topBtnLink?: string;
  topBtnValue?: string;
}

export function CommonTable({
  data,
  showView = true,
  showEdit = true,
  showDelete = true,
  onView,
  onEdit,
  onDelete,
  topBtnValue = "",
  topBtnLink = "",
}: CustomTableProps) {
  // Memoized handlers
  const handleView = useCallback(
    (id: string | number) => () => onView?.(id),
    [onView]
  );
  const handleEdit = useCallback(
    (id: string | number) => () => onEdit?.(id),
    [onEdit]
  );
  const handleDelete = useCallback(
    (id: string | number) => () => onDelete?.(id),
    [onDelete]
  );

  if (!data || data.length === 0) return null;

  // Extract table columns excluding 'id'
  const columns = Object.keys(data[0]).filter((key) => key !== "id");

  return (
    <div className="bg-white p-5 shadow-lg rounded-md">
      <div className="flex justify-between  pb-10">
        <h5>Total Data: {data?.length}</h5>
        {topBtnLink ? (
          <Link href={topBtnLink}>
            <Button>{topBtnValue}</Button>
          </Link>
        ) : (
          topBtnValue && <Button>{topBtnValue}</Button>
        )}
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column} className="capitalize text-center">
                  {column.replace(/_/g, " ")}
                </TableHead>
              ))}
              {(showView || showEdit || showDelete) && (
                <TableHead className="text-center">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column} className="text-center">
                    {renderCell(column, row[column])}
                  </TableCell>
                ))}
                {(showView || showEdit || showDelete) && (
                  <TableCell>
                    <div className="flex justify-center gap-2">
                      {showView && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleView(row.id)}
                          className="h-8 w-8 text-blue-500 hover:text-blue-700"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      {showEdit && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleEdit(row.id)}
                          className="h-8 w-8 text-green-500 hover:text-green-700"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      )}
                      {showDelete && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={handleDelete(row.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function renderCell(column: string, value: any) {
  if (
    typeof value === "string" &&
    (column.toLowerCase().includes("image") ||
      column.toLowerCase().includes("photo") ||
      column.toLowerCase().includes("avatar"))
  ) {
    return (
      <Avatar className="w-8 h-8 mx-auto">
        <AvatarImage src={value} />
        <AvatarFallback>NA</AvatarFallback>
      </Avatar>
    );
  }

  if (column.toLowerCase().includes("status")) {
    return (
      <Badge
        className={
          value === "active"
            ? "bg-green-500"
            : value === "pending"
            ? "bg-yellow-500"
            : "bg-red-500"
        }
      >
        {value}
      </Badge>
    );
  }

  return value;
}
