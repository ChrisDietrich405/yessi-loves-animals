"use client";
import { useState, useEffect } from "react";
import { api } from "../../api/product-api";
import styles from "./styles.module.css";

const ProductDetails = ({ id }) => {
  const [productData, setProductData] = useState({});

  const fetchProductDetails = async () => {
    // setLoading(true);
    const response = await api.get(`/products/${id}`);
    console.log("response", response);
    const { data } = response;
    setProductData(data);
    // setLoading(false);
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <div>
      <h5>title: {productData.title}</h5>
      <p>price: {productData.price}</p>
      <p>description: {productData.description}</p>
      <p>category: {productData.category}</p>
      <p>
        rating: <strong> rate: {productData.rating?.rate}</strong>
        <strong> count: {productData.rating?.count}</strong>
      </p>
      <img
        className={styles.product_container_img}
        src={productData.image}
        alt={productData.title}
      />
    </div>
  );
};

export default ProductDetails;