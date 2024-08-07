// import mongoose from "@/lib/mongoose";

// const { Schema } = mongoose;

// // Define the schema for individual cart items
// const cartItemSchema = new Schema({
//   itemId: {
//     type: String,
//     required: true,
//     unique: true, // Ensure itemId is unique within the cart
//   },
//   productId: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: [1, 'Quantity must be at least 1'], // Quantity validation
//   },
//   options: {
//     type: Map, // Use Map for flexible options
//     of: String, // Assuming options are key-value pairs with string values
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   subtotal: {
//     type: Number,
//     required: true,
//   },
// });

// // Define the schema for a Cart document
// const cartSchema = new Schema({
//   userId: {
//     type: String,
//     required: true,
//   },
//   items: {
//     type: [cartItemSchema], // Use the cartItemSchema for each item
//     required: true,
//   },
//   total: {
//     type: Number,
//     required: true,
//     default: 0, // Initialize to 0
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Set pre-save middleware to update timestamps
// cartSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const modelName = "cart";

// // Check if the model already exists, if not, create it
// if (!mongoose.models[modelName]) {
//   mongoose.model(modelName, cartSchema);
// }

// // Export the CartModel
// export default mongoose.models[modelName];

import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for a Cart document
const cartSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  items: {
    type: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1"],
        },
        price: {
          type: Number,
          required: true,
        },
        // Include additional properties if needed (e.g., options, subtotal)
      },
    ],
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


// import mongoose from "@/lib/mongoose";

// const { Schema } = mongoose;

// // Define the schema for individual cart items
// const cartItemSchema = new Schema({
//   itemId: {
//     type: String,
//     required: true,
//     unique: true, // Ensure itemId is unique within the cart
//   },
//   productId: {
//     type: String,
//     required: true,
//   },
//   quantity: {
//     type: Number,
//     required: true,
//     min: [1, 'Quantity must be at least 1'], // Quantity validation
//   },
//   options: {
//     type: Map, // Use Map for flexible options
//     of: String, // Assuming options are key-value pairs with string values
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   subtotal: {
//     type: Number,
//     required: true,
//   },
// });

// // Define the schema for a Cart document
// const cartSchema = new Schema({
//   userId: {
//     type: String,
//     required: true,
//   },
//   items: {
//     type: [cartItemSchema], // Use the cartItemSchema for each item
//     required: true,
//   },
//   total: {
//     type: Number,
//     required: true,
//     default: 0, // Initialize to 0
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Set pre-save middleware to update timestamps
// cartSchema.pre('save', function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// const modelName = "cart";

// // Check if the model already exists, if not, create it
// if (!mongoose.models[modelName]) {
//   mongoose.model(modelName, cartSchema);
// }

// // Export the CartModel
// export default mongoose.models[modelName];



