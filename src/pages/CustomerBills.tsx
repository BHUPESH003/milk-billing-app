import { useEffect, useState } from "react";
import { fetchData } from "../utils/apiFunctions";
import { Table, Container, Spinner, Alert, Card } from "react-bootstrap";

interface Bill {
  customerId: string;
  customerName: string;
  month: number;
  year: number;
  totalAmount: number;
  totalPaid: number;
  status: string;
  pendingAmount: number;
}

const CustomerBills = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetchData<{ customers: Bill[] }>(
        "/customers/bills"
      );
      if (response.data) {
        setBills(response.data.customers);
      } else {
        setError("No bills found.");
      }
    } catch (err) {
      setError("Failed to fetch bills. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <Container className="mt-4">
      <Card className="p-4 shadow-sm">
        <h2 className="text-center mb-3">Customer Bills</h2>
        {loading && (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        {!loading && !error && (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Month</th>
                <th>Year</th>
                <th>Total Amount (₹)</th>
                <th>Paid Amount (₹)</th>
                <th>Pending Amount (₹)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={`${bill.customerId}-${bill.month}-${bill.year}`}>
                  <td>{bill.customerName}</td>
                  <td>{bill.month}</td>
                  <td>{bill.year}</td>
                  <td>{bill.totalAmount}</td>
                  <td>{bill.totalPaid}</td>
                  <td>{bill.pendingAmount}</td>
                  <td>{bill.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>
    </Container>
  );
};

export default CustomerBills;
