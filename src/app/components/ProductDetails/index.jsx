"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../api/product-api";
import styles from "./styles.module.css";

const ProductDetails = ({ id }) => {
  const [productData, setProductData] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

  const router = useRouter();

  const fetchProductDetails = async () => {
    // setLoading(true);
    const response = await api.get(`/products/${id}`);
    console.log("response", response);
    const { data } = response;
    setProductData(data);
    // setLoading(false);
  };

  const handleAddToCart = () => {
    let newCartProducts = [];
    const index = cartProducts.findIndex(
      (cartProduct) => cartProduct.id === productData.id
    );
    if (index !== -1) {
      newCartProducts = cartProducts.map((cartProduct) => {
        if (cartProduct.id === productData.id) {
          return { ...cartProduct, total: cartProduct.total + 1 };
        } else {
          return cartProduct;
        }
      });
      setCartProducts(newCartProducts);
    } else {
      newCartProducts = [...cartProducts, { ...productData, total: 1 }];
      setCartProducts(newCartProducts);
    }
    localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
    router.push("/cart");
    // let newCartProducts = [];
    // const index = cartProducts.findIndex(
    //   (cartProduct) => cartProduct.id === productData.id
    // );
    // if (index !== -1) {
    //   newCartProducts = cartProducts.map((cartProduct) => {
    //     if (cartProduct.id === productData.id) {
    //       return { ...cartProduct, total: cartProduct.total + 1 };
    //     } else {
    //       return cartProduct;
    //     }
    //   });
    //   setCartProducts(newCartProducts);
    // } else {
    //   newCartProducts = [...cartProducts, { ...productData, total: 1 }];
    //   setCartProducts(newCartProducts);
    // }

    // if (loading === false) {
    //   localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
    // }

    // navigate("/cart");
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
      <button onClick={handleAddToCart}>Add to Cart </button>
    </div>
  );
};

export default ProductDetails;
