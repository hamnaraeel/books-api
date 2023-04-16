// import { NextApiRequest, NextApiResponse } from "next";
// import jwt from "jsonwebtoken";

// const KEY = "hgfdhjfjkdsbfjgdsjgfdjhsgffdsfdsfd";
// export default async function (req: NextApiRequest, res: NextApiResponse) {
//   if (!req.body) {
//     res.statusCode = 404;
//     res.end("Error");
//     return;
//   }

//   const clientName = "req.body.clientName";
//   const clientEmail = "req.body.clientEmail";
//   const query =
//     "INSERT INTO api_clients (clientName, clientEmail) VALUES ($1, $2)";
//   const values = [clientName, clientEmail];

//   res.json({
//     token: jwt.sign(
//       {
//         clientName,
//         clientEmail,
//       },
//       KEY
//     ),
//   });
// }

import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { clientName, clientEmail } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const token = uuidv4(); // generate a unique token
  const query =
    "INSERT INTO api_clients (clientName, clientEmail) VALUES ($1, $2)";

  const values = [clientName, clientEmail];
  await pool.query(query, values);

  return new Response(JSON.stringify({ token }));
}
export const runtime = "edge";
