"use client";
import { useState, useEffect } from "react";
import { api } from "../../api/product-api";

import ProductCard from "../ProductCard";

import styles from "./styles.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    // setLoading(true);
    const response = await api.get("products");
    const { data } = response;
    setProducts(data);
    // setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className={styles.product_list_container}>
      <h1>Product List</h1>
      <div className={styles.product_container}>
        {products.map((productItem) => {
          return <ProductCard key={productItem.id} {...productItem} />;
        })}
      </div>
    </div>
  );
};

export default ProductList;
