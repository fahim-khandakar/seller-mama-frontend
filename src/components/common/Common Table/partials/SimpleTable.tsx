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

interface SimpleTableProps {
  data: { [key: string]: string | number | boolean | null }[];
}

export function SimpleTable({ data }: SimpleTableProps) {
  if (!data || data.length === 0) return null;

  // Get column names from first data item
  const columns = Object.keys(data[0]);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column} className="capitalize">
                {column}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {columns.map((column) => (
                <TableCell key={column}>
                  {renderCell(column, row[column])}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper function to render different types of cells
function renderCell(column: string, value: string | number | boolean | null) {
  // Handle image/photo/avatar fields
  if (
    typeof value === "string" &&
    (column.toLowerCase().includes("image") ||
      column.toLowerCase().includes("photo") ||
      column.toLowerCase().includes("avatar"))
  ) {
    return (
      <Avatar>
        <AvatarImage src={value} />
        <AvatarFallback>NA</AvatarFallback>
      </Avatar>
    );
  }

  // Handle status fields
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

  // Default rendering
  return value;
}
