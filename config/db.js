import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    let connection;

    if (!connection || !connection.open()) {
      connection = await mongoose.connect(
        "mongodb+srv://chrisdietrich366:Devindiet1@dietrichlandcare.kq6v5mn.mongodb.net/yessi-loves-animals"
      );
    }

    return connection;
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
