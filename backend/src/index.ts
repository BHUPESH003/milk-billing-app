import { Hono, Context } from "hono";
import { drizzle } from "drizzle-orm/d1";
import { authMiddleware, generateToken } from "./middlewares/auth";
import { z } from "zod";
import { customers, bills, payments } from "./schema"; // Define your DB schema here
import { and, eq, sql, desc, sum } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { cors } from "hono/cors";

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
app.use("/*", cors());

app.get("/", (c) => {
  return c.json({ message: "Welcome to the API" });
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
      return c.json({
        code: 200,
        data: {
          token,
        },
        message: "Success",
      });
    }

    return c.json({
      code: 401,
      data: null,
      error: "Invalid credentials",
    });
  } catch (error) {
    return c.json({
      code: 400,
      data: null,
      error: "Invalid request",
    });
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
    return c.json(
      {
        code: 200,
        data: {
          customer,
        },
        message: "Success",
      },
      200
    );
  } catch (error) {
    return c.json({
      code: 500,
      data: null,
      error: (error as Error).message,
    });
  }
});

// 🔹 Protected: Get All Customers
app.get("/customers", authMiddleware, async (c) => {
  const db = getDB(c.env);
  try {
    const customersList = await db.select().from(customers);
    return c.json({
      code: 200,
      data: {
        customersList,
      },
      message: "Success",
    });
  } catch (error) {
    return c.json({
      code: 500,
      data: null,
      error: (error as Error).message,
    });
  }
});
app.post("/bills", authMiddleware, async (c) => {
  const db = getDB(c.env);
  const body = await c.req.json();
  const parseResult = billSchema.safeParse(body);

  if (!parseResult.success) {
    return c.json({
      code: 400,
      data: null,
      error: parseResult.error.format(),
    });
  }

  const { customerId, month, year } = parseResult.data;

  try {
    // 🔍 Check if a bill already exists for the given customer, month, and year
    const existingBill = await db
      .select()
      .from(bills)
      .where(
        and(
          eq(bills.customerId, customerId),
          eq(bills.month, String(month)), // Ensure string format
          eq(bills.year, String(year))
        )
      )
      .limit(1);

    if (existingBill.length > 0) {
      return c.json({
        code: 409, // HTTP 409 Conflict
        data: null,
        error:
          "A bill already exists for this customer for the selected month and year.",
      });
    }

    // ✅ No existing bill → Proceed with insertion
    const [bill] = await db.insert(bills).values(parseResult.data).returning();

    return c.json({
      code: 200,
      data: {
        bill,
      },
      message: "Success",
    });
  } catch (error) {
    console.error("DB Error:", error);
    return c.json({
      code: 500,
      data: null,
      error: (error as Error).message,
    });
  }
});

app.post("/payments", authMiddleware, async (c) => {
  const db = getDB(c.env);
  const body = await c.req.json();
  const parseResult = paymentSchema.safeParse(body);

  if (!parseResult.success) {
    return c.json({
      code: 400,
      data: null,
      error: parseResult.error.format(),
    });
  }

  try {
    // ✅ Check if the bill exists before inserting the payment
    const billExists = await db
      .select()
      .from(bills)
      .where(eq(bills.id, parseResult.data.billId))
      .get();

    if (!billExists) {
      return c.json({
        code: 400,
        data: null,
        error: "Bill not found. Cannot add payment to a non-existent bill.",
      });
    }

    // ✅ Insert payment after ensuring bill exists
    const [payment] = await db
      .insert(payments)
      .values(parseResult.data)
      .returning();

    return c.json({
      code: 200,
      data: {
        payment,
      },
      message: "Success",
    });
  } catch (error) {
    return c.json({
      code: 500,
      data: null,
      error: (error as Error).message,
    });
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
    return c.json({
      code: 200,
      data: {
        customers: customersWithStatus,
      },
      message: "Success",
    });
  } catch (error) {
    return c.json({
      code: 500,
      data: null,
      error: (error as Error).message,
    });
  }
});
app.get("/public/bills/:customerId/:month/:year", async (c) => {
  const db = getDB(c.env);
  const { customerId, month, year } = c.req.param();

  try {
    // Fetch the bill for the given customer, month, and year
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
      return c.json({
        code: 404,
        data: null,
        error: "Bill not found",
      });
    }

    // Fetch total payments made for this bill
    const totalPaidResult = await db
      .select({ totalPaid: sum(payments.amount) })
      .from(payments)
      .where(eq(payments.billId, bill[0].id))
      .limit(1);

    const totalPaid = totalPaidResult[0]?.totalPaid || 0;

    // Determine the payment status
    const status =
      Number(totalPaid) >= bill[0].totalAmount
        ? "Paid"
        : Number(totalPaid) > 0
        ? "Partially Paid"
        : "Unpaid";

    return c.json({
      code: 200,
      data: {
        bill: {
          ...bill[0],
          totalPaid,
          status,
        },
      },
      message: "Success",
    });
  } catch (error) {
    return c.json({
      code: 500,
      data: null,
      error: (error as Error).message,
    });
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
    return c.json({
      code: 200,
      data: {
        paymentStatus: results,
      },
      message: "Success",
    });
  } catch (error) {
    return c.json({
      code: 500,
      data: null,
      error: (error as Error).message,
    });
  }
});

export default app;
