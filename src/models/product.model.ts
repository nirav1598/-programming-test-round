import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from 'uuid';

export interface IProduct extends Document {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  supplier?: string;
  createdAt: Date;
  updatedAt: Date;
  productId: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    supplier: { type: String },
    productId: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

productSchema.pre('save', function (next) {
  if (!this.productId) {
    this.productId = uuidv4(); // Generate a unique productId if not provided
  }
  next();
});

export default mongoose.model<IProduct>("Product", productSchema);
