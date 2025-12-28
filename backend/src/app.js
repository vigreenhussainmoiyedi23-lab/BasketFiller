//___requiring essential packages____
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

// requiring Middlewares
const { UserCanAcces } = require("./middlewares/AuthenticationMiddleware");
const adminUrl = "https://basket-filler.vercel.app/";
const userUrl = "https://basket-filler-ixng.vercel.app/";

// _______requiring all the routers____
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const commentRoutes = require("./routes/comments.routes");
//_______Middlewares_______
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || [adminUrl, userUrl, "http://localhost:3000"].includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

//_______routes_______
app.use("/api/auth", authRoutes);
app.use("/api/user", UserCanAcces, userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/comment", commentRoutes);

module.exports = app;
