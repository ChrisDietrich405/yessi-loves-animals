import dbConnect from "../../config/db";
import CartModel from "../../models/cart";
import { NextResponse } from "next/server";

//THIS WOULD BE THE CART ICON BUTTON

export const GET = async (req) => {
  dbConnect();
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId || userId === "undefined") {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  try {
    const foundCart = await CartModel.findOne({ userId: userId });

    if (!foundCart) {
      return NextResponse.json(
        { message: "Cart not found", cart: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(foundCart, { status: 200 });
  } catch (error) {
    return handleMongoError();
  }
};

export const POST = async (req) => {
  dbConnect();
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  try {
    const previousCart = await CartModel.findOne({ userId });

    const body = await req.json();
    const newItems = body.items;

    if (!previousCart) {
      const result = await CartModel.create({ userId, items: newItems });
      return NextResponse.json(
        { success: true, data: result },
        { status: 201 }
      );
    }

    const updatedItemsMap = new Map();

    previousCart.items.forEach((item) => {
      updatedItemsMap.set(item.productId, { ...item });
    });

    newItems.forEach((newItem) => {
      const existingItem = updatedItemsMap.get(newItem.productId);
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.price += newItem.price * newItem.quantity;
      } else {
        updatedItemsMap.set(newItem.productId, { ...newItem });
      }
    });

    const combinedItems = Array.from(updatedItemsMap.values());

    const result = await CartModel.findOneAndUpdate(
      { userId },
      { $set: { items: combinedItems } },
      { returnOriginal: false, new: true }
    );

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    return handleMongoError();
  }
};

//HOW AM I UPDATING THE CART (DELETING ITEMS, UPDATING QUANTITY, SHOuld this function be a dynamic route)

export const PUT = async (req) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 400 });
  }

  const { items } = await req.json();
  try {
    const updatedCart = await CartModel.findOneAndUpdate(
      { userId: userId },
      { $set: { items: items } },
      { returnOriginal: false }
    );

    return NextResponse.json({
      items: updatedCart,
    });
  } catch (error) {
    return handleMongoError();
  }
};
