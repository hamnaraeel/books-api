import { Pool } from "@neondatabase/serverless";
import { NextApiRequest, NextApiResponse } from "next";
// import validateApiKey from "@/middleware";

export async function GET(request: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const { rows } = await pool.query("SELECT * FROM books");
  // event.waitUntil(pool.end());  // doesn't hold up the response
  return new Response(JSON.stringify(rows));
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   // Call the middleware before the main handler
//   validateApiKey(req, res, async () => {
//     const books = await GET(req);
//     res.status(200).json(books);
//   });
// }

export const runtime = "edge";
