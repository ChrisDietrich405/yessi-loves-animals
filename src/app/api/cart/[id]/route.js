import { CartModel } from "@/app/models/cart";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "@/app/types/params";

export const DELETE = async (req, { params }) => {
  const requestHeaders = new Headers(req.headers);
  const { id } = params;

  const userId = requestHeaders.get("x-decoded-id");

  try {
    await CartModel.findOneAndUpdate(
      { userId },
      { $pullAll: { items: [{ _id: id }] } },
      { returnOriginal: false }
    );

    return NextResponse.json({ message: "removed" });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PUT = async (req) => {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json(
      { message: "User ID is missing in the headers." },
      { status: 400 }
    );
  }

  // try {
  //   // Parse the request body to extract the item ID
  const { id } = await req.json();
  console.log("id", id);
  // console.log("hello Leticia", items[0].itemId);

  // const itemId = items[0].itemId;
  // console.log("itemId", itemId);

  // Check if itemId is provided
  // if (!id) {
  //   return NextResponse.json(
  //     { message: "Cart ID is missing in the request body." },
  //     { status: 400 }
  //   );
  // }

  // await CartModel.deleteOne({ _id: id });

  // return NextResponse.json({ message: "Cart removed successfully." });

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
