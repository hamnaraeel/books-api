import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";
// import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { clientName, clientEmail } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const query =
    "INSERT INTO api_clients (clientName, clientEmail) VALUES ($1, $2) RETURNING clientId";
  const values = [clientName, clientEmail];
  const response = await pool.query(query, values);
  const { rows } = response;

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }

  // Generate JWT token
  // const token = jwt.sign(
  //   { clientId: rows[0].clientId },
  //   process.env.JWT_SECRET,
  //   { expiresIn: "1h" }
  // );

  // return new Response(JSON.stringify({ token }));
}

export const runtime = "edge";
