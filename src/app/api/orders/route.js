import OrdersModel from "../../models/orders";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";

export const GET = async (req) => {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");

  // if (!userId) {
  //   return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  // }
  const order = await OrdersModel.findOne({ userId });

  return NextResponse.json(order, { status: 200 });
  // Find all orders for the specific user
  // const allOrders = await OrdersModel.find({ userId: id });
  // console.log("allOrders", allOrders);

  // try {
  //   const requestHeaders = new Headers(req.headers);

  //   const userId = requestHeaders.get("x-decoded-id");

  //   if (!userId || userId === "undefined") {
  //     return NextResponse.json(
  //       { message: "Unauthorized user" },
  //       { status: 401 }
  //     );
  //   }

  // const foundCart = await CartModel.findOne({ userId });

  // if (!foundCart) {
  //   return NextResponse.json(
  //     { message: "Cart not found", cart: [] },
  //     { status: 200 }
  //   );
  // }

  // return NextResponse.json(foundCart, { status: 200 });
  // } catch (error) {
  //   return NextResponse.json({ message: error.message }, { status: 500 });
  // }
};

export const POST = async (req) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  const body = await req.json();
  const result = await OrdersModel.create(body);
  console.log(result);

  return NextResponse.json({ success: true, data: result }, { status: 201 });
};

export const PATCH = async (req) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  let order = await OrdersModel.findOne({ userId });
  order.paymentStatus = "cancel";
  console.log(order);
  await order.save();

  return NextResponse.json({ message: "success" }, { status: 201 });
};


