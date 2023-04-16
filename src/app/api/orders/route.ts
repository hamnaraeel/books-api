import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const { rows } = await pool.query("SELECT * FROM orders");
  // event.waitUntil(pool.end());  // doesn't hold up the response
  return new Response(JSON.stringify(rows));
}

export async function POST(request: Request) {
  const { bookId, customerName } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const orderId = uuidv4(); // generate a unique token
  const query =
    "INSERT INTO api_clients (id, bookId, customerName ) VALUES ($1, $2, $3)";
  const values = [orderId, bookId, customerName];
  await pool.query(query, values);
  return new Response(JSON.stringify({ orderId }));
}

// export async function POST(request: Request) {
//   const { bookId, customerName } = await request.json();

//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//   const { rows } = await pool.query(
//     "INSERT INTO orders (book_id, customer_name) VALUES ($1, $2) RETURNING id",
//     [bookId, customerName]
//   );

//   const orderId = rows[0].id;
//   const token = Buffer.from(`order-${orderId}`).toString("base64");

//   return new Response(token);
// }

export const runtime = "edge";
