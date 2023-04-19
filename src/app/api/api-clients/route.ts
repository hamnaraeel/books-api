import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";
import Joi from "joi";
import { setUserToken } from "@/lib/auth";

export async function POST(request: Request) {
  const { clientName, clientEmail } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const token = uuidv4(); // generate a unique token
  const clientId = uuidv4(); // generate a unique token

  const query =
    "INSERT INTO api_clients_token (accessToken, clientName, clientEmail) VALUES ($1, $2, $3)";
  const values = [token, clientName, clientEmail];
  const { rows } = await pool.query(query, values);
  // const userToken = await setUserToken(rows[0]);
  return new Response(JSON.stringify({ token, rows }));
}
export const runtime = "edge";
