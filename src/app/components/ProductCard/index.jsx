"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { Button, Container, Typography } from "@mui/material";

const ProductCard = ({ id, image, price, description, title }) => {
  const router = useRouter();

  const handleNavigateToDetailsPage = (id) => {
    router.push(`/products/${id}`);
  };

  const formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <Container className={styles.product_container}>
      {" "}
      <Image
        width={100}
        height={100}
        className={styles.product_container_img}
        src={image}
        alt={title}
      />
      <Typography sx={{ color: "black", marginTop: "10px" }} variant="p">
        {title}
      </Typography>
      <div>
        {/* <Link href={`/products/${id}`}>Details</Link> */}
        <p>{formatter.format(price)}</p>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#636366",
            color: "#FFFFFF", // Text color
            "&:hover": {
              backgroundColor: "#282c35", // Hover color
            },
          }}
          onClick={() => handleNavigateToDetailsPage(id)}
        >
          Details
        </Button>
      </div>
    </Container>
  );
};

export default ProductCard;
