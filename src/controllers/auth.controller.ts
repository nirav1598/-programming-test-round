import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

const generateToken = (userId: string, role: string) =>
  jwt.sign({ userId, role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });

export const register = async (req: Request, res: Response): Promise<Response | void> => {
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ error: "User already exists" });

  const user: any = await User.create({ name, email, password, role });
  const token = generateToken(user._id, user.role);

  res.status(201).json({ token, user: { name: user.name, role: user.role } });
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, password } = req.body;

  const user: any = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ error: "Invalid email or password" });
  }

  const token = generateToken(user._id, user.role);
  res.json({ token, user: { name: user.name, role: user.role } });
};
