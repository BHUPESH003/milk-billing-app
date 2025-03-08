export type LoginResponse = {
  success: boolean;
  token: string;
};

export type CustomerFormData = {
  name: string;
  phone?: string;
  address?: string;
};

export type BillData = {
  customerId: string;
  amount: number;
  description: string;
};

export type PaymentData = {
  billId: string;
  amount: number;
};

export type Bill = {
  customerId: string;
  customerName: string;
  month: string;
  year: string;
  totalAmount: number;
  totalPaid: number;
  pendingAmount: number;
  status: string;
};

export type Customer = {
  id: string;
  name: string;
};

export type GenerateBillData = {
  customerId: string;
  month: string;
  year: string;
  totalAmount: number;
  totalMilk: number;
};

type CustomerBill = {
  id: string;
  customerId: string;
  month: string;
  year: string;
  totalMilk: number;
  totalAmount: number;
  createdAt: number;
  totalPaid: string;
  status: string;
};
