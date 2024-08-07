import dbConnect from "../../config/db";
import { handleMongoError } from "@/app/exceptions/handle-mongo-error";
import ProductsModel from "../../models/products";
import UsersModel from "../../models/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const products = await ProductsModel.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return handleMongoError();
  }
};

export const POST = async (req) => {
  const { name, quantity, price, image, description } = await req.json();

  if (!name || !quantity || !price || !image || !description) {
    return NextResponse.json(
      {
        status: 400,
        message: "Please add all necessary information",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await dbConnect();
    const requestHeaders = new Headers(req.headers);

    const userId = requestHeaders.get("x-decoded-id");

    const user = await UsersModel.findOne({ _id: userId });

    if (!user.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const newProduct = new ProductsModel({
      name,
      quantity,
      price,
      image,
      description,
    });

    await ProductsModel.create(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return handleMongoError(error, NextResponse);
  }
};
