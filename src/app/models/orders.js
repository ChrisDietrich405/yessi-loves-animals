import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: [],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "cancel"],
    required: true,
  },
  status: {
    type: String,
    enum: ["delivered", "return"],
    required: true,
  },
  datePurchased: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  method: {
    type: String,
    enum: ["credit_card", "paypal", "bank_transfer"],
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  // shippingAddress: {
  //   addressLine1: {
  //     type: String,
  //     required: true,
  //   },
  //   // addressLine2: String,
  //   city: {
  //     type: String,
  //     required: true,
  //   },
  //   state: {
  //     type: String,
  //     required: true,
  //   },
  //   postalCode: {
  //     type: String,
  //     required: true,
  //   },
  //   country: {
  //     type: String,
  //     required: true,
  //   },
  // },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const modelName = "orders";

if (!mongoose.models[modelName]) {
  mongoose.model(modelName, orderSchema);
}

export default mongoose.models[modelName];
