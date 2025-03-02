import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  Home,
  Users,
  FileText,
  CreditCard,
  Settings,
  Milk,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";

export function AppSidebar() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <Milk className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold">Milk Billing</span>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/"}>
              <Link to="/">
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname?.startsWith("/customers")}
            >
              <Link to="/customers">
                <Users className="h-4 w-4" />
                <span>Customers</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname?.startsWith("/bills")}
            >
              <Link to="/bills">
                <FileText className="h-4 w-4" />
                <span>Bills</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname?.startsWith("/payments")}
            >
              <Link to="/payments">
                <CreditCard className="h-4 w-4" />
                <span>Payments</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname?.startsWith("/reports")}
            >
              <Link to="/reports">
                <BarChart3 className="h-4 w-4" />
                <span>Reports</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname?.startsWith("/settings")}
            >
              <Link to="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter className="flex justify-between p-4">
        <p className="text-xs text-muted-foreground">Milk Billing v1.0</p>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
