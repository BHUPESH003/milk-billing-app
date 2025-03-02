import { Link } from "react-router-dom";
import { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Bill = {
  id: string;
  customerName: string;
  customerPhone: string;
  month: string;
  year: string;
  amount: number;
  status: "paid" | "unpaid" | "partial";
  dueDate: string;
};

const data: Bill[] = [
  {
    id: "123",
    customerName: "Rahul Sharma",
    customerPhone: "9876543210",
    month: "June",
    year: "2023",
    amount: 1240,
    status: "unpaid",
    dueDate: "2023-07-05",
  },
  {
    id: "124",
    customerName: "Priya Patel",
    customerPhone: "9876543211",
    month: "June",
    year: "2023",
    amount: 980,
    status: "partial",
    dueDate: "2023-07-05",
  },
  {
    id: "125",
    customerName: "Vijay Kumar",
    customerPhone: "9876543212",
    month: "June",
    year: "2023",
    amount: 1560,
    status: "paid",
    dueDate: "2023-07-05",
  },
  {
    id: "126",
    customerName: "Anita Singh",
    customerPhone: "9876543213",
    month: "June",
    year: "2023",
    amount: 1120,
    status: "unpaid",
    dueDate: "2023-07-05",
  },
  {
    id: "127",
    customerName: "Suresh Reddy",
    customerPhone: "9876543214",
    month: "June",
    year: "2023",
    amount: 1300,
    status: "paid",
    dueDate: "2023-07-05",
  },
  {
    id: "128",
    customerName: "Meera Joshi",
    customerPhone: "9876543215",
    month: "June",
    year: "2023",
    amount: 1240,
    status: "paid",
    dueDate: "2023-07-05",
  },
];

export function BillsList() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Bill>[] = [
    {
      accessorKey: "customerName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.getValue("customerName")}</div>
          <div className="text-sm text-muted-foreground">
            {row.original.customerPhone}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "month",
      header: "Month",
      cell: ({ row }) => (
        <div>
          {row.getValue("month")} {row.original.year}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>₹{row.getValue("amount")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div>
            {status === "paid" ? (
              <Badge className="bg-primary">Paid</Badge>
            ) : status === "partial" ? (
              <Badge variant="outline">Partial</Badge>
            ) : (
              <Badge variant="destructive">Unpaid</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      cell: ({ row }) => {
        const date = new Date(row.getValue("dueDate"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const bill = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(bill.id)}
              >
                Copy bill ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`/bills/${bill.id}`}>View bill details</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/payments/record?billId=${bill.id}`}>
                  Record payment
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="#">Send WhatsApp reminder</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {table.getFilteredRowModel().rows.length} of {data.length}{" "}
            bills
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
