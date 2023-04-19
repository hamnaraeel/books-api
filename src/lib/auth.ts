import type { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { USER_TOKEN, getJwtSecretKey, getUserById } from "./constant";

interface UserJwtPayload {
  jti: string;
  iat: number;
}

export async function verifyAuth(request: NextRequest) {
  const token =
    request.headers.has("Authorization") &&
    request.headers.get("Authorization");

  if (!token) throw new Error("Missing token");

  try {
    const cookiesItems = token.split(" ");
    const verified = await jwtVerify(
      cookiesItems[1],
      new TextEncoder().encode(getJwtSecretKey())
    );
    return verified.payload as UserJwtPayload;
  } catch (err) {
    throw new Error("Your token has expired. Please try again");
  }
}

export async function setUserToken(id: any) {
  const token = await new SignJWT({})
    .setJti(id)
    .setIssuedAt()
    .setExpirationTime("168h")
    .sign(new TextEncoder().encode(getJwtSecretKey()));
  return token;
}

export function expireUserCookie(res: NextResponse) {
  res.cookies.set(USER_TOKEN, "", { httpOnly: true, maxAge: 0 });
  return res;
}