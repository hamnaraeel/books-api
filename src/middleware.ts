// // middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const token: any = await verifyAuth(request).catch((err) => {
    console.error("err in mw", err.message);
    // return NextResponse.json({ message: "missing token" }, { status: 401 });
  });
  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Auth Required" }), {
      status: 401,
    });
  }
  console.log("token in mw", token);
  if (token) {
    const headers = new Headers(request.headers);
    headers.set("reqUser", JSON.stringify(token.jti)); // if string its not jti.id only jti
    console.log(headers);
    return NextResponse.next({
      request: {
        headers,
      },
    });
  }
  return NextResponse.json({ message: "Auth required" }, { status: 401 });
  // return new NextResponse( message: "Auth required" , { status: 401 });
}

export const config = {
  matcher: ["/api/orders/:path*", "/api/orders"],
};

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
