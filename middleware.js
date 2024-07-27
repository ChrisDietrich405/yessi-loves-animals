import * as jwt from "jose";
import { NextResponse } from "next/server";

export async function middleware(req, res) {
  console.log("hello middleware")
  try {
    const authorization = req.headers.get("authorization");

    if (!authorization) {
      throw new Error("Token not found");
    }

    const token = authorization.split(" ")[1];

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const user = await jwt.jwtVerify(token, secret);
    console.log(user)
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: "/api/products",
};
