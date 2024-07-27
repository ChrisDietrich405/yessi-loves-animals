import mongoose from "@/lib/mongoose";
import { Schema, model } from "mongoose";

// Define the product schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // description: {
  //   type: String,
  //   required: true,
  // },
  // price: {
  //   type: Number,
  //   required: true,
  // },
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
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
  // updatedAt: {
  //   type: Date,
  //   default: Date.now,
  // }
});

// Model name
const modelName = "products";

// Check if the model already exists to avoid overwriting it
if (!mongoose.models[modelName]) {
  mongoose.model(modelName, productSchema);
}

// Export the model
export default mongoose.models[modelName];
