import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, Send, Edit } from "lucide-react";
import { Link } from "react-router-dom";

export function CustomerActions({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button asChild className="w-full">
          <Link to={`/bills/generate?customerId=${id}`}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Bill
          </Link>
        </Button>
        <Button asChild className="w-full" variant="secondary">
          <Link to={`/payments/record?customerId=${id}`}>
            <CreditCard className="mr-2 h-4 w-4" />
            Record Payment
          </Link>
        </Button>
        <Button asChild className="w-full" variant="outline">
          <Link to="#">
            <Send className="mr-2 h-4 w-4" />
            Send WhatsApp Reminder
          </Link>
        </Button>
        <Button asChild className="w-full" variant="outline">
          <Link to={`/customers/edit/${id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Customer
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
