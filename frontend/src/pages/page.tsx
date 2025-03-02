import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardCards } from "@/components/dashboard/dashboard-cards";
import { RecentBillsTable } from "@/components/dashboard/recent-bills-table";
import { RecentPaymentsTable } from "@/components/dashboard/recent-payments-table";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader />
      <DashboardCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentBillsTable />
        <RecentPaymentsTable />
      </div>
    </div>
  );
}
