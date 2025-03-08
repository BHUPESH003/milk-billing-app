import { PageHeader } from "@/components/page-header";
import { PaymentsFilter } from "@/components/payments/payments-filter";
import { PaymentsList } from "@/components/payments/payments-list";

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading="Payments"
        subheading="View and manage customer payments."
        action={{
          label: "Record Payment",
          href: "/payments/record",
        }}
      />
      <PaymentsFilter />
      <PaymentsList />
    </div>
  );
}
