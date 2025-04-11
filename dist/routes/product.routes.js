"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(["admin"]), product_controller_1.createProduct);
router.get("/", auth_middleware_1.authenticate, product_controller_1.getProducts);
router.put("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(["admin"]), product_controller_1.updateProduct);
router.delete("/:id", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(["admin"]), product_controller_1.deleteProduct);
router.patch("/:id/stock", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(["admin",]), product_controller_1.updateStock);
router.get("/low-stock", auth_middleware_1.authenticate, (0, role_middleware_1.authorize)(["admin", "user"]), product_controller_1.getLowStockProducts);
exports.default = router;
