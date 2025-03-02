"use client";

import { CardFooter } from "@/components/ui/card";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type SettingsFormProps = {
  type: "business" | "pricing" | "notifications" | "exports";
};

export function SettingsForm({ type }: SettingsFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Business Settings Form
  const businessFormSchema = z.object({
    businessName: z
      .string()
      .min(2, { message: "Business name must be at least 2 characters." }),
    ownerName: z
      .string()
      .min(2, { message: "Owner name must be at least 2 characters." }),
    phone: z.string().min(10, { message: "Phone must be at least 10 digits." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    address: z
      .string()
      .min(5, { message: "Address must be at least 5 characters." }),
    gstNumber: z.string().optional(),
  });

  // Pricing Settings Form
  const pricingFormSchema = z.object({
    milkRate: z.string().min(1, { message: "Please enter the milk rate." }),
    lateFeePercentage: z.string().optional(),
    discountPercentage: z.string().optional(),
    taxPercentage: z.string().optional(),
  });

  // Notification Settings Form
  const notificationsFormSchema = z.object({
    enableWhatsApp: z.boolean(),
    whatsAppNumber: z
      .string()
      .min(10, { message: "WhatsApp number must be at least 10 digits." })
      .optional(),
    sendBillReminders: z.boolean(),
    sendPaymentReceipts: z.boolean(),
    reminderDays: z.string().optional(),
  });

  // Export Settings Form
  const exportsFormSchema = z.object({
    exportFormat: z.string(),
    includeCustomerDetails: z.boolean(),
    includeBillDetails: z.boolean(),
    includePaymentDetails: z.boolean(),
  });

  // Select the appropriate form schema based on the type
  let formSchema: any;
  switch (type) {
    case "business":
      formSchema = businessFormSchema;
      break;
    case "pricing":
      formSchema = pricingFormSchema;
      break;
    case "notifications":
      formSchema = notificationsFormSchema;
      break;
    case "exports":
      formSchema = exportsFormSchema;
      break;
    default:
      formSchema = businessFormSchema;
  }

  // Initialize the form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: getDefaultValues(type),
  });

  // Get default values based on the form type
  function getDefaultValues(type: string) {
    switch (type) {
      case "business":
        return {
          businessName: "Milk Delivery Service",
          ownerName: "Rahul Sharma",
          phone: "9876543210",
          email: "info@milkdelivery.com",
          address: "123, Main Street, Delhi",
          gstNumber: "22AAAAA0000A1Z5",
        };
      case "pricing":
        return {
          milkRate: "40",
          lateFeePercentage: "5",
          discountPercentage: "2",
          taxPercentage: "0",
        };
      case "notifications":
        return {
          enableWhatsApp: true,
          whatsAppNumber: "9876543210",
          sendBillReminders: true,
          sendPaymentReceipts: true,
          reminderDays: "3",
        };
      case "exports":
        return {
          exportFormat: "csv",
          includeCustomerDetails: true,
          includeBillDetails: true,
          includePaymentDetails: true,
        };
      default:
        return {};
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // In a real app, you would make an API call here
      console.log("Form values:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Settings updated successfully", {
        description: `Your ${type} settings have been updated.`,
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Error updating settings", {
        description:
          "There was an error updating your settings. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Render the appropriate form based on the type
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {type === "business" && "Business Settings"}
          {type === "pricing" && "Pricing Settings"}
          {type === "notifications" && "Notification Settings"}
          {type === "exports" && "Export Settings"}
        </CardTitle>
        <CardDescription>
          {type === "business" && "Manage your business information."}
          {type === "pricing" && "Configure pricing and billing settings."}
          {type === "notifications" && "Configure notification preferences."}
          {type === "exports" && "Configure data export settings."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {type === "business" && (
              <>
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ownerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gstNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GST Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Optional: Enter your GST number if applicable.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {type === "pricing" && (
              <>
                <FormField
                  control={form.control}
                  name="milkRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Milk Rate (₹ per liter)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.5" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="lateFeePercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Late Fee (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormDescription>
                          Percentage charged for late payments.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormDescription>
                          Discount for early payments.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="taxPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax (%)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.1" {...field} />
                        </FormControl>
                        <FormDescription>
                          Tax percentage if applicable.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>
            )}

            {type === "notifications" && (
              <>
                <FormField
                  control={form.control}
                  name="enableWhatsApp"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Enable WhatsApp Notifications
                        </FormLabel>
                        <FormDescription>
                          Send bill and payment notifications via WhatsApp.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.watch("enableWhatsApp") && (
                  <FormField
                    control={form.control}
                    name="whatsAppNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          The WhatsApp number to use for sending notifications.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="sendBillReminders"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Send Bill Reminders
                        </FormLabel>
                        <FormDescription>
                          Send reminders for unpaid bills.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="sendPaymentReceipts"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Send Payment Receipts
                        </FormLabel>
                        <FormDescription>
                          Send receipts when payments are recorded.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {form.watch("sendBillReminders") && (
                  <FormField
                    control={form.control}
                    name="reminderDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reminder Days</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormDescription>
                          Number of days before due date to send reminders.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </>
            )}

            {type === "exports" && (
              <>
                <FormField
                  control={form.control}
                  name="exportFormat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Export Format</FormLabel>
                      {/* Select component is missing, needs to be imported and used here */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="includeCustomerDetails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Include Customer Details
                        </FormLabel>
                        <FormDescription>
                          Include customer information in exports.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="includeBillDetails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Include Bill Details
                        </FormLabel>
                        <FormDescription>
                          Include bill information in exports.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="includePaymentDetails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Include Payment Details
                        </FormLabel>
                        <FormDescription>
                          Include payment information in exports.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
