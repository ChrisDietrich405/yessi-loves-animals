"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Button, Container, Typography, Box } from "@mui/material";

const ProductCard = ({ _id, image, price, description, title }) => {
  const router = useRouter();

  const handleNavigateToDetailsPage = (_id) => {
    router.push(`/products/${_id}`);
  };

  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Container className={styles.product_container}>
      {" "}
      <Image
        width={200}
        height={200}
        className={styles.product_container_img}
        src={`/${image}`}
        alt={title}
      />
      <Box className={styles.product_details}>
        <Typography sx={{ color: "black", marginTop: "10px" }} variant="p">
          {title}
        </Typography>
        <h1>hello{_id}</h1>

        <Typography
          sx={{
            color: "black",
            margin: "5px 0",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {formatter.format(price)}
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#636366",
            color: "#FFFFFF", // Text color
            "&:hover": {
              backgroundColor: "#282c35", // Hover color
            },
          }}
          onClick={() => handleNavigateToDetailsPage(_id)}
        >
          Details
        </Button>
      </Box>
    </Container>
  );
};

export default ProductCard;
