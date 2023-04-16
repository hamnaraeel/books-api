import { Pool } from "@neondatabase/serverless";

export async function GET(request: Request) {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const { rows } = await pool.query("SELECT * FROM status_update");
  // event.waitUntil(pool.end());  // doesn't hold up the response
  return new Response(JSON.stringify(rows));
}

export const runtime = "edge";
