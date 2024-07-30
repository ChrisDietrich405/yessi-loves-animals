import mongoose from "@/lib/mongoose"; // Import the mongoose instance
import ProductsModel from "../../../models/products";
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

    //   // Find the individual work by ID in the database
    const individualProduct = await ProductsModel.findById(id);

    console.log("hello", individualProduct);
    if (individualProduct) {
      // If the work is found, respond with the work data and a 200 status code
      return NextResponse.json(individualProduct, { status: 200 });
    } else {
      // If the work is not found, respond with a 404 status code and message
      return NextResponse.json(
        { message: "Individual work not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    // Handle errors and respond with a 500 status code and error message
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

    if (!userId.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const id = new mongoose.Types.ObjectId(params.id);

    const productBody = await req.json();

    const updatedProduct = await ProductsModel.findOneAndUpdate(id, productBody);

    return NextResponse.json(updatedProduct, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function DELETE(req, { params }) {
  try {
    const requestHeaders = new Headers(req.headers);

    const userId = requestHeaders.get("x-decoded-id");

    if (!userId.isAdmin) {
      return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
      );
    }

    const id = new mongoose.Types.ObjectId(params.id);

    const productBody = await req.json();

    const updatedProduct = await ProductsModel.findOneAndUpdate(id, productBody);

    return NextResponse.json(updatedProduct, {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
}
