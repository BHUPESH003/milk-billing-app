import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Phone, MapPin } from "lucide-react";

export function CustomerDetails({ id }: { id: string }) {
  // In a real app, you would fetch customer data based on ID
  const customer = {
    id,
    name: "Rahul Sharma",
    phone: "9876543210",
    address: "123, Main Street, Delhi",
    totalBills: 12,
    pendingBills: 1,
    lastPaymentDate: "2023-06-15",
    averageMonthlyConsumption: "2.5 liters",
    customerSince: "January 2022",
    preferredPaymentMethod: "UPI",
    notes: "Prefers morning delivery before 7 AM",
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
        <CardDescription>View detailed customer information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Name</p>
            <p className="font-medium">{customer.name}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{customer.phone}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-medium">{customer.address}</p>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-sm text-muted-foreground mb-2">Customer Details</p>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <p className="text-xs text-muted-foreground">Since</p>
              <p className="text-sm">{customer.customerSince}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg. Consumption</p>
              <p className="text-sm">{customer.averageMonthlyConsumption}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Payment Method</p>
              <p className="text-sm">{customer.preferredPaymentMethod}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Bills</p>
              <p className="text-sm">{customer.totalBills}</p>
            </div>
          </div>
        </div>

        {customer.notes && (
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">Notes</p>
            <p className="text-sm mt-1 p-2 bg-muted rounded-md">
              {customer.notes}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
