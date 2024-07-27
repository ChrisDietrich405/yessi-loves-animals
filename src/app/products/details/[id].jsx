"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductDetails = () => {
  const [productData, setProductData] = useState({});
  const router = useRouter();
  // const { id } = router.query;

  console.log("hello");
  const fetchProductDetails = async () => {
    // setLoading(true);
    const response = await api.get(`/products/details/${id}`);
    console.log(response);
    const { data } = response;
    setProductData(data);
    // setLoading(false);
  };

  // useEffect(() => {
  //   if (id) {
  //     fetchProductDetails();
  //   }
  // }, []);

  return <div>Hello</div>;
};

export default ProductDetails;
