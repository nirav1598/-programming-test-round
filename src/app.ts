import express from "express";
import dotenv from "dotenv";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (_, res: any) => res.send("Inventory Management API"));

export default app;
