import { Pool } from "@neondatabase/serverless";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const { rows } = await pool.query("SELECT * FROM orders_list4");
  // event.waitUntil(pool.end());  // doesn't hold up the response
  return new Response(JSON.stringify(rows));
}

export async function POST(request: Request) {
  const apiClientId = request.headers.get("reqUser");
  console.log("Db token: ", process.env.DATABSE_URL);
  const origin = request.headers.get("origin");
  try {
    const { bookId, customerName } = await request.json();
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const orderId = uuidv4(); // generate a unique token

    const query = await pool.query(
      "INSERT INTO orders_list4 ( bookId, customerName, orderId, createdBy) VALUES ($1, $2, $3, $4) RETURNING orderId", // in created by add apiClientId
      [bookId, customerName, orderId, apiClientId]
    );
    return new Response(
      JSON.stringify({ message: "Order created successfully", orderId }),
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
        },
      }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: error.message,
      }),
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
        },
      }
    );
  }
}

export const runtime = "edge";
