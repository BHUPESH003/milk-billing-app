import { useState } from "react";
import { Form, Button, Alert, Container } from "react-bootstrap";
import { CustomerFormData } from "../global";
import { postData } from "../utils/apiFunctions";

const AddCustomerForm = () => {
  const [formData, setFormData] = useState<CustomerFormData>({
    name: "",
    phone: "",
    address: "",
  });

  const [message, setMessage] = useState<{
    type: "success" | "danger";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    try {
      const response = await postData<{ customer: CustomerFormData }>(
        "/customers",
        formData
      );
      if (response.data !== null) {
        setMessage({ type: "success", text: "Customer added successfully!" });
        setFormData({ name: "", phone: "", address: "" });
      }
    } catch (error) {
      setMessage({
        type: "danger",
        text: "Failed to add customer. Try again!",
      });
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add Customer</h2>

      {message && <Alert variant={message.type}>{message.text}</Alert>}

      <Form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            rows={3}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Customer
        </Button>
      </Form>
    </Container>
  );
};

export default AddCustomerForm;
