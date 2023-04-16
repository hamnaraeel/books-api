import { Pool } from "@neondatabase/serverless";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

// export async function POST(request: Request) {
//   const { clientName, clientEmail } = await request.json();
//   const pool = new Pool({ connectionString: process.env.DATABASE_URL });
//   const token = uuidv4(); // generate a unique token
//   const query =
//     "INSERT INTO api_clients (clientName, clientEmail) VALUES ($1, $2)";
//   const values = [clientName, clientEmail];
//   await pool.query(query, values);
//   return new Response(JSON.stringify({ token }));
// }

export async function POST(request: Request) {
  const { clientName, clientEmail } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const token = uuidv4(); // generate a unique token
  const query =
    "INSERT INTO api_clients (clientName, clientEmail, token) VALUES ($1, $2, $3) RETURNING token";
  const values = [clientName, clientEmail, token];
  const { rows } = await pool.query(query, values);
  const accessToken = rows[0].token;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
  const body = { token: accessToken };
  return new NextResponse(JSON.stringify(body), { headers });
}

export const runtime = "edge";
