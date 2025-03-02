-- Create Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  created_at INTEGER DEFAULT (strftime('%s', 'now'))
);

-- Create Bills Table
CREATE TABLE IF NOT EXISTS bills (
  id TEXT PRIMARY KEY NOT NULL,
  customer_id TEXT NOT NULL,
  month TEXT NOT NULL,
  year TEXT NOT NULL,
  total_amount REAL NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
);

-- Create Payments Table
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY NOT NULL,
  bill_id TEXT NOT NULL,
  amount REAL NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  FOREIGN KEY (bill_id) REFERENCES bills(id) ON DELETE CASCADE
);
