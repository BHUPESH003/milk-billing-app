import { useEffect, useState } from "react";
import { fetchData, postData } from "../utils/apiFunctions";
import { Customer, CustomerBill, PaymentData } from "../global";
import {
  Form,
  Alert,
  Spinner,
  Container,
  Row,
  Col,
  Card,
  Button,
} from "react-bootstrap";

const AddPayment = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [bill, setBill] = useState<CustomerBill | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState(""); // Amount entered by the user
  const [submitting, setSubmitting] = useState(false); // Track form submission

  // Hardcoded months and years
  const months = [
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
  ];
  const years = ["2023", "2024", "2025"];

  // Fetch customers on component mount
  useEffect(() => {
    fetchData<{ customersList: Customer[] }>("/customers")
      .then((res) => {
        if (res.data !== null) {
          setCustomers(res.data.customersList);
        }
      })
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  // Fetch bill when all selections are made
  useEffect(() => {
    if (selectedCustomer && selectedMonth && selectedYear) {
      fetchBill(selectedCustomer, selectedMonth, selectedYear);
    }
  }, [selectedCustomer, selectedMonth, selectedYear]);

  const fetchBill = async (customerId: string, month: string, year: string) => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetchData<{ bill: CustomerBill }>(
        `/public/bills/${customerId}/${month}/${year}`
      );
      if (response.data !== null) {
        setBill(response.data.bill);
      } else {
        setBill(null);
        setMessage("No bill found for this selection.");
      }
    } catch (error) {
      console.error("Error fetching bill:", error);
      setBill(null);
      setMessage("Error fetching bill. Please try again later.");
    }
    setLoading(false);
  };
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bill) {
      setMessage("⚠️ Please fetch the bill before adding payment.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setMessage("⚠️ Enter a valid payment amount.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const paymentData: PaymentData = {
      billId: bill.id,
      amount: Number(amount),
    };

    try {
      const response = await postData<{ payment: { id: string } }>(
        "/payments",
        paymentData
      );

      if (response.data !== null) {
        setMessage(`✅ Payment Added! Payment ID: ${response.data.payment.id}`);
        setAmount(""); // Reset the input field
        fetchBill(selectedCustomer, selectedMonth, selectedYear); // Refresh bill data
      } else {
        setMessage(`❌ Error: ${response.error || "Failed to add payment"}`);
      }
    } catch (error) {
      setMessage("❌ Error processing payment. Please try again.");
    }

    setSubmitting(false);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h2 className="text-center mb-3">Add Payment</h2>
        <Form>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Customer</Form.Label>
                <Form.Select
                  value={selectedCustomer}
                  onChange={(e) => setSelectedCustomer(e.target.value)}
                >
                  <option value="">Select Customer</option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Month</Form.Label>
                <Form.Select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Year</Form.Label>
                <Form.Select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          {loading && (
            <div className="text-center mt-3">
              <Spinner animation="border" variant="primary" />
            </div>
          )}

          {message && (
            <Alert variant="info" className="mt-3">
              {message}
            </Alert>
          )}

          {bill && (
            <Card className="mt-3 p-3 shadow-sm">
              <h3>Bill Details</h3>
              <p>
                <strong>Customer ID:</strong> {bill.customerId}
              </p>
              <p>
                <strong>Month:</strong> {bill.month}
              </p>
              <p>
                <strong>Year:</strong> {bill.year}
              </p>
              <p>
                <strong>Total Amount:</strong> ₹{bill.totalAmount}
              </p>
              <p>
                <strong>Pending Amount:</strong> ₹
                {Number(bill.totalAmount) - Number(bill.totalPaid)}
              </p>
              <p>
                <strong>Status:</strong> {bill.status}
              </p>
            </Card>
          )}

          {bill && (
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Enter Payment Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
          )}

          {bill && (
            <Button
              variant="success"
              type="submit"
              onClick={handlePaymentSubmit}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Spinner size="sm" animation="border" /> Processing...
                </>
              ) : (
                "Add Payment"
              )}
            </Button>
          )}
        </Form>
      </Card>
    </Container>
  );
};

export default AddPayment;
