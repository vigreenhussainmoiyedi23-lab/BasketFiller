import React from "react";
import ProductContainer from "../../components/products/ProductContainer";
import Navbar from "../../components/utils/Navbar";
import FilterBar from "../../components/utils/FilterBar";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../utils/AxiosInstance";
import Footer from "../../components/Home/Footer";
import PaginationNavigator from "../../components/utils/PaginationNavigator";

const Product = () => {
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 100000,
    sortBy: "",
    instock: false,
    rating: 0,
    search: "",
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(1);
  const [categouries, setCategouries] = useState([]);
  async function GetCategouryEnumValues() {
    try {
      const res = await axiosInstance.get("/product/categouryEnum");
      setCategouries(res.data.categouryEnum);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetCategouryEnumValues();
  }, []);
  const [products, setProducts] = useState([]);
  async function GetProducts() {
    try {
      const res = await axiosInstance.post("/product/filter", filters);
      setTotalPages(res.data.totalPages);

      setProducts(res.data.products);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    GetProducts();
  }, [filters]);
  return (
    <div className="bg-zinc-950 min-h-screen text-4xl text-white font-bold">
      <Navbar />
      <FilterBar
        setFilter={setFilters}
        filter={filters}
        categouries={categouries}
      />
      <ProductContainer products={products} setProducts={setProducts} />
      <PaginationNavigator
        setFilter={setFilters}
        filter={filters}
        totalPages={totalPages}
      />
      <Footer />
    </div>
  );
};

export default Product;
