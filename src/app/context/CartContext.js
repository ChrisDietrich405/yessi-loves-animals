"use client";
import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios(
        `http://localhost:3000/api/products/${params.id}`
      );
      console.log(response.data);
      const { data } = response;
      setProductData(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  const addProduct = (productData) => {
    console.log("Product data:", productData);
    setCartProducts((prevCartProducts) => {
      const existingProductIndex = prevCartProducts.findIndex(
        (cartProduct) => cartProduct.id === productData.id
      );
  
      if (existingProductIndex !== -1) {
        console.log("Product exists, incrementing total.");
        return prevCartProducts.map((cartProduct, index) =>
          index === existingProductIndex
            ? { ...cartProduct, total: cartProduct.total + 1 }
            : cartProduct
        );
      } else {
        console.log("Adding new product to cart.");
        return [...prevCartProducts, { ...productData, total: 1 }];
      }
    });
  };
  

  useEffect(() => {
    const localStorageProducts = localStorage.getItem("cartProducts");
    if (localStorageProducts) {
      const productsArray = JSON.parse(localStorageProducts);
      setCartProducts(productsArray);
    }
  }, []); // This runs only once on mount
  
  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    } else {
      localStorage.removeItem("cartProducts"); // Clean up if cart is empty
    }
  }, [cartProducts]);
  
  useEffect(() => {
    fetchProductDetails();
  }, []);

  return (
    <CartContext.Provider value={{ cartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
