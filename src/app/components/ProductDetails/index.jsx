"use client";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import { api } from "../../api/product-api";
import axios from "axios";
import { Button, Container, Typography, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import styles from "./styles.module.css";

//AT SOME POINT THE LOGIC SHOULD BE WHEN USER CLICKS ADD TO CART A MODAL POPS UP AND ASKS CUSTOMER IF THEY WANT TO CONTINUE SHOPPING (MAYBE IN THE TOAST COULD SAY SEE CART)

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const [cartProducts, setCartProducts] = useState([]);
  const { addProduct } = useContext(CartContext);

  const router = useRouter();
  const params = useParams();

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

  useEffect(() => {
    fetchProductDetails();
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    } else {
      localStorage.removeItem("cartProducts"); // Clean up if cart is empty
    }
  }, [cartProducts]); // This effect runs whenever cartProducts changes

  useEffect(() => {
    console.log("helloooooo");
    const localStorageProducts = localStorage.getItem("cartProducts");
    console.log("hello", localStorageProducts);
    if (localStorageProducts) {
      const productsArray = JSON.parse(localStorageProducts);
      console.log("cartProducts", productsArray);
      setCartProducts(productsArray);
    }
  }, [cartProducts]);

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
          <Image
            src={`/${productData.image}`}
            alt={productData.description}
            width={100}
            height={100}
          />
          {/* <CardMedia
            sx={{
              height: 300,
              width: 220,
              margin: "20px auto",
              display: "flex",
              justifyContent: "center",
            }}
            image={productData.image}
           
          /> */}
          <CardContent>
            <Typography variant="h6">{productData.name}</Typography>
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
              onClick={() => addProduct(productData)}
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
