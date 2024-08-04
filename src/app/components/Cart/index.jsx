"use client";
import { useState, useEffect } from "react";

import styles from "./styles.module.css";

const Cart = () => {
  //   const [products, setProducts] = useState([]);

  //   const fetchProducts = async () => {
  //     // setLoading(true);
  //     const response = await api.get("products");
  //     const { data } = response;
  //     setProducts(data);
  //     // setLoading(false);
  //   };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);
  return (
    <div className={styles.product_list_container}>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
