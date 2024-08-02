import ProductsModel from "../../models/products";
import UsersModel from "../../models/users";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const products = await ProductsModel.find();
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  const product = await req.json();
  try {
    const requestHeaders = new Headers(req.headers);

    const userId = requestHeaders.get("x-decoded-id");

    const user = await UsersModel.findOne({ _id: userId });

    if (!user.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const newProduct = await ProductsModel.create(product);

    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
