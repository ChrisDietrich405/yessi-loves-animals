"use client";
import { useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "@/app/context/CartContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
// import {useGetCart} from "@/app/hooks/services/cart";
// import {useCookies} from "react-cookie";

export default function ShoppingCartButton() {
  const [cartProducts, setCartProducts] = useState([]);
  // const { cartProducts, addProduct } = useContext(CartContext);
  // const [{token}, _, removeCookie] = useCookies(['token']);
  // const {data, isError,} = useGetCart({
  //   enabled: !!token,
  // });

  // const cart = data?.data;

  // const router = useRouter();

  // const length = isError || !token ? 0 : cart?.items.length;

  useEffect(() => {
    let productsArray;
    const localStorageProducts = localStorage.getItem("cartProducts");
    console.log("Parsed products array:", productsArray);
    if (localStorageProducts) {
      productsArray = JSON.parse(localStorageProducts);
      setCartProducts(productsArray);
    }
  }, [cartProducts]); // This runs only once on mount

  const length = cartProducts.length;

  return (
    <Badge badgeContent={length} color="primary">
      <ShoppingCartIcon
        sx={{ color: "#fff", cursor: "pointer", width: "100px" }}
        // onClick={() => router.push("/checkout")}
      />
    </Badge>
  );
}
