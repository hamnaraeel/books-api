import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { clientName, clientEmail } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const query =
    "INSERT INTO api_clients (clientName, clientEmail, token) VALUES ($1, $2, $3) RETURNING token";
  const token = uuidv4(); // generate a unique token
  const values = [clientName, clientEmail];
  await pool.query(query, values);

  return new Response(JSON.stringify({ token }));
}
export const runtime = "edge";
