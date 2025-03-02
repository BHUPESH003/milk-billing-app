import { BillDetails } from "@/components/bills/bill-details";
import { BillActions } from "@/components/bills/bill-actions";
import { PageHeader } from "@/components/page-header";

export default function BillDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading="Bill Details"
        subheading="View bill details and manage payment status."
        breadcrumbs={[
          { label: "Bills", href: "/bills" },
          { label: "Bill Details", href: `/bills/${params.id}` },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <BillDetails id={params.id} />
        </div>
        <div className="lg:col-span-1">
          <BillActions id={params.id} />
        </div>
      </div>
    </div>
  );
}
