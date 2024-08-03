// utils/errorHandler.js
import mongoose from 'mongoose';

export function handleMongoError(error, res) {
  if (error instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(error.errors).map((err) => err.message);
    return res.status(400).json({ success: false, message: 'Validation Error', errors });
  } else if (error instanceof mongoose.Error.CastError) {
    return res.status(400).json({ success: false, message: `Invalid ${error.kind}: ${error.value}` });
  } else if (error.code === 11000) {
    // Handle Duplicate Key Errors
    const field = Object.keys(error.keyPattern)[0];
    return res.status(409).json({ success: false, message: `Duplicate value for field: ${field}` });
  } else if (error instanceof mongoose.Error.DocumentNotFoundError) {
    // Handle Document Not Found Errors
    return res.status(404).json({ success: false, message: `Document not found: ${error.message}` });
  } else if (error instanceof mongoose.Error.DisconnectedError) {
    // Handle Disconnected Errors
    return res.status(503).json({ success: false, message: 'Database connection lost' });
  } else {
    // Handle Other Errors
    console.error('An unexpected error occurred:', error.message);
    return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
}
