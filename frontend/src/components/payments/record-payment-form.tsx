import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const formSchema = z.object({
  customerId: z.string().min(1, { message: "Please select a customer." }),
  billId: z.string().optional(),
  amount: z.string().min(1, { message: "Please enter the payment amount." }),
  paymentDate: z.date(),
  paymentMethod: z
    .string()
    .min(1, { message: "Please select a payment method." }),
  notes: z.string().optional(),
});

export function RecordPaymentForm() {
  const navigate = useNavigate();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [customers, setCustomers] = useState([
    { id: "1", name: "Rahul Sharma" },
    { id: "2", name: "Priya Patel" },
    { id: "3", name: "Vijay Kumar" },
    { id: "4", name: "Anita Singh" },
    { id: "5", name: "Suresh Reddy" },
  ]);
  const [bills, setBills] = useState([
    { id: "123", month: "June", year: "2023", amount: 1240, customerId: "1" },
    { id: "124", month: "June", year: "2023", amount: 980, customerId: "2" },
    { id: "125", month: "June", year: "2023", amount: 1560, customerId: "3" },
    { id: "126", month: "June", year: "2023", amount: 1120, customerId: "4" },
    { id: "127", month: "June", year: "2023", amount: 1300, customerId: "5" },
  ]);
  const [filteredBills, setFilteredBills] = useState(bills);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerId: searchParams[0].get("customerId") || "",
      billId: searchParams[0].get("billId") || "",
      amount: "",
      paymentDate: new Date(),
      paymentMethod: "",
      notes: "",
    },
  });

  // useEffect(() => {
  //   const customerId = form.watch("customerId"); // Use watch directly inside effect
  //   if (!customerId) {
  //     setFilteredBills([]);
  //     return;
  //   }

  //   const customerBills = bills.filter(
  //     (bill) => bill.customerId === customerId
  //   );
  //   setFilteredBills(customerBills);

  //   const billIdFromUrl = searchParams[0].get("billId");
  //   if (
  //     billIdFromUrl &&
  //     customerBills.some((bill) => bill.id === billIdFromUrl)
  //   ) {
  //     form.setValue("billId", billIdFromUrl, { shouldDirty: true });
  //     const selectedBill = customerBills.find(
  //       (bill) => bill.id === billIdFromUrl
  //     );
  //     if (selectedBill) {
  //       form.setValue("amount", selectedBill.amount.toString(), {
  //         shouldDirty: true,
  //       });
  //     }
  //   } else if (customerBills.length > 0) {
  //     form.setValue("billId", customerBills[0].id, { shouldDirty: true });
  //     form.setValue("amount", customerBills[0].amount.toString(), {
  //       shouldDirty: true,
  //     });
  //   }
  // }, [bills, searchParams, form.watch("customerId")]); // Removed `form.getValues` & `form.setValue`

  // // Update amount when bill changes
  // useEffect(() => {
  //   const billId = form.watch("billId");
  //   if (!billId) return;

  //   const selectedBill = bills.find((bill) => bill.id === billId);
  //   if (selectedBill) {
  //     form.setValue("amount", selectedBill.amount.toString(), {
  //       shouldDirty: true,
  //     });
  //   }
  // }, [bills, form.watch("billId")]); // Removed `form.getValues`

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      // In a real app, you would make an API call here
      console.log("Form values:", values);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Payment recorded successfully", {
        description: `Payment of ₹${values.amount} for ${
          customers.find((c) => c.id === values.customerId)?.name
        } has been recorded.`,
      });

      navigate("/payments");
    } catch (error) {
      console.error("Error recording payment:", error);
      toast.error("Error recording payment", {
        description:
          "There was an error recording the payment. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Payment</CardTitle>
        <CardDescription>Record a new payment from a customer.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a customer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bill</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a bill" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {filteredBills.map((bill) => (
                        <SelectItem key={bill.id} value={bill.id}>
                          {bill.month} {bill.year} - ₹{bill.amount}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the bill for which payment is being made.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="UPI">UPI</SelectItem>
                        <SelectItem value="Bank Transfer">
                          Bank Transfer
                        </SelectItem>
                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                        <SelectItem value="Cheque">Cheque</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="paymentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Payment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Any additional notes about the payment"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Recording..." : "Record Payment"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
