import { Hono, Context } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { authMiddleware, generateToken } from "./middlewares/auth";
import { z } from "zod";
import { customers, bills, payments } from "./schema"; // Define your DB schema here
import { and, eq, sql, desc } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// Define Env Interface for Cloudflare
export interface Env {
  "db-test": D1Database;
  ADMIN_USER: string;
  ADMIN_PASS: string;
  JWT_SECRET: string;
}

// Initialize Hono App with Explicit Bindings
const app = new Hono<{ Bindings: Env }>();

// Get Drizzle DB instance
const getDB = (env: Env) => drizzle(env["db-test"]);

// 🔹 Validation Schemas
const customerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const billSchema = z.object({
  customerId: z.string(),
  month: z.string().min(1),
  year: z.string(),
  totalAmount: z.number().positive(),
  totalMilk: z.number().positive(),
});

const paymentSchema = z.object({
  billId: z.string(),
  amount: z.number().positive(),
});

// 🔹 Admin Login (JWT Token Generation)
app.post("/login", async (c: Context<{ Bindings: Env }>) => {
  try {
    const { username, password } = await c.req.json<{
      username: string;
      password: string;
    }>();

    if (username === c.env.ADMIN_USER && password === c.env.ADMIN_PASS) {
      const token = await generateToken(username, c.env.JWT_SECRET);
      return c.json({ success: true, token });
    }

    return c.json({ success: false, error: "Invalid credentials" }, 401);
  } catch (error) {
    return c.json({ success: false, error: "Invalid request" }, 400);
  }
});

app.post("/customers", authMiddleware, async (c) => {
  const db = getDB(c.env);

  const body = await c.req.json();
  const parseResult = customerSchema.safeParse(body);

  if (!parseResult.success) {
    return c.json({ success: false, error: parseResult.error.format() }, 400);
  }
  console.log(parseResult.data);

  try {
    const customer = await db.insert(customers).values({
      id: uuidv4(), // ✅ Generate unique ID
      name: parseResult.data.name,
      phone: parseResult.data.phone ?? null,
      address: parseResult.data.address ?? null,
    });

    return c.json({ success: true, customer });
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500);
  }
});

// 🔹 Protected: Get All Customers
app.get("/customers", authMiddleware, async (c) => {
  const db = getDB(c.env);
  try {
    const customersList = await db.select().from(customers);
    return c.json({ success: true, customers: customersList });
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500);
  }
});

// 🔹 Protected: Generate Bill
app.post("/bills", authMiddleware, async (c) => {
  const db = getDB(c.env);
  const body = await c.req.json();
  const parseResult = billSchema.safeParse(body);

  if (!parseResult.success) {
    return c.json({ success: false, error: parseResult.error.format() }, 400);
  }

  try {
    const [bill] = await db.insert(bills).values(parseResult.data).returning();
    return c.json({ success: true, bill });
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500);
  }
});

// 🔹 Protected: Add Payment to Bill
app.post("/payments", authMiddleware, async (c) => {
  const db = getDB(c.env);
  const body = await c.req.json();
  const parseResult = paymentSchema.safeParse(body);

  if (!parseResult.success) {
    return c.json({ success: false, error: parseResult.error.format() }, 400);
  }

  try {
    const [payment] = await db
      .insert(payments)
      .values(parseResult.data)
      .returning();
    return c.json({ success: true, payment });
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500);
  }
});

app.get("/customers/bills", authMiddleware, async (c) => {
  const db = getDB(c.env);

  try {
    const results = await db
      .select({
        customerId: bills.customerId,
        customerName: customers.name, // Assuming you have a `customers` table
        month: bills.month,
        year: bills.year,
        totalAmount: bills.totalAmount,
        totalPaid: sql<number>`COALESCE(SUM(${payments.amount}), 0)`.as(
          "totalPaid"
        ),
      })
      .from(bills)
      .leftJoin(payments, eq(bills.id, payments.billId))
      .leftJoin(customers, eq(bills.customerId, customers.id))
      .groupBy(
        bills.customerId,
        customers.name,
        bills.month,
        bills.year,
        bills.totalAmount
      )
      .orderBy(desc(bills.year), desc(bills.month)); // Show latest bills first

    // Format response with a payment status
    const customersWithStatus = results.map((customer) => ({
      ...customer,
      status:
        customer.totalPaid >= customer.totalAmount ? "Paid ✅" : "Unpaid ❌",
      pendingAmount: customer.totalAmount - customer.totalPaid,
    }));

    return c.json({ success: true, customers: customersWithStatus });
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500);
  }
});

app.get("/public/bills/:customerId/:month/:year", async (c) => {
  const db = getDB(c.env);
  const { customerId, month, year } = c.req.param();

  try {
    const bill = await db
      .select()
      .from(bills)
      .where(
        and(
          eq(bills.customerId, customerId),
          eq(bills.month, month),
          eq(bills.year, year)
        )
      )
      .limit(1);

    if (!bill.length) {
      return c.json({ success: false, error: "Bill not found" }, 404);
    }

    return c.json({ success: true, bill: bill[0] });
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500);
  }
});

app.get("/public/bills/:customerId/:month/:year/payment-status", async (c) => {
  const db = getDB(c.env);
  const { customerId, month, year } = c.req.param();

  try {
    const results = await db
      .select({
        billId: bills.id,
        totalAmount: bills.totalAmount,
        totalPaid: sql<number>`COALESCE(SUM(${payments.amount}), 0)`.as(
          "totalPaid"
        ),
        paymentStatus: sql<string>`
          CASE 
            WHEN COALESCE(SUM(${payments.amount}), 0) >= ${bills.totalAmount} THEN 'Fully Paid'
            WHEN COALESCE(SUM(${payments.amount}), 0) > 0 THEN 'Partially Paid'
            ELSE 'Unpaid'
          END
        `.as("paymentStatus"),
      })
      .from(bills)
      .leftJoin(payments, eq(bills.id, payments.billId))
      .where(
        sql`${bills.customerId} = ${customerId} AND ${bills.month} = ${month} AND ${bills.year} = ${year}`
      )
      .groupBy(bills.id);

    return c.json({ success: true, paymentStatus: results });
  } catch (error) {
    return c.json({ success: false, error: (error as Error).message }, 500);
  }
});

export default app;
