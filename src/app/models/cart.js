import mongoose from "@/lib/mongoose";

const { Schema } = mongoose;

// Define the schema for a Cart document
const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: [String],
    required: true,
  },
});
const modelName = "cart";
// Check if the model already exists, if not, create it
if (!mongoose.models[modelName]) {
  mongoose.model(modelName, cartSchema);
}

// Export the CartModel
export default mongoose.models[modelName];

