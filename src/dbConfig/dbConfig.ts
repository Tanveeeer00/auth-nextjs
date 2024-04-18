import mongoose from "mongoose";

export async function connectToDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongoDB connected");
    });
    connection.on("error", (err) => {
      console.log("mongoDB connection failed: " + err);
      process.exit(1);
    });
  } catch (error) {
    console.log("Error connecting to DB", error);
  }
}
