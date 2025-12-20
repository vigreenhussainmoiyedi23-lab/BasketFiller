import { Routes, Route } from "react-router-dom";

import Orders from "./pages/orders/Orders";
import Products from "./pages/products/Products";
import Users from "./pages/users/Users";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminLogin from "./pages/security/Login";
import ProductMore from "./pages/products/ProductMore";
import ProductEdit from "./pages/products/ProductEdit";
import OrderMore from "./pages/orders/OrderMore";
import Security from "./pages/security/Security";

function App() {
  return (
    <Routes>
      {/* Common layout for all admin routes */}     
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/security" element={<Security />} />
        <Route path="/order/:id" element={<OrderMore />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/product/more/:id" element={<ProductMore />} />
        <Route path="/product/edit/:id" element={<ProductEdit />} />
    </Routes>
  );
}

export default App;
