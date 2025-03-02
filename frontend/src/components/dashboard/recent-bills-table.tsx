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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function RecentBillsTable() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Bills</CardTitle>
          <CardDescription>
            Recent bills generated for customers
          </CardDescription>
        </div>
        <Button asChild variant="ghost" size="sm">
          <Link to="/bills">View all</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Rahul Sharma</TableCell>
              <TableCell>June 2023</TableCell>
              <TableCell>₹1,240</TableCell>
              <TableCell>
                <Badge variant="destructive">Unpaid</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/bills/123">View</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Priya Patel</TableCell>
              <TableCell>June 2023</TableCell>
              <TableCell>₹980</TableCell>
              <TableCell>
                <Badge variant="outline">Partial</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/bills/124">View</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Vijay Kumar</TableCell>
              <TableCell>June 2023</TableCell>
              <TableCell>₹1,560</TableCell>
              <TableCell>
                <Badge className="bg-primary">Paid</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/bills/125">View</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Anita Singh</TableCell>
              <TableCell>June 2023</TableCell>
              <TableCell>₹1,120</TableCell>
              <TableCell>
                <Badge variant="destructive">Unpaid</Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link to="/bills/126">View</Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
