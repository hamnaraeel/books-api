// import { NextRequest, NextResponse } from "next/server";
// import { verifyAuth } from "./app/api/auth/route";

// export async function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   const verifiedToken =
//     token &&
//     (await verifyAuth(token).catch((err) => {
//       console.log(err);
//     }));

//   if (req.nextUrl.pathname.startsWith("/login") && !verifiedToken) {
//     return;
//   }
//   if (req.url.includes("/login") && verifiedToken) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }
//   if (!verifiedToken) {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }
// }

// export const config = {
//   matcher: ["/dashboard", "/login"],
// };

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/status", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
};
