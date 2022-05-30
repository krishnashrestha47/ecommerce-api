import mongoose from "mongoose";

export const dbConnect = () => {
  try {
    const connection = mongoose.connect(process.env.MONGO_CLIENT);

    connection && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
