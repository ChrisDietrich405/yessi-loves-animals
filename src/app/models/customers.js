import mongoose from "@/lib/mongoose";
import { Schema, model } from "mongoose";

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  streetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const modelName = "customers";

if (!mongoose.models[modelName]) {
  mongoose.model(modelName, customerSchema);
}

export default mongoose.models[modelName];
