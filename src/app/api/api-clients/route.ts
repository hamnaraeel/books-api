import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { clientName, clientEmail } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const token = uuidv4(); // generate a unique token
  await pool.query(
    "INSERT INTO clients (name, email, token) VALUES ($1, $2, $3)",
    [clientName, clientEmail, token]
  );
  return new Response(JSON.stringify({ token }));
}

export const runtime = "edge";
