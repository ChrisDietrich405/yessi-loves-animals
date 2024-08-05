import mongoose from "@/lib/mongoose"; // Import the mongoose instance
import ProductsModel from "../../../models/products";
import UsersModel from "../../../models/users";
import { NextResponse } from "next/server";
import { handleMongoError } from "@/app/exceptions/handle-mongo-error";

export const GET = async (req, { params }) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const id = new mongoose.Types.ObjectId(params.id);
    const individualProduct = await ProductsModel.findById(id);

    if (individualProduct) {
      return NextResponse.json(individualProduct, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Individual work not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return handleMongoError();
  }
};

export async function PUT(req, { params }) {
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

    const productBody = await req.json();
    console.log("body ", productBody);

    // try {
    const updatedProduct = await ProductsModel.findOneAndUpdate(
      { _id: params.id },
      { $set: productBody },
      { new: true, useFindAndModify: false } // 'new' returns the modified document
    );

    return NextResponse.json(updatedProduct, {
      status: 200,
    });
    return null;
  } catch (error) {
    return handleMongoError();
  }
}

export async function DELETE(req, { params }) {
  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");

  try {
    const user = await UsersModel.findOne({ _id: userId });

    if (!user.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const id = new mongoose.Types.ObjectId(params.id);

    await ProductsModel.findOneAndDelete(id);

    return NextResponse.json("successfully deleted", {
      status: 200,
    });
  } catch (error) {
    return handleMongoError();
  }
}
