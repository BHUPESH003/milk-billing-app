import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type CustomerBillsListProps = {
  id: string;
  showOnlyPaid?: boolean;
};

export function CustomerBillsList({
  id,
  showOnlyPaid = false,
}: CustomerBillsListProps) {
  // In a real app, you would fetch customer bills based on ID and filter accordingly
  const bills = [
    {
      id: "123",
      month: "June",
      year: "2023",
      total: 1240,
      status: "unpaid",
      dueDate: "2023-07-05",
      milkQuantity: 31,
    },
    {
      id: "112",
      month: "May",
      year: "2023",
      total: 1240,
      status: "paid",
      paidDate: "2023-06-03",
      milkQuantity: 31,
    },
    {
      id: "101",
      month: "April",
      year: "2023",
      total: 1200,
      status: "paid",
      paidDate: "2023-05-04",
      milkQuantity: 30,
    },
    {
      id: "89",
      month: "March",
      year: "2023",
      total: 1240,
      status: "paid",
      paidDate: "2023-04-02",
      milkQuantity: 31,
    },
  ].filter((bill) => !showOnlyPaid || bill.status === "paid");

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Month</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell className="font-medium">
                  {bill.month} {bill.year}
                </TableCell>
                <TableCell>{bill.milkQuantity} L</TableCell>
                <TableCell>₹{bill.total}</TableCell>
                <TableCell>
                  {bill.status === "paid" ? (
                    <Badge className="bg-primary">Paid</Badge>
                  ) : bill.status === "partial" ? (
                    <Badge variant="outline">Partial</Badge>
                  ) : (
                    <Badge variant="destructive">Unpaid</Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="ghost" asChild>
                    <Link to={`/bills/${bill.id}`}>View</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {bills.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No bills found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
