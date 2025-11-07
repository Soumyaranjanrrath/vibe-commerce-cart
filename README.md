# Vibe Commerce Cart - Full Stack E-Commerce Application

A complete full-stack shopping cart application built for Vibe Commerce screening, featuring React frontend, Node.js/Express backend, and MongoDB database integration.

## 🚀 Features

- **Product Catalog**: Browse 8+ mock products with images and pricing
- **Shopping Cart**: Add/remove items, update quantities, view total
- **Checkout Process**: Customer information form and order confirmation
- **Receipt Generation**: Mock order receipts with order details
- **Responsive Design**: Mobile-friendly interface
- **Error Handling**: Comprehensive error management throughout
- **MongoDB Integration**: Persistent data storage with fallback to in-memory

## 🛠️ Tech Stack

- **Frontend**: React 18, Axios, CSS3
- **Backend**: Node.js, Express.js, MongoDB/Mongoose
- **Database**: MongoDB (with in-memory fallback)
- **Styling**: Pure CSS with responsive design
- **State Management**: React Hooks

## 📋 API Endpoints

- `GET /api/products` - Retrieve all products
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart contents and total
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Process checkout and generate receipt
- `GET /api/health` - Health check endpoint

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (optional - app works without it)

### Installation

1. **Clone the repository**
   ```bash
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
   npm run dev
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

## 🎯 Usage

1. **Browse Products**: View the product catalog on the home page
2. **Add to Cart**: Click "Add to Cart" on any product
3. **View Cart**: Click the "Cart" button in the header
4. **Manage Items**: Remove items or view quantities in the cart
5. **Checkout**: Click "Proceed to Checkout" and fill in customer information
6. **Complete Order**: Submit the form to receive a mock receipt

## 📱 Screenshots

The application features:
- Clean, modern product grid layout
- Interactive shopping cart with item management
- Responsive checkout form
- Modal receipt display
- Mobile-responsive design

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

## 🚦 Testing

The application includes:
- Error boundary handling
- API error management
- Form validation
- Loading states
- Fallback image handling

To test all functionality:
1. Add products to cart
2. Remove items from cart
3. Complete checkout process
4. Verify receipt generation
5. Test responsive design on mobile

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
│   │   ├── services/      # API services
│   │   ├── App.js         # Main App component
│   │   ├── App.css        # Styles
│   │   └── index.js       # Entry point
│   ├── public/
│   │   └── index.html     # HTML template
│   └── package.json       # Frontend dependencies
└── README.md              # This file
```

## 🌟 Bonus Features Implemented

- ✅ **Database Persistence**: MongoDB integration with fallback
- ✅ **Error Handling**: Comprehensive error management
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Loading States**: User feedback during API calls
- ✅ **Form Validation**: Input validation on checkout

## 🔮 Future Enhancements

- User authentication
- Product search and filtering
- Inventory management
- Payment gateway integration
- Order history
- Admin dashboard

## 📄 License

This project is created for Vibe Commerce screening purposes.

## 🤝 Support

For any questions or issues, please contact the development team.

---

**Note**: This is a mock e-commerce application created for demonstration purposes. No real payments are processed.