import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axiosInstance from "../../utils/axiosInstance";
import FilterBar from "../utils/FilterBar";
import PaginationFooter from "../utils/PaginationFooter";
const ProductContainer = ({ reload }) => {
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
    <>
      <h1 className="text-slate-900 md:text-3xl  sm:text-2xl text-xl font-semibold capitalize">
        products
      </h1>
      <FilterBar
        filter={filters}
        setFilter={setFilters}
        categouries={categouries}
      />
      <div className="px-2 grid gap-2 items-center justify-center grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  min-h-screen">
        {/*a product card Container */}
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <ProductCard
                key={product._id}
                id={product._id}
                product={product}
                reload={reload}
              />
            );
          })
        ) : (
          <h1 className="text-zinc-800 font-bold text-xl animate-pulse">
            Loading Products
          </h1>
        )}
      </div>
      <PaginationFooter
        filter={filters}
        setFilter={setFilters}
        totalPages={totalPages}
      />
    </>
  );
};

export default ProductContainer;
