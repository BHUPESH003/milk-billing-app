import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export function BillDetails({ id }: { id: string }) {
  // In a real app, you would fetch bill data based on ID
  const bill = {
    id,
    customerName: "Rahul Sharma",
    customerPhone: "9876543210",
    customerAddress: "123, Main Street, Delhi",
    month: "June",
    year: "2023",
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    dueDate: "2023-07-05",
    milkRate: 40,
    milkQuantity: 31,
    totalAmount: 1240,
    status: "unpaid",
    items: [
      { date: "2023-06-01", quantity: 1, rate: 40, amount: 40 },
      { date: "2023-06-02", quantity: 1, rate: 40, amount: 40 },
      { date: "2023-06-03", quantity: 1, rate: 40, amount: 40 },
      // ... more items
    ],
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Bill #{bill.id}</CardTitle>
            <CardDescription>
              {bill.month} {bill.year} - {bill.customerName}
            </CardDescription>
          </div>
          <div>
            {bill.status === "paid" ? (
              <Badge className="bg-primary">Paid</Badge>
            ) : bill.status === "partial" ? (
              <Badge variant="outline">Partial</Badge>
            ) : (
              <Badge variant="destructive">Unpaid</Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Customer Details
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm">{bill.customerName}</p>
              <p className="text-sm">{bill.customerPhone}</p>
              <p className="text-sm">{bill.customerAddress}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Bill Details
            </h3>
            <div className="mt-2 space-y-1">
              <p className="text-sm">
                Period: {new Date(bill.startDate).toLocaleDateString()} -{" "}
                {new Date(bill.endDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Due Date: {new Date(bill.dueDate).toLocaleDateString()}
              </p>
              <p className="text-sm">Milk Rate: ₹{bill.milkRate}/liter</p>
            </div>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-3 text-sm font-medium">Bill Summary</h3>
          <div className="rounded-md border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium">Date</th>
                  <th className="px-4 py-2 text-left font-medium">
                    Quantity (L)
                  </th>
                  <th className="px-4 py-2 text-left font-medium">Rate (₹)</th>
                  <th className="px-4 py-2 text-right font-medium">
                    Amount (₹)
                  </th>
                </tr>
              </thead>
              <tbody>
                {bill.items.slice(0, 5).map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.rate}</td>
                    <td className="px-4 py-2 text-right">{item.amount}</td>
                  </tr>
                ))}
                {bill.items.length > 5 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-2 text-center text-muted-foreground"
                    >
                      ... and {bill.items.length - 5} more days
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="border-t bg-muted/50">
                  <td colSpan={3} className="px-4 py-2 text-right font-medium">
                    Total
                  </td>
                  <td className="px-4 py-2 text-right font-medium">
                    ₹{bill.totalAmount}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
