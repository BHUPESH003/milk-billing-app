import { Button } from "@/components/ui/button";
import { DateRangePicker } from "@/components/date-range-picker";
import { Link } from "react-router-dom";
export function DashboardHeader() {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your milk delivery business
        </p>
      </div>
      <div className="flex items-center gap-2">
        <DateRangePicker />
        <Button asChild>
          <Link to="/bills/generate">Generate Bill</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/payments/record">Record Payment</Link>
        </Button>
      </div>
    </div>
  );
}
