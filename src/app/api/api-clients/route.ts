import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  // const { clientName, clientEmail } = await request.json();
  // const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  // const token = uuidv4(); // generate a unique token
  // const clientId = uuidv4(); // generate a unique token

  // const query =
  //   "INSERT INTO api_clients_token (accessToken, clientName, clientEmail) VALUES ($1, $2, $3)";

  // const values = [token, clientName, clientEmail];
  // await pool.query(query, values);

  // return new Response(JSON.stringify({ token }));

  const { bookId, customerName } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const token = uuidv4(); // generate a unique token
  const orderId = uuidv4(); // generate a unique token

  const query =
    "INSERT INTO orders (id, bookId, customerName) VALUES ($1, $2, $3)";

  const values = [orderId, bookId, customerName];
  await pool.query(query, values);

  return new Response(JSON.stringify({ orderId }));
}
export const runtime = "edge";
