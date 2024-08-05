import mongoose from "mongoose";
import OrdersModel from "../../../models/orders";
import { NextResponse, NextRequest } from "next/server";
import { handleMongoError } from "@/app/exceptions/handle-mongo-error";

//THIS IS FOR BOTH THE USER AND THE ADMIN, BUT TO BE SIMPLE RIGHT NOW WE COULD HAVE A BUTTON THAT SAYS ORDER DETAILS FOR THE CUSTOMER

export const GET = async (req, { params }) => {
  const id = new mongoose.Types.ObjectId(params.id);

  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");
  try {
    const orderDetails = await OrdersModel.findOne({ _id: id });

    if (userId !== orderDetails.userId) {
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });
    }

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error) {
    return handleMongoError();
  }
};

//I SHOULD HAVE TWO PUT METHODS ONE FOR THE CUSTOMER TO CANCEL AND ANOTHER FOR THE ADMIN TO UPDATE TO PAID

export const PUT = async (req, { params }) => {
  const id = new mongoose.Types.ObjectId(params.id);
  const requestHeaders = new Headers(req.headers);

  const userId = requestHeaders.get("x-decoded-id");

  try {
    const currentOrder = await OrdersModel.findOne({ userId });
    console.log("hello", currentOrder);

    if (currentOrder.userId !== userId) {
      // return NextResponse.json({ message: "Unauthorized user" }, { status: 401 });
      return false;
    }

    const body = await req.json();

    const updatedProduct = await OrdersModel.findOneAndUpdate(
      { _id: id },
      body,
      { new: true }
    );
    await updatedProduct.save();

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return handleMongoError();
  }
};

