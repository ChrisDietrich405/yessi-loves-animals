import mongoose from "mongoose";

const uri = process.env.MONGODB_URI

if (!uri) {
  throw new Error("Add Mongo URI to .env.local");
}

mongoose.connect(uri).catch((error) => console.log(error));

export default mongoose;
