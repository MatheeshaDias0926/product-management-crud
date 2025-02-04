import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log(`Connecting to MongoDB: ${process.env.MONGO_URI}`); // Debugging log
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};
