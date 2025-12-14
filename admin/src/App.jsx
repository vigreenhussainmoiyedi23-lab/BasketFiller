import { Routes, Route } from "react-router-dom";

import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/Login";
import ProductMore from "./pages/ProductMore";
import ProductEdit from "./pages/ProductEdit";

function App() {
  return (
    <Routes>
      {/* Common layout for all admin routes */}
      
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/products" element={<Products />} />
        <Route path="/users" element={<Users />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/product/more/:id" element={<ProductMore />} />
        <Route path="/product/edit/:id" element={<ProductEdit />} />
     
    </Routes>
  );
}

export default App;
