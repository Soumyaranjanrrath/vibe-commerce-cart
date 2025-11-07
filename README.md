# 🛒 Vibe Commerce Cart - Full Stack E-Commerce Application

A **modern full-stack shopping cart** built with **React**, **Node.js**, and **Express**.  
This project demonstrates end-to-end e-commerce flow — from fetching products and managing cart items to generating a mock checkout receipt — with clean, responsive UI and RESTful API integration. ⚡

---

## 🚀 Features

- **Product Catalog**: Browse 8+ products with real images, ratings, and pricing in Indian Rupees (₹)
- **Shopping Cart**: Add/remove items, update quantities, view total
- **Search & Filter**: Real-time product search and category filtering
- **Product Ratings**: Star ratings and review counts
- **Checkout Process**: Customer information form and order confirmation
- **Receipt Generation**: Mock order receipts with order details
- **Responsive Design**: Mobile-friendly interface with smooth animations
- **Error Handling**: Comprehensive error management throughout
- **MongoDB Integration**: Persistent data storage with fallback to in-memory

---

## 🛠️ Tech Stack

| Layer        | Technologies                          |
| ------------ | ------------------------------------- |
| 💻 Frontend  | React 18, Axios, CSS3                 |
| ⚙️ Backend   | Node.js, Express.js                    |
| 🗄️ Database | MongoDB/Mongoose (with in-memory fallback) |
| 🔗 APIs      | REST Architecture                     |
| 🎨 Styling   | Pure CSS with responsive design       |
| 🧠 State     | React Hooks                            |

---

## 📋 API Endpoints

| Method | Endpoint | Description |
|:------:|----------|-------------|
| `GET` | `/api/products` | Retrieve all products |
| `POST` | `/api/cart` | Add item to cart `{productId, quantity}` |
| `PUT` | `/api/cart/:id` | Update item quantity |
| `GET` | `/api/cart` | Get cart contents and total |
| `DELETE` | `/api/cart/:id` | Remove item from cart |
| `POST` | `/api/checkout` | Process checkout and generate receipt |
| `GET` | `/api/health` | Health check endpoint |

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional - app works without it)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Soumyaranjanrrath/vibe-commerce-cart.git
   cd vibe-commerce-cart
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start MongoDB (Optional)**
   ```bash
   # If you have MongoDB installed locally
   mongod
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd backend
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm start
   # App opens at http://localhost:3000
   ```

3. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`

---

## 🎯 Usage

1. **Browse Products**: View the product catalog with search and filter options
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the "Cart" button in the header
4. **Manage Items**: Update quantities or remove items from the cart
5. **Checkout**: Click "Proceed to Checkout" and fill in customer information
6. **Complete Order**: Submit the form to receive a mock receipt

---

## 🧾 Sample Checkout Response

```json
{
  "message": "Checkout successful",
  "receipt": {
    "id": "f27c9d42-53a1-4b0c-b3f0-91ea612ff982",
    "timestamp": "2025-11-07T16:45:12.421Z",
    "customer": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "items": [...],
    "total": 4297,
    "status": "completed"
  }
}
```

---

## 🔧 Configuration

### Backend Configuration (`.env`)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibecommerce
NODE_ENV=development
```

### Frontend Configuration
- Proxy configured in `package.json` to connect to backend
- Environment-based API URL configuration

---

## 📦 Project Structure

```
vibe-commerce-cart/
├── backend/
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   └── .env              # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Cart.js
│   │   │   ├── CheckoutForm.js
│   │   │   ├── ProductCard.js
│   │   │   └── ProductsGrid.js
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── utils/         # Utility functions
│   │   │   └── priceFormatter.js
│   │   ├── App.js         # Main App component
│   │   ├── App.css        # Styles
│   │   └── index.js       # Entry point
│   ├── public/
│   │   └── index.html     # HTML template
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

---

## 🌟 Features Implemented

- ✅ **Database Persistence**: MongoDB integration with fallback
- ✅ **Product Images**: Real product photos from Pexels
- ✅ **Indian Currency**: Prices displayed in ₹ (Indian Rupees)
- ✅ **Product Ratings**: Star ratings with review counts
- ✅ **Search & Filter**: Real-time search and category filtering
- ✅ **Quantity Management**: Update quantities in cart
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Loading States**: User feedback during API calls
- ✅ **Form Validation**: Input validation on checkout
- ✅ **Smooth Animations**: Enhanced UI/UX with transitions

---

## 🔮 Future Enhancements

- User authentication
- Payment gateway integration
- Inventory management
- Order history
- Admin dashboard
- Product reviews and ratings system
- Wishlist functionality

---

## 📄 License

This project is created for Vibe Commerce screening purposes.

---

## 🤝 Support

For any questions or issues, please contact the development team.

---

**Note**: This is a mock e-commerce application created for demonstration purposes. No real payments are processed.

⭐ If you liked this project, don't forget to give it a star!
