import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export function RecentPaymentsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>
            Recent payments collected from customers
          </CardDescription>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link to="/payments">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Vijay Kumar</TableCell>
              <TableCell>June 15, 2023</TableCell>
              <TableCell>₹1,560</TableCell>
              <TableCell>UPI</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/payments/125">View</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Meera Joshi</TableCell>
              <TableCell>June 14, 2023</TableCell>
              <TableCell>₹1,250</TableCell>
              <TableCell>Cash</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/payments/124">View</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Suresh Reddy</TableCell>
              <TableCell>June 14, 2023</TableCell>
              <TableCell>₹990</TableCell>
              <TableCell>Bank Transfer</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/payments/123">View</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Priya Patel</TableCell>
              <TableCell>June 13, 2023</TableCell>
              <TableCell>₹500</TableCell>
              <TableCell>UPI</TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/payments/122">View</Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
