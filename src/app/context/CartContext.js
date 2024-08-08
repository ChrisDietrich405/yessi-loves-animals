"use client";
import React, { createContext, useState, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  const addProduct = (productData) => {
    const index = cartProducts.findIndex(
      (cartProduct) => cartProduct.id === productData.id
    );
    if (index !== -1) {
      setCartProducts((state) =>
        state.map((cartProduct) => {
          if (cartProduct.id === productData.id) {
            return { ...cartProduct, total: cartProduct.total + 1 };
          } else {
            return cartProduct;
          }
        })
      );
    } else {
      // newCartProducts = [...cartProducts, { ...productData, total: 1 }];
      setCartProducts((state) => [...state, { ...productData, total: 1 }]);
    }

    // if (loading === false) {

    // }
    /// ADD TOAST TO SAY ITEM ADDED
    // router.push("/cart");
  };

  useEffect(() => {
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

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
