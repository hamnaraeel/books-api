export const USER_TOKEN = "user-token";
import { Pool } from "@neondatabase/serverless";

const JWT_SECRET_KEY: string | undefined = process.env.JWT_SECRET_KEY!;

export function getJwtSecretKey(): string {
  if (!JWT_SECRET_KEY || JWT_SECRET_KEY.length === 0) {
    throw new Error("The environment variable JWT_SECRET_KEY is not set.");
  }
  return JWT_SECRET_KEY;
}

export async function getUserById(id: string) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  try {
    const { rows } = await pool.query(`SELECT * FROM user WHERE id = ${id}`);
    return new Response(JSON.stringify({ rows }));
  } catch (err) {
    throw err;
  }
}
