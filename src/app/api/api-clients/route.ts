import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { clientName, clientEmail } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const token = uuidv4(); // generate a unique token
  const clientId = uuidv4(); // generate a unique token

  const query =
    "INSERT INTO api_clients (clientName, clientEmail) VALUES ($1, $2)";

  const values = [clientName, clientEmail];
  await pool.query(query, values);
  const querytoken =
    "INSERT INTO api_client_tokens (apiClientId, accessToken) VALUES ($1, $2)";
  const valuestoken = [clientId, token];
  await pool.query(query, values);

  return new Response(JSON.stringify({ token }));
}
export const runtime = "edge";
