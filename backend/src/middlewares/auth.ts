import { jwt, sign } from "hono/jwt";
import { Context, MiddlewareHandler } from "hono";

// Define JWT Payload type
export type JWTPayload = {
  username: string;
  role: "admin";
  exp?: number;
  iat?: number;
  nbf?: number;
};

// Middleware to verify JWT (Uses env variable)
export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const jwtSecret = c.env.JWT_SECRET;
  if (!jwtSecret) {
    return c.json({ error: "JWT secret is missing" }, 500);
  }

  return jwt({ secret: jwtSecret })(c, next);
};

// Function to generate a JWT token for admin
export const generateToken = async (
  username: string,
  jwtSecret: any
): Promise<string> => {
  console.log("username", username);
  if (!jwtSecret) throw new Error("JWT secret is missing");

  const payload: JWTPayload = {
    username,
    role: "admin",
    exp: Math.floor(Date.now() / 1000) + 60 * 60, // Expires in 1 hour
    iat: Math.floor(Date.now() / 1000),
  };
  return await sign(payload, jwtSecret);
};
