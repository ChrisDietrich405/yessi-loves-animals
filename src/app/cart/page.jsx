import Image from "next/image";
import styles from "../page.module.css";
import CartModal from "../components/CartModal";

export default function Products() {
  return (
    <main className={styles.main}>
      <CartModal />
    </main>
  );
}
