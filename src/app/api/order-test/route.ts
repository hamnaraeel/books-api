// import { Pool } from "@neondatabase/serverless";
// import { v4 as uuidv4 } from "uuid";

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// export default handler(async (req, res) => {
//   if (req.method === "POST" && req.path === "/auth") {
//     // Authenticate client and get bearer token
//     const { clientName, clientEmail } = req.body;
//     const token = uuidv4(); // generate a unique token
//     const query =
//       "INSERT INTO api_clients (clientName, clientEmail, token) VALUES ($1, $2, $3)";
//     const values = [clientName, clientEmail, token];
//     await pool.query(query, values);
//     res.status(200).json({ token });
//     return;
//   }

//   if (req.method === "POST" && req.path === "/orders") {
//     // Use bearer token to create an order
//     const { bookId, customerName } = req.body;
//     const { authorization } = req.headers;
//     const token = authorization ? authorization.split(" ")[1] : null;
//     const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//     const clientQuery = "SELECT * FROM api_clients WHERE token = $1";
//     const clientValues = [token];
//     const clientResult = await pool.query(clientQuery, clientValues);

//     if (clientResult.rowCount === 0) {
//       res.status(401).json({ message: "Invalid token" });
//       return;
//     }

//     const orderId = uuidv4(); // generate a unique token
//     const orderQuery =
//       "INSERT INTO orders (orderId, bookId, customerName) VALUES ($1, $2, $3)";
//     const orderValues = [orderId, bookId, customerName];
//     await pool.query(orderQuery, orderValues);

//     return new Response(JSON.stringify({ orderId }));
//   }

//   // Handle invalid requests
//   res.status(404).json({ message: "Invalid route" });
// });

import { Pool } from "@neondatabase/serverless";

export async function GET(request: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const { rows } = await pool.query("SELECT * FROM status_update");
  // event.waitUntil(pool.end());  // doesn't hold up the response
  return new Response(JSON.stringify(rows));
}

export const runtime = "edge";
