import { BillsList } from "@/components/bills/bills-list";
import { BillsFilter } from "@/components/bills/bills-filter";
import { PageHeader } from "@/components/page-header";

export default function BillsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading="Bills"
        subheading="Manage customer bills and payment status."
        action={{
          label: "Generate Bill",
          href: "/bills/generate",
        }}
      />
      <BillsFilter />
      <BillsList />
    </div>
  );
}
