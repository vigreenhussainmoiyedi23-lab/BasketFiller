# 🛒 Basket Filler

**Basket Filler** is a full-stack e-commerce platform that delivers a smooth and secure online shopping experience for users while giving admins powerful tools to manage products, orders, and analytics.  
Built with **Node.js**, **Express**, **MongoDB**, and **React**, it ensures scalability, performance, and maintainability.

---

## 🚀 Live Demo

- 🛍️ **User Frontend:** [https://basket-filler-ixng.vercel.app](https://basket-filler-ixng.vercel.app)  
- ⚙️ **Admin Dashboard:** [https://basket-filler.vercel.app](https://basket-filler.vercel.app)  
- 🌐 **Backend API:** [https://basketfiller.onrender.com](https://basketfiller.onrender.com)

---

## 🧭 Table of Contents

- [Features](#features)
  - [User Features](#user-features)
  - [Admin Features](#admin-features)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
- [Folder Structure](#folder-structure)
- [Deployment](#deployment)
- [Future Improvements](#future-improvements)
- [License](#license)
- [Author](#author)

---

## 🌟 Features

### 👤 User Features
- 🔐 **Authentication**: Secure register, login, and logout using JWT & cookies.
- 👨‍💼 **Profile Management**: Update user details.
- 🛍️ **Product Browsing**: Explore all products with search, filtering, and pagination.
- 🛒 **Cart System**: Add, remove, and update products in the shopping cart.
- 📦 **Order Management**: Place orders and view order history.
- 💡 **Smart Recommendations**: Suggests products based on user behavior or past purchases.
- 💬 **Comments & Reviews**: Users can add feedback to products.
- 📱 **Responsive Design**: Fully optimized for mobile, tablet, and desktop.

### 🧑‍💼 Admin Features
- 🔑 **Admin Authentication**: Secure login for admins with protected routes.
- 📦 **Product Management**: Create, update, and delete products.
- 📊 **Analytics Dashboard**: Revenue, sales, and order analytics (yearly, monthly, daily).
- 🧾 **User Management**: View and manage registered users.
- 💬 **Comment Moderation**: Approve or remove user reviews.
- 📈 **Interactive Graphs**: Visual representation of product sales and revenue using charts.

---

## 🛠️ Tech Stack

**Frontend**
- React.js  
- Axios  
- Tailwind CSS  

**Backend**
- Node.js  
- Express.js  
- MongoDB (Mongoose ORM)  
- JWT Authentication  
- Cookie Parser  
- CORS  

**Deployment**
- **Frontend (User/Admin):** Vercel  
- **Backend:** Render  

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/basket-filler.git
cd basket-filler
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend root:
```env
PORT=5000
MONGO_URI=<your_mongo_db_connection_string>
JWT_SECRET=<your_jwt_secret>
ADMIN_URL=https://basket-filler.vercel.app
USER_URL=https://basket-filler-ixng.vercel.app
```

Run the backend server:
```bash
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000)

---

## 🔐 Environment Variables

| Variable    | Description                    |
|------------|--------------------------------|
| `PORT`      | Backend server port            |
| `MONGO_URI` | MongoDB connection string      |
| `JWT_SECRET`| Secret key for JWT authentication |
| `ADMIN_URL` | URL of admin frontend          |
| `USER_URL`  | URL of user frontend           |

---

## 🔗 API Routes

### 🧍 Auth Routes
| Method | Endpoint              | Description         |
|--------|---------------------|------------------|
| POST   | /api/auth/register   | Register a new user |
| POST   | /api/auth/login      | Login user/admin   |
| POST   | /api/auth/logout     | Logout user        |

### 👤 User Routes
| Method | Endpoint              | Description       |
|--------|---------------------|-----------------|
| GET    | /api/user/profile    | Get user profile |
| PUT    | /api/user/profile    | Update profile   |

### ⚙️ Admin Routes
| Method | Endpoint                        | Description              |
|--------|---------------------------------|-------------------------|
| GET    | /api/admin/revenue/year          | Get yearly revenue      |
| GET    | /api/admin/product/graph         | Product sales graph     |
| POST   | /api/admin/product               | Add new product         |
| PUT    | /api/admin/product/:id           | Update product          |
| DELETE | /api/admin/product/:id           | Delete product          |

### 🛍️ Product Routes
| Method | Endpoint                | Description          |
|--------|-----------------------|-------------------|
| GET    | /api/product           | Get all products    |
| GET    | /api/product/:id       | Get single product  |
| POST   | /api/product/review    | Add product review  |

### 🛒 Cart Routes
| Method | Endpoint              | Description      |
|--------|---------------------|----------------|
| GET    | /api/cart            | Fetch cart items |
| POST   | /api/cart            | Add to cart      |
| PUT    | /api/cart/:id        | Update cart item |
| DELETE | /api/cart/:id        | Remove item      |

### 📦 Order Routes
| Method | Endpoint          | Description      |
|--------|-----------------|----------------|
| POST   | /api/order       | Place new order |
| GET    | /api/order       | Get user orders |

### 💬 Comment Routes
| Method | Endpoint                  | Description             |
|--------|---------------------------|------------------------|
| POST   | /api/comment              | Add comment            |
| GET    | /api/comment/:productId   | Get comments for product |

---

## 📂 Folder Structure

```
backend/
├─ routes/
├─ controllers/
├─ middlewares/
├─ models/
├─ utils/
├─ app.js
└─ server.js

frontend/
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ context/
│  ├─ utils/
│  └─ App.js
```

---

## ☁️ Deployment

- 🧩 **Frontend (User)** → [https://basket-filler-ixng.vercel.app](https://basket-filler-ixng.vercel.app)  
- 🧑‍💼 **Admin Dashboard** → [https://basket-filler.vercel.app](https://basket-filler.vercel.app)  
- ⚙️ **Backend API** → [https://basketfiller.onrender.com](https://basketfiller.onrender.com)

---

## 🚧 Future Improvements

- 💳 Integrate payment gateway (Stripe / Razorpay)  
- 🔔 Add real-time order status notifications  
- ❤️ Add wishlist and favorites feature  
- 🤖 AI-based product recommendations  
- 🧠 Role-based admin access levels  
- 📧 Email notifications for order updates  

---

## 📝 License

This project is licensed under the **MIT License**.  
You are free to use, modify, and distribute it with attribution.

---

## 💡 Author

Developed with ❤️ by **Hussain**  
📧 For inquiries: *[your-email@example.com]*  
🌐 User Frontend: [https://basket-filler-ixng.vercel.app](https://basket-filler-ixng.vercel.app)  
🌐 Admin Dashboard: [https://basket-filler.vercel.app](https://basket-filler.vercel.app)
