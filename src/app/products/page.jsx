import Image from "next/image";
import styles from "../page.module.css";
import ProductList from "../components/ProductList";

export default function Products() {
  return (
    <main className={styles.main}>
      <ProductList />
    </main>
  );
}
