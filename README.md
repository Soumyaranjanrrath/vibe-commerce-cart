# 🛒 Vibe Commerce — Mock E-Commerce Cart

A **modern full-stack shopping cart** built with **React**, **Node.js**, and **Express**.  
This project demonstrates end-to-end e-commerce flow — from fetching products and managing cart items to generating a mock checkout receipt — with clean, responsive UI and RESTful API integration. ⚡  

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|---------------|
| 💻 Frontend | React, Axios, CSS/Tailwind (optional) |
| ⚙️ Backend | Node.js, Express.js |
| 🗄️ Database | In-Memory Mock (MongoDB optional) |
| 🔗 APIs | REST Architecture |
| 🧠 Tools | Warp Terminal, npm, Git |

---

## ✨ Core Features

✅ **Product Listing:** Displays 5–10 mock items from backend.  
🛍️ **Add to Cart:** Instantly adds product & updates cart.  
➖ **Remove Items:** Easily remove unwanted products.  
💰 **Dynamic Totals:** Calculates total in real-time.  
🧾 **Mock Checkout:** Form collects name/email → generates receipt.  
📱 **Responsive UI:** Optimized for all screen sizes.  
⚙️ **REST APIs:** Fully functional backend routes for cart & checkout.  

---

## 🧠 API Endpoints

| Method | Endpoint | Description |
|:------:|-----------|--------------|
| `GET` | `/api/products` | Fetch mock product list |
| `POST` | `/api/cart` | Add item `{productId, qty}` |
| `DELETE` | `/api/cart/:id` | Remove an item |
| `GET` | `/api/cart` | Retrieve all cart items with total |
| `POST` | `/api/checkout` | Generate mock checkout receipt |

## ⚙️ Installation & Setup

### Clone the Repository
```bash
  git clone https://github.com/<your-username>/vibe-ecommerce-cart.git
  cd vibe-ecommerce-cart
```
## Setup Backend
```
cd backend
npm install
node server.js
Runs on http://localhost:5000
```
## Setup Frontend
```
cd ../frontend
npm install
npm start```
Runs on http://localhost:3000

## 🧾 Sample Checkout Response
```{
  "message": "Checkout successful",
  "receipt": {
    "id": "f27c9d42-53a1-4b0c-b3f0-91ea612ff982",
    "name": "Tapan",
    "email": "tapan@example.com",
    "total": 4297,
    "timestamp": "2025-11-07T16:45:12.421Z"
  }
}
```
## Final Note

This project embodies clean logic, smooth UI, and balanced design — proving how full-stack magic can live in even the simplest e-commerce flow.
Crafted with ❤️ and powered by curiosity.

⭐ If you liked this project, don’t forget to give it a star!
