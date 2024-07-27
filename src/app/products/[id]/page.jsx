import styles from "../../page.module.css";
import ProductDetails from "../../components/ProductDetails";

export default function Page({ params }) {
  return <ProductDetails {...params} />;
}