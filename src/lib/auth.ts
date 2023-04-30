import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { USER_TOKEN, getJwtSecretKey } from "./constant";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export async function verifyAuth(request: NextRequest) {
  const token =
    request.headers.has("Authorization") &&
    request.headers.get("Authorization");
  if (!token) throw new Error("Missing token");
  // if (!token) return NextResponse.json({ message: "Missing token" });
  try {
    const cookiesItems = token.split(" ");
    const verified = await jwtVerify(
      cookiesItems[1],
      new TextEncoder().encode(getJwtSecretKey())
    );
    // return verified.payload as UserJwtPayload; // as string
    return verified.payload; // as string
  } catch (err) {
    throw new Error("Invalid token, Please send valid token.");
  }
}

export async function setUserToken(id: any) {
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setJti(id)
    .setIssuedAt()
    .setExpirationTime("1d")
    .sign(new TextEncoder().encode(getJwtSecretKey()));
  return token;
}

export function expireUserCookie(res: NextResponse) {
  res.cookies.set(USER_TOKEN, "", { httpOnly: true, maxAge: 0 });
  return res;
}
