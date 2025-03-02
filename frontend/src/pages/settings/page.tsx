import { SettingsForm } from "@/components/settings/settings-form";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        heading="Settings"
        subheading="Configure your business settings and preferences."
      />
      <div className="mx-auto w-full max-w-3xl">
        <Tabs defaultValue="business">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="exports">Exports</TabsTrigger>
          </TabsList>
          <TabsContent value="business">
            <SettingsForm type="business" />
          </TabsContent>
          <TabsContent value="pricing">
            <SettingsForm type="pricing" />
          </TabsContent>
          <TabsContent value="notifications">
            <SettingsForm type="notifications" />
          </TabsContent>
          <TabsContent value="exports">
            <SettingsForm type="exports" />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
