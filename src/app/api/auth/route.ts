// import { jwtVerify } from "jose";

// interface UserJwtPayload {
//   jti: string;
//   iat: number;
// }
// export const getJwtSecretKey = () => {
//   const secret = process.env.JWT_SECRET_KEY;
//   if (!secret || secret.length === 0) {
//     throw new Error("The environment variable JWT_SECRET_KEY is not set");
//   }
//   return secret;
// };

// export const verifyAuth = async (token: string) => {
//   try {
//     const verified = await jwtVerify(
//       token,
//       new TextEncoder().encode(getJwtSecretKey())
//     );
//     return verified.payload as UserJwtPayload;
//   } catch (error) {
//     throw new Error("Your token has expired.");
//   }
// };

import { Pool } from "@neondatabase/serverless";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  const { clientName, clientEmail } = await request.json();
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  const query =
    "INSERT INTO api_clients (clientName, clientEmail) VALUES ($1, $2)";
  const values = [clientName, clientEmail];
  const response = await pool.query(query, values);
  const { rows } = response;
  const token = rows[0].token;
  return new Response(JSON.stringify({ token }));
}
export const runtime = "edge";
