"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

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
    <div className={styles.product_container}>
      {" "}
      <h5>{title}</h5>
      <img className={styles.product_container_img} src={image} alt={title} />
      <div>
        {/* <Link href={`/products/${id}`}>Details</Link> */}
        <p>{formatter.format(price)}</p>
        <button onClick={() => handleNavigateToDetailsPage(id)}>Details</button>
      </div>
    </div>
  );
};

export default ProductCard;
