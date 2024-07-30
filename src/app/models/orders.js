import mongoose from "@/lib/mongoose";

const { Schema } = mongoose;

// Define the schema for a Cart document
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
    status: ["pending", "paid", "cancel"],
    required: true,
  },
});
const modelName = "orders";
// Check if the model already exists, if not, create it
if (!mongoose.models[modelName]) {
  mongoose.model(modelName, orderSchema);
}

// Export the CartModel
export default mongoose.models[modelName];
