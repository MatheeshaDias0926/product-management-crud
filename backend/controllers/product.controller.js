import mongoose from "mongoose";
import Product from "../models/product.model.js";

// Create a new product
export const createProduct = async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter all fields" });
  }

  try {
    const newProduct = new Product(product);
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (err) {
    console.log("Error in creating product:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log("Error in fetching products:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product });
  } catch (err) {
    console.log("Error in fetching product:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  const { id } = req.params; // Extract the product ID from the URL
  const updateData = req.body; // Data to update

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Validate the update data against the schema
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (err) {
    console.log("Error in updating product:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "invalid product id" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    console.log("Error in deleting product:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};
