import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { GenerateBillData, Customer } from "../global";
import { fetchData, postData } from "../utils/apiFunctions";

const GenerateBill = () => {
  const { register, handleSubmit, reset } = useForm<GenerateBillData>();
  const [message, setMessage] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetchData<{ customersList: Customer[] }>(
        "/customers"
      );
      if (response.data !== null) {
        setCustomers(response.data.customersList);
      }
    };
    fetchCustomers();
  }, []);

  const onSubmit = async (data: GenerateBillData) => {
    const formattedData = {
      ...data,
      totalAmount: Number(data.totalAmount), // Convert to number
      totalMilk: Number(data.totalMilk), // Convert to number
    };
    const response = await postData<{ bill: { id: string } }>(
      "/bills",
      formattedData
    );
    if (response.data !== null) {
      setMessage(`✅ Bill Generated! Bill ID: ${response.data.bill.id}`);
      reset();
    } else {
      setMessage(`❌ Error: ${response.error || "Failed to generate bill"}`);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Generate Bill</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Select Customer</Form.Label>
          <Form.Select {...register("customerId")} required>
            <option value="">-- Select Customer --</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Month</Form.Label>
          <Form.Select {...register("month")} required>
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year</Form.Label>
          <Form.Control type="text" {...register("year")} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Milk (Liters)</Form.Label>
          <Form.Control type="number" {...register("totalMilk")} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Amount</Form.Label>
          <Form.Control type="number" {...register("totalAmount")} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Generate Bill
        </Button>
      </Form>
    </Container>
  );
};

export default GenerateBill;
