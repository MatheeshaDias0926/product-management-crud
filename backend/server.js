import express from "express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/db.js";
import router from "./routes/product.route.js";

const app = express();
app.use(cors()); // Enable CORS for all routes

//const PORT = process.env.PORT || 3000;
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON

app.use("/api/products", router); // Use the router for all routes starting with /api/products

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log("Server started on http://localhost:" + PORT);
});
