import { drizzle } from "drizzle-orm/d1";
import { D1Database } from "@cloudflare/workers-types";
export interface Env {
  "db-test": D1Database; // ✅ Match the binding name exactly
}
export const getDB = (env: Env) => {
  if (!env["db-test"]) {
    throw new Error("D1 Database is not available. Check your bindings.");
  }
  return drizzle(env["db-test"]); // ✅ Use the correct binding name
};
