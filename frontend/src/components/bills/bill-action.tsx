import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Printer, Send, Download } from "lucide-react";
import { Link } from "react-router-dom";

export function BillActions({ id }: { id: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button asChild className="w-full">
          <Link to={`/payments/record?billId=${id}`}>
            <CreditCard className="mr-2 h-4 w-4" />
            Record Payment
          </Link>
        </Button>
        <Button asChild className="w-full" variant="secondary">
          <Link to="#">
            <Send className="mr-2 h-4 w-4" />
            Send to WhatsApp
          </Link>
        </Button>
        <Button asChild className="w-full" variant="outline">
          <Link to="#">
            <Printer className="mr-2 h-4 w-4" />
            Print Bill
          </Link>
        </Button>
        <Button asChild className="w-full" variant="outline">
          <Link to="#">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
