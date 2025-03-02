import { CustomerDetails } from "@/components/customers/customer-details";
import { CustomerActions } from "@/components/customers/customer-actions";
import { CustomerBillsList } from "@/components/customers/customer-bills-list";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CustomerDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading="Customer Details"
        subheading="View and manage customer information."
        breadcrumbs={[
          { label: "Customers", href: "/customers" },
          { label: "Customer Details", href: `/customers/${params.id}` },
        ]}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <CustomerDetails id={params.id} />
          <CustomerActions id={params.id} />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="bills">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bills">Bills</TabsTrigger>
              <TabsTrigger value="payment-history">Payment History</TabsTrigger>
            </TabsList>
            <TabsContent value="bills">
              <CustomerBillsList id={params.id} />
            </TabsContent>
            <TabsContent value="payment-history">
              <CustomerBillsList id={params.id} showOnlyPaid={true} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
