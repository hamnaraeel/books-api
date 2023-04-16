import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { clientName, clientEmail } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const query =
    "INSERT INTO api_clients (clientName, clientEmail) VALUES ($1, $2)";
  const values = [clientName, clientEmail];
  const response = await pool.query(query, values);
  // const { rows } = response;
  // const token = rows[0].token;
  return new Response(JSON.stringify({ response }));
}
export const runtime = "edge";
