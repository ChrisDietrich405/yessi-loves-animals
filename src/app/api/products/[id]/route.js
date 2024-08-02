import mongoose from "@/lib/mongoose"; // Import the mongoose instance
import ProductsModel from "../../../models/products";
import UsersModel from "../../../models/users";
import { NextResponse } from "next/server";

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
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export async function PUT(req, { params }) {
  try {
    const requestHeaders = new Headers(req.headers);
    const userId = requestHeaders.get("x-decoded-id");

    const user = await UsersModel.findOne({ _id: userId });
    console.log("hello David", user);

    if (!user.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const id = new mongoose.Types.ObjectId(params.id);
    const productBody = await req.json();
    const updatedProduct = await ProductsModel.findOneAndUpdate(
      id,
      productBody
    );

    return NextResponse.json(updatedProduct, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
  }
}
