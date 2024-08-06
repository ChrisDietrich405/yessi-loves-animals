//clothes
"use client";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import Link from "next/link";
import YouTubeIcon from "@mui/icons-material/YouTube";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Image from "next/image";

import styles from "./style.module.css";

export default function ButtonAppBar() {
  // const { modal } = useContext(UserContext);

  // {modal}

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#282c34" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/">
            <Image
              width={100}
              height={30}
              className={styles.navbar_image}
              src="/img/yessi-logo-200.png"
              alt="website logo"
            />
          </Link>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <Link
              href="https://www.youtube.com/@michiveg"
              passHref
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                sx={{ marginRight: "20px" }}
                className={styles.navbar_btn}
                variant="contained"
                target="_blank"
                rel="noopener noreferrer"
              >
                YouTube <YouTubeIcon sx={{ marginLeft: "5px" }} />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="contained"
                className={styles.navbar_btn}
                sx={{ fontWeight: 500, marginRight: "20px", color: "white" }}
              >
                Products
              </Button>
            </Link>
            <ShoppingCartIcon />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
