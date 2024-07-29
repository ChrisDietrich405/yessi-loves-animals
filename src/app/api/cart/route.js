import CartModel from "../../models/cart";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

// export async function GET(req) {
//   console.log("first"); // Log message to indicate the route handler is executed
//   return new Response("Hello from the /api/cart route", {
//     status: 200,
//     headers: { "Content-Type": "text/plain" },
//   });
// }
export const GET = async (req) => {
  // try {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");
  console.log("first", userId);

  if (!userId || userId === "undefined") {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  //   // Convert userId to Mongoose ObjectId if necessary
  //   const objectId = mongoose.Types.ObjectId(userId);

  //   // Find the cart using the userId
  const foundCart = await CartModel.findOne({ userId });
  console.log(foundCart);
  //   console.log("foundCart", foundCart);

  //   // If no cart is found, return an empty cart or appropriate message
  //   if (!foundCart) {
  //     return NextResponse.json(
  //       { message: "Cart not found", cart: [] },
  //       { status: 200 }
  //     );
  //   }

  //   // Returning the found cart as a JSON response with a status code 200
  return NextResponse.json(foundCart, { status: 200 });
  // } catch (error) {
  //   // If an error occurs, respond with the error message and a status code 500
  //   return NextResponse.json({ message: error.message }, { status: 500 });
  // }
};
