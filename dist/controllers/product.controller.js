"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLowStockProducts = exports.updateStock = exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.createProduct = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = __importDefault(require("../models/product.model"));
const createProduct = async (req, res) => {
    try {
        const product = await product_model_1.default.create(req.body);
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createProduct = createProduct;
const getProducts = async (req, res) => {
    try {
        // Extract query parameters
        const { name, category, minPrice, maxPrice, minQuantity, maxQuantity, supplier, page = 1, limit = 10, sortBy = 'createdAt', // Default sort by created date
        sortOrder = 'desc' // Default descending order
         } = req.query;
        // Initialize filters object
        const filters = {};
        // Filter by product name (case-insensitive search)
        if (name) {
            filters.name = { $regex: name, $options: "i" }; // 'i' for case-insensitive search
        }
        // Filter by category (ObjectId)
        if (category && mongoose_1.default.Types.ObjectId.isValid(category)) {
            filters.category = new mongoose_1.default.Types.ObjectId(category);
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
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const limitValue = parseInt(limit);
        // Sorting logic (by createdAt, price, or name)
        const sortOrderInt = sortOrder === "asc" ? 1 : -1; // Sorting order: ascending or descending
        const sort = { [sortBy]: sortOrderInt };
        // Query the database with filters, pagination, limit, and sorting
        const products = await product_model_1.default.find(filters)
            .skip(skip)
            .limit(limitValue)
            .sort(sort);
        // Return the products as a JSON response
        res.json(products);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};
exports.getProducts = getProducts;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await product_model_1.default.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await product_model_1.default.findByIdAndDelete(id);
        res.json({ message: "Product deleted" });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
const updateStock = async (req, res) => {
    const { id } = req.params;
    const { quantityChange } = req.body; // pass positive/negative number
    const product = await product_model_1.default.findById(id);
    if (!product)
        return res.status(404).json({ error: "Product not found" });
    const newQuantity = product.quantity + quantityChange;
    if (newQuantity < 0)
        return res.status(400).json({ error: "Insufficient stock" });
    product.quantity = newQuantity;
    product.lastUpdated = new Date();
    await product.save();
    res.json({ message: "Stock updated", product });
};
exports.updateStock = updateStock;
const getLowStockProducts = async (req, res) => {
    const threshold = parseInt(req.query.threshold) || 5;
    const lowStockItems = await product_model_1.default.find({ quantity: { $lte: threshold } });
    res.json({ lowStockItems });
};
exports.getLowStockProducts = getLowStockProducts;
