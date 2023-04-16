// // middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   return NextResponse.redirect(new URL("/api/status", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/api/:path*",
// };

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   return NextResponse.rewrite(new URL("/api/status", request.url));

// }
// export const config = {
//   matcher: "/api/:path*",
// };

// import { NextApiRequest, NextApiResponse } from "next";
// import { Pool } from "@neondatabase/serverless";

// const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// export default async function validateApiKey(
//   req: NextApiRequest,
//   res: NextApiResponse,
//   next: () => void
// ) {
//   const { api_key } = req.headers;
//   const query = "SELECT * FROM api_keys WHERE key = $1";
//   const values = [api_key];

//   try {
//     const { rows } = await pool.query(query, values);

//     if (rows.length === 0) {
//       res.status(401).json({ message: "Invalid API key" });
//     } else {
//       next();
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// }
