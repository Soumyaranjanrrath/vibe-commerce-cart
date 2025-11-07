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

---

## 🧩 Project Structure

