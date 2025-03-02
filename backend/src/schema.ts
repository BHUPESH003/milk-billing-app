import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";

// 🔹 Customers Table
export const customers = sqliteTable("customers", {
  id: text("id").primaryKey().notNull(),
  name: text("name").notNull(),
  phone: text("phone"),
  address: text("address"),
  createdAt: integer("created_at").default(Date.now()),
});

// 🔹 Bills Table
export const bills = sqliteTable("bills", {
  id: text("id")
    .primaryKey()
    .default(sql`(lower(hex(randomblob(16))))`), // Auto-generate UUID
  customerId: text("customer_id").notNull(),
  month: text("month").notNull(),
  year: text("year").notNull(),
  totalMilk: real("total_milk").notNull(),
  totalAmount: real("total_amount").notNull(),
  createdAt: integer("created_at").default(Date.now()),
});

// 🔹 Payments Table
export const payments = sqliteTable("payments", {
  id: text("id")
    .primaryKey()
    .default(sql`(lower(hex(randomblob(16))))`), // Auto-generate UUID
  billId: text("bill_id").notNull(),
  amount: real("amount").notNull(),
  createdAt: integer("created_at").default(Date.now()),
});

// 🔹 Define Relations (Optional)
export const customersRelations = relations(customers, ({ many }) => ({
  bills: many(bills),
}));

export const billsRelations = relations(bills, ({ one, many }) => ({
  customer: one(customers, {
    fields: [bills.customerId],
    references: [customers.id],
  }),
  payments: many(payments),
}));

export const paymentsRelations = relations(payments, ({ one }) => ({
  bill: one(bills, { fields: [payments.billId], references: [bills.id] }),
}));
