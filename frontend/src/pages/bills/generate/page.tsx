import { GenerateBillForm } from "@/components/bills/generate-bill-form";
import { PageHeader } from "@/components/page-header";

export default function GenerateBillPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading="Generate Bill"
        subheading="Create a new bill for a customer."
        breadcrumbs={[
          { label: "Bills", href: "/bills" },
          { label: "Generate Bill", href: "/bills/generate" },
        ]}
      />
      <div className="mx-auto w-full max-w-2xl">
        <GenerateBillForm />
      </div>
    </div>
  );
}
