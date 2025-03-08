import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./pages/layout";
import Dashboard from "./pages/page";
import CustomersPage from "./pages/customers/page";
import { AddCustomerForm } from "./components/customers/add-customer-form";
import { RecordPaymentForm } from "./components/payments/record-payment-form";
import { GenerateBillForm } from "./components/bills/generate-bill-form";
import SettingsPage from "./pages/settings/page";
import PaymentsPage from "./pages/payments/page";
import BillsPage from "./pages/bills/page";

function App() {
  return (
    <Router>
      <RootLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/customers/add" element={<AddCustomerForm />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/payments/record" element={<RecordPaymentForm />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/bills/generate" element={<GenerateBillForm />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </RootLayout>
    </Router>
  );
}

export default App;
