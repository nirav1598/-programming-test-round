import { Request, Response } from "express";
import mongoose, { Schema, Document } from "mongoose";
import Product from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const {
      name,
      category,
      minPrice,
      maxPrice,
      minQuantity,
      maxQuantity,
      supplier,
      page = 1,
      limit = 10,
      sortBy = 'createdAt', // Default sort by created date
      sortOrder = 'desc'    // Default descending order
    } = req.query;

    // Initialize filters object
    const filters: any = {};

    // Filter by product name (case-insensitive search)
    if (name) {
      filters.name = { $regex: name, $options: "i" }; // 'i' for case-insensitive search
    }

    // Filter by category (ObjectId)
    if (category && mongoose.Types.ObjectId.isValid(category as string)) {
      filters.category = new mongoose.Types.ObjectId(category as string);
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filters.price = {
        $gte: minPrice || 0,
        $lte: maxPrice || Number.MAX_SAFE_INTEGER,
      };
    }

    // Filter by stock quantity
    if (minQuantity || maxQuantity) {
      filters.quantity = {
        $gte: minQuantity || 0,
        $lte: maxQuantity || Number.MAX_SAFE_INTEGER,
      };
    }

    // Filter by supplier
    if (supplier) {
      filters.supplier = { $regex: supplier, $options: "i" };
    }

    // Pagination logic
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const limitValue = parseInt(limit as string);

    // Sorting logic (by createdAt, price, or name)
    const sortOrderInt = sortOrder === "asc" ? 1 : -1; // Sorting order: ascending or descending
    const sort:any = { [sortBy as string]: sortOrderInt };

    // Query the database with filters, pagination, limit, and sorting
    const products = await Product.find(filters)
      .skip(skip)
      .limit(limitValue)
      .sort(sort);

    // Return the products as a JSON response
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(product);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) : Promise<void> =>  {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted" });
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantityChange } = req.body; // pass positive/negative number

  const product:any = await Product.findById(id);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const newQuantity = product.quantity + quantityChange;

  if (newQuantity < 0)
    return res.status(400).json({ error: "Insufficient stock" });

  product.quantity = newQuantity;
  product.lastUpdated = new Date();
  await product.save();

  res.json({ message: "Stock updated", product });
};

export const getLowStockProducts = async (req: Request, res: Response): Promise<void> =>{
  const threshold = parseInt(req.query.threshold as string) || 5;

  const lowStockItems = await Product.find({ quantity: { $lte: threshold } });
  res.json({ lowStockItems });
};