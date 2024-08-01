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
