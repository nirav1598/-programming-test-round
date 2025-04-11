"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../models/user.model"));
const generateToken = (userId, role) => jsonwebtoken_1.default.sign({ userId, role }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
});
const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    const existingUser = await user_model_1.default.findOne({ email });
    if (existingUser)
        return res.status(400).json({ error: "User already exists" });
    const user = await user_model_1.default.create({ name, email, password, role });
    const token = generateToken(user._id, user.role);
    res.status(201).json({ token, user: { name: user.name, role: user.role } });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_model_1.default.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = generateToken(user._id, user.role);
    res.json({ token, user: { name: user.name, role: user.role } });
};
exports.login = login;
