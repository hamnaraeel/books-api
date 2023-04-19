import { Pool } from "@neondatabase/serverless";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const { rows } = await pool.query("SELECT * FROM orders");
  // event.waitUntil(pool.end());  // doesn't hold up the response
  return new Response(JSON.stringify(rows));
}

// export async function POST(request: Request) {
//   const { bookId, customerName } = await request.json();
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//   const orderId = uuidv4(); // generate a unique token
//   const query =
//     "INSERT INTO orders (id, bookId, customerName ) VALUES ($1, $2, $3)";
//   const values = [orderId, bookId, customerName];
//   await pool.query(query, values);
//   return new Response(JSON.stringify({ orderId }));
// }

export async function POST(request: Request) {
  const { bookId, customerName } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  // const bookQuery = "SELECT * FROM books WHERE id = $1";
  // const bookResult = await pool.query(bookQuery, [bookId]);
  // const book = bookResult.rows[0];
  const orderId = uuidv4();
  const created = true;
  const createdBy = customerName;
  const quantity = 1;
  const timestamp = Date.now();

  const query =
    "INSERT INTO orders (id, bookId, customerName, created, createdBy, quantity, timestamp) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id";
  const values = [
    orderId,
    bookId,
    customerName,
    created,
    createdBy,
    quantity,
    timestamp,
  ];
  await pool.query(query, values);
  return new Response(JSON.stringify({ orderId }));
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method Not Allowed" });
//   }

//   try {
//     const { bookId, customerName } = req.body;

//     // Insert a new order into the database
//     const result = await pool.query(
//       "INSERT INTO orders (bookId, customerName, created, createdBy, quantity, timestamp) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
//       [bookId, customerName, false, "", 0, Date.now()]
//     );

//     res.status(201).json({ order: result.rows[0] });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

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
