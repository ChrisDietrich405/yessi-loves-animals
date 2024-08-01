import mongoose from "mongoose";
import OrdersModel from "../../../models/orders";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req, { params }) => {
  const id = new mongoose.Types.ObjectId(params.id);

  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  const orderDetails = await OrdersModel.findOne({ _id: id });

  if (userId !== orderDetails.userId) {
    return NextResponse.json({ message: "unauthorized" }, { status: 401 });
  }

  return NextResponse.json(orderDetails, { status: 200 });
};

export const PUT = async (req, { params }) => {
  const id = new mongoose.Types.ObjectId(params.id);
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  const body = await req.json();

  const updatedProduct = await OrdersModel.findOneAndUpdate(
    { _id: id },
    body,
    { new: true } // Return the updated document
  );
  await updatedProduct.save();

  // if (!userId) {
  //   return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  // }

  // let order = await OrdersModel.findOne({ userId });
  // order.paymentStatus = "cancel";
  // console.log(order);
  // await order.save();

  return NextResponse.json({ message: "success" }, { status: 200 });
};

//THIS BELOW IS TO CHANGE STATUS FROM RETURN, DELIVERED

// export const POST = async (req, { params }) => {
//   const id = new mongoose.Types.ObjectId(params.id);
//   const requestHeaders = new Headers(req.headers);

//   const userId = requestHeaders.get("x-decoded-id");

//   let order = await OrdersModel.findOne({ userId });
//   order.status = "return";
//   console.log(order);
  // await order.save();

  // const updatedProduct = await OrdersModel.findOneAndUpdate(
  //   { _id: id },
  //   body,
  //   { new: true } // Return the updated document
  // );
  // await updatedProduct.save();

  // if (!userId) {
  //   return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
  // }

  // let order = await OrdersModel.findOne({ userId });
  // order.paymentStatus = "cancel";
  // console.log(order);
  // await order.save();

//   return NextResponse.json({ message: "success" }, { status: 200 });
// };
