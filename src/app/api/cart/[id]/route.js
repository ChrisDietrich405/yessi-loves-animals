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

  const { cart } = await req.json();

  try {
    const foundCart = await CartModel.findOneAndUpdate(
      { userId },
      { $set: { items: cart } },
      { returnOriginal: false }
    );

    return NextResponse.json({ status: 200, data: foundCart });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal server error" },
      { status: 500 }
    );
  }
};
