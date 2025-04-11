import { Request, Response } from 'express';
import Category from '../models/category.model';

// Create Category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Error creating category', details: err });
  }
};

// Get All Categories
export const getCategories = async (_: Request, res: Response) => {
  const categories = await Category.find();
  res.json(categories);
};

// Update Category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Error updating category', details: err });
  }
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Error deleting category', details: err });
  }
};
