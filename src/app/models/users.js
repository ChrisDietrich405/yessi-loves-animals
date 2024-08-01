import mongoose from "@/lib/mongoose";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const modelName = "users";

if (!mongoose.models[modelName]) {
  mongoose.model(modelName, userSchema);
}

export default mongoose.models[modelName];
