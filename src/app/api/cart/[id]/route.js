import CartModel from "../../../models/cart";
import { NextResponse } from "next/server";

// Exported GET handler
export const GET = async (req) => {
  console.log("hello", req.user)
  try {
    const foundCart = await CartModel.findById({userId})
    // Fetching available works from the database with the status 'available'
    // const cart = await CartModel.find();

    // Logging the fetched works to the console for debugging
    console.log("Felipe", cart);

    // Returning the available works as a JSON response with a status code 200
    return NextResponse.json(cart, { status: 200 });
  } catch (error) {
    // If an error occurs, respond with the error message and a status code 500
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
