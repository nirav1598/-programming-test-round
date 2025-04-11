import { Router } from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller";

import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.post("/", authenticate, authorize(["admin"]), createCategory);
router.get("/", authenticate, authorize(["admin","user"]), getCategories);
router.put("/:id", authenticate, authorize(["admin"]), updateCategory);
router.delete("/:id", authenticate, authorize(["admin"]), deleteCategory);

export default router;
