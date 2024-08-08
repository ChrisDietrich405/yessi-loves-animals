"use client";
import { useState, useEffect } from "react";
import CircularIndeterminate from "../Loader";
import { api } from "../../api/product-api";
import { Button, Container, Typography, Box } from "@mui/material";
// import data from "../../data.json";
import ProductCard from "../ProductCard";

import styles from "./styles.module.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await api.get("http://localhost:3000/api/products");
    const { data } = response;
    setProducts(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return loading ? (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularIndeterminate />
    </Box>
  ) : (
    <Box className={styles.product_list_container}>
      <Box className={styles.product_container}>
        {products.map((productItem) => {
          return <ProductCard key={productItem.id} {...productItem} />;
        })}
      </Box>
    </Box>
  );
};

export default ProductList;
