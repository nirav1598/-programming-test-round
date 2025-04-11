# 📦 Inventory Management System

A backend system built using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB** for managing categorized inventory, stock levels, and user access.

---

## 🧩 Purpose

This project is a solution for a backend programming test round. It demonstrates the ability to build a type-safe, scalable inventory management system with:

- Product and category CRUD
- Stock tracking and low-stock alerts
- Role-based access (Admin/User)
- Search and filter capabilities
- API documentation and testing

---
## Folder Structure
```bash
src/
├── config/        # Database & environment configuration
├── controllers/   # Business logic for routes
├── middlewares/   # Auth & error handlers
├── models/        # Mongoose schemas
├── routes/        # API route definitions
├── types/         # TypeScript interfaces
├── utils/         # Utility functions
├── app.ts         # Express app setup
└── server.ts      # App entry point 
```
## 🚀 How to Run

### 1. Clone the Repository

```bash
git clone <repository-url>
cd inventory-management-system

# Install Dependencies
npm install

# Setup Enviornment
PORT=5000
MONGO_URI=mongodb://localhost:27017/inventory-db
JWT_SECRET=your_jwt_secret

