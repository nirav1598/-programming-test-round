"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategories = exports.createCategory = void 0;
const category_model_1 = __importDefault(require("../models/category.model"));
// Create Category
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const category = await category_model_1.default.create({ name, description });
        res.status(201).json(category);
    }
    catch (err) {
        res.status(500).json({ error: 'Error creating category', details: err });
    }
};
exports.createCategory = createCategory;
// Get All Categories
const getCategories = async (_, res) => {
    const categories = await category_model_1.default.find();
    res.json(categories);
};
exports.getCategories = getCategories;
// Update Category
const updateCategory = async (req, res) => {
    try {
        const category = await category_model_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(category);
    }
    catch (err) {
        res.status(500).json({ error: 'Error updating category', details: err });
    }
};
exports.updateCategory = updateCategory;
// Delete Category
const deleteCategory = async (req, res) => {
    try {
        await category_model_1.default.findByIdAndDelete(req.params.id);
        res.status(204).send();
    }
    catch (err) {
        res.status(500).json({ error: 'Error deleting category', details: err });
    }
};
exports.deleteCategory = deleteCategory;
