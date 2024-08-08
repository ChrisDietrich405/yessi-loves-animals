"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import { Button, Chip } from "@mui/material";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./styles.module.css";

export default function ShoppingCartModal({ open, handleClose }) {
  const [modal, setModal] = useState(true);
  const [cartProducts, setCartProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState({});

  const toggleModal = () => {
    setModal(!modal);
  };

  const router = useRouter();

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
    <Modal
      open={modal}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={styles.modal}>
        <div className={styles.overlay}>
          <div className={styles.modal_content}>
            <div className={styles.cart_container}>
              <div className={styles.cart_summary_container}>
                <h3>Cart Summary</h3>
                <br />
                <p>
                  <b>Total:</b> {cartTotal.totalItems}
                </p>
                <p sx={{ paddingBottom: "30px" }}>
                  <b> Total Price:</b> ${cartTotal.totalPrice?.toFixed(2)}
                </p>
                <Button
                  sx={{
                    marginTop: "auto",
                    backgroundColor: "#636366",
                    color: "#FFFFFF", // Text color
                    "&:hover": {
                      backgroundColor: "#282c35", // Hover color
                    },
                  }}
                  variant="contained"
                  onClick={() => router.push("/products")}
                >
                  Back to Products
                </Button>
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
                          <Chip
                            sx={{
                              backgroundColor: "#636366",
                              color: "#FFFFFF", // Text color
                              "&:hover": {
                                backgroundColor: "#282c35", // Hover color
                              },
                            }}
                            label="-"
                            onClick={() => subtractItem(product.id)}
                          >
                            -
                          </Chip>{" "}
                          {product.total}{" "}
                          <Chip
                            sx={{
                              backgroundColor: "#636366",
                              color: "#FFFFFF", // Text color
                              "&:hover": {
                                backgroundColor: "#282c35", // Hover color
                              },
                            }}
                            label="+"
                            onClick={() => addItem(product.id)}
                          >
                            +
                          </Chip>
                        </p>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
          {/* <button
            className={styles.close_modal}
            onClick={() => setModal(false)}
          >
            CLOSE
          </button> */}
        </div>
      </div>
    </Modal>
  );
}
