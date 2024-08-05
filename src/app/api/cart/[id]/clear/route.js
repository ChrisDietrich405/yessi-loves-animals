import CartModel from "../../../../models/cart";
import { NextResponse } from "next/server";

export const PUT = async (req) => {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing in the headers." },
      { status: 400 }
    );
  }

  try {
    const cart = await CartModel.findOne({ userId });

    cart.items = [];

    cart.save();

    return NextResponse.json({ message: "Cart cleared" }, { status: 200 });
  } catch (error) {
    return handleMongoError();
  }
};
