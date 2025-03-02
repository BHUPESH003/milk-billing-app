import { AddCustomerForm } from "@/components/customers/add-customer-form";
import { PageHeader } from "@/components/page-header";

export default function AddCustomerPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading="Add Customer"
        subheading="Add a new customer to your system."
        breadcrumbs={[
          { label: "Customers", href: "/customers" },
          { label: "Add Customer", href: "/customers/add" },
        ]}
      />
      <div className="mx-auto w-full max-w-2xl">
        <AddCustomerForm />
      </div>
    </div>
  );
}
