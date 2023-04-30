import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";
import { setUserToken } from "@/lib/auth";

export async function POST(request: Request) {
  console.log("in client");
  const { clientName, clientEmail } = await request.json();
  console.log("params", clientName, clientEmail);
  console.log("db", process.env.DATABASE_URL);
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const token = uuidv4(); // generate a unique token

  const query =
    "INSERT INTO api_clients_token (accessToken, clientName, clientEmail) VALUES ($1, $2, $3)";
  const values = [token, clientName, clientEmail];
  const { rows }: any = await pool.query(query, values);

  const userToken = await setUserToken(rows[0]);
  return new Response(JSON.stringify({ token, userToken, rows }));
}
// export const runtime = "edge";
