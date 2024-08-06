import OrdersModel from "../../models/orders";
import { NextResponse, NextRequest } from "next/server";
import mongoose from "mongoose";
import { handleMongoError } from "@/app/exceptions/handle-mongo-error";

//THE FUNCTION BELOW IS FOR WHEN A USER CLICKS A BUTTON TO SEE ALL THEIR ORDERS

export const GET = async (req) => {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");

  try {
    const orders = await OrdersModel.find({ userId });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    handleMongoError();
  }
};

export const POST = async (req) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  const body = await req.json();
  try {
    const result = await OrdersModel.create(body);

    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    return handleMongoError();
  }
};

// THIS IS WHEN A CUSTOMER CLICKS A BUTTON TO CANCEL THE ORDER
export const PATCH = async (req) => {
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  }

  try {
    let order = await OrdersModel.findOne({ userId });
    order.paymentStatus = "cancel";
    await order.save();

    return NextResponse.json({ message: "success" }, { status: 201 });
  } catch (error) {
    return handleMongoError();
  }
};


