import { Link } from "react-router-dom";
import { useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  totalBills: number;
  pendingBills: number;
  lastPaymentDate: string;
};

const data: Customer[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    phone: "9876543210",
    address: "123, Main Street, Delhi",
    totalBills: 12,
    pendingBills: 1,
    lastPaymentDate: "2023-06-15",
  },
  {
    id: "2",
    name: "Priya Patel",
    phone: "9876543211",
    address: "456, Park Avenue, Mumbai",
    totalBills: 10,
    pendingBills: 1,
    lastPaymentDate: "2023-06-13",
  },
  {
    id: "3",
    name: "Vijay Kumar",
    phone: "9876543212",
    address: "789, Lake View, Bangalore",
    totalBills: 8,
    pendingBills: 0,
    lastPaymentDate: "2023-06-15",
  },
  {
    id: "4",
    name: "Anita Singh",
    phone: "9876543213",
    address: "101, Hill Road, Chennai",
    totalBills: 15,
    pendingBills: 1,
    lastPaymentDate: "2023-06-10",
  },
  {
    id: "5",
    name: "Suresh Reddy",
    phone: "9876543214",
    address: "202, Beach Road, Kolkata",
    totalBills: 7,
    pendingBills: 0,
    lastPaymentDate: "2023-06-14",
  },
  {
    id: "6",
    name: "Meera Joshi",
    phone: "9876543215",
    address: "303, River View, Hyderabad",
    totalBills: 9,
    pendingBills: 0,
    lastPaymentDate: "2023-06-14",
  },
];

export function CustomersList() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div>
          <Link
            to={`/customers/${row.original.id}`}
            className="font-medium hover:underline"
          >
            {row.getValue("name")}
          </Link>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "totalBills",
      header: "Total Bills",
    },
    {
      accessorKey: "pendingBills",
      header: "Pending Bills",
      cell: ({ row }) => {
        const pendingBills = row.getValue("pendingBills") as number;
        return (
          <div>
            {pendingBills > 0 ? (
              <Badge variant="destructive">{pendingBills}</Badge>
            ) : (
              <Badge variant="outline">0</Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "lastPaymentDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Payment
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("lastPaymentDate"));
        return <div>{date.toLocaleDateString()}</div>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const customer = row.original;

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
                onClick={() => navigator.clipboard.writeText(customer.id)}
              >
                Copy customer ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={`/customers/${customer.id}`}>View customer</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/bills/generate?customerId=${customer.id}`}>
                  Generate bill
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={`/payments/record?customerId=${customer.id}`}>
                  Record payment
                </Link>
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
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customers</CardTitle>
        <CardDescription>Manage your milk delivery customers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter customers..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
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
            customers
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
