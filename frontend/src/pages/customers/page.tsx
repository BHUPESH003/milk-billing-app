import { CustomersList } from "@/components/customers/customers-list";
import { PageHeader } from "@/components/page-header";

export default function CustomersPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading="Customers"
        subheading="Manage your customers and their billing details."
        action={{
          label: "Add Customer",
          href: "/customers/add",
        }}
      />
      <CustomersList />
    </div>
  );
}
