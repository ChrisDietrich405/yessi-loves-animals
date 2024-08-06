"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { api } from "../../api/product-api";
import { Button, Container, Typography, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import styles from "./styles.module.css";

const ProductDetails = ({ id }) => {
  const [productData, setProductData] = useState({});
  const [cartProducts, setCartProducts] = useState([]);

  const router = useRouter();

  const fetchProductDetails = async () => {
    // setLoading(true);
    const response = await api.get(`/products/${id}`);
    const { data } = response;
    setProductData(data);
    // setLoading(false);
  };

  const handleCartItems = () => {
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

    // if (loading === false) {
    localStorage.setItem("cartProducts", JSON.stringify(newCartProducts));
    // }

    router.push("/cart");
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  useEffect(() => {
    const localStorageProducts = localStorage.getItem("cartProducts");
    if (localStorageProducts) {
      const productsArray = JSON.parse(localStorageProducts);
      setCartProducts(productsArray);
    }
  }, []);

  return (
    <Box sx={{ padding: "20px" }}>
      <Container
        sx={{
          marginTop: "120px auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card sx={{ maxWidth: "90%", padding: "0 10px 30px 10px" }}>
          <CardMedia
            sx={{
              height: 300,
              width: 220,
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
            }}
            image={productData.image}
            title={productData.title}
          />
          <CardContent>
            <Typography variant="h6">{productData.title}</Typography>
            <Typography>
              <b>Price: </b>${Number(productData.price).toFixed(2)}
            </Typography>
            <Typography>{productData.description}</Typography>
            {/* <Typography>
              <b>Category:</b> {productData.category}
            </Typography> */}

            <br />
          </CardContent>
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              sx={{
                backgroundColor: "#636366",
                color: "#FFFFFF", // Text color
                "&:hover": {
                  backgroundColor: "#282c35", // Hover color
                },
              }}
              variant="contained"
              onClick={handleCartItems}
            >
              Add to Cart{" "}
            </Button>
          </CardActions>
        </Card>
      </Container>
    </Box>
  );
};

export default ProductDetails;
