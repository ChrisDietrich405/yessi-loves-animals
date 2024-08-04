"use client";
import React, { useState, useEffect } from "react";

import styles from "./styles.module.css";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState({});

  const updateCartTotal = () => {
    setCartTotal(
      cartProducts.reduce(
        (total, cartProduct) => {
          const { price } = cartProduct;
          total.totalItems++;
          total.totalPrice += price * cartProduct.total;
          return total;
        },
        {
          totalItems: 0,
          totalPrice: 0,
        }
      )
    );
  };

  const subtractItem = (id) => {
    const updatedItems = cartProducts.map((product) => {
      if (product.total <= 0) {
        return { ...product, total: (product.total = 0) };
      } else if (product.id === id) {
        return { ...product, total: product.total - 1 };
      } else {
        return product;
      }
    });
    setCartProducts(updatedItems);
    localStorage.setItem("cartProducts", JSON.stringify(updatedItems));
  };

  const addItem = (id) => {
    const updatedItems = cartProducts.map((product) => {
      if (product.id === id) {
        return { ...product, total: product.total + 1 };
      } else {
        return product;
      }
    });
    setCartProducts(updatedItems);
    localStorage.setItem("cartProducts", JSON.stringify(updatedItems));
  };

  useEffect(() => {
    const localStorageProducts = localStorage.getItem("cartProducts");
    const products = JSON.parse(localStorageProducts);
    setCartProducts(products);
  }, []);

  useEffect(() => {
    updateCartTotal();
  }, [cartProducts]);

  return (
    <div className={styles.cart_container}>
      <div className={styles.cart_summary_container}>
        <h3>Cart Summary</h3>
        <p>Total: {cartTotal.totalItems}</p>
        <p>Total Price: ${cartTotal.totalPrice?.toFixed(2)}</p>
      </div>
      <ul className={styles.list_container}>
        {cartProducts.map((product) => {
          return (
            <div className={styles.product_container}>
              <img src={product.image} alt={product.title} />
              <div className={styles.product_information_container}>
                <h4>{product.title}</h4>
                <strong>${product.price}</strong>
                <p>
                  Total:{" "}
                  <button onClick={() => subtractItem(product.id)}>-</button>{" "}
                  {product.total}{" "}
                  <button onClick={() => addItem(product.id)}>+</button>
                </p>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Cart;
