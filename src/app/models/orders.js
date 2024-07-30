import mongoose from "@/lib/mongoose";

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
    status: ["pending", "paid", "cancel"],
    required: true,
  },
});
const modelName = "orders";

if (!mongoose.models[modelName]) {
  mongoose.model(modelName, orderSchema);
}

export default mongoose.models[modelName];
