import { jwtVerify } from "jose"; // Import the specific function you need from 'jose'
import { NextResponse } from "next/server";

export const config = {
  matcher: ["/api/cart", "/api/cart/:path*"],
};

export async function middleware(req) {
  try {
    const authorization = req.headers.get("authorization"); // Get the Authorization header

    if (!authorization) {
      throw new Error("Token not found"); // Throw an error if Authorization header is missing
    }

    const token = authorization.split(" ")[1]; // Split the Authorization header to extract the token

    const secret = new TextEncoder().encode(process.env.JWT_SECRET); // Encode the JWT secret

    // Verify the token and extract the payload
    const { payload } = await jwtVerify(token, secret);

    // Add userId to the request headers using the setHeader function
    const response = NextResponse.next();
    response.headers.set("x-decoded-id", payload.userId); // Set custom header with userId
    console.log("payload", payload.userId);

    return response;
  } catch (error) {
    console.log(error); // Log any errors that occur during token verification
    return NextResponse.json({ message: "unauthorized" }, { status: 401 }); // Return unauthorized response
  }
}
