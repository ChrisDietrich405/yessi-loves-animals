import CartModel from "../../models/cart";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { ColorLens } from "@mui/icons-material";

// export async function GET(req) {
//   console.log("first"); // Log message to indicate the route handler is executed
//   return new Response("Hello from the /api/cart route", {
//     status: 200,
//     headers: { "Content-Type": "text/plain" },
//   });
// }
export const GET = async (req) => {
  try {
    const requestHeaders = new Headers(req.headers);

    const userId = requestHeaders.get("x-decoded-id");

    if (!userId || userId === "undefined") {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const foundCart = await CartModel.findOne({ userId });
    console.log(foundCart);

    if (!foundCart) {
      return NextResponse.json(
        { message: "Cart not found", cart: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(foundCart, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  const body = await req.json();
  const result = await CartModel.create(body);
  console.log("RESULT", result);
  return NextResponse.json({ success: true, data: result }, { status: 201 });
};

export const DELETE = async (req) => {
  // Extracting the headers from the request
  const requestHeaders = new Headers(req.headers);

  // Extracting the userId from headers
  const userId = requestHeaders.get("x-decoded-id");

  // Check if userId is available
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing in the headers." },
      { status: 400 }
    );
  }

  // try {
  //   // Parse the request body to extract the item ID
  const { items } = await req.json();
  console.log("hello Leticia", items[0].itemId);

  const itemId = items[0].itemId;
  // console.log("itemId", itemId);

  // Check if itemId is provided
  if (!itemId) {
    return NextResponse.json(
      { message: "Item ID is missing in the request body." },
      { status: 400 }
    );
  }

  console.log("hi", itemId);
  await CartModel.deleteOne(itemId);

  return NextResponse.json({ message: "Item removed successfully." });
  // Use findOneAndUpdate to update the cart for the user
  // const result = await CartModel.findOneAndUpdate(
  //   { userId }, // filter by userId
  //   { $pull: { items: { _id: itemId } } }, // use $pull to remove an item by _id
  //   { new: true } // return the updated document
  // );

  //   // Check if the item was removed successfully
  //   if (!result) {
  //     return NextResponse.json(
  //       { message: "Cart item not found or already removed." },
  //       { status: 404 }
  //     );
  //   }

  //   return NextResponse.json({ message: "Item removed successfully." });
  // } catch (error) {
  //   console.error("Error removing item from cart:", error);
  //   return NextResponse.json(
  //     { message: "Internal server error" },
  //     { status: 500 }
  //   );
  // }
};
