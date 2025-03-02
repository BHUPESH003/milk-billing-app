import { RecordPaymentForm } from "@/components/payments/record-payment-form";
import { PageHeader } from "@/components/page-header";

export default function RecordPaymentPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading="Record Payment"
        subheading="Register a new payment from a customer."
        breadcrumbs={[
          { label: "Payments", href: "/payments" },
          { label: "Record Payment", href: "/payments/record" },
        ]}
      />
      <div className="mx-auto w-full max-w-2xl">
        <RecordPaymentForm />
      </div>
    </div>
  );
}
