import mongoose from "@/lib/mongoose";
import { Schema, model } from "mongoose";

// Define the product schema
const productSchema = new Schema({
  name: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: {
    type: [],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // category: {
  //   type: String,
  //   required: true,
  // },
  // stock: {
  //   type: Number,
  //   required: true,
  // },
  // imageUrl: {
  //   type: String,
  //   required: true,
  // },
  // brand: {
  //   type: String,
  //   required: false,
  // },
});

const modelName = "products";

if (!mongoose.models[modelName]) {
  mongoose.model(modelName, productSchema);
}

export default mongoose.models[modelName];


