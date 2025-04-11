import { Router } from 'express';
import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  updateStock,
  getLowStockProducts
} from '../controllers/product.controller';
import { authenticate } from '../middlewares/auth.middleware';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.post("/", authenticate, authorize(["admin"]), createProduct);
router.get("/", authenticate, getProducts);
router.put("/:id", authenticate, authorize(["admin"]), updateProduct);
router.delete("/:id", authenticate, authorize(["admin"]), deleteProduct);
router.patch("/:id/stock", authenticate, authorize(["admin",]), updateStock);
router.get("/low-stock", authenticate, authorize(["admin", "user"]), getLowStockProducts);


export default router;
