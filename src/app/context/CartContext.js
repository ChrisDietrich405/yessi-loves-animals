"use client";
import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const addProduct = (productData) => {
    console.log("Product data:", productData); // Add this line
    setCartProducts((prevCartProducts) => {
      const existingProductIndex = prevCartProducts.findIndex(
        (cartProduct) => cartProduct.id === productData.id
      );

      if (existingProductIndex !== -1) {
        console.log("Product exists, incrementing total."); // Add this line
        return prevCartProducts.map((cartProduct, index) =>
          index === existingProductIndex
            ? { ...cartProduct, total: cartProduct.total + 1 }
            : cartProduct
        );
      } else {
        console.log("Adding new product to cart."); // Add this line
        return [...prevCartProducts, { ...productData, total: 1 }];
      }
    });
  };

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    } else {
      localStorage.removeItem("cartProducts"); // Clean up if cart is empty
    }
  }, [cartProducts]); // This effect runs whenever cartProducts changes

  useEffect(() => {
    const localStorageProducts = localStorage.getItem("cartProducts");
    if (localStorageProducts) {
      const productsArray = JSON.parse(localStorageProducts);
      setCartProducts(productsArray);
    }
  }, []);

  return (
    <CartContext.Provider value={{ cartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
