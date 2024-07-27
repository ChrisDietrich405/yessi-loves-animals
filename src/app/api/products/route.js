import ProductsModel from "../../models/products";
import { NextResponse } from "next/server";

// Exported GET handler
export const GET = async () => {
  try {
    // Fetching available works from the database with the status 'available'
    const products = await ProductsModel.find();

    // Logging the fetched works to the console for debugging
    console.log("Felipe", products);

    // Returning the available works as a JSON response with a status code 200
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    // If an error occurs, respond with the error message and a status code 500
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
