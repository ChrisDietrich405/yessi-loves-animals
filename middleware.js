import * as jwt from "jose";
import { NextResponse } from "next/server";

export async function middleware(req) {
  console.log("hello middleware");
  try {
    const authorization = req.headers.get("authorization");

    if (!authorization) {
      throw new Error("Token not found");
    }

    const token = authorization.split(" ")[1];

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload } = await jwt.jwtVerify(token, secret);
    
    // Add userId to the request headers
    const response = NextResponse.next();
    response.headers.set("x-decoded-id", payload.userId);
    
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/api/products", "/api/cart", "/api/cart/:path*"],
};

