import monsoose from "mongoose";

export async function connect() {
  try {
    await monsoose.connect("mongodb://localhost:27017/TaskVault");
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
}
