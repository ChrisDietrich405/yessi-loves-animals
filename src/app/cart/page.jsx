import Image from "next/image";
import styles from "../page.module.css";
import Cart from "../components/Cart";

export default function Products() {
  return (
    <main className={styles.main}>
      <Cart />
    </main>
  );
}
