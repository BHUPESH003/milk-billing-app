import type React from "react";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Sidebar with fixed width */}
          <div className="w-[150px]">
            <AppSidebar />
          </div>

          {/* Main content should take remaining space */}
          <div className="flex-1 flex flex-col">
            <main className="flex-1 p-4 md:p-6">{children}</main>
          </div>
        </div>

        <Toaster position="bottom-right" />
      </SidebarProvider>
    </ThemeProvider>
  );
}
