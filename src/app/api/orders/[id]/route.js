import mongoose from "mongoose";
import OrdersModel from "../../../models/orders"

export const GET = async (req, { params }) => {
  const id = new mongoose.Types.ObjectId(params.id);

  const requestHeaders = new Headers(req.headers);
  const userId = requestHeaders.get("x-decoded-id");



  const orderDetails = await OrdersModel.findOne({ _id: id });
  
  if(userId !== orderDetails.userId) {
    return NextResponse.json({message: "unauthorized"}, { status: 401 })
  }

  // return NextResponse.json(order, { status: 200 });
};
